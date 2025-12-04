const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'comments.json');

function readComments() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, 'utf8') || '[]';
    return JSON.parse(raw);
  } catch (e) {
    console.error('Read comments error:', e);
    return [];
  }
}

function writeComments(arr) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
  } catch (e) {
    console.error('Write comments error:', e);
  }
}

app.get('/api/ping', (req, res) => res.json({ ok: true }));

app.get('/api/comments', (req, res) => {
  const comments = readComments();
  res.json(comments);
});

app.post('/api/comments', (req, res) => {
  const comment = req.body;
  if (!comment || !comment.timestamp) {
    return res.status(400).json({ error: 'invalid comment' });
  }
  const comments = readComments();
  comments.unshift(comment);
  writeComments(comments);
  res.status(201).json({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API server listening on http://localhost:${port}`));
