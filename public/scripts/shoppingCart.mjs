async function loadItems() {
  const response = await fetch("./products.json");
  const allProducts = await response.json();
  const productTemplate = insertTemplatesFrom("./templates.html");
  const cart = document.querySelector("#cart-list");
  const itemsInCart = JSON.parse(sessionStorage.getItem("cartItems"));
  let temp = allProducts.find((p) => p.id === 1);
  console.log(temp.id);
  for (product of itemsInCart) {
    let fullProduct = allProducts.find((p) => p.id === product.productId);
    console.log(fullProduct);
    // TODO: finish this
    //let item = productTemplate.cloneNode(true);
    //item.classList.includes("product-name")
    // cart.appendChild();
  }
}

async function insertTemplatesFrom(source) {
  const templates = await fetch(source).then((d) => d.text());
  document.body.insertAdjacentHTML("beforeend", templates);
}

loadItems();
