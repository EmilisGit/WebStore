import { cloneTemplate } from "../scripts/utils.mjs";
import baseView from "./baseView.mjs";
import { sessionManager, sessionKeys } from "../scripts/sessionManager.mjs";

const cartItemView = new baseView();
cartItemView.templateSource = "views/cartItem.html";
cartItemView.templateID = "cart-item-template";
cartItemView.viewID = "cart-item";

cartItemView.onSetup = async function (model, target) {
  let totalSum = 0;
  for (const item of model) {
    cartItemView.view = await cloneTemplate(cartItemView.template);
    let cartItem = createCartItem(item);
    cartItem.querySelector(".remove").addEventListener("click", () => {
      removeItem(item.id);
      cartItemView.remove();
    });
    totalSum += item.price;
    target.querySelector("#cart-list").append(cartItem);
  }
  sessionManager.setItem(sessionKeys.orderPrice, totalSum.toFixed(2));
};

function createCartItem({ id, img, name, price }) {
  let cartItem = cartItemView.view.querySelector(".cart-item");
  cartItem.setAttribute("data-id", id);
  cartItem.querySelector("img").src = img;
  cartItem.querySelector("h3").innerHTML = name;
  cartItem.querySelector(".price").innerHTML = "$" + price;
  return cartItem;
}

function removeItem(id) {
  let cart = sessionManager.getItem(sessionKeys.shoppingCart);
  let totalPrice = sessionManager.getItem(sessionKeys.orderPrice);
  let index = cart.items.findIndex((item) => {
    if (item.id === id) {
      totalPrice -= item.price * 1;
      return true;
    }
  });
  cart.items.splice(index, 1);
  sessionManager.setItem(sessionKeys.shoppingCart, cart);
  document.querySelector("#total-price").innerHTML = totalPrice.toFixed(2);
}

cartItemView.remove = function () {
  const item = document.querySelector("." + this.viewID);
  if (item != null) {
    item.remove();
  }
  this.view = null;
};

export default cartItemView;
