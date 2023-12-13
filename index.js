new Vue({
    el: '#app',
    data: {
        user: null,
        loggedIn: false,
        registerData: { name: '', email: '', password: '' },
        loginData: { email: '', password: '' }
    },
    methods: {
        register() {
            // Check if the email is already registered
            const existingUser = this.getUserByEmail(this.registerData.email);
            if (existingUser) {
                alert('Email is already registered');
                return;
            }

            // Register the user
            const newUser = {
                name: this.registerData.name,
                email: this.registerData.email,
                password: this.registerData.password
            };
            this.saveUser(newUser);

            // Reset the registration form
            this.registerData = { name: '', email: '', password: '' };

            alert('Registration successful! Switching to Login.');

            // Switch to the login form after successful registration
            this.switchToLogin();
        },
        login() {
            // Check if the user exists
            const user = this.getUserByEmail(this.loginData.email);
            if (!user || user.password !== this.loginData.password) {
                alert('Invalid email or password');
                return;
            }

            // Set the user in the app
            this.user = user;
            this.loggedIn = true;

            // Reset the login form
            this.loginData = { email: '', password: '' };

            // Display a welcome message after successful login
            alert('Login successful! Welcome, ' + this.user.name);

            // Redirect to manager.html after successful login
            window.location.href = 'manager.html';
        },
        logout() {
            // Clear the user in the app
            this.user = null;
            this.loggedIn = false;
        },
        saveUser(user) {
            // Store user data in local storage (not suitable for production)
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        },
        getUserByEmail(email) {
            // Retrieve user data from local storage (not suitable for production)
            const users = JSON.parse(localStorage.getItem('users')) || [];
            return users.find(user => user.email === email);
        },
        switchToLogin() {
            // Switch to the login form
            this.loggedIn = true;
        }
    }
});

