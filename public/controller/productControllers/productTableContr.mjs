import { cloneTemplate } from "../../scripts/utils.mjs";
import baseView from "../baseView.mjs";

const tableView = new baseView();
tableView.templateSource = "views/productTable.html";
tableView.templateID = "product-table-template";
tableView.viewID = "product-table";

tableView.onSetup = async function (model, target) {
  tableView.view = cloneTemplate(tableView.template);
  target.append(tableView.view);
};

export default tableView;
