async function fetchStockData() {
    const stocks = ['AAPL', 'GOOGL', 'MSFT'];
    const stockContainer = document.getElementById('stocks');
    stockContainer.innerHTML = '';
    
    try {
        for (let stock of stocks) {
            const response = await fetch(`https://api.polygon.io/v2/last/trade/${stock}?apiKey=YOUR_API_KEY`);
            if (!response.ok) throw new Error('Failed to fetch stock data');
            const data = await response.json();
            
            const stockElement = document.createElement('div');
            stockElement.classList.add('stock');
            stockElement.innerHTML = `<strong>${stock}</strong>: $${data.last.price.toFixed(2)}`;
            stockContainer.appendChild(stockElement);
        }
    } catch (error) {
        stockContainer.innerHTML = '<p>Error fetching stock data. Please try again later.</p>';
        console.error(error);
    }
}

fetchStockData();
setInterval(fetchStockData, 60000);