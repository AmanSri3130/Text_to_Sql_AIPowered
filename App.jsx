import { useState, useRef, useCallback } from 'react';
import {
  Database, Zap, Copy, Check, RotateCcw, ChevronDown, ChevronUp,
  Clock, AlertTriangle, Loader2, Play, Table2, MessageSquare,
  Sparkles, TrendingUp, Shield
} from 'lucide-react';
import { generateSQL } from './lib/sqlcoder';
import { highlightSQL, timeAgo } from './lib/utils';

const EXAMPLES = [
  "Show the top 10 customers by total order value",
  "Find all orders placed in the last 30 days",
  "Count users registered each month in 2024",
  "Get products with less than 5 items in stock",
];

const EXAMPLE_SCHEMA = `CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  price DECIMAL(10,2),
  stock INT DEFAULT 0
);`;

/* Line-number wrapper around highlighted SQL */
function SQLWithLineNumbers({ html }) {
  const lines = html.split('\n');
  return (
    <div className="line-numbers">
      <div className="ln-col">
        {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
      </div>
      <pre
        className="sql-pre fade-up"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export default function App() {
  const [question, setQuestion]     = useState('');
  const [schema, setSchema]         = useState('');
  const [sql, setSql]               = useState('');
  const [status, setStatus]         = useState('idle');
  const [errorMsg, setErrorMsg]     = useState('');
  const [copied, setCopied]         = useState(false);
  const [schemaOpen, setSchemaOpen] = useState(false);
  const [history, setHistory]       = useState([]);
  const textareaRef = useRef(null);

  const handleGenerate = useCallback(async () => {
    if (!question.trim() || status === 'loading') return;
    setStatus('loading');
    setSql('');
    setErrorMsg('');
    try {
      const result = await generateSQL(question, schema);
      setSql(result);
      setStatus('success');
      setHistory(prev => [{ question, sql: result, time: new Date() }, ...prev].slice(0, 8));
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  }, [question, schema, status]);

  const handleKeyDown = e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleGenerate();
  };

  const copySQL = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const reset = () => {
    setQuestion('');
    setSql('');
    setStatus('idle');
    setErrorMsg('');
    textareaRef.current?.focus();
  };

  const loadExample = p => {
    setQuestion(p);
    if (!schema) setSchema(EXAMPLE_SCHEMA);
    if (!schemaOpen) setSchemaOpen(true);
  };

  const isLoading = status === 'loading';

  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="header">
        <div className="logo">
        
          <span className="logo-name">Query<span>X</span></span>
        </div>
        <div className="header-right">
          <div className="model-pill">
            <span className="live-dot" />
            Llama 3.3 70B · Groq
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-tag">
          <Sparkles size={10} />
          AI-Powered Text to SQL
        </div>
        <h1>
          <span className="grad">Turn English into SQL</span><br />
          in milliseconds
        </h1>
        <p>
          Describe the data you need in plain language. QueryX generates
          optimized, production-ready SQL — instantly.
        </p>
      </section>

      {/* ── Stats ── */}
      <div className="stats-bar">
        <div className="stat">
          <div className="stat-icon v"><Zap size={13} /></div>
          Ultra-fast via Groq
        </div>
        <div className="stat">
          <div className="stat-icon g"><Shield size={13} /></div>
          Schema-aware queries
        </div>
        <div className="stat">
          <div className="stat-icon c"><TrendingUp size={13} /></div>
          PostgreSQL optimized
        </div>
      </div>

      {/* ── Example chips ── */}
      <div className="chips">
        {EXAMPLES.map((p, i) => (
          <button key={i} className="chip" onClick={() => loadExample(p)}>
            {p}
          </button>
        ))}
      </div>

      {/* ── Workspace ── */}
      <div className="workspace">

        {/* Left — Input */}
        <div>
          <div className="panel">
            <div className="panel-head">
              <div className="panel-label">
                <MessageSquare size={12} />
                Your Question
              </div>
              <div className="panel-actions">
                <button className="icon-btn" onClick={reset} title="Clear">
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>
            <textarea
              ref={textareaRef}
              className="qx-textarea"
              placeholder="e.g. Show all customers who placed more than 3 orders in the last 90 days..."
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              id="question-input"
              rows={6}
            />
          </div>

          {/* Schema */}
          <button className="schema-toggle-btn" onClick={() => setSchemaOpen(o => !o)}>
            <Table2 size={14} />
            Database Schema (optional)
            {schemaOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
          {schemaOpen && (
            <div className="schema-box">
              <textarea
                className="qx-textarea mono-area"
                placeholder="Paste your CREATE TABLE statements here..."
                value={schema}
                onChange={e => setSchema(e.target.value)}
                id="schema-input"
                rows={5}
              />
              <div className="schema-hint-bar">
                <Zap size={10} />
                Tip: include CREATE TABLE statements for best accuracy
              </div>
            </div>
          )}

          {/* Generate */}
          <button
            className="btn-generate"
            onClick={handleGenerate}
            disabled={!question.trim() || isLoading}
            id="generate-btn"
          >
            {isLoading ? (
              <>
                <Loader2 size={17} style={{ animation: 'spin 0.75s linear infinite' }} />
                Generating…
              </>
            ) : (
              <>
                <Play size={17} />
                Generate SQL Query
                <span className="btn-shortcut">Ctrl + Enter</span>
              </>
            )}
          </button>
        </div>

        {/* Right — Output */}
        <div className="output-sticky">
          <div className="panel" style={{ minHeight: 380 }}>
            <div className="panel-head">
              <div className="panel-label">
                <Database size={12} />
                Generated SQL
              </div>
              {sql && (
                <div className="panel-actions">
                  <button
                    className={`icon-btn ${copied ? 'green' : ''}`}
                    onClick={copySQL}
                    title="Copy"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                </div>
              )}
            </div>

            <div className="sql-body">
              {status === 'idle' && (
                <div className="empty-state">
                  <div className="empty-icon-wrap">
                    <Database size={24} strokeWidth={1.2} />
                  </div>
                  <div>
                    <p>Your SQL query will appear here</p>
                    <p className="sub">Try one of the example prompts above ↑</p>
                  </div>
                </div>
              )}

              {status === 'loading' && (
                <div className="loader-wrap">
                  <div className="loader-ring" />
                  <div className="loader-label">Llama is crafting your query…</div>
                </div>
              )}

              {status === 'error' && (
                <div className="error-wrap">
                  <AlertTriangle size={32} />
                  <p className="error-msg">{errorMsg}</p>
                </div>
              )}

              {status === 'success' && sql && (
                <SQLWithLineNumbers html={highlightSQL(sql)} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── History ── */}
      {history.length > 0 && (
        <div className="history fade-up">
          <div className="section-head">
            <Clock size={11} />
            Recent Queries
          </div>
          <div className="history-grid">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="history-card"
                onClick={() => { setQuestion(item.question); setSql(item.sql); setStatus('success'); }}
              >
                <div className="hc-question">{item.question}</div>
                <div className="hc-sql">{item.sql}</div>
                <div className="hc-time">{timeAgo(item.time)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="footer">
        <p>
          © 2026 QueryX &nbsp;·&nbsp;
          Powered by <a href="https://groq.com" target="_blank" rel="noreferrer">Groq</a> &amp;{' '}
          <a href="https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct" target="_blank" rel="noreferrer">Llama 3.3 70B</a>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Built by <span style={{ color: 'var(--violet)', fontWeight: 600 }}>Aman Srivastava</span>
        </p>
      </footer>

      {/* ── Toast ── */}
      {copied && (
        <div className="toast">
          <Check size={13} />
          Copied to clipboard
        </div>
      )}
    </div>
  );
}
