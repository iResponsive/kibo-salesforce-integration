import { LightningElement, api, track } from "lwc";

export default class OrderHistorySummary extends LightningElement {
  @api details;
  @track isModalOpen = false;
  value = "";
  toParent;
  totalAmount = 0;
  discountAmount = 0;
  displayedAmount = 0;
  dataList = [
    {
      Item: "Dove Intense Repair Shampoo",
      Quantity: 1,
      Discount: 7.2,
      Price: 72
    },
    {
      Item: "Dove Intense Repair Shampoo",
      Quantity: 2,
      Discount: 5,
      Price: 72
    },
    {
      Item: "Dove Intense Repair Shampoo",
      Quantity: 3,
      Discount: 45,
      Price: 45
    }
  ];
  columns = [
    { label: "Item", fieldName: "Item" },
    { label: "Quantity", fieldName: "Quantity", type: "number" },
    {
      label: "Discount",
      fieldName: "Discount",
      type: "number",
      cellAttributes: { alignment: "left" }
    },
    { label: "Price", fieldName: "Price", type: "currency" }
  ];

  connectedCallback() {
    // Call your JavaScript function here
    this.getGrandTotal();
    console.log(this.details);
  }

  getGrandTotal() {
    this.discountAmount = this.dataList.reduce((a, b) => {
      return a + b.Discount;
    }, 0);
    this.totalAmount = this.dataList.reduce((a, b) => {
      return a + b.Quantity * b.Price;
    }, 0);
    this.displayedAmount = this.totalAmount - this.discountAmount;
  }

  handleChild(event) {
    const custEvent = new CustomEvent("close", { detail: true });
    this.dispatchEvent(custEvent);
    this.toParent = event.detail.value;
  }

  openPromptModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  get options() {
    return [
      { label: "Ordered by mistake", value: "Ordered by mistake" },
      { label: "Changed my mind", value: "Changed my mind" },
      { label: "Will arrive late", value: "Will arrive late" },
      { label: " Wrong size", value: " Wrong size" },
      { label: "Lower price elsewhere", value: "Lower price elsewhere" }
    ];
  }

  handleChange(event) {
    this.value = event.detail.value;
  }
}
