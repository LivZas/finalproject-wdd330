const summary = document.getElementById("order-summary");
const backBtn = document.getElementById("BackToProducts");

const order = JSON.parse(localStorage.getItem("lastOrder")) || { cart: [], shipping: {}, paymentMethod: "" };

let total = 0;
if(order.cart.length === 0){
  summary.innerHTML = "<p>No items found in your order.</p>";
} else {
  order.cart.forEach(item => {
    total += item.price * item.quantity;
    summary.innerHTML += `
      <div class="order-item">
        <img src="${item.image}" width="50" alt="${item.title}">
        <span>${item.title} x${item.quantity} - $${(item.price*item.quantity).toFixed(2)}</span>
      </div>
    `;
  });
  summary.innerHTML += `<h3>Total Paid: $${total.toFixed(2)}</h3>`;
  summary.innerHTML += `<h4>Shipping:</h4>
    <p>${order.shipping.name}</p>
    <p>${order.shipping.address}, ${order.shipping.city}, ${order.shipping.postal}</p>
    <p>Payment Method: ${order.paymentMethod}</p>
  `;
}

localStorage.removeItem("lastOrder");
localStorage.removeItem("cart");

backBtn.addEventListener("click", () => {
  window.location.href = "products.html";
});
