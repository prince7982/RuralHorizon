// ✅ Initialize Netlify Identity
if (window.netlifyIdentity) {
  netlifyIdentity.init();
}

// ---------------- TOGGLE SIGN IN / SIGN UP ----------------
function toggleForm() {
  const title = document.getElementById('authTitle');
  const extra = document.getElementById('authExtraFields');
  const confirm = document.getElementById('authConfirmBox');
  const btn = document.getElementById('authBtn');
  const toggleText = document.getElementById('authToggleText');

  if (title.textContent === "Sign In") {
    title.textContent = "Sign Up";
    extra.classList.remove("hidden");
    confirm.classList.remove("hidden");
    btn.textContent = "Register";

    toggleText.innerHTML = `Already have an account? 
      <span onclick="toggleForm()">Sign in</span>`;
  } else {
    title.textContent = "Sign In";
    extra.classList.add("hidden");
    confirm.classList.add("hidden");
    btn.textContent = "Sign In";

    toggleText.innerHTML = `Don't have an account? 
      <span onclick="toggleForm()">Sign up</span>`;
  }
}

// ---------------- PASSWORD TOGGLE ----------------
function togglePassword(id, icon) {
  const field = document.getElementById(id);

  if (field.type === "password") {
    field.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    field.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

// ---------------- GOOGLE LOGIN ----------------
document.getElementById("authGoogleBtn")?.addEventListener("click", () => {
  netlifyIdentity.open("login"); // opens popup (Google etc)
});

// ---------------- FORM SUBMIT ----------------
document.getElementById("authForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const mode = document.getElementById("authTitle").textContent;
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;

  // -------- SIGN UP --------
  if (mode === "Sign Up") {
    const name = document.getElementById("authName").value;
    const phone = document.getElementById("authPhone").value;
    const confirm = document.getElementById("authConfirmPassword").value;

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    netlifyIdentity.gotrue
      .signup(email, password, {
        full_name: name,
        user_metadata: { phone }
      })
      .then(() => {
        alert("✅ Check your email to confirm your account!");
        toggleForm();
      })
      .catch(err => alert(err.message));

  } 
  // -------- LOGIN --------
  else {
    netlifyIdentity.gotrue
      .login(email, password, true)
      .then(() => {
        window.location.href = "/dashboard.html";
      })
      .catch(err => alert(err.message));
  }
});

// ---------------- GLOBAL AUTH HANDLING ----------------

// ✅ Runs for BOTH Google + Email login
netlifyIdentity.on("login", user => {
  console.log("✅ Logged in:", user);
  netlifyIdentity.close();

  // redirect after login
  window.location.href = "/dashboard.html";
});

// ✅ If already logged in → skip login page
netlifyIdentity.on("init", user => {
  if (user) {
    console.log("✅ Already logged in");
    window.location.href = "/dashboard.html";
  }
});

// ✅ Optional: logout handler (in case used here)
netlifyIdentity.on("logout", () => {
  console.log("User logged out");
});