import { LightningElement, api } from "lwc";

export default class HistoryTable extends LightningElement {
  @api shipmentDetails;
  nonTransferShipments;
  nonTransferShipmentsLength;
  url;
  connectedCallback() {
    const detailsArray = this.shipmentDetails || [];
    this.nonTransferShipments = detailsArray.filter(
      (shipment) => shipment.shipmentType !== "Transfer"
    );
    this.nonTransferShipmentsLength = this.nonTransferShipments.length;
    this.nonTransferShipments = this.nonTransferShipments.map(
      (item, index) => ({ ...item, index: index + 1 })
    );
    this.url =
      this.nonTransferShipments[0].packages[0]?.trackings[0]?.url ||
      `https://www.dhl.com/in-en/home/tracking.html?tracking-id=${this.nonTransferShipments[0]?.packages[0]?.trackings[0]?.number}`;
  }

  getShipmentNumber(index) {
    return index + 1;
  }
}
