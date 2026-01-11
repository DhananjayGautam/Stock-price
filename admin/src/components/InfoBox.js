import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Divider,
  Grid,
  Paper,
  Stack,
  Tooltip
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import CloseIcon from '@mui/icons-material/Close';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useStock } from '../context/StockContext';

function InfoBox() {
  const { stockData } = useStock();

  if (!stockData) return null;

  const getChangeColor = (isPositive) => isPositive ? '#4caf50' : '#f44336';
  const getChangeIcon = (isPositive) => 
    isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />;

  const statItems = [
    { 
      label: 'Open', 
      value: `$${stockData.open}`, 
      icon: <AttachMoneyIcon />,
      color: '#2196f3',
      tooltip: 'Opening price at market open'
    },
    { 
      label: 'High', 
      value: `$${stockData.high}`, 
      icon: <TrendingUpIcon />,
      color: '#4caf50',
      tooltip: 'Highest price during the trading day'
    },
    { 
      label: 'Low', 
      value: `$${stockData.low}`, 
      icon: <LowPriorityIcon />,
      color: '#ff9800',
      tooltip: 'Lowest price during the trading day'
    },
    { 
      label: 'Close', 
      value: `$${stockData.close}`, 
      icon: <CloseIcon />,
      color: '#9c27b0',
      tooltip: 'Closing price at market close'
    },
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        p: 4,
        background: `linear-gradient(135deg, ${stockData.isPositive ? '#4caf50' : '#f44336'} 0%, #2196F3 100%)`
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h3" fontWeight="bold">
              {stockData.symbol}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9, display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <CalendarTodayIcon fontSize="small" />
              {formatDate(stockData.date)}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="h4" fontWeight="bold">
              ${stockData.close}
            </Typography>
            <Chip
              label={`${stockData.isPositive ? '+' : ''}$${stockData.change} (${stockData.isPositive ? '+' : ''}${stockData.changePercent}%)`}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                px: 2,
                py: 1,
                mt: 1,
                border: `2px solid white`
              }}
              icon={getChangeIcon(stockData.isPositive)}
            />
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ p: 4 }}>
        {/* Main Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Tooltip title={item.tooltip} arrow>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    borderLeft: `4px solid ${item.color}`,
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Box sx={{ color: item.color, display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                    </Box>
                    <Typography variant="body1" fontWeight="medium" color="text.secondary">
                      {item.label}
                    </Typography>
                  </Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ color: item.color }}>
                    {item.value}
                  </Typography>
                </Paper>
              </Tooltip>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Additional Info */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, bgcolor: '#f8f9fa', height: '100%' }}>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                📊 Trading Details
              </Typography>
              <Stack spacing={2.5}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>Volume:</Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <VolumeUpIcon color="primary" />
                    <Typography fontWeight="bold">
                      {stockData.volume}
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>Previous Close:</Typography>
                  <Typography fontWeight="bold">
                    ${stockData.previousClose}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>Day's Range:</Typography>
                  <Typography fontWeight="bold" color={getChangeColor(stockData.isPositive)}>
                    ${stockData.low} - ${stockData.high}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>Change:</Typography>
                  <Typography 
                    fontWeight="bold" 
                    color={getChangeColor(stockData.isPositive)}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    {getChangeIcon(stockData.isPositive)}
                    {stockData.isPositive ? '+' : ''}${stockData.change}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, bgcolor: '#f8f9fa', height: '100%' }}>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                📈 Daily Performance
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2">Low: ${stockData.low}</Typography>
                  <Typography variant="body2">High: ${stockData.high}</Typography>
                </Box>
                <Box sx={{ 
                  height: 12, 
                  bgcolor: '#e0e0e0', 
                  borderRadius: 6,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box sx={{
                    position: 'absolute',
                    height: '100%',
                    width: `${((stockData.close - stockData.low) / (stockData.high - stockData.low)) * 100}%`,
                    bgcolor: getChangeColor(stockData.isPositive),
                    borderRadius: 6
                  }} />
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography variant="body2" color="text.secondary">
                    Open: ${stockData.open}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color={getChangeColor(stockData.isPositive)}>
                    Close: ${stockData.close}
                  </Typography>
                </Box>
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    The stock closed
                    <Typography 
                      component="span" 
                      fontWeight="bold" 
                      color={getChangeColor(stockData.isPositive)}
                      sx={{ mx: 1 }}
                    >
                      {stockData.isPositive ? 'above' : 'below'}
                    </Typography>
                    its opening price
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  );
}

export default InfoBox;