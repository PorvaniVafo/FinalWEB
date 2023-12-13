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
           
            const existingUser = this.getUserByEmail(this.registerData.email);
            if (existingUser) {
                alert('Email is already registered');
                return;
            }

        
            const newUser = {
                name: this.registerData.name,
                email: this.registerData.email,
                password: this.registerData.password
            };
            this.saveUser(newUser);

      
            this.registerData = { name: '', email: '', password: '' };

            alert('Registration successful! Switching to Login.');

          
            this.switchToLogin();
        },
        login() {
  
            const user = this.getUserByEmail(this.loginData.email);
            if (!user || user.password !== this.loginData.password) {
                alert('Invalid email or password');
                return;
            }

            this.user = user;
            this.loggedIn = true;

            
            this.loginData = { email: '', password: '' };

 
            alert('Login successful! Welcome, ' + this.user.name);

         
            window.location.href = 'manager.html';
        },
        logout() {
  
            this.user = null;
            this.loggedIn = false;
        },
        saveUser(user) {

            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        },
        getUserByEmail(email) {
       
            const users = JSON.parse(localStorage.getItem('users')) || [];
            return users.find(user => user.email === email);
        },
        switchToLogin() {
           
            this.loggedIn = true;
        }
    }
});

