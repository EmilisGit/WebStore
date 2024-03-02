async function generateProductCards() {
  try {
    await insertTemplatesFrom("./templates.html");
    const data = await fetch("./products.json");
    const products = await data.json();

    const productContainer = document.getElementById("product-table");
    const productCardTemplate = document.querySelector("#card-template");
    const dialogTemplate = document.querySelector("#dialog-template");

    for (const product of products) {
      // Add product info to the product card
      const productCard = productCardTemplate.content.cloneNode(true);
      productCard.querySelector("#product-image").src = product.img;
      productCard.querySelector("#product-name").textContent = product.name;
      productCard.querySelector("#price").textContent = "$" + product.price;

      // Add dialog to the product card
      const dialog = dialogTemplate.content.cloneNode(true);
      dialog.querySelector("#product-image").src = product.img;
      dialog.querySelector("#product-name").textContent = product.name;
      dialog.querySelector("#product-description").textContent =
        product.description;

      productCard.appendChild(dialog);
      addCardEventListener(productCard);
      productContainer.appendChild(productCard);
    }
  } catch (error) {
    console.error(error);
  }
}

function addCardEventListener(productCard) {
  productCard.addEventListener("DOMContentLoaded", "click", () => {
    if (productCard.getAttribute("data-state") === "closed") {
      productCard.setAttribute("data-state", "open");
      productCard.querySelector("dialog").showModal();
    } else {
      productCard.setAttribute("data-state", "closed");
      productCard.querySelector("dialog").close();
    }
  });
}

async function insertTemplatesFrom(source) {
  const templates = await fetch(source).then((d) => d.text());
  document.body.insertAdjacentHTML("beforeend", templates);
}

generateProductCards();
