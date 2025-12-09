const cartList = document.createElement("div");
cartList.id = "cart-list";
document.querySelector("main.container").appendChild(cartList);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function groupCartItems() {
  const grouped = {};
  cart.forEach(p => {
    if(grouped[p.id]){
      grouped[p.id].quantity += 1;
    } else {
      grouped[p.id] = {...p, quantity: 1};
    }
  });
  return Object.values(grouped);
}

function showCart() {
  cartList.innerHTML = "";
  if(cart.length === 0){
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const groupedItems = groupCartItems();
  let total = 0;

  groupedItems.forEach(p => {
    total += p.price * p.quantity;
    cartList.innerHTML += `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.title}" width="80">
        <h3>${p.title}</h3>
        <p>Price: $${p.price}</p>
        <p>Quantity: ${p.quantity}</p>
        <p>Seller: ${p.seller}</p>
        <p>⭐ ${p.rating}</p>
        <button onclick="removeFromCart('${p.id}')">Remove</button>
      </div>
      <hr>
    `;
  });

  cartList.innerHTML += `
    <h3>Total: $${total.toFixed(2)}</h3>
    <button id="checkoutButton">Checkout</button>
  `;

  document.getElementById("checkoutButton")?.addEventListener("click", ()=> {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout.html";
  });
}

function removeFromCart(id){
  const index = cart.findIndex(p => p.id == id);
  if(index > -1){
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
  }
}

showCart();
