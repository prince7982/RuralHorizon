// Show loader for a few seconds
function showLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('visible');
    setTimeout(() => {
      loader.classList.remove('visible');
    }, 2000); // Adjust the timeout duration as needed (in milliseconds)
  }
  
  // Add event listeners to navigation links
  document.querySelectorAll('.navbar-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior
      showLoader();
      const targetUrl = e.target.getAttribute('href');
      setTimeout(() => {
        if (targetUrl !== '#') {
          window.location.href = targetUrl; // Navigate to the target after loader
        }
      }, 2000); // Match the timeout duration
    });
  });
  