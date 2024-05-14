import { LightningElement, api, track } from "lwc";
import getOrderCancellationReasons from "@salesforce/apex/OrderController.getOrderCancellationReasons";
import cancelOrder from "@salesforce/apex/OrderController.cancelOrder";
import editShipmentAddress from "@salesforce/apex/OrderController.editShipmentAddress";
export default class OrderHistorySummary extends LightningElement {
  @api details;
  @api orderSummary;
  @api billingInfo;
  @api orderNo;
  @api siteId;
  @api orderId;
  @api selectedOrderDetail;
  @track isModalOpen = false;
  @track isEditShipmentPopup = false;
  @track addressType;
  @track address1;
  @track address2;
  @track address3;
  @track address4;
  @track cityOrTown;
  @track stateOrProvince;
  @track postalOrZipCode;
  @track countryCode;
  @track home;
  @track work;
  @track mobile;

  cancelReasonCode;
  @api fulfillmentStatus;
  cancelReason;
  toParent;
  cancelOptions;
  addressTypeList;
  countryList;
  orderDetail;
  description;
  isEnableDescription = false;
  totalAmount = 0;
  discountAmount = 0;
  displayedAmount = 0;
  isEdit = false;
  isCancel = false;

  connectedCallback() {
    this.getGrandTotal();
    this.address1 = this.orderSummary.fulfillmentContact.address.address1;
    this.address2 = this.orderSummary.fulfillmentContact.address.address2;
    this.stateOrProvince =
      this.orderSummary.fulfillmentContact.address.stateOrProvince;
    this.countryCode = this.orderSummary.fulfillmentContact.address.countryCode;
    this.postalOrZipCode =
      this.orderSummary.fulfillmentContact.address.postalOrZipCode;
    console.log(
      JSON.stringify(this.orderSummary),
      "orderSummary",
      this.fulfillmentStatus
    );
    this.isEdit =
      this.fulfillmentStatus === "Fulfilled" ||
      this.fulfillmentStatus === "PartiallyFulfilled";
    this.isCancel =
      this.fulfillmentStatus === "Fulfilled" ||
      this.fulfillmentStatus === "PartiallyFulfilled";
    console.log(this.isEdit, this.isCancel);
  }

  get formattedBalance() {
    return this.billingInfo && this.billingInfo.balance
      ? this.billingInfo.balance
      : "0.00";
  }

  get cardNumber() {
    if (
      this.billingInfo &&
      this.billingInfo.card &&
      this.billingInfo.card.cardNumberPartOrMask
    ) {
      return `*********${this.billingInfo.card.cardNumberPartOrMask.slice(-4)} | ${this.billingInfo.card.paymentOrCardType || ""} | ${this.billingInfo.paymentType || ""}`;
    }
    return "";
  }

  async openPromptModal() {
    this.isModalOpen = !this.isModalOpen;
    if (this.isModalOpen === true) {
      try {
        this.cancelOptions = await getOrderCancellationReasons();
        this.cancelOptions = this.cancelOptions.map((option) => ({
          label: option.name,
          value: option.reasonCode,
          needsMoreInfo: option.needsMoreInfo
        }));
      } catch (error) {
        console.log(error);
      }
    }
    console.log(this.cancelOptions, "cancel Options got from apex class");
  }

  getDropDownValues() {
    this.addressTypeList = [
      {
        label: "Commercial",
        value: "Commercial"
      },
      {
        label: "Residential",
        value: "Residential"
      }
    ];

    this.countryList = [
      {
        label: "India",
        value: "IN"
      },
      {
        label: "Canada",
        value: "CN"
      },
      {
        label: "United States",
        value: "US"
      }
    ];
  }

  async openEditShipmentPopUp() {
    this.isEditShipmentPopup = !this.isEditShipmentPopup;
    if (this.isEditShipmentPopup === true) {
      const orderDetailList = JSON.parse(
        JSON.stringify(this.selectedOrderDetail)
      );
      this.orderDetail = orderDetailList?.find(
        (order) => +order.orderNumber === +this.orderNo
      );

      this.address1 = this.orderSummary.fulfillmentContact.address.address1;
      this.address2 = this.orderSummary.fulfillmentContact.address.address2;
      this.address3 = this.orderSummary.fulfillmentContact.address.address3;
      this.address4 = this.orderSummary.fulfillmentContact.address.address4;
      this.cityOrTown = this.orderSummary.fulfillmentContact.address.cityOrTown;
      this.countryCode =
        this.orderSummary.fulfillmentContact.address.countryCode;
      this.stateOrProvince =
        this.orderSummary.fulfillmentContact.address.stateOrProvince;
      this.postalOrZipCode =
        this.orderSummary.fulfillmentContact.address.postalOrZipCode;
      this.addressType =
        this.orderSummary.fulfillmentContact.address.addressType;
      this.home = this.orderSummary.fulfillmentContact.phoneNumbers.home;
      this.work = this.orderSummary.fulfillmentContact.phoneNumbers.work;
      this.mobile = this.orderSummary.fulfillmentContact.phoneNumbers.mobile;
      this.getDropDownValues();
    }
  }

