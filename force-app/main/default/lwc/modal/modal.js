import { api } from "lwc";

export default class MyModal {
  @api content;

  handleOkay() {
    this.close("okay");
  }
}
