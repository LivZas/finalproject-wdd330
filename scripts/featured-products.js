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
        <p>Price: $${product.price.toFixed(2)}</p>
        <p>Seller: ${product.seller}</p>
        <p>Rating: ${'⭐'.repeat(product.rating)}</p>
        <p>Condition: ${product.condition}</p>
        <p>Shipping: ${product.shippingInfo}</p>
      `;

      container.appendChild(productDiv);
    });

  } catch (error) {
    console.error('Error loading products:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadFeaturedProducts);