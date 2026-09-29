const contactEmail = "dizzymirrors@outlook.com";
const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

document.querySelector("#year").textContent = new Date().getFullYear();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = encodeURIComponent(`Dizzy Mirrors note from ${data.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
  );

  status.textContent = `Opening your email app. If nothing happens, write to ${contactEmail}.`;
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});
