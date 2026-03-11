const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// In-memory call logs
let calls = [];

// Log a new call
app.post('/calls', (req, res) => {
  const call = {
    id: Date.now(),
    agent: req.body.agent,
    duration: req.body.duration,
    outcome: req.body.outcome,
    date: new Date().toISOString()
  };
  calls.push(call);
  res.json(call);
});

// Get all calls
app.get('/calls', (req, res) => {
  res.json(calls);
});

// Productivity stats
app.get('/stats', (req, res) => {
  const totalCalls = calls.length;
  const totalDuration = calls.reduce((sum, c) => sum + c.duration, 0);
  res.json({ totalCalls, totalDuration });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`DialMetrics running on port ${PORT}`));
