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

  target.querySelector("#companyCheckbox").addEventListener("click", () => {
    const checkboxState = target.querySelector("#companyCheckbox");
    const companyDetails = target.querySelector("#company-info");

    if (checkboxState.getAttribute("data-state") === "unchecked") {
      companyDetails.style.display = "block";
      checkboxState.setAttribute("data-state", "checked");
      checkboxState.setAttribute("aria-checked", "true");
    } else {
      companyDetails.style.display = "none";
      checkboxState.setAttribute("data-state", "unchecked");
      checkboxState.setAttribute("aria-checked", "false");
    }
  });
};

export default checkoutView;
