function createOrderObject() {
  let productIds = [];
  let subscriptionMonths = 3;
  let cost = 50;
  let company_id = null;

  const order = {
    productIds,
    subscriptionMonths,
    cost,
    company_id,
  };
  return order;
}

function createCompanyObject() {
  const checkboxState = document.getElementById("company");
  let companyName = null;
  let companyCode = null;
  let companyTaxCode = null;
  let country = null;
  let address = null;
  let zipCode = null;

  if (checkboxState.getAttribute("data-state") === "checked") {
    companyName = document.getElementById("company-name").value;
    companyCode = document.getElementById("company-code").value;
    companyTaxCode = document.getElementById("company-tax-code").value;
    country = document.getElementById("country").value;
    address = document.getElementById("address").value;
    zipCode = document.getElementById("zip-code").value;
  }

  const company = {
    companyName,
    companyCode,
    companyTaxCode,
    country,
    address,
    zipCode,
  };
  return company;
}

async function postOrder() {
  const order = createOrderObject();
  const company = createCompanyObject();
  const response = await postTo("/checkout", { order, company });
}

async function postTo(url, data) {
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, header);
  return response;
}
