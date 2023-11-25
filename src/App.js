import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [stockPrices, setStockPrices] = useState([
    { symbol: 'AAPL', company: 'Apple Inc.', price: '111.2' },
    { symbol: 'GOOGL', company: 'Alphabet Inc.', price: '113.4' },
    { symbol: 'MSFT', company: 'Microsoft Corporation', price: '156.2' },
    { symbol: 'AMZN', company: 'Amazon.com Inc.', price: '134.8' }
  ])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://stocktracker-server.onrender.com/stock-prices');
      setStockPrices(response.data);
    } catch (error) {
      console.error('Error fetching stock prices:', error);
    }
  };
  //Fetching stock prices from the mock API every minute
  useEffect(() => {
    const intervalId = setInterval(fetchData, 60000); // Fetch every minute
    return () => clearInterval(intervalId);
  }, []);

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };
  const returnPrice = () => {
    let price = 0;
    stockPrices.find((elem)=> {
      if(elem.symbol == selectedStock){
        price = elem.price
      }
    })

    return price;
  }
  
  return (
    <div>
      <h1>Mini Stock Price Tracker</h1>
      <label>Select Stock:</label>
      <select value={selectedStock} onChange={handleStockChange}>
        <option value="AAPL">Apple Inc.</option>
        <option value="GOOGL">Alphabet Inc.</option>
        <option value="MSFT">Microsoft Corporation</option>
        <option value="AMZN">Amazon.com Inc.</option>
        <option value="WIPRO">Wipro Ltd</option>
        <option value="ITC">ITC Ltd.</option>

      </select>
      <h2>Current Price: {returnPrice()}</h2>
     </div>
  );
}

export default App;
