/* =========================
   CHERYL'S CLOSET
   CART SYSTEM
========================= */

let cart = JSON.parse(localStorage.getItem("cherylsCart")) || [];


/* SAVE CART */

function saveCart() {
  localStorage.setItem("cherylsCart", JSON.stringify(cart));
}


/* UPDATE CART */

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartSummary = document.getElementById("cart-summary");
  const emptyCart = document.querySelector(".empty-cart");

  if (!cartItems || !cartSummary || !emptyCart) {
    return;
  }

  if (cart.length === 0) {

    emptyCart.style.display = "block";
    cartItems.style.display = "none";
    cartSummary.style.display = "none";

    return;
  }


  emptyCart.style.display = "none";
  cartItems.style.display = "block";
  cartSummary.style.display = "block";


  cartItems.innerHTML = "";


  let subtotal = 0;


  cart.forEach((item, index) => {

    const itemTotal = item.price * item.quantity;

    subtotal += itemTotal;


    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";


    cartItem.innerHTML = `
      <div class="cart-item-image">
        ${item.image}
      </div>

      <div class="cart-item-info">

        <p>${item.category}</p>

        <h3>${item.name}</h3>

        <span>₦${item.price.toLocaleString()}</span>

        <small>
          ${item.color ? "Colour: " + item.color : ""}
          ${item.size ? " | Size: " + item.size : ""}
        </small>

        <div class="cart-quantity">

          <button onclick="changeQuantity(${index}, -1)">
            −
          </button>

          <span>${item.quantity}</span>

          <button onclick="changeQuantity(${index}, 1)">
            +
          </button>

        </div>

        <button
          class="remove-cart"
          onclick="removeFromCart(${index})"
        >
          REMOVE
        </button>

      </div>
    `;


    cartItems.appendChild(cartItem);

  });


  const subtotalElement =
    cartSummary.querySelector(".summary-row strong");

  const totalElement =
    cartSummary.querySelector(".summary-total strong");


  if (subtotalElement) {
    subtotalElement.textContent =
      "₦" + subtotal.toLocaleString();
  }


  if (totalElement) {
    totalElement.textContent =
      "₦" + subtotal.toLocaleString();
  }

}


/* CHANGE QUANTITY */

function changeQuantity(index, amount) {

  cart[index].quantity += amount;


  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }


  saveCart();

  updateCart();

}


/* REMOVE ITEM */

function removeFromCart(index) {

  cart.splice(index, 1);

  saveCart();

  updateCart();

}


/* LOAD CART */

document.addEventListener("DOMContentLoaded", function () {

  updateCart();

});

/* =========================
   PRODUCT DATA
========================= */

