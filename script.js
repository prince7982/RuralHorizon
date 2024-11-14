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
const toggleParagraph = toggleFormLink.parentElement; // Selects the parent paragraph of the toggle link

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
    formTitle.textContent = 'Sign Up';
    toggleParagraph.innerHTML = 'Already have an account <a href="#" id="toggleFormLink">Sign in</a>'; // Update paragraph for Sign Up form
    updateToggleLink(); // Ensure the event listener is re-attached
}

// Function to display Sign In form
function showSignInForm() {
    signupForm.style.display = 'none';
    signinForm.style.display = 'block';
    formTitle.textContent = 'Sign In';
    toggleParagraph.innerHTML = 'Don\'t have an account? <a href="#" id="toggleFormLink">Sign up</a>'; // Update paragraph for Sign In form
    updateToggleLink(); // Ensure the event listener is re-attached
}

// Function to re-attach event listener to the updated toggle link
function updateToggleLink() {
    const newToggleFormLink = document.getElementById('toggleFormLink');
    newToggleFormLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (signupForm.style.display === 'none') {
            showSignUpForm();
        } else {
            showSignInForm();
        }
    });
}

// Initialize with the updated event listener
updateToggleLink();
