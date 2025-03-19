// Select the form and products div
const productForm = document.getElementById('productForm');
const productsDiv = document.getElementById('products');

// Array to store products
let products = [];

productForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const imageFile = document.getElementById('image').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;

            // Create product object
            const product = {
                name: name,
                description: description,
                price: price,
                image: imageUrl
            };

            // Add product to array
            products.push(product);

            // Update display
            updateProductsDisplay();
        };
        reader.readAsDataURL(imageFile); // Read image as data URL
    }

    // Reset the form
    productForm.reset();
});

// Function to update the products display
function updateProductsDisplay() {
    productsDiv.innerHTML = ''; // Clear existing content

    products.forEach(function(product) {
        // Create product card
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Add image
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = 'Product image';
        productCard.appendChild(img);

        // Add name
        const nameElem = document.createElement('h3');
        nameElem.textContent = product.name;
        productCard.appendChild(nameElem);

        // Add description
        const descElem = document.createElement('p');
        descElem.textContent = product.description;
        productCard.appendChild(descElem);

        // Add price
        const priceElem = document.createElement('p');
        priceElem.textContent = `Price: $${product.price.toFixed(2)}`;
        productCard.appendChild(priceElem);

        // Append card to products div
        productsDiv.appendChild(productCard);
    });
}