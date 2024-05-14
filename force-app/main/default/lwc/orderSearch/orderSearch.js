import { LightningElement, track } from "lwc";
import getOrderDetailsByOrderNumber from "@salesforce/apex/OrderController.getOrderDetailsByOrderNumber";
import getOrderHistoryByEmailId from "@salesforce/apex/OrderController.getOrderHistoryByEmailId";
export default class OrderSearch extends LightningElement {
  @track showSpinner = false;

  email;
  orderNo;
  isViewSearch = false;
  sticky = false;
  timeout = 3000;
  isShowHistory = false;
  data = [];
  @track orderSummary = [];
  isOrderDetails = false;
  isOrderSummary = false;

  handleEmailInputChange(event) {
    this.email = event.target.value;
  }

  handleOrderIdInputChange(event) {
    this.orderNo = event.target.value;
  }

  async handleSearch() {
    this.isShowHistory = this.isOrderDetails = this.isOrderSummary = false;
    this.orderNo = this.template.querySelector(
      'lightning-input[data-id="orderNo"]'
    ).value;
    this.email = this.template.querySelector(
      'lightning-input[data-id="emailId"]'
    ).value;
    if (!this.email && !this.orderNo) {
      // eslint-disable-next-line no-alert
      alert("Email Id and order Id should not be empty");
      return;
    }

    this.showSpinner = true;
    if (this.orderNo) {
      this.orderSummary = [];
      getOrderDetailsByOrderNumber({ orderNumber: this.orderNo })
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
          }
        })
        .catch((error) => {
          console.log(error, "Error");
        })
        .finally(() => {
          this.showSpinner = false;
        });
    }

    if (this.email) {
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
          }
        })
        .catch((error) => {
          console.log(error, "Error from search by email");
        })
        .finally(() => {
          this.showSpinner = false;
        });
    }
  }

  callFromChild(event) {
    this.isViewSearch = event.detail;
  }
}
