import { LightningElement, api } from "lwc";

export default class HistoryTable extends LightningElement {
  @api shipmentDetails;
  nonTransferShipments;
  nonTransferShipmentsLength;
  connectedCallback() {
    const detailsArray = this.shipmentDetails || [];
    this.nonTransferShipments = detailsArray.filter(
      (shipment) => shipment.shipmentType !== "Transfer"
    );
    this.nonTransferShipmentsLength = this.nonTransferShipments.length;
    this.nonTransferShipments = this.nonTransferShipments.map(
      (item, index) => ({ ...item, index: index + 1 })
    );
  }

  getShipmentNumber(index) {
    return index + 1;
  }
}
