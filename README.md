# LinkHub 🔗

## 🖼 Preview

![Home](./assets/img/screens/home.jpg)
![Stats](./assets/img/screens/stats.jpg)

Um site estilo **Linktree**, feito com **HTML5 + CSS3 + JavaScript**, com interatividade, persistência no navegador (LocalStorage) e página de estatísticas.

✅ Projeto construído com boas práticas de **semântica**, **acessibilidade**, **SEO básico**, e organização profissional de arquivos.

---

## 🚀 Funcionalidades

- ✅ Lista de links **dinâmica** (renderizada via JavaScript)
- ✅ Busca/Filtro de links
- ✅ Contador de cliques com persistência (LocalStorage)
- ✅ Página de estatísticas com **tabela ordenável**
- ✅ Alternância de tema **Dark/Light** (persistente)
- ✅ Botão "Copiar link do perfil" (Clipboard API)
- ✅ Página de perfil com **iframe**, **áudio** e **galeria**
- ✅ Página de contato com **validação acessível** (sem backend)

---

## 🛠 Tecnologias Utilizadas

- **HTML5** (semântico)
- **CSS3** (responsivo + variáveis de tema)
- **JavaScript (ES Modules)**  
- **HTML5 APIs**
  - LocalStorage
  - Clipboard API

---

## 📌 Estrutura do projeto

```txt
linkhub/
│
├── index.html
├── perfil.html
├── stats.html
├── contato.html
│
├── assets/
│   ├── img/
│   ├── audio/
│   └── icons/
│
├── css/
│   └── style.css
│
└── js/
    ├── app.js
    ├── links.js
    ├── index.js
    ├── stats.js
    ├── perfil.js
    └── contato.js
