import React, { createContext, useState, useContext, useCallback } from 'react';
import { Alert, Snackbar } from '@mui/material';
import dayjs from 'dayjs';

const StockContext = createContext();

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};

export const StockProvider = ({ children }) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stockSymbol, setStockSymbol] = useState('AAPL');
  const [historicalData, setHistoricalData] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const API_KEY = 'T77MB275BUHRP0OO';
  const BASE_URL = 'https://www.alphavantage.co/query';

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const getStockInfo = useCallback(async (symbol, selectedDate) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error('Invalid stock symbol');
      }

      if (data['Note']) {
        throw new Error('API rate limit reached. Please wait 60 seconds.');
      }

      const timeSeries = data['Time Series (Daily)'];
      
      if (!timeSeries) {
        throw new Error('No data available for this stock');
      }

      // Get the most recent date if no specific date is provided
      const dates = Object.keys(timeSeries).sort().reverse();
      const targetDate = dates[0]; // Most recent date
      
      const dayData = timeSeries[targetDate];
      
      const open = parseFloat(dayData['1. open']);
      const high = parseFloat(dayData['2. high']);
      const low = parseFloat(dayData['3. low']);
      const close = parseFloat(dayData['4. close']);
      const volume = parseInt(dayData['5. volume']);
      const change = close - open;
      const changePercent = ((change / open) * 100).toFixed(2);

      // Prepare historical data for chart (last 7 days)
      const last7Days = dates.slice(0, 7).map(date => ({
        date,
        price: parseFloat(timeSeries[date]['4. close']),
      })).reverse();

      const result = {
        symbol: symbol,
        open: open.toFixed(2),
        high: high.toFixed(2),
        low: low.toFixed(2),
        close: close.toFixed(2),
        volume: volume.toLocaleString(),
        date: targetDate,
        change: change.toFixed(2),
        changePercent: changePercent,
        isPositive: change >= 0,
        previousClose: dates[1] ? parseFloat(timeSeries[dates[1]]['4. close']).toFixed(2) : close.toFixed(2)
      };

      setStockData(result);
      setHistoricalData(last7Days);
      setStockSymbol(symbol);
      showSnackbar(`Successfully loaded ${symbol} data`, 'success');
      
      return result;
    } catch (error) {
      const errorMsg = error.message || 'Failed to fetch stock data';
      setError(errorMsg);
      showSnackbar(errorMsg, 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPopularStock = useCallback(async (symbol) => {
    await getStockInfo(symbol, dayjs());
  }, [getStockInfo]);

  const value = {
    stockData,
    loading,
    error,
    stockSymbol,
    historicalData,
    getStockInfo,
    fetchPopularStock,
    showSnackbar
  };

  return (
    <StockContext.Provider value={value}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </StockContext.Provider>
  );
};