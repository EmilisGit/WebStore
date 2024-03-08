import { insertTemplates, cloneTemplate } from "../scripts/utils.mjs";
import shoppingCartMod from "../model/shoppingCartMod.mjs";

const shoppingCartView = {};
const templateSource = "views/shoppingCart.html";
const templateID = "shopping-cart-template";
const viewID = "shopping-cart";
let template = null;
let view = null;
let currentModel = null;
let container = null;
shoppingCartView.onToMainPageEventHandler = null;

shoppingCartView.displayView = async function (model, target) {
  container = target;
  await onBeforeDisplay(model, target);

  if (view == null) {
    onSetup(model, target);
  } else {
    onReload(model, target);
  }
  currentModel = model;
};

shoppingCartView.remove = () => {
  const item = container.querySelector("#" + viewID);
  if (item != null) {
    item.remove();
  }
  view = null;
};

async function onBeforeDisplay(model, target) {
  if (currentModel == null) {
    currentModel = model;
  }

  if (template == null) {
    await insertTemplates(templateSource, target);
    template = document.getElementById(templateID);
  } else {
    if (!container.querySelector("#" + templateID)) {
      container.appendChild(template);
    }
  }
}

function onSetup(model, target) {
  view = cloneTemplate(template);
  target.append(view);

  const keepShoppingButton = target.querySelector("#keep-shopping-btn");
  keepShoppingButton.addEventListener("click", onKeepShoppingClicked);
}

function onKeepShoppingClicked(event) {
  console.log("Keep shopping clicked");
  if (shoppingCartView.onToMainPageEventHandler != null) {
    shoppingCartView.onToMainPageEventHandler();
  }
}

function onReload(model, target) {
  // The view is visible, but there has been a reload event...
}

export default shoppingCartView;
