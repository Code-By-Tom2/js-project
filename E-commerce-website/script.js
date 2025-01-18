// Sample Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 59.99,
        image: "assets/headphones.jpg",
        description: "High-quality wireless headphones with noise cancellation.",
        rating: 4.5,
    },
    {
        id: 2,
        name: "Smartphone",
        price: 699.99,
        image: "assets/smartphone.jpg",
        description: "Latest smartphone with cutting-edge features.",
        rating: 4.8,
    },
    {
        id: 3,
        name: "Gaming Laptop",
        price: 1299.99,
        image: "assets/laptop.jpg",
        description: "Powerful gaming laptop with high-end graphics.",
        rating: 4.7,
    },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Utility Functions
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    document.querySelectorAll("#cart-count").forEach(
        (el) => (el.textContent = cart.length)
    );
}

// Homepage
function displayProducts() {
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = "";
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <p>⭐ ${product.rating}</p>
            <button onclick="viewProduct(${product.id})">View Details</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productDiv);
    });
}

function viewProduct(productId) {
    localStorage.setItem("viewedProduct", JSON.stringify(productId));
    window.location.href = "product.html";
}

// Product Page
function displayProductDetails() {
    const productId = JSON.parse(localStorage.getItem("viewedProduct"));
    const product = products.find((p) => p.id === productId);
    const productDetails = document.getElementById("product-details");
    productDetails.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h1>${product.name}</h1>
        <p>$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <p>⭐ ${product.rating}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
}

// Cart
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    cartTotal.textContent = total.toFixed(2);
}

function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    cart.push(product);
    saveCart();
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
    updateCartCount();
}

// Initialize
if (document.getElementById("product-grid")) displayProducts();
if (document.getElementById("product-details")) displayProductDetails();
if (document.getElementById("cart-items")) displayCart();
updateCartCount();
