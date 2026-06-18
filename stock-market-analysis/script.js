/**
 * Stock Market Analysis - UI Logic
 * Integrates Chart.js, mock historical data generation, and UI bindings.
 */

// Timeframe configuration
const TIMEFRAMES = {
  "1M": 30, // 30 daily points
  "3M": 45, // 45 points (approx alternate days)
  "1Y": 60, // 60 points (weekly)
  "5Y": 80, // 80 points (monthly/quarterly)
};

// Stock database matching screenshot metrics & specifications
const stockDatabase = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 3953,
    change: "0.24%",
    changeDirection: "up",
    desc: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services, and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. In addition, the company offers various services, such as Apple Arcade, a game subscription service; Apple Fitness+, a personalized fitness service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was incorporated in 1977 and is headquartered in Cupertino, California.",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 26178,
    change: "0.33%",
    changeDirection: "up",
    desc: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. Its Productivity and Business Processes segment offers Office, Exchange, SharePoint, Microsoft Teams, OneDrive, Skype, and Outlook.com. Its Intelligent Cloud segment provides SQL and Windows Servers, Visual Studio, System Center, and Azure. Its More Personal Computing segment offers Windows OEM licensing and commercial products, MSN advertising, and Xbox hardware, content, and services. The company also offers surface and PC accessories. Microsoft Corporation was founded in 1975 and is headquartered in Redmond, Washington.",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 20507,
    change: "0.21%",
    changeDirection: "up",
    desc: "Alphabet Inc. provides various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, and the Americas. It operates through Google Services, Google Cloud, and Other Bets segments. The Google Services segment offers products and services, including ads, Android, Chrome, hardware, Google Maps, Google Play, Search, and YouTube. The Google Cloud segment provides enterprise-grade cloud platforms, developer tools, database services, and collaboration applications. The Other Bets segment sells health technology and internet services. Alphabet Inc. was founded in 1998 and is headquartered in Mountain View, California.",
  },
  {
    symbol: "AM/N",
    name: "Amazon.com, Inc.",
    price: 15064,
    change: "0.01%",
    changeDirection: "up",
    desc: "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. It operates through three segments: North America, International, and Amazon Web Services (AWS). It sells merchandise and content purchased for resale from third-party sellers through physical and online stores. It also manufactures and sells electronic devices, including Kindle, Fire tablets, Fire TVs, Echo, Ring, and Blink; and produces and media content. Amazon.com, Inc. was incorporated in 1994 and is headquartered in Seattle, Washington.",
  },
  {
    symbol: "PYPL",
    name: "PayPal Holdings, Inc.",
    price: 17699,
    change: "0.10%",
    changeDirection: "up",
    desc: "PayPal Holdings, Inc. operates a technology platform that enables digital payments on behalf of merchants and consumers worldwide. It provides payment solutions under the PayPal, PayPal Credit, Braintree, Venmo, Xoom, Zettle, Hyperwallet, Honey, and Paidy brands. The company's platform allows consumers to shop, transfer funds, and pay bills in approximately 200 markets and 150 currencies. PayPal Holdings, Inc. was founded in 1998 and is headquartered in San Jose, California.",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 14129,
    change: "0.00%",
    changeDirection: "down",
    desc: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. It operates in two segments, Automotive, and Energy Generation and Storage. The Automotive segment offers electric vehicles, as well as sells automotive regulatory credits. The Energy Generation and Storage segment designs, manufactures, installs, sells, and leases solar energy generation and energy storage products. Tesla, Inc. was incorporated in 2003 and is headquartered in Austin, Texas.",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 98108,
    change: "0.35%",
    changeDirection: "up",
    desc: "JPMorgan Chase & Co. operates as a financial services company worldwide. It operates in four segments: Consumer & Community Banking (CCB), Corporate & Investment Bank (CIB), Commercial Banking (CB), and Asset & Wealth Management (AWM). The CCB segment offers deposit, investment, and lending products, cash management, payments, and services. The CIB segment provides investment banking, market-making, prime brokerage, and treasury and securities services. JPMorgan Chase & Co. was founded in 1799 and is headquartered in New York, New York.",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 9915,
    change: "0.19%",
    changeDirection: "up",
    desc: "NVIDIA Corporation provides graphics, and compute and networking solutions worldwide. The company's Graphics segment offers GeForce GPUs for gaming and PCs, the GeForce NOW game streaming service and related infrastructure, and solutions for gaming platforms. Its Compute & Networking segment provides Data Center platforms and systems, Mellanox networking and interconnect solutions, automotive AI Cockpit, autonomous driving development agreements, and Jetson robotics platforms. NVIDIA Corporation was incorporated in 1998 and is headquartered in Santa Clara, California.",
  },
  {
    symbol: "NFLX",
    name: "Netflix, Inc.",
    price: 46654,
    change: "0.00%",
    changeDirection: "down",
    desc: "Netflix, Inc. provides entertainment services with approximately 230 million paid memberships in approximately 190 countries. It offers TV series, documentaries, feature films, and mobile games across various genres and languages. The company provides members the ability to receive streaming content through a host of internet-connected devices, including TVs, digital video players, television set-top boxes, and mobile devices. Netflix, Inc. was incorporated in 1997 and is headquartered in Los Gatos, California.",
  },
  {
    symbol: "DIS",
    name: "The Walt Disney Company",
    price: 53563,
    change: "0.05%",
    changeDirection: "up",
    desc: "The Walt Disney Company operates as an entertainment company worldwide. It operates through two segments: Disney Media and Entertainment Distribution, and Disney Parks, Experiences and Products. The company engages in film and television production and distribution activities, and operates television broadcast networks. It also operates theme parks and resorts, and offers consumer products, including licensing, retail, and e-commerce. The Walt Disney Company was founded in 1923 and is headquartered in Burbank, California.",
  },
];

