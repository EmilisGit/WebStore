import products from "../../modules/classes/products.mjs";

function generateProductCards() {
  const productContainer = document.getElementById("product-container");

  products.forEach((product) => {
    console.log(product.name);
    const productCard = document.createElement("div");
    productCard.classList.add(
      "rounded-lg",
      "border",
      "bg-card",
      "text-card-foreground",
      "shadow-sm",
      "transform",
      "transition-transform",
      "hover:scale-105"
    );
    productCard.setAttribute("data-state", "closed");
    productCard.setAttribute("data-v0-t", "card");

    productCard.innerHTML = `
        <div class="p-6 flex flex-col items-center gap-4">
            <img src="${product.img}" alt="Product Image" width="200" height="200" class="aspect-square object-cover w-full rounded-lg overflow-hidden" />
            <h3 class="font-semibold">${product.name}</h3>
            <p class="text-gray-500 dark:text-gray-400">${product.description}</p>
        </div>
    `;

    productContainer.appendChild(productCard);
  });
}

generateProductCards();
