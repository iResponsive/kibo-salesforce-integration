import { LightningElement, track, api, wire } from "lwc";
import getCaseRec from "@salesforce/apex/fetchRecordByIdLwc.getCaseRec";
import { MessageContext, publish } from "lightning/messageService";
import API_MESSAGE_CHANNEL from "@salesforce/messageChannel/API_MESSAGE_CHANNEL__c";

export default class FetchRecordByIdLwc extends LightningElement {
  @api recordId;
  @track caseItemArr = [];
  @track error;
  @wire(MessageContext)
  messageContext;

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

  publishApiResult(data) {
    publish(this.messageContext, API_MESSAGE_CHANNEL, data);
  }
}
