

document.addEventListener("DOMContentLoaded", async () => {

    setupUIComponents();

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const wrapper = document.getElementById("productDetailWrapper");

    if (!productId) {
        wrapper.innerHTML = "<p>No product selected. <a href='./home.html'>Back to Home</a></p>";
        return;
    }

    showLoader();

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) throw new Error("Product not found");

        const product = await response.json();

        
        wrapper.innerHTML = `
        <div class="product-image-box">
        <img src="${product.image}" alt="${escapeHTML(product.title)}">
        </div>
        <div class="product-info-box">
        <span class="category-tag">${escapeHTML(product.category)}</span>
        <h1>${escapeHTML(product.title)}</h1>
        <h2 class="product-price">$${product.price.toFixed(2)}</h2>
        <p class="product-desc">${escapeHTML(product.description)}</p>
        <a href="./home.html" class="back-link">&larr; Back to Products</a>
        </div>
        `;
        
        // Success toast notification
        showToast("Products loaded successfully!", "success");

    } catch (error) {
        console.error("Error loading product detail:", error);
        // showToast("Failed to load product detail.", "error");
        wrapper.innerHTML = "<p style='color: red; margin: 0 auto;'>Failed to load product details. Please try again.</p>";
    } finally {
        hideLoader();
    }
    
    
});