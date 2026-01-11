import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ClearIcon from '@mui/icons-material/Clear';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useStock } from '../context/StockContext';

function SearchBox() {
  const { getStockInfo, showSnackbar } = useStock();
  const [stock, setStock] = useState('AAPL');
  const [date, setDate] = useState(dayjs().subtract(2, 'day'));
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stock || stock.trim() === '') {
      showSnackbar('Please enter a stock symbol', 'error');
      return;
    }

    if (stock.length > 5) {
      showSnackbar('Stock symbol should be 1-5 characters', 'error');
      return;
    }

    try {
      await getStockInfo(stock.toUpperCase(), date);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleClear = () => {
    setStock('');
    setIsValid(true);
  };

  const handleStockChange = (e) => {
    const value = e.target.value.toUpperCase();
    setStock(value);
    setIsValid(value.length <= 5 && /^[A-Z]*$/.test(value));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendingUpIcon /> Search Stocks
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Stock Symbol"
          variant="outlined"
          value={stock}
          onChange={handleStockChange}
          placeholder="e.g., AAPL, TSLA, MSFT"
          error={!isValid}
          helperText={!isValid ? 'Symbol must be 1-5 uppercase letters' : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TrendingUpIcon />
              </InputAdornment>
            ),
            endAdornment: stock && (
              <InputAdornment position="end">
                <IconButton onClick={handleClear} edge="end" size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Select Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            maxDate={dayjs()}
            minDate={dayjs('1999-01-01')}
            slotProps={{
              textField: {
                fullWidth: true,
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon />
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        </LocalizationProvider>

        <Alert severity="info" sx={{ mt: 1 }}>
          <Typography variant="body2">
            <strong>Tip:</strong> Markets are closed on weekends. For recent dates, select last weekday.
          </Typography>
        </Alert>

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={!stock || !isValid}
          sx={{ 
            mt: 2,
            py: 1.5,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #0D8BF2 90%)',
            }
          }}
          startIcon={<SearchIcon />}
        >
          Get Stock Quote
        </Button>
      </Box>
    </Box>
  );
}

export default SearchBox;