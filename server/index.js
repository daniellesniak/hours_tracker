import express from 'express';
import cors from 'cors';
import db from './database.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Get hours for a specific date
app.get('/api/hours/:date', (req, res) => {
  const { date } = req.params;
  db.all('SELECT * FROM hours WHERE date = ? ORDER BY time_from ASC', [date], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Add a new hour entry
app.post('/api/hours', (req, res) => {
  const { date, time_from, time_to } = req.body;
  db.run('INSERT INTO hours (date, time_from, time_to) VALUES (?, ?, ?)', [date, time_from, time_to], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, date, time_from, time_to });
  });
});

// Update an hour entry
app.put('/api/hours/:id', (req, res) => {
  const { id } = req.params;
  const { time_from, time_to } = req.body;
  db.run('UPDATE hours SET time_from = ?, time_to = ? WHERE id = ?', [time_from, time_to, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, time_from, time_to });
  });
});

// Delete an hour entry
app.delete('/api/hours/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM hours WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
