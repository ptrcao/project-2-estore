


const cartBtns = document.querySelectorAll('.cart-btn');
console.log(cartBtns)
cartBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const id = e.target.closest('.product').dataset.product_id;
        fetch('/api/cart', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ id })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            location.reload();
        })
        .catch(error => {
            console.error('There was an error submitting the form:', error);
        });
    })
})

