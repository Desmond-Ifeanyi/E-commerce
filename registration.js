
// ================REGISTRATION FROM=================//
// ======toggle button-================
const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("regPassword");

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            // Toggle the type attribute
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);

            // Toggle the icon class (eye / eye-off)
            togglePassword.classList.toggle("ri-eye-line");
            togglePassword.classList.toggle("ri-eye-off-line");
        });
    }
// ====

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("regPassword").value.trim();

            //  Email Regex Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special character
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.<>/()'";:])[A-Za-z\d@$!%*?&.<>/()'";:]{8,}$/;
            if (!passwordRegex.test(password)) {
                alert("Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.");
                return;
            }

            // Retrieve existing users or initialize an empty array
            let users = JSON.parse(localStorage.getItem("ecommerce_users")) || [];

            // Check if email is already registered
            const userExists = users.some(user => user.email === email);
            if (userExists) {
                alert("An account with this email already exists. Please log in.");
                return;
            }

            // Save new user object
            const newUser = { firstName, lastName, email, password };
            users.push(newUser);
            localStorage.setItem("ecommerce_users", JSON.stringify(users));

            alert("Registration successful! Redirecting to login...");
            window.location.href = "index.html"; // Redirects to your login page
        });
    }
});