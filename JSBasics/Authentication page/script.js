document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const securedPage = document.getElementById('secured-page');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutButton = document.getElementById('logout');

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const showSection = (section) => {
        loginSection.classList.remove('active');
        registerSection.classList.remove('active');
        securedPage.classList.remove('active');
        section.classList.add('active');
    };

    const checkAuth = () => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            showSection(securedPage);
        } else {
            showSection(loginSection);
        }
    };

    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(registerSection);
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(loginSection);
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            showSection(securedPage);
        } else {
            alert('Invalid email or password');
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            alert('User already exists');
        } else {
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful! Please log in.');
            showSection(loginSection);
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        showSection(loginSection);
    });

    checkAuth();
});
