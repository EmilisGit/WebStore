import navbarView from "../controller/navbarContr.mjs";
import shoppingCartView from "../controller/shoppingCartContr.mjs";
import productTableView from "../controller/productControllers/productTableContr.mjs";
import products from "../model/products.mjs";

let navbarInfo = JSON.parse(sessionStorage.getItem("navbarInfo"));
let shoppingCartInfo = JSON.parse(sessionStorage.getItem("shoppingCartItems"));

const mainTag = document.querySelector("main");
history.pushState({ view: "productTable" }, "");

await renderNavbar();
await renderDisplay();

async function renderDisplay() {
  let currentView = history.state.view;
  console.log("currentView: ", currentView);
  shoppingCartView.onToMainPageEventHandler = navigateToMainPage;
  switch (currentView) {
    case "productTable":
      await productTableView.displayView({}, mainTag);
      break;
    case "shoppingCart":
      if (shoppingCartInfo == null) {
        shoppingCartInfo = { items: [] };
      }
      await shoppingCartView.displayView(shoppingCartInfo, mainTag);
      break;
  }
}

async function renderNavbar() {
  navbarView.onToCartEventHandler = navigateToCart;
  navbarView.onToMainPageEventHandler = navigateToMainPage;

  // Display navbar
  if (navbarInfo != null) {
    await navbarView.displayView(navbarInfo, document.querySelector("header"));
  } else {
    await navbarView.displayView({}, document.querySelector("header"));
  }
}

async function navigateToCart() {
  history.pushState({ view: "shoppingCart" }, "");
  if (shoppingCartInfo == null) {
    shoppingCartInfo = { items: [] };
  }
  productTableView.remove();
  await renderDisplay();
}

async function navigateToMainPage() {
  history.pushState({ view: "productTable" }, "");
  shoppingCartView.remove();
  await renderDisplay();
}
