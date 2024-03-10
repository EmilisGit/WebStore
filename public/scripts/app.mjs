import { fetchData } from "./utils.mjs";
import navbarView from "../controller/navbarContr.mjs";
import shoppingCartView from "../controller/shoppingCartContr.mjs";
import tableView from "../controller/productControllers/productTableContr.mjs";
import cardView from "../controller/productControllers/productCardsContr.mjs";
import cartItemView from "../controller/cartItemContr.mjs";

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
      await tableView.displayView({}, mainTag);
      await cardView.displayView(products, tableView.getView());
      break;
    case "shoppingCart":
      if (shoppingCartInfo == null) {
        shoppingCartInfo = { items: [] };
      }
      await shoppingCartView.displayView(shoppingCartInfo, mainTag);
      await cartItemView.displayView(
        shoppingCartInfo,
        shoppingCartView.getView()
      );
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
  tableView.remove();
  cardView.remove();
  await renderDisplay();
}

async function navigateToMainPage() {
  history.pushState({ view: "productTable" }, "");
  shoppingCartView.remove();
  await renderDisplay();
}
