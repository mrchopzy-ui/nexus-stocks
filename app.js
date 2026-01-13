// v4
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
  const url = `https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in${symbol}`;
  const res = await fetch(url);
  return res.json();
}

async function loadData() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  for (let sym of stocks) {
    const q = await getQuote(sym);
    const d = q?.data;

    if (!d) continue;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sym}</td>
      <td>${d.pricecurrent}</td>
      <td>${d.pricechange}%</td>
      <td>${d.high}</td>
    `;
    tbody.appendChild(tr);
  }
}

loadData();
setInterval(loadData, 20000);