const products = {

  "mini-dress": {
    name: "Mini Dress",
    category: "DRESSES",
    price: 13200,
    image: "👗",
    description:
      "Solid colour mini dress with a stand collar and shawl design.",
    colors: ["Black"],
    sizes: ["S", "M", "XL"]
  },

  "long-dress": {
    name: "Long Dress",
    category: "DRESSES",
    price: 17400,
    image: "👗",
    description:
      "Elegant asymmetric high-slit mermaid dress with a slim waist and micro fishtail train.",
    colors: ["Black"],
    sizes: ["S", "M", "XL"]
  },

  "bodycon-dress": {
    name: "Bodycon Dress",
    category: "DRESSES",
    price: 16800,
    image: "👗",
    description:
      "Backless bodycon mermaid dress with a sleeveless design.",
    colors: ["Black", "Red"],
    sizes: ["S", "M", "XL"]
  },

  "sweat-shirt": {
    name: "Sweat Shirt",
    category: "TOPS",
    price: 15700,
    image: "👚",
    description:
      "One-shoulder long-sleeve top for an effortless everyday look.",
    colors: ["Black"],
    sizes: ["S", "M", "XL"]
  },

  "slim-fit-shirt": {
    name: "Slim Fit Shirt",
    category: "TOPS",
    price: 9500,
    image: "👚",
    description:
      "Slim-fit casual crew-neck flared long-sleeve pleated shirt.",
    colors: ["Black"],
    sizes: ["S", "M", "L"]
  },

  "pant-trousers": {
    name: "Pant Trousers",
    category: "BOTTOMS",
    price: 12000,
    image: "👖",
    description:
      "A versatile pair of trousers designed to complete your everyday looks.",
    colors: ["Black"],
    sizes: ["M", "XL", "XXL"]
  },

  "long-sleeve-top-skirt": {
    name: "Long Sleeve Top with Skirt",
    category: "TWO-PIECE SETS",
    price: 20400,
    image: "🎀",
    description:
      "Casual off-the-shoulder short top with long sleeves and a slimming high mermaid skirt.",
    colors: ["Black"],
    sizes: ["S", "M", "XL"]
  },

  "hoodie-tank-trousers": {
    name: "Hoodie, Tank Top & Trousers",
    category: "GOING-OUT",
    price: 23100,
    image: "✨",
    description:
      "Three-piece set featuring a hooded sweatshirt, tank top and casual trousers.",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"]
  },

  "hooded-sweatshirt-set": {
    name: "Hooded Sweatshirt Set",
    category: "GOING-OUT",
    price: 27600,
    image: "✨",
    description:
      "Three-piece set featuring a hooded sweatshirt, suspender vest and long trousers.",
    colors: ["Purple", "Grey", "Pink", "Black"],
    sizes: ["S", "M", "XL"]
  },

  "blue-light-glasses": {
    name: "Blue Light Glasses",
    category: "ACCESSORIES",
    price: 5700,
    image: "👓",
    description:
      "Anti-electronic blue light decorative glasses.",
    colors: ["Golden Black", "Golden Pink"],
    sizes: []
  },

  "classic-oval-glasses": {
    name: "Classic Oval Glasses",
    category: "ACCESSORIES",
    price: 3800,
    image: "👓",
    description:
      "Classic oval-like shape glasses.",
    colors: ["Black"],
    sizes: []
  },

  "square-frame-glasses": {
    name: "Square Frame Glasses",
    category: "ACCESSORIES",
    price: 4300,
    image: "👓",
    description:
      "Square-shaped paper-box-like glasses.",
    colors: ["Black"],
    sizes: []
  }

};


/* =========================
   LOAD PRODUCT
========================= */

function loadProduct() {

  const productPage = document.querySelector(".product-detail");

  if (!productPage) {
    return;
  }


  const params = new URLSearchParams(window.location.search);

  const productId = params.get("product");


  if (!productId || !products[productId]) {
    return;
  }


  const product = products[productId];


  const image = document.querySelector(".product-detail-image div");
  const category = document.querySelector(".product-category");
  const name = document.querySelector(".product-detail-info h1");
  const price = document.querySelector(".product-detail-price");
  const description = document.querySelector(".product-description");


  if (image) {
    image.textContent = product.image;
  }

  if (category) {
    category.textContent = product.category;
  }

  if (name) {
    name.textContent = product.name;
  }

  if (price) {
    price.textContent = "₦" + product.price.toLocaleString();
  }

  if (description) {
    description.textContent = product.description;
  }


  /* COLOURS */

  const colourOption =
    document.querySelector(".product-option");

  if (colourOption && product.colors.length > 0) {

    const colourButtons =
      colourOption.querySelectorAll(".option-btn");

    colourButtons.forEach(button => button.remove());


    product.colors.forEach((color, index) => {

      const button =
        document.createElement("button");

      button.type = "button";
      button.className =
        "option-btn" +
        (index === 0 ? " selected" : "");

      button.textContent = color;

      colourOption.appendChild(button);

    });

  }


  /* SIZES */

  const sizeOptions =
    document.querySelector(".size-options");

  if (sizeOptions) {

    sizeOptions.innerHTML = "";

    product.sizes.forEach((size, index) => {

      const button =
        document.createElement("button");

      button.type = "button";
      button.className =
        "option-btn" +
        (index === 0 ? " selected" : "");

      button.textContent = size;

      sizeOptions.appendChild(button);

    });

  }

}


/* LOAD PRODUCT WHEN PAGE OPENS */

document.addEventListener("DOMContentLoaded", function () {

  loadProduct();

});
