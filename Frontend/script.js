
const products = [
    { id: 1, name: "Rice", price: 110 },
    { id: 2, name: "Milk", price: 30 },
    { id: 3, name: "Bread", price: 40 }
];

let cart = [];

// Add one item to the cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    displayCart();
}

// Remove one item from the cart
function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);

    if (!cartItem) return;

    cartItem.quantity--;

    if (cartItem.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    displayCart();
}

// Remove all items from the cart
function clearCart() {
    cart = [];
    displayCart();
}

// Remove all quantities of one product
function removeAllOfProduct(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCart();
}

// Display cart items and calculate total
function displayCart() {
    const cartContainer = document.getElementById("cart");
    const totalElement = document.getElementById("total");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.textContent = "Total: ₹0";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemElement = document.createElement("div");
        cartItemElement.className = "cart-item";

        cartItemElement.innerHTML = `
            <span>
                ${item.name} - ₹${item.price}
                × ${item.quantity} = ₹${itemTotal}
            </span>

            <div>
                <button onclick="removeFromCart(${item.id})">
                    Remove One
                </button>

                <button class="remove-btn"
                    onclick="removeAllOfProduct(${item.id})">
                    Remove All
                </button>
            </div>
        `;

        cartContainer.appendChild(cartItemElement);
    });

    totalElement.textContent = `Total: ₹${total}`;
}

// Day 5: Search products
function searchProducts() {
    const searchValue = document
        .getElementById("searchInput")
        .value.toLowerCase()
        .trim();

    const productCards = document.querySelectorAll(".product-card");

    let found = 0;

    productCards.forEach(card => {
        const productName = card
            .querySelector("h3")
            .textContent.toLowerCase();

        if (productName.includes(searchValue)) {
            card.style.display = "";
            found++;
        } else {
            card.style.display = "none";
        }
    });

    const noResults = document.getElementById("noResults");

    noResults.style.display = found === 0 ? "block" : "none";
}
