import { cloneTemplate } from "../scripts/utils.mjs";
import baseView from "./baseView.mjs";

const shoppingCartView = new baseView();
shoppingCartView.templateSource = "views/shoppingCart.html";
shoppingCartView.templateID = "shopping-cart-template";
shoppingCartView.viewID = "shopping-cart";
shoppingCartView.onToMainPageEventHandler = null;

shoppingCartView.onSetup = async function (model, target) {
  shoppingCartView.view = cloneTemplate(shoppingCartView.template);
  target.append(shoppingCartView.view);
  const keepShoppingButton = target.querySelector("#keep-shopping-btn");
  keepShoppingButton.addEventListener("click", onKeepShoppingClicked);
};

function onKeepShoppingClicked(event) {
  if (shoppingCartView.onToMainPageEventHandler != null) {
    shoppingCartView.onToMainPageEventHandler();
  }
}

export default shoppingCartView;
