import { insertTemplates, cloneTemplate } from "../scripts/utils.mjs";

class baseContr {
  constructor() {
    this.elementView = {};
    this.templateSource = "";
    this.templateId = "";
    this.viewId = "";
    this.template = null;
    this.view = null;
    this.currentModel = null;
    this.container = null;
  }

  async displayView(model, container) {
    await this.onBeforeDisplay(model, container);

    if (this.view == null) {
      this.onSetup(model, target);
    } else {
      this.onReload(model, target);
    }
  }

  async onBeforeDisplay(model, target) {
    if (this.currentModel == null) {
      this.currentModel = model;
    }
    if (this.template == null) {
      await insertTemplates(this.templateSource, target);
      this.template = document.getElementById(this.templateId);
    }
  }

  remove() {
    const item = this.container.querySelector("#" + this.viewId);
    if (item != null) {
      item.remove();
    }
    this.view = null;
  }

  onReload(model, target) {
    this.view.innerHTML = "";
    this.view = cloneTemplate(this.template);
    target.append(this.view);
  }

  onSetup() {
    console.log("onSetup not implemented in derived class.");
  }
}

export default baseContr;
