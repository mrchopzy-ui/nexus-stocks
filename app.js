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
    try {
      const r = await fetch(`https://nse-data-api.vercel.app/stock/${s}`);
      const d = await r.json();

      if (!d.ltp) {
        console.error("No data for", s);
        continue;
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${s}</td>
        <td>${d.ltp}</td>
        <td>${d.change}</td>
        <td>${d.dayHigh}</td>
      `;
      tbody.appendChild(tr);
    } catch (err) {
      console.error("Fetch failed", s, err);
    }
  }
}

loadData();
setInterval(loadData, 15000);
