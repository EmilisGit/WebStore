import { cloneTemplate } from "../scripts/utils.mjs";
import baseView from "./baseView.mjs";

const cartItemView = new baseView();
cartItemView.templateSource = "views/cartItem.html";
cartItemView.templateID = "cart-item-template";
cartItemView.viewID = "cart-item";

cartItemView.onSetup = async function (model, target) {
  cartItemView.view = await cloneTemplate(cartItemView.template);
  console.log(cartItemView.view);
  for (const item of model.items) {
    let cartItem = createCartItem(item);
    target.querySelector("#cart-list").append(cartItem);
  }
};

function createCartItem({ img, name, price }) {
  let cartItem = cartItemView.view.querySelector(".cart-item");
  cartItem.querySelector("img").src = img;
  cartItem.querySelector("h3").innerHTML = name;
  cartItem.querySelector(".price").innerHTML = "$" + price;
  return cartItem;
}

cartItemView.remove = function () {
  const item = document.querySelector("." + this.viewID);
  if (item != null) {
    item.remove();
  }
  this.view = null;
};

export default cartItemView;
