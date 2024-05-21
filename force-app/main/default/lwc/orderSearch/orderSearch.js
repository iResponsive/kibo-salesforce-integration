import { LightningElement, track, wire } from "lwc";
import getOrderDetailsByOrderNumber from "@salesforce/apex/OrderController.getOrderDetailsByOrderNumber";
import getOrderHistoryByEmailId from "@salesforce/apex/OrderController.getOrderHistoryByEmailId";
import API_MESSAGE_CHANNEL from "@salesforce/messageChannel/API_MESSAGE_CHANNEL__c";
import {
  APPLICATION_SCOPE,
  MessageContext,
  subscribe,
  unsubscribe
} from "lightning/messageService";

export default class OrderSearch extends LightningElement {
  @track showSpinner = false;

  @wire(MessageContext)
  messageContext;

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
  subscription = null;
  apiResult;
  localOrderNo;

  handleEmailInputChange(event) {
    this.email = event.target.value;
  }

  handleOrderIdInputChange(event) {
    this.orderNo = event.target.value;
  }

  connectedCallback() {
    this.subscribeToMessageChannel();
    const value = localStorage.getItem("details");
    if (JSON.parse(value).orderNo) {
      this.orderNo = JSON.parse(value).orderNo;
      this.handleSearch(this.orderNo, null);
    }
    if (JSON.parse(value).emailAddress) {
      this.email = JSON.parse(value).emailAddress;
      this.handleSearch(null, this.email);
    }
  }

  subscribeToMessageChannel() {
    try {
      console.log(
        this.messageContext,
        "Subscribing to message channel:",
        API_MESSAGE_CHANNEL
      );
      this.subscription = subscribe(
        this.messageContext,
        API_MESSAGE_CHANNEL,
        (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE }
      );
    } catch (error) {
      console.log("Subscription error:", error);
    }
  }

  handleMessage(message) {
    console.log("Message received:", message);
    this.apiResult = message.apiResult;
  }

  disconnectedCallback() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  async handleSearch(orderNo, email) {
    this.isShowHistory = this.isOrderDetails = this.isOrderSummary = false;
    if (orderNo?.target?.value === undefined && email === undefined) {
      this.orderNo = null;
      this.email = null;
      this.orderNo = this.template.querySelector(
        'lightning-input[data-id="orderNo"]'
      ).value;
      this.email = this.template.querySelector(
        'lightning-input[data-id="emailId"]'
      ).value;
      if (!this.email && !this.orderNo) {
        return;
      }
    }

    this.showSpinner = true;
    if (this.orderNo || orderNo) {
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
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        })
        .finally(() => {
          this.showSpinner = false;
          orderNo = 0;
          localStorage.removeItem("details");
        });
    }

    if ((this.email || email) && !this.orderNo) {
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
          console.log("Error from search by email:", error);
        })
        .finally(() => {
          this.showSpinner = false;
          localStorage.removeItem("details");
          email = null;
        });
    }
  }

  callFromChild(event) {
    this.isViewSearch = event.detail;
  }
}
