export function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

export function getTheme() {
  return localStorage.getItem("theme") || "light";
}

export function toggleTheme() {
  const current = getTheme();
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
}
