import { cloneTemplate } from "../scripts/utils.mjs";
import baseView from "./baseView.mjs";

const checkoutView = new baseView();
checkoutView.templateSource = "views/checkout.html";
checkoutView.templateID = "checkout-template";
checkoutView.viewID = "checkout";

checkoutView.onSetup = async function (model, target) {
  checkoutView.view = await cloneTemplate(checkoutView.template);
  target.append(checkoutView.view);
  target.querySelector(".buttons").style.display = "none";
};

export default checkoutView;
