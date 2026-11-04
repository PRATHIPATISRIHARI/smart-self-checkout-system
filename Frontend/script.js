let total = 0;

function addToCart(price) {
    total = total + price;
    updateTotal();
}

function removeFromCart(price) {
    if (total >= price) {
        total = total - price;
        updateTotal();
    }
}

function updateTotal() {
    document.getElementById("total").textContent = total;
}