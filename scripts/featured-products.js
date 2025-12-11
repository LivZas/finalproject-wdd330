async function loadFeaturedProducts() {
  try {
    const response = await fetch('data/products.json');
    const products = await response.json();

    const container = document.getElementById('featuredContainer');
    container.innerHTML = '';

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product-card');

      productDiv.innerHTML = `
        <a href="${product.productUrl}">
          <img src="${product.image}" alt="${product.title}">
        </a>
        <h3>${product.title}</h3>

        <p><b>Price:</b> $${product.price.toFixed(2)}</p>
        <p><b>Seller:</b> ${product.seller}</p>
        <p><b>Rating:</b> ${'⭐'.repeat(product.rating)}</p>
        <p><b>Condition:</b> ${product.condition}</p>
        <p><b>Shipping:</b> ${product.shippingInfo}</p>
      `;

      container.appendChild(productDiv);
    });

  } catch (error) {
    console.error('Error loading products:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadFeaturedProducts);