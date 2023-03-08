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
const navLinks = document.querySelectorAll('.n');
navLinks.forEach(link =>{
  link.addEventListener('mouseover', (e) => {
    link.children[1].style.display = "flex";
    link.addEventListener('mouseleave', (e) => {
      if (e.target.children[1]) {
        e.target.children[1].style.display = "none";
      }
      
    })
  })
})

const cartHover = document.getElementById('cart-hover');
cartHover.addEventListener('mouseover', async (e) => {
  const res = await fetch('/api/cart');
  const data = await res.json();
  cartHover.children[0].children[1].children[0].children[0].innerHTML = "";
  if (!data.items.length) {
    const li = document.createElement('li');
    li.innerHTML = `
    <div />
    <p href="#">Cart is empty!</p>
    <div class="price"></div>
    `
    cartHover.children[0].children[1].children[0].children[0].appendChild(li);
  } else {
    data.items.forEach(item=>{
    const li = document.createElement('li');
    li.innerHTML = `
    <img src="${item.product_image}" alt="logo" />
    <p href="#">${item.product_name} x${item.amount}</p>
    <div class="price">$${item.price * item.amount}</div>
    `

    cartHover.children[0].children[1].children[0].children[0].appendChild(li);
  })
  const price = document.createElement('li');
  price.innerHTML = `
 
    <p id="total">Total</p>
    <div />
    <p class="price">$${data.total}</p>
  `
  cartHover.children[0].children[1].children[0].children[0].appendChild(price);
  }
 
  cartHover.children[0].children[1].style.display = "flex";
  cartHover.addEventListener('mouseleave', (e) => {
    if (e.target.children[0].children[1]) {
      e.target.children[0].children[1].style.display = "none";
    }
    
  })
})