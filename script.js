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
