async function generateProductCards() {
  try {
    const products = await fetchData("./products.json");
    const productContainer = document.getElementById("product-table");
    products.forEach((product) => {
      const productCard = createProductCard(product);
      expandProductCard(productCard, product);
      productContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error(error);
  }
}

function createProductCard({ img, name, description }) {
  const productCard = document.createElement("div");
  productCard.id = "product";
  productCard.classList.add(
    "product-card",
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
        <img src="${img}" alt="Product Image" width="200" height="200" class="aspect-square object-cover w-full rounded-lg overflow-hidden" />
        <h3 class="font-semibold">${name}</h3>
        <p class="text-gray-500 dark:text-gray-400">${description}</p>
    </div>
  `;
  return productCard;
}

function createDialog({ img, name, description, id }) {
  const dialog = document.createElement("dialog");
  dialog.innerHTML = `<img src="${img}" alt="Product Image" width="400" height="300" class="aspect-square object-cover w-full rounded-lg overflow-hidden" />
<h3 class="font-semibold">${name}</h3>
<p>
  ${description}
</p>
<button data-product-id="${id}">Buy Now</button>
`;
  dialog.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      addToCart(event.target.getAttribute("data-product-id"));
    }
  });
  return dialog;
}

async function fetchData(path) {
  try {
    const objects = await fetch(path);
    return await objects.json();
  } catch (error) {
    console.error(error);
  }
}

function expandProductCard(productCard, product) {
  productCard.addEventListener("click", () => {
    if (productCard.getAttribute("data-state") === "closed") {
      productCard.setAttribute("data-state", "open");
      const dialog = createDialog(product);
      productCard.appendChild(dialog);
      dialog.showModal();
    } else {
      productCard.setAttribute("data-state", "closed");
      productCard.removeChild(productCard.lastChild);
    }
  });
}

async function addToCart(productId) {
  try {
    const response = await postTo("/cart", { productId });
    const cartItems = await response.json();
    // TODO: Update cart items in UI
    console.log(response);
  } catch (error) {
    console.error(error);
  }
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

generateProductCards();
