const form = document.getElementById('checkout-form');

const checkoutItems = document.getElementById("checkout-items");


window.onload = () => {
  // fetch('/api/cart')
  // .then(res=>{
  //   if(!res.ok){
  //     throw new Error('Network response was not ok');
  //   }
  //   return res.json();
  // })
  // .then(data=>{
  //   console.log(data);
  //   data.items.forEach(item=>{
  //     checkoutItems.innerHTML += `
  //     <div class="checkout-item">
  //       <div class="checkout-item-name">${item.product_name}</div>
  //       <div class="checkout-item-amount">${item.amount}</div>
  //       <div class="checkout-item-price">$${item.price * item.amount}</div>
  //     </div>
  //     `
  //   })
  // })
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const formaData = new FormData(form);
  const formObject = {};
  for (const [key, value] of formaData.entries()) {
    formObject[key] = value;
  }
  
  fetch('/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  // body: JSON.stringify(data)
  body: JSON.stringify(formObject)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log(data);
  // redirect to order confirmation page
  window.location.replace('/thank-you/'+data.orderId)
})
.catch(error => {
  console.error('There was an error submitting the form:', error);
});

});


