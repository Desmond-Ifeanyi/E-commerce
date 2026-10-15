

// ===================LOGIN FORM-===============//

    const loginForm = document.getElementById("loginForm");
    const togglePassword = document.getElementById("logintoggle");
    const passwordInput = document.getElementById("loginPassword");

    // 1. Password Visibility Toggle
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            togglePassword.classList.toggle("ri-eye-line");
            togglePassword.classList.toggle("ri-eye-off-line");
        });
    }

    // 2. Login Form Submission & Regex Validation
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const password = passwordInput.value.trim();

            // Name Regex: Only allows letters, spaces, hyphens, and apostrophes (min 2 chars)
            const nameRegex = /^[A-Za-zÀ-ÿ\s'-]{2,}$/;

            if (!nameRegex.test(firstName)) {
                alert("Please enter a valid First Name.");
                return;
            }

            if (!nameRegex.test(lastName)) {
                alert("Please enter a valid Last Name.");
                return;
            }

            // Retrieve registered users from localStorage
            let users = JSON.parse(localStorage.getItem("ecommerce_users")) || [];

            // Find matching user by First Name, Last Name, and Password
            const validUser = users.find(user => 
                user.firstName.toLowerCase() === firstName.toLowerCase() && 
                user.lastName.toLowerCase() === lastName.toLowerCase() && 
                user.password === password
            );

            if (validUser) {
                // Save active session
                localStorage.setItem("loggedInUser", JSON.stringify(validUser));
                alert("Login successful! Redirecting to home...");
                window.location.href = "home.html"; // Redirects to homepage
            } else {
                alert("Invalid First Name, Last Name, or Password. Please check your details or sign up.");
            }
        });
    }


