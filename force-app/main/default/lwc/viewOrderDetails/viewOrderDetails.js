import { LightningElement, api } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import styles from "./viewOrderDetails.css";
import getShipmentDetailsByOrderNumber from "@salesforce/apex/ShipmentController.getShipmentDetailsByOrderNumber";

export default class ViewOrderDetails extends NavigationMixin(
  LightningElement
) {
  customStylesURL = styles;
  @api isHistoryValue;
  @api isSummary;
  isHistory = false;
  @api receivedValue;
  summaryDetails;
  fulfillmentInfo;
  billingInfo;
  orderNumber;
  siteId;
  orderId;
  filterSummaryDetails;
  selectedOrderDetail;
  detailsSystem;
  fulfillmentStatus;

  getOrderDetails() {
    this.isOrderDetails = true;
    this.isOrderSummary = false;
  }

  getOrdersummary() {
    this.isOrderSummary = true;
    this.isOrderDetails = false;
  }

  handleClick(event) {
    this.orderNumber = event.currentTarget.dataset.id;
    // eslint-disable-next-line @lwc/lwc/no-api-reassignments
    this.isOrderDetails = this.isOrderSummary = false;
    this.selectedOrderDetail = [];
    getShipmentDetailsByOrderNumber({ orderNumber: this.orderNumber }).then(
      (result) => {
        this.summaryDetails = result;
        this.siteId = this.summaryDetails[0].siteId;
        this.selectedOrderDetail = this.summaryDetails[0];
        if (result.some((res) => res.childShipmentNumbers?.length)) {
          this.detailsSystem = result.find(
            (res) => res.childShipmentNumbers?.length > 0
          );
          this.filterSummaryDetails = this.summaryDetails?.filter((element) =>
            this.detailsSystem?.childShipmentNumbers?.some(
              (re) => re === element.shipmentNumber
            )
          );
        } else {
          this.filterSummaryDetails = this.summaryDetails;
        }
        this.fulfillmentStatus = this.receivedValue[0].fulfillmentStatus;
        this.orderId = this.filterSummaryDetails[0]?.orderId;
        this.selectedOrderDetail = this.receivedValue;
        const orderInformation = this.receivedValue?.filter(
          (order) => +order.orderNumber === +this.orderNumber
        );
        this.fulfillmentInfo = orderInformation[0].fulfillmentInfo;
        this.billingInfo = orderInformation[0].billingInfo;
        if (result.length > 0) {
          this.isHistory = true;
        }
      }
    );
    const custEvent = new CustomEvent("close", { detail: true });
    this.dispatchEvent(custEvent);
  }

  callFromChild(event) {
    // eslint-disable-next-line @lwc/lwc/no-api-reassignments
    this.isOrderDetails = event.detail;
    this.isHistory = !event.detail;
    const custEvent = new CustomEvent("close", { detail: false });
    this.dispatchEvent(custEvent);
  }
}
