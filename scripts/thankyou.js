const summary = document.getElementById("order-summary");
const totalBox = document.getElementById("thank-total");
const shippingBox = document.getElementById("thank-shipping");
const paymentBox = document.getElementById("thank-payment");
const backBtn = document.getElementById("BackToProducts");
backBtn.classList.add("cartBtn");

const order = JSON.parse(localStorage.getItem("lastOrder")) || { cart: [], shipping: {}, paymentMethod: "" };

let total = 0;

if (order.cart.length === 0) {
  summary.innerHTML = "<p>No items found in your order.</p>";
} else {
  order.cart.forEach(item => {
    total += item.price * item.quantity;

    summary.innerHTML += `
      <div class="product-card">
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    `;
  });
}

totalBox.textContent = `Total Paid: $${total.toFixed(2)}`;

shippingBox.innerHTML = `
  <h4>Shipping Information</h4>
  <p>${order.shipping.name}</p>
  <p>${order.shipping.address}</p>
  <p>${order.shipping.city}, ${order.shipping.postal}</p>
`;

paymentBox.innerHTML = `
  <h4>Payment Method</h4>
  <p>${order.paymentMethod}</p>
`;

localStorage.removeItem("lastOrder");
localStorage.removeItem("cart");

backBtn.addEventListener("click", () => {
  window.location.href = "products.html";
});