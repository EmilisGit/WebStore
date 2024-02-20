function postUser() {
  const submitUserButton = document.getElementById("SubmitUser");
  const checkboxState = document.getElementById("company");
  submitUserButton.onclick = async function (e) {
    const email = document.getElementById("email").value;
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
    const user = {
      email,
      companyName,
      companyCode,
      companyTaxCode,
      country,
      address,
      zipCode,
    };
    const response = await postTo("/user", user);
  };
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
