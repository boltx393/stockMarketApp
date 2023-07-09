document.addEventListener('DOMContentLoaded', function() {
  const stockForm = document.getElementById('stockForm');
  const stockInput = document.getElementById('stockInput');
  const stockChart = document.getElementById('stockChart').getContext('2d');
  let chart = null;

  stockForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const stockName = stockInput.value;
    fetchData(stockName);
  });

  function fetchData(stockName) {
    const apiKey = document.currentScript.getAttribute('data-api-key');
    const API_URL = `https://api.example.com/stocks/${stockName}/history?apiKey=${apiKey}`;

    // Use your preferred method to fetch data, such as Fetch API or Axios
    fetch(API_URL)
      .then(response => response.json())
      .then(data => createChart(data))
      .catch(error => console.error('Error:', error));
  }

  function createChart(data) {
    // Destroy previous chart if it exists
    if (chart) {
      chart.destroy();
    }

    chart = new Chart(stockChart, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: data.stockName,
            data: data.values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
});
