import { insertTemplates, cloneTemplate } from "../scripts/utils.mjs";
import baseContr from "./baseContr.mjs";

class checkoutView extends baseContr {
  constructor() {
    super();
    this.elementView = {};
    this.templateSource = "views/checkout.html";
    this.templateId = "checkout-template";
    this.viewId = "checkout";
  }

  onSetup(model, target) {
    this.view = cloneTemplate(this.template);
    target.append(this.view);
  }
}
