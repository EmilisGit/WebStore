import { cloneTemplate } from "../../scripts/utils.mjs";
import baseView from "../baseView.mjs";
import { sessionManager, sessionKeys } from "../../scripts/sessionManager.mjs";

const cardView = new baseView();
cardView.templateSource = "views/productCard.html";
cardView.templateID = "card-template";
cardView.viewID = "product-card";

cardView.onSetup = async function (model, target) {
  for (const product of model) {
    cardView.view = cloneTemplate(cardView.template);
    const productCard = createProductCard(product);
    const dialog = createDialog(product);

    productCard.addEventListener("click", () => {
      if (productCard.getAttribute("data-state") === "closed") {
        productCard.setAttribute("data-state", "open");
        dialog.showModal();
      } else {
        productCard.setAttribute("data-state", "closed");
        dialog.close();
      }
    });
    target.append(cardView.view);
  }
};

function createDialog({ id, img, description, name, price }) {
  let dialog = cardView.view.querySelector(".card-dialog");
  dialog.querySelector("img").src = img;
  dialog.querySelector("p").innerHTML = description;
  dialog.querySelector("h3").innerHTML = name;

  dialog.querySelector(".add-to-cart").addEventListener("click", () => {
    let shoppingCartInfo = sessionManager.getItem(sessionKeys.shoppingCart);
    let cartItems = shoppingCartInfo.items || [];

    if (!cartItems.some((item) => item.id === id)) {
      cartItems.push({ img, name, id, price });
    }

    shoppingCartInfo.items = cartItems;
    sessionManager.setItem(sessionKeys.shoppingCart, shoppingCartInfo);
  });
  return dialog;
}

function createProductCard({ img, name, price }) {
  let productCard = cardView.view.querySelector(".product-card");
  productCard.querySelector("img").src = img;
  productCard.querySelector("h3").innerHTML = name;
  productCard.querySelector(".price").innerHTML = "$" + price;
  productCard.setAttribute("data-state", "closed");
  return productCard;
}

cardView.remove = function remove() {
  const items = cardView.container.querySelector("." + cardView.viewID);
  if (items != null) {
    items.remove();
  }
  cardView.view = null;
};

export default cardView;
