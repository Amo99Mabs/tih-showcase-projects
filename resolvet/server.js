const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Shows the frontend files to the browser
app.use(express.static(path.join(__dirname, 'frontend')));

// Temporary place to store tickets (resets when server restarts)
let tickets = [];

// Add a new ticket
app.post('/tickets', (req, res) => {
  const ticket = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    status: 'open',
    date: new Date().toISOString()
  };
  tickets.push(ticket);
  res.json(ticket);
});

// Get the list of all tickets
app.get('/tickets', (req, res) => {
  res.json(tickets);
});

// Change the status of a ticket
app.put('/tickets/:id', (req, res) => {
  const ticket = tickets.find(t => t.id == req.params.id);
  if (ticket) {
    ticket.status = req.body.status || ticket.status;
    res.json(ticket);
  } else {
    res.status(404).send('Ticket not found');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Resolvet running on port ${PORT}`));
