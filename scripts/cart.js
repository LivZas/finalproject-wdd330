const cartList = document.getElementById("cart-list");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function groupCartItems() {
  const grouped = {};
  cart.forEach(p => {
    if (grouped[p.id]) {
      grouped[p.id].quantity += 1;
    } else {
      grouped[p.id] = { ...p, quantity: 1 };
    }
  });
  return Object.values(grouped);
}

function showCart() {
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const groupedItems = groupCartItems();
  let total = 0;

  groupedItems.forEach(p => {
    total += p.price * p.quantity;

    cartList.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>$${p.price}</p>
        <p>⭐ ${p.rating}</p>
        <p>${p.condition || "New"}</p>
        <p>Seller: ${p.seller}</p>
        <p>Quantity: ${p.quantity}</p>

        <button class="addCartBtn"
          onclick="removeFromCart('${p.id}')">
          Remove One
        </button>

        <p class="added-msg">In Cart</p>
      </div>
    `;
  });

  cartList.innerHTML += `
    <div class="cart-summary">
      <h3>Total: $${total.toFixed(2)}</h3>
      <button id="checkoutButton" class="addCartBtn">Checkout</button>
    </div>
  `;

  document.getElementById("checkoutButton")?.addEventListener("click", () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout.html";
  });
}

function removeFromCart(id) {
  const index = cart.findIndex(p => p.id == id);
  if (index > -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
  }
}

showCart();