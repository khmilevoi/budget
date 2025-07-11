const STORAGE_KEY = 'transactions';

function loadTransactions() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveTransactions(txs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(txs));
}

function renderTransactions() {
  const tbody = document.querySelector('#txTable tbody');
  tbody.innerHTML = '';
  const txs = loadTransactions();
  txs.forEach((tx, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${tx.payer}</td><td>${tx.amount.toFixed(2)}</td><td>${tx.participants.join(', ')}</td><td><button data-idx="${idx}">X</button></td>`;
    tbody.appendChild(tr);
  });
}

function calculateDebts() {
  const txs = loadTransactions();
  const balances = {};
  txs.forEach(tx => {
    const share = tx.amount / tx.participants.length;
    tx.participants.forEach(p => {
      balances[p] = (balances[p] || 0) - share;
    });
    balances[tx.payer] = (balances[tx.payer] || 0) + tx.amount;
  });
  const debtors = Object.keys(balances).filter(n => balances[n] < -0.01).map(n => ({name: n, amount: -balances[n]}));
  const creditors = Object.keys(balances).filter(n => balances[n] > 0.01).map(n => ({name: n, amount: balances[n]}));
  const settlements = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const d = debtors[i];
    const c = creditors[j];
    const pay = Math.min(d.amount, c.amount);
    settlements.push(`${d.name} должен(а) ${c.name} ${pay.toFixed(2)}`);
    d.amount -= pay;
    c.amount -= pay;
    if (d.amount < 0.01) i++;
    if (c.amount < 0.01) j++;
  }
  document.getElementById('debts').textContent = settlements.join('\n');
}

document.getElementById('addForm').addEventListener('submit', e => {
  e.preventDefault();
  const payer = document.getElementById('payer').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const participants = document.getElementById('participants').value.split(',').map(s => s.trim()).filter(Boolean);
  const txs = loadTransactions();
  txs.push({ payer, amount, participants });
  saveTransactions(txs);
  e.target.reset();
  renderTransactions();
  calculateDebts();
});

document.querySelector('#txTable tbody').addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const idx = parseInt(e.target.dataset.idx, 10);
    const txs = loadTransactions();
    txs.splice(idx, 1);
    saveTransactions(txs);
    renderTransactions();
    calculateDebts();
  }
});

window.addEventListener('load', () => {
  renderTransactions();
  calculateDebts();
});
