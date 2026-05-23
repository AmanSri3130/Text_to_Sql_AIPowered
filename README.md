⚡ QueryX — AI-Powered Text-to-SQL Generator
Turn plain English into production-ready SQL queries — instantly. Built by Aman Srivastava

What is QueryX?
QueryX is a sleek, AI-powered web application that converts natural language questions into optimized SQL queries in milliseconds. No SQL expertise required — just describe what data you need and QueryX handles the rest.

It uses Llama 3.3 70B running on Groq's ultra-fast inference API to generate clean, PostgreSQL-compatible SQL with full schema awareness.

Features
AI-Powered — Uses Llama 3.3 70B via Groq for accurate, context-aware SQL generation
Blazing Fast — Groq delivers responses at ~750 tokens/second (near-instant)
Schema-Aware — Provide your CREATE TABLE schema for precise column and table names
Syntax Highlighting — Color-coded SQL output with line numbers
One-Click Copy — Copy generated SQL to clipboard with a toast notification
Query History — Browse and re-use your last 8 generated queries
Example Prompts — Click-to-fill starter prompts with preloaded schema
Keyboard Shortcut — Ctrl + Enter to generate instantly
Fully Responsive — Works on desktop and mobile
Tech Stack
Layer	Technology
Frontend	React 18 + Vite 5
Styling	Vanilla CSS (custom design system)
AI Model	Meta Llama 3.3 70B Instruct
Inference API	Groq (groq.com)
Icons	Lucide React
Fonts	Inter + JetBrains Mono
Getting Started
Prerequisites
Node.js v18 or higher
A free Groq API Key — sign up at https://console.groq.com
Step 1 — Clone the Repository

git clone https://github.com/your-username/queryx.git
cd queryx
Step 2 — Install Dependencies
npm install
Step 3 — Set Up Environment Variables
Create a .env file in the root directory and add:

VITE_GROQ_API_KEY=your_groq_api_key_here
Get your free API key at: https://console.groq.com

Step 4 — Start the Development Server
npm run dev
Open http://localhost:5173 in your browser.

Project Structure

queryx/
├── src/
│   ├── lib/
│   │   ├── sqlcoder.js      ← Groq API integration & prompt engineering
│   │   └── utils.js         ← SQL syntax highlighter & time utilities
│   ├── App.jsx              ← Main UI component
│   ├── index.css            ← Complete design system
│   └── main.jsx             ← React entry point
├── .env                     ← API keys (never commit this)
├── index.html
├── package.json
└── vite.config.js
How It Works
User Input — You type a natural language question Example: "Show the top 10 customers by revenue"

Schema Context — You optionally paste your database schema (CREATE TABLE statements)

Prompt Engineering — QueryX builds a structured prompt with strict SQL-only output rules

Groq Inference — The prompt is sent to Llama 3.3 70B running on Groq's LPU hardware

SQL Output — The response is cleaned, syntax-highlighted, and displayed with line numbers

Example
Question you type:

Show the top 10 customers by total order value
Schema you provide:

sql

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
SQL QueryX generates:

sql

SELECT c.id, c.name, c.email, SUM(o.total) AS total_order_value
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email
ORDER BY total_order_value DESC
LIMIT 10;
Environment Variables
Variable	Required	Description
VITE_GROQ_API_KEY	Yes	Your Groq API key from console.groq.com
VITE_GEMINI_API_KEY	No	Google Gemini key (optional fallback)
Never commit your .env file. It is already listed in .gitignore.

Build for Production
npm run build
Output goes into the dist/ folder — ready to deploy to Vercel, Netlify, or GitHub Pages.

To deploy on Vercel:

Push your code to GitHub
Go to vercel.com and import your repository
Add VITE_GROQ_API_KEY in the Environment Variables section
Click Deploy
Roadmap
Export queries as .sql file
Multi-dialect support (MySQL, SQLite, BigQuery)
Query explanation mode
Saved query collections
Dark / Light theme toggle
Query optimization suggestions
Contributing
Contributions are welcome!

Fork the repository
Create a new branch: git checkout -b feature/your-feature
Commit your changes: git commit -m "feat: add your feature"
Push to your branch: git push origin feature/your-feature
Open a Pull Request
License
This project is licensed under the MIT License.

Made with love by Aman Srivastava

If you found this useful, give it a star on GitHub!
