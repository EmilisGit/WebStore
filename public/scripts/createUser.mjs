function createUser() {
  const submitUserButton = document.getElementById("SubmitUser");
  const checkboxState = document.getElementById("company");
  submitUserButton.onclick = async function (e) {
    const email = document.getElementById("email").value;
    const companyName = null;
    const companyCode = null;
    const companyTaxCode = null;
    const country = null;
    const address = null;
    const zipCode = null;

    if (checkboxState.getAttribute("data-state") === "checked") {
      const companyName = document.getElementById("company-name").value;
      const companyCode = document.getElementById("company-code").value;
      const companyTaxCode = document.getElementById("company-tax-code").value;
      const country = document.getElementById("country").value;
      const address = document.getElementById("address").value;
      const zipCode = document.getElementById("zip-code").value;
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
