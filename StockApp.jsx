import SearchBox from './searchBox';
import InfoBox from './info';
import { useState } from 'react';

export default function weatherApp (){
    let [weather, setWeather] = useState(
        
        {
        city: "Delhi",
        FeelsLike:31.32,
        MaxTemp:27.05,
        MinTemp:27.05,
        humidity:94,
        pressure: 1002,
        temp: 27.0
    }
    )
    let updateInfo = (result)=>{
        setWeather(result)
    }

    return (
        <>
        <SearchBox updateInfo = {updateInfo}></SearchBox>
         <br /><br /><br />
         <InfoBox data = {weather}></InfoBox>
        </>
    )
}