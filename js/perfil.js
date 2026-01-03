import { setTheme, getTheme, toggleTheme } from "./app.js";

const themeToggle = document.getElementById("themeToggle");

setTheme(getTheme());
themeToggle.addEventListener("click", toggleTheme);