// App State variables
let activeStock = stockDatabase[0];
let activeTimeframe = "1M";
let chartInstance = null;

// Number formatter adding period as thousands separator
function formatPriceString(val) {
  return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Generate human-friendly label tags for time intervals
function generateTimelineLabels(timeframe) {
  const labels = [];
  const pointsCount = TIMEFRAMES[timeframe];
  const now = new Date();

  for (let i = pointsCount - 1; i >= 0; i--) {
    const dateObj = new Date();
    if (timeframe === "1M") {
      dateObj.setDate(now.getDate() - i);
      labels.push(
        dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      );
    } else if (timeframe === "3M") {
      dateObj.setDate(now.getDate() - i * 2);
      labels.push(
        dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      );
    } else if (timeframe === "1Y") {
      dateObj.setDate(now.getDate() - i * 6);
      labels.push(
        dateObj.toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        }),
      );
    } else if (timeframe === "5Y") {
      dateObj.setDate(now.getDate() - i * 22);
      labels.push(
        dateObj.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
      );
    }
  }
  return labels;
}

// Custom mathematical curve generator representing stock behaviors
function generateHistoricalPricePoints(endPrice, timeframe, direction) {
  const pointsCount = TIMEFRAMES[timeframe];
  const points = [];

  // Base start factors depending on history scale
  let startFactor = 0.94; // 1M starts 6% lower by default
  if (timeframe === "3M") startFactor = 0.88;
  if (timeframe === "1Y") startFactor = 0.72;
  if (timeframe === "5Y") startFactor = 0.48;

  if (direction === "down") {
    startFactor = 1 / startFactor; // start higher, end lower
  }

  const startPrice = endPrice * startFactor;

  for (let i = 0; i < pointsCount; i++) {
    const t = i / (pointsCount - 1);

    // Blend linear progression with wavy components
    const linearTrend = startPrice + (endPrice - startPrice) * t;

    // Multitone wave layout representing cyclic market trends
    const wave1 = Math.sin(t * Math.PI * 3.5) * (endPrice * 0.05);
    const wave2 = Math.sin(t * Math.PI * 8.5) * (endPrice * 0.02);
    const wave3 = Math.cos(t * Math.PI * 1.5) * (endPrice * 0.015);

    // Tiny random noise factor
    const noise = (Math.random() - 0.5) * (endPrice * 0.008);

    // Smooth dampening at boundaries to guarantee neat endpoints
    const boundaryDamping = Math.sin(t * Math.PI);
    let val = linearTrend + (wave1 + wave2 + wave3 + noise) * boundaryDamping;

    if (i === 0) val = startPrice;
    if (i === pointsCount - 1) val = endPrice;

    points.push(Number(val.toFixed(2)));
  }
  return points;
}

