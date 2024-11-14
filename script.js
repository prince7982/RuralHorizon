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

// Show popup on button click
loginBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
});

// Close popup when close button is clicked
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Close popup when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
});

// Toggle between Sign Up and Sign In forms
toggleFormLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the link from refreshing the page
    if (signupForm.style.display === 'none') {
        // Switch to Sign Up
        signupForm.style.display = 'block';
        signinForm.style.display = 'none';
        formTitle.textContent = 'Sign Up';
        toggleFormLink.textContent = 'Sign in';
        toggleFormLink.previousElementSibling.textContent = 'Create an account';
        toggleFormLink.nextElementSibling.textContent = 'Register with Google';
    } else {
        // Switch to Sign In
        signupForm.style.display = 'none';
        signinForm.style.display = 'block';
        formTitle.textContent = 'Sign In';
        toggleFormLink.textContent = 'Sign up';
        toggleFormLink.previousElementSibling.textContent = 'New to Rural Horizon?';
        toggleFormLink.nextElementSibling.textContent = 'Sign in with Google';
    }
});