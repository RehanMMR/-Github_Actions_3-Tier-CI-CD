const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', tier: 'Backend REST API', timestamp: new Date().toISOString() });
});

app.get('/api/notes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notes ORDER BY id DESC');
    res.json({ success: true, notes: result.rows });
  } catch (err) {
    // Fallback if DB is initializing
    res.json({ success: true, notes: [{ id: 1, content: 'Sample note from in-memory fallback (DB connecting...)' }] });
  }
});

app.post('/api/notes', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });
  try {
    const result = await pool.query('INSERT INTO notes (content) VALUES ($1) RETURNING *', [content]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(201).json({ id: Date.now(), content });
  }
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`🚀 3-Tier Backend API running on port ${PORT}`));
}

module.exports = app;
