const finalData = [];
const stocks = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "PYPL",
  "TSLA",
  "JPM",
  "NVDA",
  "NFLX",
  "DIS",
];

async function dataFetch(url) {
  const response = await fetch(url);
  const resData = await response.json();
  return resData;
}

async function data() {
  const stockData = await dataFetch(
    "https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata",
  );
  console.log(stockData.stocksStatsData);

  const stockSummaryData = await dataFetch(
    "https://stock-market-api-k9vl.onrender.com/api/profiledata",
  );
  console.log(stockSummaryData.stocksProfileData);

  const stockChartData = await dataFetch(
    "https://stock-market-api-k9vl.onrender.com/api/stocksdata",
  );
  console.log(stockChartData);

  stocks.map((stock) =>
    finalData.push({
      symbol: stock,
      summary: stockSummaryData.stocksProfileData[0]?.[stock]?.summary || "N/A",
      bookValue: stockData.stocksStatsData[0]?.[stock]?.bookValue || "N/A",
      profit: stockData.stocksStatsData[0]?.[stock]?.profit || "N/A",
      chart: stockChartData.stocksData[0]?.[stock] || "N/A",
    }),
  );

  console.log(finalData);
}

data();
window.finalData = finalData;
