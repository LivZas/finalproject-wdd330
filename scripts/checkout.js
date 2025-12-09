const cartSummary = document.getElementById("cart-summary");
const confirmButton = document.getElementById("confirmButton");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function groupCartItems(cart) {
  const grouped = {};
  cart.forEach(item => {
    if(grouped[item.id]){
      grouped[item.id].quantity += 1;
    } else {
      grouped[item.id] = {...item, quantity: 1};
    }
  });
  return Object.values(grouped);
}

function showCartSummary() {
  cartSummary.innerHTML = "";
  if(cart.length === 0){
    cartSummary.innerHTML = "<p>No items in your cart.</p>";
    return;
  }

  const groupedItems = groupCartItems(cart);
  let total = 0;
  groupedItems.forEach(item => {
    total += item.price * item.quantity;
    cartSummary.innerHTML += `
      <div class="order-item">
        <img src="${item.image}" width="50" alt="${item.title}">
        <span>${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `;
  });
  cartSummary.innerHTML += `<h3>Subtotal: $${total.toFixed(2)}</h3>`;
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
