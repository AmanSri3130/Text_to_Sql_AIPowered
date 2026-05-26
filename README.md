# ⚡ QueryX — AI-Powered Text-to-SQL Generator

<div align="center">

## 🚀 Turn Plain English into Production-Ready SQL — Instantly

### Built with ❤️ by Aman Srivastava

<img src="https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/Llama%203.3%2070B-Groq-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite" />
<img src="https://img.shields.io/badge/PostgreSQL-Compatible-336791?style=for-the-badge&logo=postgresql" />

<br/>
<br/>

### 🧠 Ask Questions in English → ⚡ Get Optimized SQL in Milliseconds

</div>

---

# 🌟 What is QueryX?

**QueryX** is a modern AI-powered web application that transforms natural language into clean, optimized, production-ready SQL queries.

No SQL expertise required — simply describe the data you need, and QueryX intelligently generates accurate PostgreSQL-compatible SQL using **Meta Llama 3.3 70B** running on **Groq's ultra-fast inference engine**.

---

# ✨ Features

<table>
<tr>
<td width="50%">

## 🤖 AI-Powered SQL Generation
Uses **Llama 3.3 70B** via Groq for highly accurate, context-aware SQL generation.

## ⚡ Blazing Fast Responses
Groq delivers responses at near-instant speed (~750 tokens/sec).

## 🧠 Schema Awareness
Paste your `CREATE TABLE` schema for intelligent table & column mapping.

## 🎨 Syntax Highlighting
Beautiful color-coded SQL output with line numbers.

## 📋 One-Click Copy
Copy generated SQL instantly with toast notifications.

</td>

<td width="50%">

## 🕘 Query History
Access and reuse your last 8 generated queries.

## 💡 Example Prompts
Preloaded prompts help users get started quickly.

## ⌨️ Keyboard Shortcuts
Press `Ctrl + Enter` to generate SQL instantly.

## 📱 Fully Responsive
Optimized for desktop, tablet, and mobile devices.

## 🌙 Clean Developer UI
Minimal, modern interface built for productivity.

</td>
</tr>
</table>

---

# 🖼️ Preview

```txt
💬 User Prompt:
"Show the top 10 customers by total order value"

⚡ QueryX Output:
SELECT c.id, c.name, c.email, SUM(o.total) AS total_order_value
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email
ORDER BY total_order_value DESC
LIMIT 10;
```

---

# 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | Vanilla CSS |
| AI Model | Meta Llama 3.3 70B Instruct |
| Inference API | Groq |
| Icons | Lucide React |
| Fonts | Inter + JetBrains Mono |

---

# ⚙️ Getting Started

## 📌 Prerequisites

Before running the project, make sure you have:

- Node.js v18+
- A free Groq API key from:
  
👉 https://console.groq.com

---

# 📥 Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/queryx.git

cd queryx
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Optional fallback:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

⚠️ Never commit your `.env` file.

---

## 4️⃣ Start Development Server

```bash
npm run dev
```

Open:

```txt
http://localhost:5173
```

---

# 📂 Project Structure

```bash
queryx/
│
├── src/
│   ├── lib/
│   │   ├── sqlcoder.js
│   │   └── utils.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── index.html
├── package.json
└── vite.config.js
```

---

# 🧠 How QueryX Works

## 1️⃣ User Input
The user types a plain English request.

Example:

```txt
Show the top 10 customers by revenue
```

---

## 2️⃣ Schema Context
Users can provide SQL schema (`CREATE TABLE` statements).

---

## 3️⃣ Prompt Engineering
QueryX builds a structured AI prompt with strict SQL-only generation rules.

---

## 4️⃣ Groq Inference
The prompt is sent to **Llama 3.3 70B** running on Groq LPUs for ultra-fast inference.

---

## 5️⃣ SQL Output
The generated SQL is cleaned, formatted, syntax-highlighted, and displayed beautifully.

---

# 🔥 Example

## 💬 Input

```sql
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT,
  total DECIMAL(10,2)
);
```

### User Prompt

```txt
Show the top 10 customers by total order value
```

---

## ⚡ Generated SQL

```sql
SELECT 
    c.id,
    c.name,
    c.email,
    SUM(o.total) AS total_order_value
FROM customers c
JOIN orders o
ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email
ORDER BY total_order_value DESC
LIMIT 10;
```

---

# 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GROQ_API_KEY` | ✅ Yes | Groq API key |
| `VITE_GEMINI_API_KEY` | ❌ Optional | Gemini fallback API |

---

# 🚀 Production Build

```bash
npm run build
```

Production-ready files will be generated inside the `dist/` folder.

---

# 🌍 Deploy on Vercel

## Simple Deployment Steps

### 1️⃣ Push code to GitHub

### 2️⃣ Go to:
👉 https://vercel.com

### 3️⃣ Import Repository

### 4️⃣ Add Environment Variable

```env
VITE_GROQ_API_KEY=your_api_key
```

### 5️⃣ Click Deploy 🚀

---

# 🗺️ Roadmap

- ✅ Query History
- ✅ Syntax Highlighting
- 🔄 Export SQL as `.sql`
- 🔄 Multi-dialect Support
- 🔄 Query Explanation Mode
- 🔄 Saved Query Collections
- 🔄 Dark / Light Theme
- 🔄 SQL Optimization Suggestions
- 🔄 AI Chat Assistant

---

# 🤝 Contributing

Contributions are always welcome!

## Steps

```bash
# Fork the repository

# Create feature branch
git checkout -b feature/amazing-feature

# Commit changes
git commit -m "feat: add amazing feature"

# Push branch
git push origin feature/amazing-feature
```

Then open a Pull Request 🚀

---

# 📜 License

Licensed under the MIT License.

---

<div align="center">

# ❤️ Built by Aman Srivastava

### If you found this project useful, consider giving it a ⭐ on GitHub

## 🚀 QueryX — Making SQL Accessible with AI

</div>
