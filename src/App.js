import './App.css';
import { useState, useEffect } from 'react';


function App() {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = 'ad73b65e098a4caf7d846a8efaf6086c';
      const city = 'Hyderabad';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      console.log(data);
      setLoading(false);
    }

    fetchWeather();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather in {weather.name}</h1>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Description: {weather.weather[0].description}</p>
    </div>
  );
}

export default App;
