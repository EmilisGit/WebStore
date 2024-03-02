// Script connected to checkbox in checkout.html
// Shows/hides company detail inputs if the user is purchasing on behalf of a company
function toggleCompanyDetails() {
  const checkboxState = document.getElementById("companyCheckbox");
  const companyDetails = document.getElementById("company-info");

  if (checkboxState.getAttribute("data-state") === "unchecked") {
    companyDetails.style.display = "block";
    checkboxState.setAttribute("data-state", "checked");
    checkboxState.setAttribute("aria-checked", "true");
  } else {
    companyDetails.style.display = "none";
    checkboxState.setAttribute("data-state", "unchecked");
    checkboxState.setAttribute("aria-checked", "false");
  }
}
