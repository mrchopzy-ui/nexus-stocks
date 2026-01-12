const API_KEY = "GYpqcfGaAA4VWUJvvPAvG8WCQd29QFZ1";

const stocks = [
  "RELIANCE",
  "HDFCBANK",
  "WIPRO",
  "NESTLEIND",
  "KOTAKBANK",
  "ADANIPOWER",
  "ITC",
  "ONGC",
  "HINDALCO",
  "GAIL"
];

async function getQuote(symbol) {
  const res = await fetch(
    `https://financialmodelingprep.com/api/v3/quote/${symbol}.NS?apikey=${API_KEY}`
  );
  return res.json();
}

async function loadData() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  for (let sym of stocks) {
    const [q] = await getQuote(sym);
    if (!q) continue;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sym}</td>
      <td>${q.price}</td>
      <td>${(q.changesPercentage).toFixed(2)}%</td>
      <td>${q.dayHigh}</td>
    `;
    tbody.appendChild(tr);
  }
}

loadData();
setInterval(loadData, 15000);
