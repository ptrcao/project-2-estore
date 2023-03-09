const form = document.querySelector("form");
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const userObject = {};
  for (const [key, value] of formData.entries()) {
    userObject[key] = value;
  }
  fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObject)
  })
  .then(response => {
  if (response.ok) {
    window.location=document.referrer;
  } else {
    return response.json()
  }} )
  .then(data=>{
    if (data) {
      const errorDiv = document.querySelector('#error');
      errorDiv.innerText = data.message
    }
  })
})

