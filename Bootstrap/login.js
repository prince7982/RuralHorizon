// Netlify Identity Initialize
netlifyIdentity.init();

// Form toggle logic (Sign In vs Sign Up)
function toggleForm() {
    const mode = document.getElementById('formTitle');
    const signupFields = document.getElementById('signupFields');
    const confirmPasswordField = document.getElementById('confirmPasswordField');
    const toggleText = document.getElementById('toggleText');
    const button = document.getElementById('submitButton');

    if (mode.textContent === 'Sign In') {
        mode.textContent = 'Sign Up';
        signupFields.classList.remove('hidden');
        confirmPasswordField.classList.remove('hidden');
        toggleText.innerHTML = "Already have an account? <a href='#' onclick='toggleForm()'>Sign in</a>";
        button.textContent = 'Register';
    } else {
        mode.textContent = 'Sign In';
        signupFields.classList.add('hidden');
        confirmPasswordField.classList.add('hidden');
        toggleText.innerHTML = "Don't have an account? <a href='#' onclick='toggleForm()'>Sign up</a>";
        button.textContent = 'Sign In';
    }
}

// Password visibility toggle
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = field.type === 'password' ? 'text' : 'password';
}

// Google Login Trigger
document.getElementById('googleLoginBtn')?.addEventListener('click', () => {
    netlifyIdentity.open('login'); 
});

// Form Submit Logic
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const mode = document.getElementById('formTitle').textContent;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (mode === 'Sign Up') {
        const fullName = document.getElementById('fullName').value;
        const contact = document.getElementById('contact').value;
        const confirmPass = document.getElementById('confirmPassword').value;

        if (password !== confirmPass) {
            alert("Passwords do not match!");
            return;
        }

        // Registration Logic
        netlifyIdentity.gotrue.signup(email, password, { 
            full_name: fullName, 
            user_metadata: { 
                contact_number: contact,
                full_name: fullName 
            } 
        }).then(
            (response) => {
                alert("Registration Successful! Please check your email to confirm your account.");
                toggleForm();
            },
            (error) => alert("Signup Error: " + error.message)
        );

    } else {
        // Login Logic with Dashboard Redirect
        netlifyIdentity.gotrue.login(email, password, true).then(
            (user) => {
                alert("Login successful!");
                // Yahan humne redirect change kar diya hai
                window.location.href = "/dashboard.html"; 
            },
            (err) => alert("Login failed: " + err.message)   
        );
    }
});



// ------------------open close eye icon-----------------
  function togglePassword(fieldId, icon) {
        let field = document.getElementById(fieldId);
        if (field.type === "password") {
            field.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            field.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    }