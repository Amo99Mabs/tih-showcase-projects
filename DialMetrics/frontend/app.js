const form = document.getElementById('callForm');
const tableBody = document.querySelector('#callTable tbody');
const statsEl = document.getElementById('stats');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const call = {
    agent: document.getElementById('agent').value,
    duration: parseInt(document.getElementById('duration').value),
    outcome: document.getElementById('outcome').value
  };

  await fetch('/calls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(call)
  });

  loadCalls();
  loadStats();
  form.reset();
});

async function loadCalls() {
  const res = await fetch('/calls');
  const calls = await res.json();
  tableBody.innerHTML = calls.map(c => `
    <tr>
      <td>${c.agent}</td>
      <td>${c.duration}</td>
      <td>${c.outcome}</td>
      <td>${new Date(c.date).toLocaleString()}</td>
    </tr>
  `).join('');
}

async function loadStats() {
  const res = await fetch('/stats');
  const stats = await res.json();
  statsEl.textContent = `Total Calls: ${stats.totalCalls}, Total Duration: ${stats.totalDuration} minutes`;
}

loadCalls();
loadStats();
