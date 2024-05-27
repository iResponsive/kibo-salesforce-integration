import { ShowToastEvent } from "lightning/platformShowToastEvent";

export function showToast(component, type, message) {
  //variantTypes = ['error',''success','warning','info']
  const evt = new ShowToastEvent({
    title: type?.toString()?.toUpperCase(),
    message: message,
    variant: type,
    mode: "dismissible"
  });
  component.dispatchEvent(evt);
}
