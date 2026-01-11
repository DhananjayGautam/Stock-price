import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function SearchBox({ updateInfo }) {
    let [Stock, setStock] = useState("");
    let [Date, setDate] = useState(dayjs()); // Initialize as a Day.js object

    const ApiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY`;
    const ApiKey = `T77MB275BUHRP0OO`;

    let getStockInfo = async () => {
        let formattedDate = Date.format('YYYY-MM-DD');
        let URL = await fetch(`${ApiUrl}&symbol=${Stock}&apikey=${ApiKey}`);
        let response = await URL.json();

        let result = {
            open: response["Time Series (Daily)"]?.[formattedDate]?.["1. open"],
            high: response["Time Series (Daily)"]?.[formattedDate]?.["2. high"],
            low: response["Time Series (Daily)"]?.[formattedDate]?.["3. low"],
            close: response["Time Series (Daily)"]?.[formattedDate]?.["4. close"],
        };
        console.log(response);
        return result;
    };

    let handleSearch = (event) => {
        setStock(event.target.value);
    };

    let handleDate = (newValue) => {
        setDate(newValue);  // Set Date as Day.js object
        console.log(newValue.format('YYYY-MM-DD')); // Log the formatted date
    };

    let handleSubmit = async (event) => {
        event.preventDefault();
        setStock("");
        let Stockinfo = await getStockInfo();
        updateInfo(Stockinfo);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="city" 
                    label="Stock Name" 
                    variant="outlined" 
                    value={Stock} 
                    onChange={handleSearch} 
                />
                <br /><br /><br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={[
                            'DatePicker',
                            'MobileDatePicker',
                            'DesktopDatePicker',
                            'StaticDatePicker',
                        ]}
                    >
                        <DemoItem label="Enter Date">
                            <DesktopDatePicker 
                                defaultValue={dayjs('2022-04-17')} 
                                value={Date} 
                                onChange={handleDate} 
                            />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
                <Button variant="contained" type='submit'>
                    Search<SearchIcon />
                </Button>
            </form>
        </>
    );
}
