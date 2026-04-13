let currentSlide = 0;
let prevSlide = 0;

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function setSlide(index) {
  prevSlide = currentSlide;
  currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'prev');

    if (i === currentSlide) {
      slide.classList.add('active'); // current → zoom OUT
    } 
    else if (i === prevSlide) {
      slide.classList.add('prev'); // previous → zoom IN
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  setSlide(next);
}

setTimeout(nextSlide, 100); // trigger first transition quickly
setInterval(nextSlide, 6000);

// Initial
setSlide(0);

// Toggle navbar for responsive menu
function toggleMenu() {
  const navbarLinks = document.querySelector('.navbar-links');
  navbarLinks.classList.toggle('show');
}


// -------------------section 1-----------------------
function showAlert() {
    alert("Thank you for showing interest! More details coming soon.");
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


// main 



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


//-------------------------------- Chatbot js ---------------------------
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

  const res = await fetch('/.netlify/functions/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();

  chatBody.lastChild.remove();
  addMessage(data.reply,'bot');
}

input.addEventListener('keypress', (e)=>{
  if(e.key === 'Enter') sendMessage();
});  