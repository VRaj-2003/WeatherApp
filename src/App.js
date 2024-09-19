// import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';


function App() {
  const [city,SetCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()]
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day} ,${year}`

  const API_KEY = "2f388078a4485eba397115ef281aa933";
  const fetchWeatherData = async () => {
    try{
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      // console.log(data);
      setWeatherData(data)
      

    } catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchWeatherData();
  },[])

  

  const handleInputChange = (e) => {
    SetCity(e.target.value);
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    fetchWeatherData();
    SetCity('');
  },[fetchWeatherData, SetCity]);

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "/thunder.webp";
      case "Rain":
        return "/rain_with_cloud.webp";
      case "Mist":
        return "/Tornado.webp";
      case "Haze":
        return "/sun.webp";
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className='container' >
      {weatherData && (
        <>
        <h1 className='container_date'>{formattedDate}</h1> 
        <div className='weather_data'>
          <h2 className='container_city'>{weatherData.name}</h2>


          <img
            className='container_img'
            src={getWeatherIconUrl(weatherData.weather[0].main)}
            width="180px"
            alt='Weather Icon'>
          </img>


          <h2 className='container_degree'>{weatherData.main.temp}</h2>
          <h2 className='country_per'>{weatherData.weather[0].main}</h2>
          <form className='form' onSubmit={handleSubmit}>
            <input type='text' className='input' placeholder='Enter City Name' onChange={handleInputChange}/>
            <button type='submit'>Get</button>
          </form>
        </div>
        </>
      )}
        
      </div>
    </div>
  );
}

export default App;
