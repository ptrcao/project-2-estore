const form = document.querySelector(".details-section");
form.addEventListener('submit', (e) => {
    const error = document.querySelector('#error');
    e.preventDefault();
    const formData = new FormData(form);
    const userObject = {};
    for (const [key, value] of formData.entries()) {
        userObject[key] = value;
    }
    if (userObject["password"] !== userObject['password-2']) {
        error.innerText = 'Passwords do not match';
        const password = document.querySelector('#password');
        password.focus();
        return;
    }
    if (userObject["email"] !== userObject['email-2']) {
        error.innerText = 'Emails do not match';
        const email = document.querySelector('#email');
        email.focus();
        return;
    }
    if (userObject["password"].length < 8) {
        error.innerText = 'Password must be at least 8 characters';
        const password = document.querySelector('#password');
        password.focus();
        return;
    }

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customer_email: userObject['email'], customer_password: userObject['password'], customer_first_name: userObject['first-name'], customer_last_name: userObject['last-name'], customer_phone_number: userObject['phone-number'] })
    })
        .then(res => {
            if (res.ok) {
                window.location = document.referrer;
            } else {
                return res.json();
            }
        })
        .then(data => {
            if (data?.message) {
                const error = document.querySelector('#error');
                error.innerText = "Server error"
            }
        })
})