const uxForm = document.getElementById("ux-form");
const uxStatus = document.getElementById("ux-status");
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzCe4Z8Ro1PU77Du55f7FMaMT458VtikHR9atgEgTyenRTrbv1Q_frZIZDjCz8KPeOL0g/exec";


uxForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  uxStatus.style.color = "black";
  uxStatus.innerText = "Sending... ⏳";

  const formData = new FormData();

  formData.append("name", document.getElementById("ux-name").value);
  formData.append("email", document.getElementById("ux-email").value);
  formData.append("phone", document.getElementById("ux-phone").value);
  formData.append("help", document.getElementById("ux-subject").value);
  formData.append("message", document.getElementById("ux-message").value);
  formData.append("subscribe", document.getElementById("ux-subscribe").checked ? "Yes" : "No");

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: formData
    });

    const result = await response.text();

    if (result === "success") {
      uxStatus.style.color = "green";
      uxStatus.innerText = "✅ Message sent successfully!";
      uxForm.reset();
    } else {
      throw new Error();
    }

  } catch (error) {
    uxStatus.style.color = "red";
    uxStatus.innerText = "❌ Failed to send. Try again.";
  }
});