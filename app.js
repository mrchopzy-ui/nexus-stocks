// v2
const API_KEY = "63ed2d47625c4c03b27aaf0c8b99d7cf";

const stocks = [
  "RELIANCE:NS",
  "HDFCBANK:NS",
  "WIPRO:NS",
  "NESTLEIND:NS",
  "KOTAKBANK:NS",
  "ADANIPOWER:NS",
  "ITC:NS",
  "ONGC:NS",
  "HINDALCO:NS",
  "GAIL:NS"
];

async function getQuote(symbol) {
  const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`;
  const res = await fetch(url);
  return res.json();
}

async function loadData() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  for (let sym of stocks) {
    const q = await getQuote(sym);

    if (!q.price) continue;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sym.replace(".NSE","")}</td>
      <td>${q.price}</td>
      <td>${q.percent_change}%</td>
      <td>${q.high}</td>
    `;
    tbody.appendChild(tr);
  }
}

loadData();
setInterval(loadData, 20000);
