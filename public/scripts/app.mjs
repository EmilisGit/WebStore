import { fetchData } from "./utils.mjs";
import { sessionKeys, sessionManager } from "./sessionManager.mjs";
import navbarView from "../controller/navbarContr.mjs";
import shoppingCartView from "../controller/shoppingCartContr.mjs";
import tableView from "../controller/productControllers/productTableContr.mjs";
import cardView from "../controller/productControllers/productCardsContr.mjs";
import cartItemView from "../controller/cartItemContr.mjs";
import checkoutView from "../controller/checkoutContr.mjs";
import loginView from "../controller/loginContr.mjs";
import User from "../model/userMod.mjs";

//localStorage.clear();
if (JSON.parse(localStorage.getItem("shoppingCart")) == null) {
  localStorage.setItem("shoppingCart", JSON.stringify({ items: [] }));
}
console.log(localStorage.getItem("shoppingCart"));
let shoppingCartInfo = JSON.parse(localStorage.getItem("shoppingCart"));
let userInfo = sessionManager.getItem(sessionKeys.user);
const products = await fetchData("model/products.json");
const mainTag = document.querySelector("main");
history.pushState({ view: "productTable" }, "");

await renderNavbar();
await renderDisplay();

async function renderDisplay() {
  if (userInfo.confirmed != true) {
    User.email = userInfo.email;
    await User.updateUser();
  }
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
      if (User.confirmed === true) {
        await checkoutView.displayView({}, mainTag);
        break;
      } else {
        console.log("userInfo: ", User.email);
        await loginView.displayView({}, mainTag);
      }
      break;
  }
}

async function renderNavbar() {
  navbarView.onToCartEventHandler = navigateToCart;
  navbarView.onToMainPageEventHandler = navigateToMainPage;
  if (userInfo.email != null) {
    await navbarView.displayView(
      userInfo.email,
      document.querySelector("header")
    );
  } else {
    await navbarView.displayView({}, document.querySelector("header"));
  }
}

async function navigateToCart() {
  history.pushState({ view: "shoppingCart" }, "");
  shoppingCartInfo = JSON.parse(localStorage.getItem("shoppingCart"));
  tableView.remove();
  cardView.remove();
  cartItemView.remove();
  await renderDisplay();
}

async function navigateToMainPage() {
  history.pushState({ view: "productTable" }, "");
  shoppingCartView.remove();
  checkoutView.remove();
  loginView.remove();
  await renderDisplay();
}

async function navigateToCheckout() {
  history.pushState({ view: "checkout" }, "");
  tableView.remove();
  await renderDisplay();
}
