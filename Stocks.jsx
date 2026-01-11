export default function stock (){
    
    const ApiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM`
    const ApiKey = `T77MB275BUHRP0OO`
    "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo"

    let getWeatherInfo = async()=>{
        let URL = await fetch(`${ApiUrl}&apikey=${ApiKey}`)
        let response  = await URL.json();
        // console.log(responses)
        
        console.log(response)
        
         
    }
    getWeatherInfo();
}