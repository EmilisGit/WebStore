import baseView from "./baseView.mjs";
import { cloneTemplate, postTo } from "../scripts/utils.mjs";
import User from "../model/userMod.mjs";

const loginView = new baseView();
loginView.templateSource = "views/login.html";
loginView.templateID = "login-template";
loginView.viewID = "login";

loginView.onSetup = async function (model, target) {
  loginView.view = await cloneTemplate(loginView.template);
  target.append(loginView.view);
  const submitButton = target.querySelector("#submit-user");
  submitButton.addEventListener("click", async function (event) {
    event.preventDefault();
    await onLoginClicked(target);
  });
  target.querySelector(".buttons").style.display = "none";
};

async function onLoginClicked(target) {
  const userEmail = target.querySelector("#user-email").value;
  await postTo("/user/login", { email: userEmail });
  await User.updateUser();
}

export default loginView;