// Initializing or redrawing Chart.js config
function updateStockChart() {
  const ctx = document.getElementById("stockChart").getContext("2d");

  const labels = generateTimelineLabels(activeTimeframe);
  const dataPoints = generateHistoricalPricePoints(
    activeStock.price,
    activeTimeframe,
    activeStock.changeDirection,
  );

  // Decide accent palette based on direction
  const isUp = activeStock.changeDirection === "up";
  const colorAccent = isUp ? "#00e676" : "#ff3d71";

  if (chartInstance) {
    chartInstance.destroy();
  }

  // Create beautiful transparent area gradient matching theme
  const gradient = ctx.createLinearGradient(0, 0, 0, 360);
  if (isUp) {
    gradient.addColorStop(0, "rgba(0, 230, 118, 0.22)");
    gradient.addColorStop(1, "rgba(0, 230, 118, 0.0)");
  } else {
    gradient.addColorStop(0, "rgba(255, 61, 113, 0.22)");
    gradient.addColorStop(1, "rgba(255, 61, 113, 0.0)");
  }

  const config = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: activeStock.symbol,
          data: dataPoints,
          borderColor: colorAccent,
          borderWidth: 3.5,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: colorAccent,
          pointHoverBorderColor: "#ffffff",
          pointHoverBorderWidth: 2,
          fill: true,
          backgroundColor: gradient,
          tension: 0.38,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          mode: "index",
          intersect: false,
          backgroundColor: "rgba(3, 6, 35, 0.95)",
          titleColor: "#94a3b8",
          bodyColor: "#ffffff",
          borderColor: "rgba(255, 255, 255, 0.08)",
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function (context) {
              const value = context.parsed.y;
              return "Price: " + formatPriceString(value);
            },
          },
        },
      },
      scales: {
        x: { display: false },
        y: { display: false },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
    },
  };

  chartInstance = new Chart(ctx, config);
}

// Updating sidebar and content fields dynamically
function updateDetailsUI() {
  const titleSpan = document.getElementById("company-name-title");
  const descParagraph = document.getElementById("company-desc");

  // Soft fade transition
  descParagraph.classList.add("fade");

  setTimeout(() => {
    titleSpan.innerText = activeStock.name;
    descParagraph.innerText = activeStock.desc;
    descParagraph.classList.remove("fade");
  }, 150);
}

// Populate and render stock elements in sidebar
function renderSidebarList() {
  const container = document.getElementById("stock-list-container");
  container.innerHTML = "";

  stockDatabase.forEach((stock) => {
    const item = document.createElement("div");
    item.className = `stock-item ${stock.symbol === activeStock.symbol ? "active" : ""}`;
    item.id = `stock-item-${stock.symbol.replace("/", "_")}`;

    const tickerContainer = document.createElement("div");
    tickerContainer.className = "stock-ticker";
    tickerContainer.innerText = stock.symbol;

    const priceContainer = document.createElement("div");
    priceContainer.className = "stock-price";
    priceContainer.innerText = formatPriceString(stock.price);

    const changeContainer = document.createElement("div");
    changeContainer.className = `stock-change ${stock.changeDirection}`;
    changeContainer.innerText = stock.change;

    item.appendChild(tickerContainer);
    item.appendChild(priceContainer);
    item.appendChild(changeContainer);

    item.addEventListener("click", () => {
      if (activeStock.symbol === stock.symbol) return;

      // Update states
      activeStock = stock;

      // Update UI active element selection styling
      document
        .querySelectorAll(".stock-item")
        .forEach((el) => el.classList.remove("active"));
      item.classList.add("active");

      // Refresh chart and text container contents
      updateStockChart();
      updateDetailsUI();
    });

    container.appendChild(item);
  });
}

// Set up timeframe button events
function setupTimeframeControls() {
  const buttons = document.querySelectorAll(".timeframe-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedTf = btn.getAttribute("data-timeframe");
      if (activeTimeframe === selectedTf) return;

      activeTimeframe = selectedTf;

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      updateStockChart();
    });
  });
}

// Initialize application on DOM load
window.addEventListener("DOMContentLoaded", () => {
  renderSidebarList();
  setupTimeframeControls();
  updateStockChart();
  updateDetailsUI();
});
