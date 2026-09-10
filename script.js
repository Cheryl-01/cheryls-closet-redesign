alert("CHERYL'S CLOSET SCRIPT IS WORKING");

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
    image: "👗",
    description: "Solid colour mini dress with a stand collar and shawl design.",
    colors: ["Black"],
    sizes: ["S", "M", "XL"]
  },

  "long-dress": {
    name: "Long Dress",
    category: "DRESSES",
    price: 17400,
    image: "👗",
    description: "Elegant asymmetric high-slit mermaid dress with a slim waist and micro fishtail train.",
    colors: ["Black"],
    sizes: ["S", "M", "XL"]
  },

  "bodycon-dress": {
    name: "Bodycon Dress",
    category: "DRESSES",
    price: 16800,
    image: "👗",
    description: "Backless bodycon mermaid dress with a sleeveless design.",
    colors: ["Black", "Red"],
    sizes: ["S", "M", "XL"]
  },

  "sweat-shirt": {
    name: "Sweat Shirt",
    category: "TOPS",
    price: 15700,
    image: "👚",
    description: "One-shoulder long-sleeve top for an effortless everyday look.",
    colors: ["Black"],
    sizes: ["S", "M", "XL"]
  },

  "slim-fit-shirt": {
    name: "Slim Fit Shirt",
    category: "TOPS",
    price: 9500,
    image: "👚",
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
    image: "🎀",
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

let cart = JSON.parse(
  localStorage.getItem("cherylsCart")
) || [];


function saveCart() {

  localStorage.setItem(
    "cherylsCart",
    JSON.stringify(cart)
  );

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
    new URLSearchParams(window.location.search);

  const productId =
    params.get("product");


  if (!productId || !products[productId]) {
    return;
  }


  const product =
    products[productId];


  /* BASIC INFORMATION */

  const image =
    document.querySelector(
      ".product-detail-image div"
    );

  const category =
    document.querySelector(
      ".product-category"
    );

  const name =
    document.querySelector(
      ".product-detail-info h1"
    );

  const price =
    document.querySelector(
      ".product-detail-price"
    );

  const description =
    document.querySelector(
      ".product-description"
    );


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
    price.textContent =
      "₦" + product.price.toLocaleString();
  }

  if (description) {
    description.textContent =
      product.description;
  }


  /* =========================================
     COLOUR OPTIONS
  ========================================= */

  const colourOption =
    document.querySelector(
      ".product-option"
    );


  if (
    colourOption &&
    product.colors.length > 0
  ) {

    const heading =
      colourOption.querySelector("h3");


    colourOption
      .querySelectorAll(".option-btn")
      .forEach(button => button.remove());


    product.colors.forEach(
      (color, index) => {

        const button =
          document.createElement("button");

        button.type = "button";

        button.className =
          "option-btn" +
          (index === 0
            ? " selected"
            : "");

        button.textContent = color;


        button.addEventListener(
          "click",
          function () {

            colourOption
              .querySelectorAll(
                ".option-btn"
              )
              .forEach(btn =>
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
    document.querySelector(
      ".size-options"
    );


  if (sizeOptions) {

    sizeOptions.innerHTML = "";


    product.sizes.forEach(
      (size, index) => {

        const button =
          document.createElement("button");

        button.type = "button";

        button.className =
          "option-btn" +
          (index === 0
            ? " selected"
            : "");

        button.textContent = size;


        button.addEventListener(
          "click",
          function () {

            sizeOptions
              .querySelectorAll(
                ".option-btn"
              )
              .forEach(btn =>
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
            selected.textContent;
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
            selected.textContent;
        }

      }


      /* QUANTITY */

      const quantityElement =
        document.getElementById(
          "quantity"
        );


      const quantity =
        quantityElement
          ? Number(
              quantityElement.textContent
            )
          : 1;


      /* CHECK FOR SAME ITEM */

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


  if (cart.length === 0) {

    emptyCart.style.display =
      "block";

    cartItems.style.display =
      "none";

    cartSummary.style.display =
      "none";

    return;

  }


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
            ${item.color
              ? "Colour: " +
                item.color
              : ""}
            ${item.size
              ? " | Size: " +
                item.size
              : ""}
          </small>

          <div class="cart-quantity">

            <button
              onclick="changeQuantity(
                ${index},
                -1
              )"
            >
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              onclick="changeQuantity(
                ${index},
                1
              )"
            >
              +
            </button>

          </div>

          <button
            class="remove-cart"
            onclick="removeFromCart(
              ${index}
            )"
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


  const summaryRows =
    cartSummary.querySelectorAll(
      ".summary-row strong"
    );


  const subtotalElement =
    summaryRows[0];


  const totalElement =
    cartSummary.querySelector(
      ".summary-total strong"
    );


  if (subtotalElement) {

    subtotalElement.textContent =
      "₦" +
      subtotal.toLocaleString();

  }


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


  if (
    cart[index].quantity <= 0
  ) {

    cart.splice(index, 1);

  }


  saveCart();

  updateCart();

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(index) {

  if (!cart[index]) {
    return;
  }


  cart.splice(index, 1);


  saveCart();

  updateCart();

}


/* =========================================
   START EVERYTHING
========================================= */

function startCherylsCloset() {

  loadProduct();

  setupQuantity();

  setupAddToCart();

  updateCart();

}


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

          }  emptyCart.style.display = "none";
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

/* =========================
   ADD PRODUCT TO CART
========================= */

function addProductToCart() {

  const productPage =
    document.querySelector(".product-detail");

  if (!productPage) {
    return;
  }


  const addButton =
    document.getElementById("add-to-cart");

  if (!addButton) {
    return;
  }


  addButton.addEventListener("click", function () {

    const params =
      new URLSearchParams(window.location.search);

    const productId =
      params.get("product");


    if (!productId || !products[productId]) {
      return;
    }


    const product =
      products[productId];


    /* SELECTED COLOUR */

    const colourOption =
      document.querySelector(".product-option");

    let selectedColor = "";

    if (colourOption) {

      const selected =
        colourOption.querySelector(".option-btn.selected");

      if (selected) {
        selectedColor = selected.textContent;
      }

    }


    /* SELECTED SIZE */

    const sizeOption =
      document.querySelector(".size-options");

    let selectedSize = "";

    if (sizeOption) {

      const selected =
        sizeOption.querySelector(".option-btn.selected");

      if (selected) {
        selectedSize = selected.textContent;
      }

    }


    /* QUANTITY */

    const quantityElement =
      document.getElementById("quantity");

    const quantity =
      quantityElement
        ? Number(quantityElement.textContent)
        : 1;


    /* ADD ITEM */

    const existingItem =
      cart.find(item =>
        item.productId === productId &&
        item.color === selectedColor &&
        item.size === selectedSize
      );


    if (existingItem) {

      existingItem.quantity += quantity;

    } else {

      cart.push({

        productId: productId,

        name: product.name,

        category: product.category,

        price: product.price,

        image: product.image,

        color: selectedColor,

        size: selectedSize,

        quantity: quantity

      });

    }


    saveCart();


    /* BUTTON FEEDBACK */

    addButton.textContent =
      "ADDED TO CART ✓";


    setTimeout(function () {

      addButton.textContent =
        "ADD TO CART";

    }, 1500);

  });

}


/* START ADD TO CART */

document.addEventListener("DOMContentLoaded", function () {

  addProductToCart();

});

/* =========================
   PRODUCT OPTIONS
========================= */

function setupProductOptions() {

  const productPage =
    document.querySelector(".product-detail");

  if (!productPage) {
    return;
  }


  /* COLOUR BUTTONS */

  const colourButtons =
    document.querySelectorAll(
      ".product-option:first-of-type .option-btn"
    );


  colourButtons.forEach(button => {

    button.addEventListener("click", function () {

      colourButtons.forEach(btn => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");

    });

  });


  /* SIZE BUTTONS */

  const sizeButtons =
    document.querySelectorAll(
      ".size-options .option-btn"
    );


  sizeButtons.forEach(button => {

    button.addEventListener("click", function () {

      sizeButtons.forEach(btn => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");

    });

  });

}


/* START PRODUCT OPTIONS */

document.addEventListener("DOMContentLoaded", function () {

  setupProductOptions();

});

/* =========================
   PRODUCT QUANTITY
========================= */

function setupQuantity() {

  const quantityElement =
    document.getElementById("quantity");

  const minusButton =
    document.getElementById("quantity-minus");

  const plusButton =
    document.getElementById("quantity-plus");


  if (!quantityElement || !minusButton || !plusButton) {
    return;
  }


  let quantity = 1;


  minusButton.addEventListener("click", function () {

    if (quantity > 1) {
      quantity--;
    }

    quantityElement.textContent = quantity;

  });


  plusButton.addEventListener("click", function () {

    quantity++;

    quantityElement.textContent = quantity;

  });

}


/* START QUANTITY */

document.addEventListener("DOMContentLoaded", function () {

  setupQuantity();

});
