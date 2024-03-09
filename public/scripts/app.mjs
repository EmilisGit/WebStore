import { fetchData } from "./utils.mjs";
import navbarView from "../controller/navbarContr.mjs";
import shoppingCartView from "../controller/shoppingCartContr.mjs";
import productTableView from "../controller/productControllers/productTableContr.mjs";
import productCardView from "../controller/productControllers/productCardsContr.mjs";

let navbarInfo = JSON.parse(sessionStorage.getItem("navbarInfo"));
let shoppingCartInfo = JSON.parse(sessionStorage.getItem("shoppingCartItems"));
const products = await fetchData("model/products.json");

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
      await productCardView.displayView(products, productTableView.getView());
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
  productCardView.remove();
  await renderDisplay();
}

async function navigateToMainPage() {
  history.pushState({ view: "productTable" }, "");
  shoppingCartView.remove();
  await renderDisplay();
}
