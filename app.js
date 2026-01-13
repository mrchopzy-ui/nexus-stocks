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

async function loadData() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  for (let s of stocks) {
    const r = await fetch(`https://nse-data-api.vercel.app/stock/${s}`);
    const d = await r.json();

    if (!d.ltp) continue;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s}</td>
      <td>${d.ltp}</td>
      <td>${(d.change).toFixed(2)}</td>
      <td>${d.dayHigh}</td>
    `;
    tbody.appendChild(tr);
  }
}

loadData();
setInterval(loadData, 15000);
