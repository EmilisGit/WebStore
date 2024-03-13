import baseView from "./baseView.mjs";
import { sessionManager, sessionKeys } from "../scripts/sessionManager.mjs";
import { cloneTemplate, postTo } from "../scripts/utils.mjs";

const loginView = new baseView();
loginView.templateSource = "views/login.html";
loginView.templateID = "login-template";
loginView.viewID = "login";

loginView.onSetup = async function (model, target) {
  loginView.view = await cloneTemplate(loginView.template);
  target.append(loginView.view);
  target
    .querySelector("#submit-user")
    .addEventListener("click", onLoginClicked.bind(this, target));
  target.querySelector(".buttons").style.display = "none";
};

async function onLoginClicked(target) {
  const userEmail = target.querySelector("#user-email").value;
  const response = await postTo("/user/login", { email: userEmail });
  console.log("status " + response.status);
  console.log("message " + response.statusText);
}

export default loginView;
