import { LightningElement, track } from "lwc";

export default class OrderSearch extends LightningElement {
  @track email;
  @track orderNo;
  @track isViewSearch = false;
  sticky = false;
  timeout = 3000;
  isShowHistory = false;

  handleEmailInputChange(event) {
    this.email = event.target.value;
  }

  handleOrderIdInputChange(event) {
    this.orderNo = event.target.value;
  }

  async handleSearch() {
    if (!this.email && !this.orderNo) {
      // eslint-disable-next-line no-alert
      alert("Email Id and order Id should not be empty");
    }
    this.isShowHistory = true;
  }

  callFromChild(event) {
    this.isViewSearch = event.detail;
    console.log(this.isViewSearch);
  }
}
