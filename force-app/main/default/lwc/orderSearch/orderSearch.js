import { LightningElement, api, track, wire } from "lwc";
import getOrderDetailsByOrderNumber from "@salesforce/apex/OrderController.getOrderDetailsByOrderNumber";
import getOrderHistoryByEmailId from "@salesforce/apex/OrderController.getOrderHistoryByEmailId";
import { unsubscribe } from "lightning/messageService";
import { showToast } from "c/utils";
import getCaseRec from "@salesforce/apex/fetchRecordByIdLwc.getCaseRec";

export default class OrderSearch extends LightningElement {
  @track showSpinner = false;

  @api recordId;
  @track caseItemArr = [];
  @track error;

  @track email;
  @track orderNo;
  isViewSearch = false;
  sticky = false;
  timeout = 3000;
  isShowHistory = false;
  data = [];
  @track orderSummary = [];
  isOrderDetails = false;
  isOrderSummary = false;
  subscription = null;
  disabledEmail = true;
  disabledOrderId = true;
  apiResult;
  localOrderNo;
  searchEmail;

  handleEmailInputChange(event) {
    this.email = event.target.value;
  }

  handleOrderIdInputChange(event) {
    this.orderNo = event.target.value;
  }

  @wire(getCaseRec, { recId: "$recordId" })
  async getInfos({ error, data }) {
    if (error) {
      console.error("Error retrieving Case records:", error);
      this.error = "Error retrieving Case records: " + error.body.message;
      this.caseItemArr = [];
    } else if (data) {
      console.log("Case records retrieved:", data);
      this.caseItemArr = data;
      this.error = undefined;

      let emailAddress = "";
      let orderNo = "";
      let suppliedEmail = "";

      data.forEach((caseRecord) => {
        if (caseRecord) {
          const { Description, SuppliedEmail } = caseRecord;
          const emailMatch = Description
            ? Description.match(
                /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
              )
            : null;
          const orderMatch = Description
            ? Description.match(/\b(\d+)\b/)
            : null;

          if (emailMatch) {
            emailAddress = emailMatch[0];
          }
          if (orderMatch) {
            orderNo = orderMatch[0];
          }
          if (SuppliedEmail) {
            suppliedEmail = SuppliedEmail;
          }
        }
      });

      let eventData;

      if (emailAddress && orderNo) {
        console.log("Parsed Email Address:", emailAddress);
        console.log("Parsed Order Number:", orderNo);
        eventData = { orderNo, emailAddress };
      } else if (orderNo) {
        console.log("Parsed Order Number:", orderNo);
        eventData = { orderNo };
      } else if (emailAddress) {
        console.log("Parsed Email Address:", emailAddress);
        eventData = { emailAddress };
      } else if (suppliedEmail) {
        console.log("Supplied Email:", suppliedEmail);
        eventData = { emailAddress: suppliedEmail };
      } else {
        console.log("No email address or order number found.");
        eventData = {};
      }
      // LMS - Publish the message.
      localStorage.setItem("details", JSON.stringify(eventData));
      // this.publishApiResult(eventData); under testing
      this.dispatchEvent(
        new CustomEvent("parseddataretrieved", { detail: eventData })
      );
    }
  }

  connectedCallback() {
    const value = localStorage.getItem("details");
    if (JSON.parse(value).orderNo) {
      this.orderNo = JSON.parse(value).orderNo;
      this.autoSearch(this.orderNo, null);
    }
    if (JSON.parse(value).emailAddress) {
      this.email = JSON.parse(value).emailAddress;
      this.autoSearch(null, this.email);
    }
  }

  handleMessage(message) {
    this.apiResult = message.apiResult;
  }

  disconnectedCallback() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  enableEmailSearchBoxAndSearchbutton() {
    this.disabledEmail = false;
    this.disabledOrderId = true;
  }

  enableOrderIdSearchBoxAndSearchbutton() {
    this.disabledOrderId = false;
    this.disabledEmail = true;
  }

