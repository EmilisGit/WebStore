import baseView from "./baseView.mjs";
import { cloneTemplate } from "../scripts/utils.mjs";

const offlineView = new baseView();
offlineView.templateSource = "views/offline.html";
offlineView.templateID = "offline-template";
offlineView.viewID = "offline";

offlineView.onSetup = async function (model, target) {
  offlineView.view = await cloneTemplate(offlineView.template);
  target.append(offlineView.view);

  target.querySelector("#go-back-btn").addEventListener("click", function () {
    window.location.href = "/";
  });
};

export default offlineView;
