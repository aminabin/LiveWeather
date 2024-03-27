import React, { useState, useEffect } from 'react';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('C');
  let choosePlace = ""
  let URL = "https://api.openweathermap.org/data/2.5/weather?q=Kathmandu&appid=47b87a7f55c6e3de0f8869814a0a5a33"
 
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(URL)
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  const convertTemperature = (temp) => {
    if (unit === 'C') {
      return `${Math.round(temp - 273.15)}°C`;
    } else {
      return `${Math.round(temp * 9 / 5 - 459.67)}°F`;
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  return (
    <div>
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {convertTemperature(weatherData.main.temp)}</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Feels Like: {convertTemperature(weatherData.main.feels_like)}</p>
          <p>Low Temp: {convertTemperature(weatherData.main.temp_min)}</p>
          <p>High Temp: {convertTemperature(weatherData.main.temp_max)}</p>
          <p>Humidity: {weatherData.main.humidity}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <button onClick={toggleUnit}>
            Convert to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Weather;