  getGrandTotal() {
    // this.discountAmount = this.dataList.reduce((a, b) => {
    //   return a + b.Discount;
    // }, 0);
    // this.totalAmount = this.dataList.reduce((a, b) => {
    //   return a + b.Quantity * b.Price;
    // }, 0);
    // this.displayedAmount = this.totalAmount - this.discountAmount;
  }

  handleChild(event) {
    const custEvent = new CustomEvent("close", { detail: true });
    this.dispatchEvent(custEvent);
    this.toParent = event.detail.value;
  }

  handleSelectedCancelOption(event) {
    this.isEnableDescription = this.cancelOptions.find(
      (option) =>
        option.value?.toLowerCase() === event.detail.value?.toLowerCase()
    ).needsMoreInfo;
    this.cancelReasonCode = event.detail.value;
  }

  async handleCancelOrderEvent() {
    var OrderCancelData = {
      orderId: this.orderId,
      siteId: this.siteId,
      reasonCode: this.cancelReasonCode,
      description: this.cancelOptions.find(
        (option) =>
          option.value?.toLowerCase() === this.cancelReasonCode.toLowerCase()
      ).label,
      moreInfo:
        this.template.querySelector('lightning-input[data-id="description"]')
          ?.value || " "
    };

    cancelOrder({ jsonData: JSON.stringify(OrderCancelData) })
      .then((result) => {
        this.openPromptModal();
        this.address1 = result?.fulfillmentContact?.address?.address1;
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  }

  async updateAddress() {
    const updatedAddress = {
      id: this.orderDetail.customerAccountId,
      email: this.orderDetail.email,
      firstName: this.orderDetail.fulfillmentInfo.fulfillmentContact.firstName,
      middleNameOrInitial: "",
      lastNameOrSurname:
        this.orderDetail.fulfillmentInfo.fulfillmentContact.lastNameOrSurname,
      companyOrOrganization: "",
      phoneNumbers: {
        home: this.refs.home.value,
        mobile: this.refs.mobile.value,
        work: this.refs.work.value
      },
      address: {
        address1: this.refs.address1.value,
        address2: this.refs.address2.value,
        address3: this.refs.address3.value,
        address4: this.refs.address4.value,
        cityOrTown: this.refs.cityOrTown.value,
        stateOrProvince: this.refs.stateOrProvince.value,
        postalOrZipCode: this.refs.postalOrZipCode.value,
        countryCode: this.refs.countryCode.value,
        addressType: this.refs.addressType.value,
        isValidated: false
      },
      isDestinationCommercial:
        this.refs.addressType.value?.toLowerCase() === "commercial"
          ? true
          : false,
      shippingMethodCode: this.orderDetail.fulfillmentInfo.shippingMethodCode,
      shippingMethodName: this.orderDetail.fulfillmentInfo.shippingMethodName,
      orderId: this.orderDetail.id,
      siteId: this.orderDetail.siteId
    };

    editShipmentAddress({ jsonData: JSON.stringify(updatedAddress) })
      .then((updatedAddressResponse) => {
        this.address1 =
          updatedAddressResponse.fulfillmentContact.address.address1;
        this.address2 =
          updatedAddressResponse.fulfillmentContact.address.address2;
        this.address3 =
          updatedAddressResponse.fulfillmentContact.address.address3;
        this.address4 =
          updatedAddressResponse.fulfillmentContact.address.address4;
        this.cityOrTown =
          updatedAddressResponse.fulfillmentContact.address.cityOrTown;
        this.countryCode =
          updatedAddressResponse.fulfillmentContact.address.countryCode;
        this.stateOrProvince =
          updatedAddressResponse.fulfillmentContact.address.stateOrProvince;
        this.postalOrZipCode =
          updatedAddressResponse.fulfillmentContact.address.postalOrZipCode;
        this.addressType =
          updatedAddressResponse.fulfillmentContact.address.addressType;
        this.home = updatedAddressResponse.fulfillmentContact.phoneNumbers.home;
        this.work = updatedAddressResponse.fulfillmentContact.phoneNumbers.work;
        this.mobile =
          updatedAddressResponse.fulfillmentContact.phoneNumbers.mobile;
        this.isEditShipmentPopup = false;
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  }

  closeEditPopup() {
    this.isEditShipmentPopup = false;
  }
}
