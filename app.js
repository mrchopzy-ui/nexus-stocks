const API_KEY = "d5id2f9r01qmmfjg5l30d5id2f9r01qmmfjg5l3g";

const stocks = [
  "RELIANCE.NS","HDFCBANK.NS","WIPRO.NS","NESTLEIND.NS","KOTAKBANK.NS",
  "ADANIPOWER.NS","ITC.NS","ONGC.NS","HINDALCO.NS","GAIL.NS"
];

async function getQuote(symbol) {
  const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
  return res.json();
}

async function loadData() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  for (let s of stocks) {
    const q = await getQuote(s);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.replace(".NS","")}</td>
      <td>${q.c}</td>
      <td>${((q.d / q.pc) * 100).toFixed(2)}%</td>
      <td>${q.h}</td>
    `;
    tbody.appendChild(tr);
  }
}

loadData();
setInterval(loadData, 15000);
