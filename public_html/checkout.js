const form = document.getElementById('checkout-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const shippingFirstName = document.getElementById('shipping-receiver-first-name').value;
  const shippingLastName = document.getElementById('shipping-receiver-last-name').value;
  const shippingPhoneNumber = document.getElementById('shipping-receiver-phone-number').value;
  const shippingCompanyName = document.getElementById('shipping-company-name').value;
  const shippingAddressLine1 = document.getElementById('shipping-address-line-1').value;
  const shippingAddressLine2 = document.getElementById('shipping-address-line-2').value;
  const shippingState = document.getElementById('shipping-state').value;
  const shippingPostalCode = document.getElementById('shipping-postcode').value;
  const shippingCountry = document.getElementById('shipping-country').value;
  
  const billingCompanyName = document.getElementById('billing-company-name').value;
  const billingAddressLine1 = document.getElementById('billing-address-line-1').value;
  const billingAddressLine2 = document.getElementById('billing-address-line-2').value;
  const billingState = document.getElementById('billing-state').value;
  const billingPostalCode = document.getElementById('billing-postcode').value;
  const billingCountry = document.getElementById('billing-country').value;
  
  const cardNumber = document.getElementById('card-number').value;
  const cardExpiry = document.getElementById('card-expiry').value;
  const cardCvv = document.getElementById('card-cvv').value;
  
  const customerFirstName = document.getElementById('customer-first-name').value;
  const customerLastName = document.getElementById('customer-last-name').value;
//   const customerCompanyName = document.getElementById('customer-company-name').value;
  const customerEmail = document.getElementById('customer-email').value;
  const customerPhoneNumber = document.getElementById('customer-phone-number').value;
  
  const data = {
    shippingFirstName,
    shippingLastName,
    shippingPhoneNumber,
    shippingCompanyName,
    shippingAddressLine1,
    shippingAddressLine2,
    shippingState,
    shippingPostalCode,
    shippingCountry,
    billingCompanyName,
    billingAddressLine1,
    billingAddressLine2,
    billingState,
    billingPostalCode,
    billingCountry,
    cardNumber,
    cardExpiry,
    cardCvv,
    customerFirstName,
    customerLastName,
    // customerCompanyName,
    customerEmail,
    customerPhoneNumber
  };
  
  fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
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