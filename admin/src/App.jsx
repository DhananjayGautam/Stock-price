import React from 'react';
import { Container, Grid, Box, Typography, Paper, CircularProgress } from '@mui/material';
import SearchBox from './components/SearchBox';
import InfoBox from './components/InfoBox';
import StockChart from './components/StockChart';
import PopularStocks from './components/PopularStocks';
import { useStock } from './context/StockContext';

function App() {
  const { stockData, loading, stockSymbol } = useStock();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          📈 Stock Market Tracker
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Real-time stock prices, charts, and analysis
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ borderRadius: 3, height: '100%', p: 3 }}>
            <SearchBox />
            <Box sx={{ mt: 4 }}>
              <PopularStocks />
            </Box>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {loading ? (
            <Box 
              display="flex" 
              flexDirection="column" 
              alignItems="center" 
              justifyContent="center" 
              height="500px"
            >
              <CircularProgress size={80} thickness={4} />
              <Typography variant="h6" sx={{ mt: 3 }}>
                Loading {stockSymbol} data...
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Fetching real-time stock information
              </Typography>
            </Box>
          ) : stockData ? (
            <>
              <InfoBox />
              <Box sx={{ mt: 4 }}>
                <StockChart />
              </Box>
            </>
          ) : (
            <Paper 
              elevation={3} 
              sx={{ 
                height: '500px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: 3,
                p: 4,
                textAlign: 'center'
              }}
            >
              <Box sx={{ fontSize: '5rem', mb: 2 }}>📊</Box>
              <Typography variant="h4" gutterBottom>
                Welcome to Stock Tracker
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mb: 3 }}>
                Search for any stock symbol or select from popular stocks to view detailed 
                price information, charts, and performance metrics.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try searching for: AAPL, TSLA, GOOGL, MSFT, or AMZN
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ mt: 6, pt: 3, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Data provided by Alpha Vantage API • Updated in real-time
        </Typography>
        <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
          Note: Free API limited to 5 requests per minute. Use demo symbols for testing.
        </Typography>
      </Box>
    </Container>
  );
}

export default App;