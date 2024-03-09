import cart from "../model/shoppingCartMod.mjs";
import { cloneTemplate } from "../scripts/utils.mjs";
import baseView from "./baseView.mjs";

const cartItemView = new baseView();
cartItemView.templateSource = "views/cartItem.html";
cartItemView.templateID = "cart-item-template";
cartItemView.viewID = "cart-item";

cartItemView.onSetup = async function (model, target) {
  cartItemView.view = cloneTemplate(cartItemView.template);
  target.append(cartItemView.view);
  const items = cart();
  for (const item of items.items) {
    const cartItem = createCartItem(item);
    cartItemView.view.append(cartItem);
  }
};
