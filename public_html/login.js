const loginFormHandler = async (event) => {
  event.preventDefault();
const email = document.querySelector('#email').value.trim();
const password = document.querySelector('#password').value.trim();

if (email && password) {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log in.');
  }
}
};

const signupForm = async (event) => {
event.preventDefault();

const firstName = document.querySelector('#first-name').value.trim();
const lastName = document.querySelector('#last-name').value.trim();
const email = document.querySelector('#email').value.trim();
const password = document.querySelector('#passwords').value.trim();


if (firstName && lastName && email && password) {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password}),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to sign up.');
  }
}
};


document
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);


loginForm.addEventListener('click', (e) => {
    const form = new FormData(loginForm);
    const formObject = {};
    for (const [key, value] of form.entries()) {
        formObject[key] = value;
    }
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
    })
})