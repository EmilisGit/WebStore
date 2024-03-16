import { cloneTemplate } from "../scripts/utils.mjs";
import baseView from "./baseView.mjs";
import { postTo } from "../scripts/utils.mjs";
import order from "../model/orderMod.mjs";
import { sessionManager, sessionKeys } from "../scripts/sessionManager.mjs";

const checkoutView = new baseView();
checkoutView.templateSource = "views/checkout.html";
checkoutView.templateID = "checkout-template";
checkoutView.viewID = "checkout";

checkoutView.onSetup = async function (model, target) {
  checkoutView.view = await cloneTemplate(checkoutView.template);
  target.append(checkoutView.view);
  target.querySelector(".buttons").style.display = "none";
  const checkboxState = target.querySelector("#companyCheckbox");
  const companyDetails = target.querySelector("#company-info");

  target.querySelector("#submit-order").addEventListener("click", async () => {
    const shoppingCartInfo = JSON.parse(localStorage.getItem("shoppingCart"));

    order.productIds = shoppingCartInfo.items.map((product) => product.id);
    order.subscriptionMonths = 0;
    order.cost = sessionManager.getItem(sessionKeys.orderPrice);

    if (checkboxState.getAttribute("data-state") === "checked") {
      order.companyName = target.querySelector("#company-name").value;
      order.companyCode = target.querySelector("#company-code").value;
      order.companyTaxCode = target.querySelector("#company-tax-code").value;
      order.country = target.querySelector("#country").value;
      order.address = target.querySelector("#address").value;
      order.zipCode = target.querySelector("#zip-code").value;
    }
    const response = await postTo("/checkout", order);
    if (response.ok) {
      console.log("Order sent successful");
    }
  });

  target.querySelector("#companyCheckbox").addEventListener("click", () => {
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
