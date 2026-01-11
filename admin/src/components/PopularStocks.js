import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Paper,
  Chip,
  Divider
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useStock } from '../context/StockContext';

const POPULAR_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet', sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon', sector: 'Consumer' },
  { symbol: 'TSLA', name: 'Tesla', sector: 'Automotive' },
  { symbol: 'META', name: 'Meta', sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA', sector: 'Semiconductors' },
  { symbol: 'JPM', name: 'JPMorgan', sector: 'Finance' },
  { symbol: 'V', name: 'Visa', sector: 'Finance' },
  { symbol: 'WMT', name: 'Walmart', sector: 'Retail' },
];

function PopularStocks() {
  const { fetchPopularStock, stockSymbol } = useStock();

  const handleStockClick = (symbol) => {
    fetchPopularStock(symbol);
  };

  const getSectorColor = (sector) => {
    const colors = {
      'Technology': '#2196F3',
      'Finance': '#4CAF50',
      'Consumer': '#FF9800',
      'Automotive': '#9C27B0',
      'Semiconductors': '#F44336',
      'Retail': '#00BCD4',
    };
    return colors[sector] || '#757575';
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <TrendingUpIcon /> Popular Stocks
      </Typography>
      
      <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <List sx={{ p: 0 }}>
          {POPULAR_STOCKS.map((stock, index) => (
            <React.Fragment key={stock.symbol}>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => handleStockClick(stock.symbol)}
                  selected={stockSymbol === stock.symbol}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      '&:hover': { bgcolor: 'primary.light' }
                    }
                  }}
                >
                  <ListItemIcon>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '50%', 
                      bgcolor: getSectorColor(stock.sector) + '20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: getSectorColor(stock.sector)
                    }}>
                      {stock.symbol.charAt(0)}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {stock.symbol}
                        </Typography>
                        <Chip 
                          label={stock.sector}
                          size="small"
                          sx={{ 
                            bgcolor: getSectorColor(stock.sector) + '20',
                            color: getSectorColor(stock.sector),
                            height: 20,
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    }
                    secondary={stock.name}
                  />
                </ListItemButton>
              </ListItem>
              {index < POPULAR_STOCKS.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
        Click any stock to load its data
      </Typography>
    </Box>
  );
}

export default PopularStocks;