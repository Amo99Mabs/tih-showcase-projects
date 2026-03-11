const form = document.getElementById('ticketForm');
const tableBody = document.querySelector('#ticketTable tbody');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const ticket = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value
  };

  await fetch('/tickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket)
  });

  loadTickets();
  form.reset();
});

async function loadTickets() {
  const res = await fetch('/tickets');
  const tickets = await res.json();
  tableBody.innerHTML = tickets.map(t => `
    <tr>
      <td>${t.title}</td>
      <td>${t.description}</td>
      <td>${t.status}</td>
      <td>${new Date(t.date).toLocaleString()}</td>
    </tr>
  `).join('');
}

loadTickets();
