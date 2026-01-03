import { LINKS } from "./links.js";
import {
  loadFromStorage,
  saveToStorage,
  setTheme,
  getTheme,
  toggleTheme,
} from "./app.js";

const themeToggle = document.getElementById("themeToggle");
const sortSelect = document.getElementById("sort");
const resetBtn = document.getElementById("resetStats");
const statsBody = document.getElementById("statsBody");
const emptyStats = document.getElementById("emptyStats");
const statusMsg = document.getElementById("statusMsg");

setTheme(getTheme());
themeToggle.addEventListener("click", toggleTheme);

let stats = loadFromStorage("stats", {});

function getRows() {
  const rows = LINKS.map((link) => {
    const data = stats[link.id] || { clicks: 0, lastClick: null };

    return {
      id: link.id,
      label: link.label,
      clicks: data.clicks || 0,
      lastClick: data.lastClick,
    };
  });

  return rows;
}

function formatDate(iso) {
  if (!iso) return "—";
  const date = new Date(iso);

  // pt-BR com data + hora
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function sortRows(rows, mode) {
  if (mode === "clicks") {
    return rows.sort((a, b) => b.clicks - a.clicks);
  }

  if (mode === "recent") {
    return rows.sort((a, b) => {
      const da = a.lastClick ? new Date(a.lastClick).getTime() : 0;
      const db = b.lastClick ? new Date(b.lastClick).getTime() : 0;
      return db - da;
    });
  }

  if (mode === "az") {
    return rows.sort((a, b) => a.label.localeCompare(b.label));
  }

  return rows;
}

function renderTable() {
  statsBody.innerHTML = "";
  statusMsg.textContent = "";

  const mode = sortSelect.value;
  let rows = getRows();

  const totalClicks = rows.reduce((sum, r) => sum + r.clicks, 0);

  if (totalClicks === 0) {
    emptyStats.hidden = false;
  } else {
    emptyStats.hidden = true;
  }

  rows = sortRows(rows, mode);

  for (const row of rows) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.label}</td>
      <td>${row.clicks}</td>
      <td>${formatDate(row.lastClick)}</td>
    `;

    statsBody.appendChild(tr);
  }
}

sortSelect.addEventListener("change", renderTable);

resetBtn.addEventListener("click", () => {
  const confirmReset = confirm(
    "Tem certeza que deseja resetar todas as estatísticas?"
  );

  if (!confirmReset) return;

  stats = {};
  saveToStorage("stats", stats);

  statusMsg.textContent = "Estatísticas resetadas com sucesso.";
  renderTable();
});

renderTable();
