import { LINKS } from "./links.js";
import { loadFromStorage, saveToStorage, setTheme, getTheme, toggleTheme } from "./app.js";

const linksList = document.getElementById("linksList");
const searchInput = document.getElementById("search");
const emptyState = document.getElementById("emptyState");
const themeToggle = document.getElementById("themeToggle");

const copyBtn = document.getElementById("copyProfileLink");
const copyFeedback = document.getElementById("copyFeedback");

const stats = loadFromStorage("stats", {});

// --- Theme
setTheme(getTheme());
themeToggle.addEventListener("click", toggleTheme);

// --- Render Links
function renderLinks(list) {
  linksList.innerHTML = "";

  if (list.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  for (const link of list) {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "link-btn";
    a.setAttribute("data-id", link.id);
    a.innerHTML = `<span>${link.icon}</span> <span>${link.label}</span>`;

    a.addEventListener("click", () => registerClick(link.id));

    li.appendChild(a);
    linksList.appendChild(li);
  }
}

// --- Stats
function registerClick(id) {
  const now = new Date().toISOString();

  if (!stats[id]) {
    stats[id] = { clicks: 0, lastClick: null };
  }

  stats[id].clicks += 1;
  stats[id].lastClick = now;

  saveToStorage("stats", stats);
}

// --- Search
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase().trim();
  const filtered = LINKS.filter((l) => l.label.toLowerCase().includes(term));
  renderLinks(filtered);
});

renderLinks(LINKS);

// --- Copy link (Clipboard API)
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copyFeedback.textContent = "Link copiado!";
  } catch {
    copyFeedback.textContent = "Não foi possível copiar. Copie manualmente.";
  }
});
