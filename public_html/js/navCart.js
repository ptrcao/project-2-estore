window.onload = function() {
    const carQuantity = document.getElementById('cart-quantity')
    fetch('/api/cart')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        carQuantity.innerHTML = data.numItems;
    })
}