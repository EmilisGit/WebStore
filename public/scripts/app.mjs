import { fetchData } from "./utils.mjs";
import { sessionKeys, sessionManager } from "./sessionManager.mjs";
import navbarView from "../controller/navbarContr.mjs";
import shoppingCartView from "../controller/shoppingCartContr.mjs";
import tableView from "../controller/productControllers/productTableContr.mjs";
import cardView from "../controller/productControllers/productCardsContr.mjs";
import cartItemView from "../controller/cartItemContr.mjs";
import checkoutView from "../controller/checkoutContr.mjs";
import loginView from "../controller/loginContr.mjs";

let navbarInfo = sessionManager.getItem(sessionKeys.navbar);
if (sessionManager.getItem(sessionKeys.shoppingCart) == null) {
  sessionManager.setItem(sessionKeys.shoppingCart, { items: [] });
}
let shoppingCartInfo = sessionManager.getItem(sessionKeys.shoppingCart);
let userInfo = JSON.parse(localStorage.getItem("user"));

const products = await fetchData("model/products.json");
const mainTag = document.querySelector("main");
history.pushState({ view: "productTable" }, "");

await renderNavbar();
await renderDisplay();

async function renderDisplay() {
  let currentView = history.state.view;
  console.log("currentView: ", currentView);
  shoppingCartView.onToMainPageEventHandler = navigateToMainPage;
  shoppingCartView.onToCheckoutEventHandler = navigateToCheckout;

  switch (currentView) {
    case "productTable":
      await tableView.displayView({}, mainTag);
      await cardView.displayView(products, tableView.getView());
      break;
    case "shoppingCart":
      await shoppingCartView.displayView(shoppingCartInfo.items, mainTag);
      await cartItemView.displayView(
        shoppingCartInfo.items,
        shoppingCartView.getView()
      );
      break;
    case "checkout":
      if (userInfo != null) {
        await checkoutView.displayView({}, mainTag);
        break;
      } else {
        console.log("userInfo: ", userInfo);
        await loginView.displayView({}, mainTag);
      }
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
  shoppingCartInfo = sessionManager.getItem(sessionKeys.shoppingCart);
  tableView.remove();
  cardView.remove();
  cartItemView.remove();
  await renderDisplay();
}

async function navigateToMainPage() {
  history.pushState({ view: "productTable" }, "");
  shoppingCartView.remove();
  await renderDisplay();
}

async function navigateToCheckout() {
  history.pushState({ view: "checkout" }, "");
  await renderDisplay();
}
