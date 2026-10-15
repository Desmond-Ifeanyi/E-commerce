

document.addEventListener("DOMContentLoaded", async () => {
    // Setup UI components (Loader & Toast) if they don't exist yet
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
        wrapper.innerHTML = "<p style='color: red; text-align: center;'>Failed to load product details. Please try again.</p>";
        showToast("Failed to load product.", "error");
    } finally {
        hideLoader();
    }
});

// --- UI Helper Functions (Required so showToast doesn't crash) ---
function setupUIComponents() {
    if (!document.getElementById("custom-loader")) {
        const loaderHTML = `
            <div id="custom-loader" style="display: none;">
                <div class="spinner"></div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", loaderHTML);
    }

    if (!document.getElementById("custom-toast")) {
        const toastHTML = `<div id="custom-toast"></div>`;
        document.body.insertAdjacentHTML("beforeend", toastHTML);
    }
}

function showLoader() {
    const loader = document.getElementById("custom-loader");
    if (loader) loader.style.display = "flex";
}

function hideLoader() {
    const loader = document.getElementById("custom-loader");
    if (loader) loader.style.display = "none";
}
function showToast(message, type = "success") {
    const toast = document.getElementById("custom-toast");
    if (!toast) return;

    // 1. Clear any active classes and text immediately
    toast.className = "";
    toast.textContent = message;

    // 2. Force a browser reflow/repaint so the animation restarts
    void toast.offsetWidth;

    // 3. Apply the show and type classes
    toast.className = `show ${type}`;

    // 4. Clear it after 3 seconds
    setTimeout(() => {
        toast.className = "";
    }, 3000);
}
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}