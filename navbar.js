function getBasePath() {
  let depth = window.location.pathname.split('/').length - 2; 
  let prefix = depth > 0 ? '../'.repeat(depth) : ''; 
  return prefix;
}

function loadComponent(file, elementId, callback) {
  let filePath = getBasePath() + file;
  fetch(filePath)
      .then(response => response.text())
      .then(data => {
          document.getElementById(elementId).innerHTML = data;
          if (callback) callback(); // Ensure functions run after navbar loads
      })
      .catch(error => console.error(`Error loading ${file}:`, error));
}

// Function to show loader
function showLoader() {
  const loader = document.getElementById('loader');
  loader.classList.add('visible');
  setTimeout(() => {
      loader.classList.remove('visible');
  }, 2000); 
}

// Function to add loader on navbar links
// function addLoaderToNavbarLinks() {
//   document.querySelectorAll('.navbar-links a').forEach(link => {
//       link.addEventListener('click', (e) => {
//           e.preventDefault();
//           showLoader();
//           const targetUrl = e.target.getAttribute('href');
//           setTimeout(() => {
//               if (targetUrl !== '#') {
//                   window.location.href = targetUrl;
//               }
//           }, 2000); 
//       });
//   });
// }

function addLoaderToNavbarLinks() {
  document.querySelectorAll('.navbar-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      let targetUrl = link.getAttribute('href');

      // ignore empty or anchor links
      if (!targetUrl || targetUrl.startsWith('#')) return;

      e.preventDefault();
      showLoader();

      setTimeout(() => {
        // ✅ If already absolute → use directly
        if (targetUrl.startsWith('/')) {
          window.location.href = targetUrl;
        } else {
          // ✅ Fix relative path dynamically
          window.location.href = getBasePath() + targetUrl;
        }
      }, 1000);
    });
  });
}

// Load navbar and footer on all pages
document.addEventListener("DOMContentLoaded", function () {
  loadComponent("navbar.html", "navbar-container", addLoaderToNavbarLinks); // Call loader function after navbar loads
  loadComponent("footer.html", "footer-container");
});




// Toggle navbar for responsive menu
function toggleMenu() {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.classList.toggle('show');
  }







function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
  
    // Toggle dark mode class
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      darkModeToggle.innerHTML = '🌙'; 
      localStorage.setItem('theme', 'light'); // Save light mode in localStorage
    } else {
      body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '🌞';
      localStorage.setItem('theme', 'dark'); // Save dark mode in localStorage
    }
  }
  
  // Apply the saved theme on page load
  window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      document.getElementById('darkModeToggle').innerHTML = '🌞';
    }
  };


    // loader 

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


  // Global Script for Udaan Seva Samiti
document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Loaded Successfully");

    // Smooth Scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});



//------------------------ ChatBot JS ------------------------------
const toggle = document.getElementById('chatbot-toggle');
const container = document.getElementById('chatbot-container');
const input = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');

toggle.onclick = ()=>{
  container.style.display =
    container.style.display === 'flex' ? 'none' : 'flex';
};

function addMessage(text, sender){
  const msg = document.createElement('div');
  msg.className = 'message ' + sender;
  msg.innerText = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

async function sendMessage(){
  const text = input.value.trim();
  if(!text) return;

  addMessage(text,'user');
  input.value = '';

  addMessage('Typing...','bot');

  try {
    const res = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    chatBody.lastChild.remove();
    addMessage(data.reply || "⚠️ No reply from server",'bot');

  } catch (error) {
    chatBody.lastChild.remove();
    addMessage("❌ Network error. Try again.", 'bot');
  }
}

input.addEventListener('keypress', (e)=>{
  if(e.key === 'Enter') sendMessage();
}); 