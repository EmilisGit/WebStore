import {
  insertTemplates,
  cloneTemplate,
  fetchData,
} from "../../scripts/utils.mjs";

const productTableView = {};
const templateSource = "views/productTable.html";
const templateID = "product-table-template";
const viewID = "product-table";
let template = null;
let view = null;
let currentModel = null;
let container = null;

productTableView.displayView = async function (model, target) {
  container = target;
  await onBeforeDisplay(model, target);

  if (view == null) {
    onSetup(model, target);
  } else {
    onReload(model, target);
  }
  currentModel = model;
};

productTableView.remove = () => {
  const item = container.querySelector("#" + viewID);
  if (item != null) {
    item.remove();
  }
  view = null;
};

async function onBeforeDisplay(model, target) {
  if (currentModel == null) {
    currentModel = model;
  }

  if (template == null) {
    await insertTemplates(templateSource, target);
    template = document.getElementById(templateID);
  }
}

async function onSetup(model, target) {
  view = cloneTemplate(template);
  target.append(view);
}

function onReload(model, target) {
  // The view is visible, but there has been a reload event...
}

export default productTableView;
