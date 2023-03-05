const loginForm = document.getElementById('login-form');



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