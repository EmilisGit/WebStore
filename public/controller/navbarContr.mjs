import { insertTemplates, cloneTemplate } from "../scripts/utils.mjs";

const navbarView = {};
const templateSource = "views/navbar.html";
const templateID = "nav-bar-template";
const viewID = "nav-bar";
let template = null;
let view = null;
let currentModel = null;
let container = null;

navbarView.onToCartEventHandler = null;
navbarView.onToMainPageEventHandler = null;

navbarView.displayView = async function (model, target) {
  container = target;
  await onBeforeDisplay(model, target);

  if (view == null) {
    onSetup(model, target);
  } else {
    onReload(model, target);
  }
  currentModel = model;
};

navbarView.remove = () => {
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
  }
}

function onSetup(model, target) {
  view = cloneTemplate(template);
  target.append(view);
  target.querySelector("#nav-bar-email").innerHTML = model.email;
  target.querySelector("#cart-button").addEventListener("click", onCartClicked);
  target
    .querySelector("#to-front-page")
    .addEventListener("click", onFrontPageClicked);
}

function onCartClicked(event) {
  if (navbarView.onToCartEventHandler != null) {
    navbarView.onToCartEventHandler();
  }
}

function onFrontPageClicked(event) {
  if (navbarView.onToMainPageEventHandler != null) {
    navbarView.onToMainPageEventHandler();
  }
}

function onReload(model, target) {
  // The view is visible, but there has been a reload event...
}

export default navbarView;
