


fetch('api/cart')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}
)
.then(data => {
    const cartItems = document.getElementById('cart-items');
    const totalCost = document.getElementById('total-cost');
    totalCost.innerText = `$${data.total}`;
    cartItems.innerHTML = "";
    console.log(data);

    data.items.forEach((item) => {
        const selectArray = new Array(item.amount + 10).fill(0).map((item, index)=>{
            return index + 1;
        });
        console.log(selectArray)
        cartItems.innerHTML += `
        <div class="item">
        <a class="view-cart" href="#">${item.product_name} x ${item.amount}</a>
        <div class="price">$${item.price * item.amount}</div>
        <select data-id=${item.id}>
            ${selectArray.map((num) => {
                if (num === item.amount) {
                    return `<option value="${num}" selected>${num}</option>`
                }
                return `<option value="${num}">${num}</option>`
            }).join('')}
        </select>
      </div>
        `
    })
    const select = document.querySelectorAll('select');
    select.forEach((item) => {
        item.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            const amount = e.target.value;
            console.log(id, amount);
            fetch('/api/cart', {
                method: 'PUT',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({ id, amount })
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
})
    