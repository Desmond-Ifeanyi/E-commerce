
    const productContainer = document.getElementById("propertyContainer");
    const menuItems = document.querySelectorAll("nav ul li");
    const searchInput = document.querySelector("nav form input[type='search']");

    let allProducts = [];

    // Setup UI components (Loader & Toast)
    setupUIComponents();

    fetchAllProductsOnLoad();

    menuItems.forEach((item) => {
        item.style.cursor = "pointer";
        item.addEventListener("click", () => {
            const categoryText = item.textContent.trim().toLowerCase();
            
            if (categoryText === "men") {
                fetchProductsByCategory("men's clothing", "Men's collection loaded!");
            } else if (categoryText === "women") {
                fetchProductsByCategory("women's clothing", "Women's collection loaded!");
            } else if (categoryText === "electronics" || categoryText === "electricity") {
                fetchProductsByCategory("electronics", "Electronics collection loaded!");
            }
        });
    });

    // 3. Search input  
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filteredProducts = allProducts.filter(product => 
                product.title.toLowerCase().includes(query) || 
                product.description.toLowerCase().includes(query)
            );
            displayProducts(filteredProducts);
        });
    }

    // Function to fetch all products initially
    async function fetchAllProductsOnLoad() {
        showLoader();
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) throw new Error("Failed to fetch products");
            
            allProducts = await response.json();
            displayProducts(allProducts);
            showToast("All products loaded successfully!", "success");
        } catch (error) {
            console.error("Error fetching data:", error);
            showToast("Failed to load products. Please try again.", "error");
            productContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: red;">Failed to load products.</p>`;
        } finally {
            hideLoader();
        }
    }

    // Function to fetch products by specific category
    async function fetchProductsByCategory(category, successMessage) {
        showLoader();
        try {
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            if (!response.ok) throw new Error("Failed to fetch category");
            
            const products = await response.json();
            displayProducts(products);
            showToast(successMessage, "success");
        } catch (error) {
            console.error("Error fetching category:", error);
            showToast("Failed to load category products.", "error");
        } finally {
            hideLoader();
        }
    }

    // Render products into the gallery container
    function displayProducts(products) {
        productContainer.innerHTML = "";

        if (products.length === 0) {
            productContainer.innerHTML = `
            <p style="grid-column: 1/-1; text-align: center; font-size: 16px; padding: 20px;">
            No products found.
            </p>  
            `;
            return;
        }

                products.forEach((product) => {
                const productHTML = `
                    <span class="img-container">
                        <img src="${product.image}" alt="${escapeHTML(product.title)}">
                        <span>  
                            <h4>${escapeHTML(product.title.substring(0, 20))}...</h4> 
                            
                            <a href="product.html?id=${product.id}">view detail</a>
                        </span>
                        <small>$${product.price.toFixed(2)}</small>
                        <p>${escapeHTML(product.description.substring(0, 60))}...</p>
                    </span>
                `;
                productContainer.insertAdjacentHTML("beforeend", productHTML);
            });

        showProperties(1);
    }



    // UI Helper Functions (Loader & Toast)
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

        toast.textContent = message;
        toast.className = `show ${type}`;

        setTimeout(() => {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }


