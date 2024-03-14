import { cloneTemplate } from "../scripts/utils.mjs";
import baseView from "./baseView.mjs";

const navbarView = new baseView();
navbarView.templateSource = "views/navbar.html";
navbarView.templateID = "nav-bar-template";
navbarView.viewID = "nav-bar";

navbarView.onToCartEventHandler = null;
navbarView.onToMainPageEventHandler = null;

navbarView.onSetup = async function (model, target) {
  navbarView.view = cloneTemplate(navbarView.template);
  target.append(navbarView.view);
  target.querySelector("#nav-bar-email").innerHTML ? model : " ";
  target.querySelector("#cart-button").addEventListener("click", onCartClicked);
  target
    .querySelector("#to-front-page")
    .addEventListener("click", onFrontPageClicked);
};

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

export default navbarView;
