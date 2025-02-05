// Get theme toggle button and body
const themeToggleButton = document.getElementById("theme-toggle");
const body = document.body;
const themeToggleButtonIcon = themeToggleButton;

// Load the theme from localStorage if available
const currentTheme = localStorage.getItem("theme");

// Apply the current theme if it exists
if (currentTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggleButtonIcon.textContent = "🌞"; // Sun icon for light mode toggle
} else {
    body.classList.remove("dark-mode");
    themeToggleButtonIcon.textContent = "🌙"; // Moon icon for dark mode toggle
}

// Toggle theme on button click
themeToggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Change the button icon and save theme to localStorage
    if (body.classList.contains("dark-mode")) {
        themeToggleButtonIcon.textContent = "🌞"; // Sun icon
        localStorage.setItem("theme", "dark");
    } else {
        themeToggleButtonIcon.textContent = "🌙"; // Moon icon
        localStorage.setItem("theme", "light");
    }
});
