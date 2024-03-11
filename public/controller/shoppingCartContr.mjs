import { cloneTemplate } from "../scripts/utils.mjs";
import baseView from "./baseView.mjs";
import { sessionManager, sessionKeys } from "../scripts/sessionManager.mjs";

const shoppingCartView = new baseView();
shoppingCartView.templateSource = "views/shoppingCart.html";
shoppingCartView.templateID = "shopping-cart-template";
shoppingCartView.viewID = "shopping-cart";
shoppingCartView.onToCheckoutEventHandler = null;

shoppingCartView.onSetup = async function (model, target) {
  shoppingCartView.view = cloneTemplate(shoppingCartView.template);
  target.append(shoppingCartView.view);

  const keepShoppingButton = target.querySelector("#keep-shopping-btn");
  keepShoppingButton.addEventListener("click", onKeepShoppingClicked);

  let totalSum = updateTotalPrice(model);
  target.querySelector("#total-price").innerHTML = totalSum;
  sessionManager.setItem(sessionKeys.orderPrice, totalSum);

  target
    .querySelector("#checkout-btn")
    .addEventListener("click", onToCheckoutEventHandler);
};

function onKeepShoppingClicked(event) {
  if (shoppingCartView.onToMainPageEventHandler != null) {
    shoppingCartView.onToMainPageEventHandler();
  }
}

function onToCheckoutEventHandler(event) {
  if (shoppingCartView.onToCheckoutEventHandler != null) {
    shoppingCartView.onToCheckoutEventHandler();
  }
}

function updateTotalPrice(model) {
  let totalSum = 0;
  for (const item of model) {
    totalSum += item.price * 1;
  }
  totalSum = totalSum.toFixed(2);
  return totalSum;
}

export default shoppingCartView;
