const productsList = document.getElementById("products-list");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const filterCategory = document.getElementById("filterCategory");
const sortSelect = document.getElementById("sortSelect");
const cartButton = document.getElementById("cartButton");

let allProducts = [];

async function loadProducts() {
  const data = await fetch("https://fakestoreapi.com/products").then(r => r.json());
  allProducts = data.map(p => ({
    image: p.image,
    title: p.title,
    price: p.price,
    seller: "FakeStore",
    rating: p.rating.rate,
    condition: "New",
    shipping: "Delivery in 3–7 days",
    category: p.category,
    id: p.id,
    stock: Math.random() > 0.3 ? "In Stock" : "Out of Stock",
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0
  }));
  showCategories();
  showProducts(allProducts);
  updateCart();
}

function showCategories() {
  const cats = [...new Set(allProducts.map(p => p.category))];
  filterCategory.innerHTML = `<option value="all">All Categories</option>` + cats.map(c => `<option value="${c}">${c}</option>`).join("");
}

function showProducts(list) {
  productsList.innerHTML = "";
  if(list.length === 0) { productsList.innerHTML = "<p>No products found.</p>"; return; }
  list.forEach(p => {
    const finalPrice = p.discount > 0 ? (p.price * (1 - p.discount / 100)).toFixed(2) : p.price;
    productsList.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>
          ${p.discount > 0 ? `<span class="original-price">$${p.price}</span>` : `$${p.price}`} 
          ${p.discount > 0 ? `<span class="discount">-${p.discount}%</span>` : ""}
        </p>
        <p>⭐ ${p.rating}</p>
        <p>${p.condition}</p>
        <p>${p.shipping}</p>
        <p>${p.stock}</p>
        <button ${p.stock === "Out of Stock" ? "disabled" : `onclick="addToCart(${p.id})"`}>Add to Cart</button>
      </div>
    `;
  });
}

function updateProducts() {
  let filtered = allProducts.filter(p => p.title.toLowerCase().includes(searchInput.value.toLowerCase()));
  if(filterCategory.value !== "all") filtered = filtered.filter(p => p.category === filterCategory.value);
  if(sortSelect.value === "priceAsc") filtered.sort((a,b)=>a.price-b.price);
  if(sortSelect.value === "priceDesc") filtered.sort((a,b)=>b.price-a.price);
  if(sortSelect.value === "rating") filtered.sort((a,b)=>b.rating-b.rating);
  showProducts(filtered);
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = allProducts.find(p=>p.id==id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartButton.textContent = `🛒(${cart.length})`;
}

cartButton.addEventListener("click",()=>window.location.href="cart.html");
searchButton.addEventListener("click",updateProducts);
filterCategory.addEventListener("change",updateProducts);
sortSelect.addEventListener("change",updateProducts);

loadProducts();