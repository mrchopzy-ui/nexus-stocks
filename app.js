const stocks = [
  "RELIANCE.NS",
  "HDFCBANK.NS",
  "WIPRO.NS",
  "NESTLEIND.NS",
  "KOTAKBANK.NS",
  "ADANIPOWER.NS",
  "ITC.NS",
  "ONGC.NS",
  "HINDALCO.NS",
  "GAIL.NS"
];

async function getQuote(symbol) {
  const url = `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.quoteResponse.result[0];
}

async function loadData() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  for (let sym of stocks) {
    const q = await getQuote(sym);
    if (!q) continue;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sym.replace(".NS","")}</td>
      <td>${q.regularMarketPrice}</td>
      <td>${q.regularMarketChangePercent?.toFixed(2)}%</td>
      <td>${q.regularMarketDayHigh}</td>
    `;
    tbody.appendChild(tr);
  }
}

loadData();
setInterval(loadData, 20000);
