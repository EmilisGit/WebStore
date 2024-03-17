import { fetchData } from "./utils.mjs";
import navbarView from "../controller/navbarContr.mjs";
import shoppingCartView from "../controller/shoppingCartContr.mjs";
import tableView from "../controller/productControllers/productTableContr.mjs";
import cardView from "../controller/productControllers/productCardsContr.mjs";
import cartItemView from "../controller/cartItemContr.mjs";
import checkoutView from "../controller/checkoutContr.mjs";
import loginView from "../controller/loginContr.mjs";
import offlineView from "../controller/offlineView.mjs";
import User from "../model/userMod.mjs";
let online = true;

if (JSON.parse(localStorage.getItem("shoppingCart")) == null) {
  localStorage.setItem("shoppingCart", JSON.stringify({ items: [] }));
}
let shoppingCartInfo = JSON.parse(localStorage.getItem("shoppingCart"));
await User.updateUser();
const products = await fetchData("model/products.json");
const mainTag = document.querySelector("main");
history.pushState({ view: "productTable" }, "");

await renderDisplay();

async function renderDisplay() {
  await renderNavbar();
  let currentView = history.state.view;
  console.log("currentView: ", currentView);
  shoppingCartView.onToMainPageEventHandler = navigateToMainPage;
  shoppingCartView.onToCheckoutEventHandler = navigateToCheckout;
  loginView.confirmedUserEventHandler = navigateToCheckout;

  if (currentView == "productTable") {
    await tableView.displayView({}, mainTag);
    await cardView.displayView(products, tableView.getView());
  } else if (currentView == "shoppingCart") {
    await shoppingCartView.displayView(shoppingCartInfo.items, mainTag);
    await cartItemView.displayView(
      shoppingCartInfo.items,
      shoppingCartView.getView()
    );
  } else if (currentView == "checkout") {
    if (!online) {
      await renderOffline({}, mainTag);
      return;
    }
    await User.updateUser();
    let userInfo = await User.getUser();
    if (userInfo.confirmed !== true) {
      await loginView.displayView({}, mainTag);
    } else {
      await checkoutView.displayView({}, mainTag);
    }
  }
}

async function renderNavbar() {
  navbarView.onToCartEventHandler = navigateToCart;
  navbarView.onToMainPageEventHandler = navigateToMainPage;
  const userInfo = await User.getUser();
  console.log("userInfo", userInfo);
  if (userInfo.confirmed === true) {
    await navbarView.displayView(
      await User.getEmail(),
      document.querySelector("header")
    );
  } else {
    await navbarView.displayView("", document.querySelector("header"));
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
  loginView.remove();
  navbarView.remove();
  await renderDisplay();
}

async function renderOffline(model, target) {
  navbarView.remove();
  shoppingCartView.remove();
  cartItemView.remove();
  await offlineView.displayView(model, target);
}

window.addEventListener("offline", () => {
  online = false;
});
window.addEventListener("online", () => {
  online = true;
});
