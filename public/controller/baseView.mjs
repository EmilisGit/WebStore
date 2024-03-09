import { insertTemplates, cloneTemplate } from "../scripts/utils.mjs";
class baseView {
  constructor() {
    this.templateSource = "";
    this.templateID = "";
    this.viewID = "";
    this.template = null;
    this.view = null;
    this.currentModel = null;
    this.container = null;
  }

  async displayView(model, target) {
    this.container = target;
    await this.onBeforeDisplay(model, target);
    if (this.view == null) {
      this.onSetup(model, target);
    } else {
      this.onReload(model, target);
    }
    this.currentModel = model;
  }

  async onBeforeDisplay(model, target) {
    if (this.currentModel == null) {
      this.currentModel = model;
    }
    if (this.template == null) {
      await insertTemplates(this.templateSource, target);
      this.template = document.getElementById(this.templateID);
    }
  }

  onSetup(model, target) {
    this.view = cloneTemplate(this.template);
    target.append(this.view);
  }

  onReload(model, target) {}

  remove() {
    const item = document.querySelector("#" + this.viewID);
    if (item != null) {
      item.remove();
    }
    this.view = null;
  }
}

export default baseView;
