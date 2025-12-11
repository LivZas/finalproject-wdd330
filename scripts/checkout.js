const cartSummary = document.getElementById("cart-summary");
const totalBox = document.getElementById("checkout-total");
const confirmButton = document.getElementById("confirmButton");
confirmButton.classList.add("addCartBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function groupCartItems(cart) {
  const grouped = {};
  cart.forEach(item => {
    if (grouped[item.id]) {
      grouped[item.id].quantity += 1;
    } else {
      grouped[item.id] = { ...item, quantity: 1 };
    }
  });
  return Object.values(grouped);
}

function showCartSummary() {
  cartSummary.innerHTML = "";
  if (cart.length === 0) {
    cartSummary.innerHTML = "<p>No items in your cart.</p>";
    return;
  }

  const groupedItems = groupCartItems(cart);
  let total = 0;

  groupedItems.forEach(item => {
    total += item.price * item.quantity;

    cartSummary.innerHTML += `
      <div class="product-card">
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>$${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    `;
  });

  totalBox.textContent = `Total: $${total.toFixed(2)}`;
}

showCartSummary();

confirmButton.addEventListener("click", () => {
  const shipping = {
    name: document.getElementById("shippingName").value,
    address: document.getElementById("shippingAddress").value,
    city: document.getElementById("shippingCity").value,
    postal: document.getElementById("shippingPostal").value
  };

  const paymentMethod = document.getElementById("paymentMethod").value;

  const groupedCart = groupCartItems(cart);

  const orderData = {
    cart: groupedCart,
    shipping,
    paymentMethod
  };

  localStorage.setItem("lastOrder", JSON.stringify(orderData));
  localStorage.removeItem("cart");
  window.location.href = "thankyou.html";
});
