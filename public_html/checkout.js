const form = document.getElementById('checkout-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const formaData = new FormData(form);
  const formObject = {};
  for (const [key, value] of formaData.entries()) {
    formObject[key] = value;
  }
  
  fetch('/api/checkout', {
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
})
.catch(error => {
  console.error('There was an error submitting the form:', error);
});

});


