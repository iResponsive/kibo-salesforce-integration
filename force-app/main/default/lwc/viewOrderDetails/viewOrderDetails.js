import { LightningElement, api } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import styles from "./viewOrderDetails.css";

export default class ViewOrderDetails extends NavigationMixin(
  LightningElement
) {
  customStylesURL = styles;
  isOrderDetails = false;
  isOrderSummary = false;
  isHistory = false;
  @api orderDetails = [
    {
      orderNo: 1,
      orderDate: "3/10/2023",
      orderStatus: "Accepted",
      returnStatus: "None"
    },
    {
      orderNo: 2,
      orderDate: "3/5/2024",
      orderStatus: "Completed",
      returnStatus: "None"
    },
    {
      orderNo: 3,
      orderDate: "3/5/2024",
      orderStatus: "Completed",
      returnStatus: "None"
    },
    {
      orderNo: 4,
      orderDate: "3/5/2024",
      orderStatus: "Accepted",
      returnStatus: "None"
    }
  ];

  @api orderSummary = [
    {
      orderNo: 1,
      orderDate: "3/10/2023",
      orderStatus: "Processing",
      returnStatus: "None"
    }
  ];

  getOrderDetails() {
    this.isOrderDetails = true;
    this.isOrderSummary = false;
  }

  getOrdersummary() {
    this.isOrderSummary = true;
    this.isOrderDetails = false;
  }

  handleClick(event) {
    console.log(event, event.target.dataset.item);
    this.isHistory = true;
    this.isOrderDetails = this.isOrderSummary = false;
  }

  callFromChild(event) {
    console.log(event.detail);
    this.isOrderDetails = event.detail;
    this.isHistory = !event.detail;
  }
}
