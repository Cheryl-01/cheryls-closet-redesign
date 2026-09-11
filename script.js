/* =========================================
   CHERYL'S CLOSET
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   PRODUCT DATA
========================================= */

const products = {

  "mini-dress": {
    name: "Mini Dress",
    category: "DRESSES",
    price: 13200,
    image:"IMG_20260818_134749.jpg",
    description: "Solid colour mini dress with a stand collar and shawl design.",
    colors: ["Black"],
    sizes: ["S", "M", "XL"]
  },

  "long-dress": {
    name: "Long Dress",
    category: "DRESSES",
    price: 17400,
    image:"IMG_20260818_134813.jpg",
    description: "Elegant asymmetric high-slit mermaid dress with a slim waist and micro fishtail train.",
    colors: ["Black"],
    sizes: ["S", "M", "XL"]
  },

  "bodycon-dress": {
    name: "Bodycon Dress",
    category: "DRESSES",
    price: 16800,
    image: "IMG_20260911_223700.jpg",
    description: "Backless bodycon mermaid dress with a sleeveless design.",
    colors: ["Black", "Red"],
    sizes: ["S", "M", "XL"]
  },

  "sweat-shirt": {
    name: "Sweat Shirt",
    category: "TOPS",
    price: 15700,
    image: "IMG_20260818_133908.jpg",
    description: "One-shoulder long-sleeve top for an effortless everyday look.",
    colors: ["Black"],
    sizes: ["S", "M", "XL"]
  },

  "slim-fit-shirt": {
    name: "Slim Fit Shirt",
    category: "TOPS",
    price: 9500,
    image: "IMG_20260818_134242.jpg",
    description: "Slim-fit casual crew-neck flared long-sleeve pleated shirt.",
    colors: ["Black"],
    sizes: ["S", "M", "L"]
  },

  "pant-trousers": {
    name: "Pant Trousers",
    category: "BOTTOMS",
    price: 12000,
    image: "👖",
    description: "A versatile pair of trousers designed to complete your everyday looks.",
    colors: ["Black"],
    sizes: ["M", "XL", "XXL"]
  },

  "long-sleeve-top-skirt": {
    name: "Long Sleeve Top with Skirt",
    category: "TWO-PIECE SETS",
    price: 20400,
    image: "IMG_20260818_134307.jpg",
    description: "Casual off-the-shoulder short top with long sleeves and a slimming high mermaid skirt.",
    colors: ["Black"],
    sizes: ["S", "M", "XL"]
  },

  "hoodie-tank-trousers": {
    name: "Hoodie, Tank Top & Trousers",
    category: "GOING-OUT",
    price: 23100,
    image: "✨",
    description: "Three-piece set featuring a hooded sweatshirt, tank top and casual trousers.",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"]
  },

  "hooded-sweatshirt-set": {
    name: "Hooded Sweatshirt Set",
    category: "GOING-OUT",
    price: 27600,
    image: "✨",
    description: "Three-piece set featuring a hooded sweatshirt, suspender vest and long trousers.",
    colors: ["Purple", "Grey", "Pink", "Black"],
    sizes: ["S", "M", "XL"]
  },

  "blue-light-glasses": {
    name: "Blue Light Glasses",
    category: "ACCESSORIES",
    price: 5700,
    image: "👓",
    description: "Anti-electronic blue light decorative glasses.",
    colors: ["Golden Black", "Golden Pink"],
    sizes: []
  },

  "classic-oval-glasses": {
    name: "Classic Oval Glasses",
    category: "ACCESSORIES",
    price: 3800,
    image: "👓",
    description: "Classic oval-like shape glasses.",
    colors: ["Black"],
    sizes: []
  },

  "square-frame-glasses": {
    name: "Square Frame Glasses",
    category: "ACCESSORIES",
    price: 4300,
    image: "👓",
    description: "Square-shaped paper-box-like glasses.",
    colors: ["Black"],
    sizes: []
  }

};


/* =========================================
   CART
========================================= */

let cart = [];