  async autoSearch(orderNo, emailAddress) {
    this.isShowHistory = this.isOrderDetails = this.isOrderSummary = false;
    if (orderNo?.target?.value === undefined && emailAddress === undefined) {
      this.orderNo = null;
      this.email = null;
      this.orderNo = this.template.querySelector(
        'lightning-input[data-id="orderNo"]'
      )?.value;
      this.email = this.template.querySelector(
        'lightning-input[data-id="emailId"]'
      )?.value;
      if (!this.email && !this.orderNo) {
        return;
      }
    }

    this.showSpinner = true;
    if (this.orderNo || orderNo > 0) {
      this.orderSummary = [];
      getOrderDetailsByOrderNumber({
        orderNumber: this.orderNo ? this.orderNo : orderNo
      })
        .then((result) => {
          this.orderSummary = result;
          // orderNo = null;
          if (this.orderSummary?.length > 0) {
            this.orderSummary.forEach((res) => {
              res.submittedDate = new Date(
                res.submittedDate
              ).toLocaleDateString();
            });
            this.isShowHistory = this.isOrderDetails = true;
            this.isOrderSummary = false;
          } else {
            showToast(this, "info", "No records found.");
          }
        })
        .catch((error) => {
          showToast(this, "error", error);
          console.log("Error:", error);
        })
        .finally(() => {
          this.showSpinner = false;
          orderNo = 0;
          localStorage.removeItem("details");
        });
    }
    if ((this.email || emailAddress) && !this.orderNo) {
      this.orderSummary = [];
      getOrderHistoryByEmailId({ emailId: this.email })
        .then((result) => {
          this.orderSummary = result;
          if (this.orderSummary?.length > 0) {
            this.orderSummary.forEach((res) => {
              res.submittedDate = new Date(
                res.submittedDate
              ).toLocaleDateString();
            });
            this.isOrderDetails = false;
            this.isOrderSummary = this.isShowHistory = true;
          } else {
            showToast(this, "info", "No records found.");
          }
        })
        .catch((error) => {
          console.log("Error from search by email:", error);
        })
        .finally(() => {
          this.showSpinner = false;
          localStorage.removeItem("details");
          emailAddress = null;
        });
    }
  }

  async handleSearch(email) {
    if (typeof email === "object") {
      this.email = this.template.querySelector(
        'lightning-input[data-id="emailId"]'
      )?.value;
    }
    if (this.email) {
      this.searchEmail = this.email;
      this.orderSummary = [];
      getOrderHistoryByEmailId({ emailId: this.email })
        .then((result) => {
          this.orderSummary = result;
          if (this.orderSummary?.length > 0) {
            this.orderSummary.forEach((res) => {
              res.submittedDate = new Date(
                res.submittedDate
              ).toLocaleDateString();
            });
            this.isOrderDetails = false;
            this.isOrderSummary = this.isShowHistory = true;
          } else {
            showToast(
              this,
              "info",
              `No records found in this mail ${this.email}`
            );
          }
        })
        .catch((error) => {
          console.log("Error from search by email:", error);
        })
        .finally(() => {
          this.showSpinner = false;
          localStorage.removeItem("details");
        });
    }
  }

  async handleOrderSearch(orderNo) {
    if (typeof orderNo === "object") {
      this.orderNo = this.template.querySelector(
        'lightning-input[data-id="orderNo"]'
      )?.value;
    }
    if (this.orderNo) {
      this.searchEmail = null;
      this.orderSummary = [];
      getOrderDetailsByOrderNumber({
        orderNumber: this.orderNo
      })
        .then((result) => {
          this.orderSummary = result;
          if (this.orderSummary?.length > 0) {
            this.orderSummary.forEach((res) => {
              res.submittedDate = new Date(
                res.submittedDate
              ).toLocaleDateString();
            });
            this.isShowHistory = this.isOrderDetails = true;
            this.isOrderSummary = false;
          } else {
            showToast(this, "info", "No records found.");
          }
        })
        .catch((error) => {
          showToast(this, "error", error);
          console.log("Error:", error);
        })
        .finally(() => {
          this.showSpinner = false;
          localStorage.removeItem("details");
        });
    }
  }

  callFromChild(event) {
    this.isViewSearch = event.detail;
    if (!this.isViewSearch) {
      if ((this.searchEmail && this.orderNo) || (this.email && !this.orderNo)) {
        this.handleSearch(this.email);
        return;
      }
      if (this.orderNo || (!this.searchEmail && this.email && this.orderNo)) {
        this.handleOrderSearch(this.orderNo);
      }
    }
  }
}
