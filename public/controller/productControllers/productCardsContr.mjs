import { insertTemplates, cloneTemplate } from "../../scripts/utils.mjs";

const productCardView = {};
const templateSource = "views/productCard.html";
const templateID = "card-template";
const viewID = "product-card";
let template = null;
let container = null;
let view = null;
let currentModel = null;

productCardView.displayView = async function (model, target) {
  container = target;
  await onBeforeDisplay(model, target);
  if (view == null) {
    onSetup(model, target);
  } else {
    onReload(model, target);
  }
  currentModel = model;
};

productCardView.remove = () => {
  const items = container.querySelector("." + viewID);
  if (items != null) {
    items.remove();
  }
  view = null;
};

async function onBeforeDisplay(model, target) {
  if (currentModel == null) {
    currentModel = model;
  }
  if (template == null) {
    await insertTemplates(templateSource, target);
    template = document.getElementById("card-template");
  } else {
    if (!container.querySelector("#" + templateID)) {
      container.appendChild(template);
    }
  }
}

async function onSetup(model, target) {
  try {
    for (const product of model) {
      view = cloneTemplate(template);

      let productCard = view.querySelector(".product-card");
      productCard.querySelector("img").src = product.img;
      productCard.querySelector("h3").innerHTML = product.name;
      productCard.querySelector(".price").innerHTML = "$" + product.price;
      productCard.setAttribute("data-state", "closed");

      const dialog = view.querySelector(".card-dialog");
      dialog.querySelector("img").src = product.img;
      dialog.querySelector("p").innerHTML = product.description;
      dialog.querySelector("h3").innerHTML = product.name;

      productCard.addEventListener("click", () => {
        if (productCard.getAttribute("data-state") === "closed") {
          productCard.setAttribute("data-state", "open");
          dialog.showModal();
        } else {
          productCard.setAttribute("data-state", "closed");
          dialog.close();
        }
      });
      target.append(view);
    }
  } catch (error) {
    console.error(error);
  }
}

function onReload(target) {}

export default productCardView;