try {

  const savedCart = localStorage.getItem("cherylsCart");

  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  if (!Array.isArray(cart)) {
    cart = [];
  }

} catch (error) {

  cart = [];

}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

  try {

    localStorage.setItem(
      "cherylsCart",
      JSON.stringify(cart)
    );

  } catch (error) {

    console.error(
      "Could not save cart:",
      error
    );

  }

}


/* =========================================
   LOAD PRODUCT PAGE
========================================= */

function loadProduct() {

  const productPage =
    document.querySelector(".product-detail");

  if (!productPage) {
    return;
  }


  const params =
    new URLSearchParams(
      window.location.search
    );

  const productId =
    params.get("product");


  if (!productId || !products[productId]) {
    return;
  }


  const product =
    products[productId];


  /* BASIC INFORMATION */

  const image =
    productPage.querySelector(
      ".product-detail-image div"
    );

  const category =
    productPage.querySelector(
      ".product-category"
    );

  const name =
    productPage.querySelector(
      ".product-detail-info h1"
    );

  const price =
    productPage.querySelector(
      ".product-detail-price"
    );

  const description =
    productPage.querySelector(
      ".product-description"
    );


  if (image) {

  if (product.image.includes(".")) {

    image.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.name}"
      >
    `;

  } else {

    image.textContent =
      product.image;

  }

}

  if (category) {
    category.textContent =
      product.category;
  }

  if (name) {
    name.textContent =
      product.name;
  }

  if (price) {
    price.textContent =
      "₦" +
      product.price.toLocaleString();
  }

  if (description) {
    description.textContent =
      product.description;
  }


  /* =========================================
     COLOUR OPTIONS
  ========================================= */

  const optionBlocks =
    productPage.querySelectorAll(
      ".product-option"
    );

  const colourOption =
    optionBlocks[0];


  if (colourOption) {

    const heading =
      colourOption.querySelector("h3");


    colourOption
      .querySelectorAll(".option-btn")
      .forEach(
        button => button.remove()
      );


    product.colors.forEach(
      (color, index) => {

        const button =
          document.createElement(
            "button"
          );

        button.type =
          "button";

        button.className =
          "option-btn" +
          (
            index === 0
              ? " selected"
              : ""
          );

        button.textContent =
          color;


        button.addEventListener(
          "click",
          function () {

            colourOption
              .querySelectorAll(
                ".option-btn"
              )
              .forEach(
                btn =>
                  btn.classList.remove(
                    "selected"
                  )
              );


            button.classList.add(
              "selected"
            );

          }
        );


        if (heading) {

          heading.after(button);

        } else {

          colourOption.appendChild(
            button
          );

        }

      }
    );

  }


  /* =========================================
     SIZE OPTIONS
  ========================================= */

  const sizeOptions =
    productPage.querySelector(
      ".size-options"
    );


  if (sizeOptions) {

    sizeOptions.innerHTML = "";


    product.sizes.forEach(
      (size, index) => {

        const button =
          document.createElement(
            "button"
          );

        button.type =
          "button";

        button.className =
          "option-btn" +
          (
            index === 0
              ? " selected"
              : ""
          );

        button.textContent =
          size;


        button.addEventListener(
          "click",
          function () {

            sizeOptions
              .querySelectorAll(
                ".option-btn"
              )
              .forEach(
                btn =>
                  btn.classList.remove(
                    "selected"
                  )
              );


            button.classList.add(
              "selected"
            );

          }
        );


        sizeOptions.appendChild(
          button
        );

      }
    );

  }

}


/* =========================================
   QUANTITY
========================================= */

function setupQuantity() {

  const quantityElement =
    document.getElementById(
      "quantity"
    );

  const minusButton =
    document.getElementById(
      "quantity-minus"
    );

  const plusButton =
    document.getElementById(
      "quantity-plus"
    );


  if (
    !quantityElement ||
    !minusButton ||
    !plusButton
  ) {
    return;
  }


  let quantity = 1;


  minusButton.addEventListener(
    "click",
    function () {

      if (quantity > 1) {
        quantity--;
      }

      quantityElement.textContent =
        quantity;

    }
  );


  plusButton.addEventListener(
    "click",
    function () {

      quantity++;

      quantityElement.textContent =
        quantity;

    }
  );

}


/* =========================================
   ADD TO CART
========================================= */

function setupAddToCart() {

  const addButton =
    document.getElementById(
      "add-to-cart"
    );


  if (!addButton) {
    return;
  }


  addButton.addEventListener(
    "click",
    function () {

      const params =
        new URLSearchParams(
          window.location.search
        );


      const productId =
        params.get("product");


      if (
        !productId ||
        !products[productId]
      ) {

        alert(
          "Sorry, this product could not be added."
        );

        return;
      }


      const product =
        products[productId];


      /* SELECTED COLOUR */

      let selectedColor = "";


      const colourOption =
        document.querySelector(
          ".product-option"
        );


      if (colourOption) {

        const selected =
          colourOption.querySelector(
            ".option-btn.selected"
          );


        if (selected) {
          selectedColor =
            selected.textContent.trim();
        }

      }


      /* SELECTED SIZE */

      let selectedSize = "";


      const sizeOptions =
        document.querySelector(
          ".size-options"
        );


      if (sizeOptions) {

        const selected =
          sizeOptions.querySelector(
            ".option-btn.selected"
          );


        if (selected) {
          selectedSize =
            selected.textContent.trim();
        }

      }


      /* QUANTITY */

      const quantityElement =
        document.getElementById(
          "quantity"
        );


      let quantity = 1;


      if (quantityElement) {

        const number =
          Number(
            quantityElement.textContent
          );


        if (
          Number.isFinite(number) &&
          number > 0
        ) {

          quantity = number;

        }

      }


      /* CHECK FOR EXISTING ITEM */

      const existingItem =
        cart.find(
          item =>
            item.productId === productId &&
            item.color === selectedColor &&
            item.size === selectedSize
        );


      if (existingItem) {

        existingItem.quantity +=
          quantity;

      } else {

        cart.push({

          productId:
            productId,

          name:
            product.name,

          category:
            product.category,

          price:
            product.price,

          image:
            product.image,

          color:
            selectedColor,

          size:
            selectedSize,

          quantity:
            quantity

        });

      }


      saveCart();


      addButton.textContent =
        "ADDED TO CART ✓";


      setTimeout(
        function () {

          addButton.textContent =
            "ADD TO CART";

        },
        1500
      );

    }
  );

}

/* =========================================
   LOAD CATEGORY PRODUCT IMAGES
========================================= */

function loadCategoryImages() {

  const productLinks =
    document.querySelectorAll(
      ".product-card .product-image"
    );

  productLinks.forEach(function (link) {

    const href =
      link.getAttribute("href");

    if (!href) {
      return;
    }

    const params =
      new URLSearchParams(
        href.split("?")[1]
      );

    const productId =
      params.get("product");

    if (
      !productId ||
      !products[productId]
    ) {
      return;
    }

    const product =
      products[productId];

    if (
      product.image &&
      product.image.includes(".")
    ) {

      link.innerHTML = `
        <img
          src="${product.image}"
          alt="${product.name}"
        >
      `;

    }

  });

}

/* =========================================
   CATEGORY PAGE ADD TO CART
========================================= */

function setupCategoryAddToCart() {

  const buttons =
    document.querySelectorAll(
      ".add-cart-btn"
    );

  buttons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const productId =
            button.dataset.productId;

          if (
            !productId ||
            !products[productId]
          ) {
            return;
          }

          const product =
            products[productId];

          const selectedColor =
            product.colors.length > 0
              ? product.colors[0]
              : "";

          const selectedSize =
            product.sizes.length > 0
              ? product.sizes[0]
              : "";

          const existingItem =
            cart.find(
              item =>
                item.productId === productId &&
                item.color === selectedColor &&
                item.size === selectedSize
            );

          if (existingItem) {

            existingItem.quantity += 1;

          } else {

            cart.push({

              productId:
                productId,

              name:
                product.name,

              category:
                product.category,

              price:
                product.price,

              image:
                product.image,

              color:
                selectedColor,

              size:
                selectedSize,

              quantity:
                1

            });

          }

          saveCart();

          button.textContent =
            "ADDED TO CART ✓";

          setTimeout(
            function () {

              button.textContent =
                "ADD TO CART";

            },
            1500
          );

        }
      );

    }
  );

}

/* =========================================
   DISPLAY CART
========================================= */

function updateCart() {

  const cartItems =
    document.getElementById(
      "cart-items"
    );

  const cartSummary =
    document.getElementById(
      "cart-summary"
    );

  const emptyCart =
    document.querySelector(
      ".empty-cart"
    );


  if (
    !cartItems ||
    !cartSummary ||
    !emptyCart
  ) {
    return;
  }


  /* EMPTY CART */

  if (cart.length === 0) {

    emptyCart.style.display =
      "block";

    cartItems.style.display =
      "none";

    cartSummary.style.display =
      "none";

    return;

  }


  /* CART HAS ITEMS */

  emptyCart.style.display =
    "none";

  cartItems.style.display =
    "block";

  cartSummary.style.display =
    "block";


  cartItems.innerHTML = "";


  let subtotal = 0;


  cart.forEach(
    function (item, index) {

      const itemTotal =
        item.price *
        item.quantity;


      subtotal += itemTotal;


      const cartItem =
        document.createElement(
          "div"
        );


      cartItem.className =
        "cart-item";


      cartItem.innerHTML = `

        <div class="cart-item-image">
          ${item.image}
        </div>

        <div class="cart-item-info">

          <p>${item.category}</p>

          <h3>${item.name}</h3>

          <span>
            ₦${item.price.toLocaleString()}
          </span>

          <small>
            ${
              item.color
                ? "Colour: " +
                  item.color
                : ""
            }

            ${
              item.size
                ? " | Size: " +
                  item.size
                : ""
            }
          </small>

          <div class="cart-quantity">

            <button
              type="button"
              onclick="changeQuantity(${index}, -1)"
            >
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              type="button"
              onclick="changeQuantity(${index}, 1)"
            >
              +
            </button>

          </div>

          <button
            type="button"
            class="remove-cart"
            onclick="removeFromCart(${index})"
          >
            REMOVE
          </button>

        </div>

      `;


      cartItems.appendChild(
        cartItem
      );

    }
  );


  /* SUBTOTAL */

  const summaryRows =
    cartSummary.querySelectorAll(
      ".summary-row strong"
    );


  const subtotalElement =
    summaryRows[0];


  if (subtotalElement) {

    subtotalElement.textContent =
      "₦" +
      subtotal.toLocaleString();

  }


  /* TOTAL */

  const totalElement =
    cartSummary.querySelector(
      ".summary-total strong"
    );


  if (totalElement) {

    totalElement.textContent =
      "₦" +
      subtotal.toLocaleString();

  }

}


/* =========================================
   CHANGE CART QUANTITY
========================================= */

function changeQuantity(
  index,
  amount
) {

  if (!cart[index]) {
    return;
  }


  cart[index].quantity +=
    amount;


  if (cart[index].quantity <= 0) {

    cart.splice(
      index,
      1
    );

  }


  saveCart();

  updateCart();

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(
  index
) {

  if (!cart[index]) {
    return;
  }


  cart.splice(
    index,
    1
  );


  saveCart();

  updateCart();

}


/* =========================================
   START EVERYTHING
========================================= */

function startCherylsCloset() {

  loadProduct();

  loadCategoryImages();

  setupQuantity();

  setupAddToCart();

  setupCategoryAddToCart();

  updateCart();

}


/* =========================================
   START WHEN PAGE IS READY
========================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    startCherylsCloset
  );

} else {

  startCherylsCloset();

}


/* =========================================
   MAKE CART FUNCTIONS AVAILABLE
   TO INLINE HTML BUTTONS
========================================= */

window.changeQuantity =
  changeQuantity;

window.removeFromCart =
  removeFromCart;
