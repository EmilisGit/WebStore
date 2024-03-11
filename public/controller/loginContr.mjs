import baseView from "./baseView.mjs";
import { sessionManager, sessionKeys } from "../scripts/sessionManager.mjs";
import { cloneTemplate } from "../scripts/utils.mjs";

const loginView = new baseView();
loginView.templateSource = "views/login.html";
loginView.templateID = "login-template";
loginView.viewID = "login";

loginView.onSetup = async function (model, target) {
  loginView.view = await cloneTemplate(loginView.template);
  target.append(loginView.view);
  target
    .querySelector("#submit-user")
    .addEventListener("click", onLoginClicked);
};

function onLoginClicked(event) {}
