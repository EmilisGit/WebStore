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

function createDialog({ img, name }) {
  const dialog = document.createElement("dialog");
  dialog.innerHTML = `<img src="${img}" alt="Product Image" width="400" height="300" class="aspect-square object-cover w-full rounded-lg overflow-hidden" />
<h3 class="font-semibold">${name}</h3>
<p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
 Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
 natoque penatibus et magnis dis parturient montes, nascetur
 ridiculus mus. Donec quam felis, ultricies nec,
 pellentesque eu, pretium quis, sem. Nulla consequat 
 massa quis enim. Donec pede justo, fringilla vel, aliquet
 nec, vulputate eget, arcu. In enim justo, rhoncus ut, 
 imperdiet a, venenatis vitae, justo.
</p>
<button>Buy Now</button>
`;
  return dialog;
}

async function generateProductCards() {
  try {
    const response = await fetch("./products.json");
    const products = await response.json();
    console.log(products);
    const productContainer = document.getElementById("product-table");

    products.forEach((product) => {
      const productCard = createProductCard(product);
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
      productContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error(error);
  }
}

generateProductCards();
