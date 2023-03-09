const form = document.querySelector(".details-section");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const userObject = {};
    for (const [key, value] of formData.entries()) {
        userObject[key] = value;
    }
    if (userObject["password"] !== userObject['password-2']) {
        alert('Passwords do not match');
        return;
    }
    if (userObject["email"] !== userObject['email-2']) {
        alert('Emails do not match');
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
            console.log(res.status)
            if (res.ok) {
                window.location = document.referrer;
            } else {
                return res.json();
            }
        })
        .then(data => {
            if (data?.message) {
                const error = document.querySelector('#error');
                error.innerText = data.message;
            }
        })
})