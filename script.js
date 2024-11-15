let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Function to set a specific slide
function setSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

// Function for automatic slide transition
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  setSlide(currentSlide);
}

// Start the automatic slideshow
setInterval(nextSlide, 5000); // Change slides every 5 seconds

// Initial slide setup
setSlide(currentSlide);

// Toggle navbar for responsive menu
function toggleMenu() {
  const navbarLinks = document.querySelector('.navbar-links');
  navbarLinks.classList.toggle('show');
}


// -------------------section 1-----------------------
function showAlert() {
    alert("Thank you for showing interest! More details coming soon.");
}

        // ----------login page -------------------
// Get elements
const loginBtn = document.getElementById('loginBtn');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
const toggleFormLink = document.getElementById('toggleFormLink');
const formTitle = document.getElementById('formTitle');
const signupForm = document.getElementById('signupForm');
const signinForm = document.getElementById('signinForm');
const resetPasswordForm = document.getElementById('resetPasswordForm'); // New Reset Password form
const resetPasswordLink = document.querySelector('.reset-password-link'); // Link for Reset Password

// Show popup on button click
loginBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
    showSignUpForm(); // Show Sign Up form by default
});

// Close popup when close button is clicked
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Close popup when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

// Function to display Sign Up form
function showSignUpForm() {
    signupForm.style.display = 'block';
    signinForm.style.display = 'none';
    resetPasswordForm.style.display = 'none'; // Hide Reset Password form
    formTitle.textContent = 'Sign Up';
    toggleFormLink.textContent = 'Sign in';
    toggleFormLink.previousElementSibling.textContent = "Already have an account?";
}

// Function to display Sign In form
function showSignInForm() {
    signupForm.style.display = 'none';
    signinForm.style.display = 'block';
    resetPasswordForm.style.display = 'none'; // Hide Reset Password form
    formTitle.textContent = 'Sign In';
    toggleFormLink.textContent = 'Sign up';
    toggleFormLink.previousElementSibling.textContent = "Don't have an account?";
}

// Function to display Reset Password form
function showResetPasswordForm() {
    signupForm.style.display = 'none'; // Hide Sign Up form
    signinForm.style.display = 'none'; // Hide Sign In form
    resetPasswordForm.style.display = 'block'; // Show Reset Password form
    formTitle.textContent = 'Reset Password'; // Update form title
}

// Toggle between Sign Up and Sign In forms when the link is clicked
toggleFormLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent link from refreshing the page
    if (signupForm.style.display === 'none') {
        showSignUpForm();
    } else if (signinForm.style.display === 'none') {
        showSignInForm();
    }else if(resetPasswordForm.style.display === 'none'){
        showSignUpForm();
    }
});

// Show Reset Password form when the reset password link is clicked
resetPasswordLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    showResetPasswordForm();
});

// Optional: Function to go back to Sign In from Reset Password
function showSignInFormFromReset() {
    resetPasswordForm.style.display = 'none'; // Hide Reset Password form
    signinForm.style.display = 'block'; // Show Sign In form
    formTitle.textContent = 'Sign In'; // Update the form title
}
