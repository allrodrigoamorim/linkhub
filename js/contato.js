import { setTheme, getTheme, toggleTheme } from "./app.js";

const themeToggle = document.getElementById("themeToggle");
setTheme(getTheme());
themeToggle.addEventListener("click", toggleTheme);

const form = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

const fields = {
  name: {
    input: document.getElementById("name"),
    error: document.getElementById("nameError"),
    validate: (value) => value.trim().length >= 2 || "Digite seu nome (mín. 2 caracteres).",
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("emailError"),
    validate: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Digite um e-mail válido.",
  },
  subject: {
    input: document.getElementById("subject"),
    error: document.getElementById("subjectError"),
    validate: (value) => value !== "" || "Selecione um assunto.",
  },
  message: {
    input: document.getElementById("message"),
    error: document.getElementById("messageError"),
    validate: (value) =>
      value.trim().length >= 10 || "Mensagem curta demais (mín. 10 caracteres).",
  },
};

function showError(fieldKey, msg) {
  fields[fieldKey].error.textContent = msg;
  fields[fieldKey].input.setAttribute("aria-invalid", "true");
}

function clearError(fieldKey) {
  fields[fieldKey].error.textContent = "";
  fields[fieldKey].input.removeAttribute("aria-invalid");
}

function validateField(fieldKey) {
  const value = fields[fieldKey].input.value;
  const result = fields[fieldKey].validate(value);

  if (result !== true) {
    showError(fieldKey, result);
    return false;
  }

  clearError(fieldKey);
  return true;
}

Object.keys(fields).forEach((key) => {
  fields[key].input.addEventListener("blur", () => validateField(key));
  fields[key].input.addEventListener("input", () => {
    if (fields[key].error.textContent) validateField(key);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  feedback.textContent = "";

  const valid = Object.keys(fields).every((key) => validateField(key));

  if (!valid) {
    feedback.textContent = "Corrija os campos destacados antes de enviar.";
    return;
  }

  // Simulação de envio (sem backend)
  feedback.textContent = "Mensagem enviada com sucesso! ✅ (simulação)";
  form.reset();

  // limpar erros
  Object.keys(fields).forEach((key) => clearError(key));
});
