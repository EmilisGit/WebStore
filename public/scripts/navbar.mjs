async function navbarController() {
  await insertTemplatesFrom("./templates.html");
  const navbarTemplate = document.querySelector("#nav-bar");
  const navbarParent = document.querySelector("#nav-barParent");
  const navbar = navbarTemplate.content.cloneNode(true);
  navbarParent.appendChild(navbar);
  openCart(navbarParent);
}

async function insertTemplatesFrom(source) {
  const templates = await fetch(source).then((d) => d.text());
  document.body.insertAdjacentHTML("beforeend", templates);
}

function openCart(navbar) {
  const cart = navbar.querySelector("#cartButton");
  cart.addEventListener("click", () => {
    window.location.href = "/cart";
  });
}

navbarController();
