function toggleCompanyDetails() {
  const checkboxState = document.getElementById("company");
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
