import './App.css';
import { useState, useEffect } from 'react';


function App() {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tempCity, setTempCity] = useState('');
  const [city, setCity] = useState('');
  const [unhandledError, setUnhandledError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
          const apiKey = 'ad73b65e098a4caf7d846a8efaf6086c';
          
          if (!city) {
            setLoading(false);
            return;
          }

          setLoading(true);

          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
          const response = await fetch(url);
          const data = await response.json();
          setWeather(data);
          setLoading(false);

      } catch (error) {
          if (typeof error === 'string') {
              setUnhandledError(error);
          } else if (error instanceof Error) {
              setUnhandledError(error.message);
          }
          setLoading(false);
      }

    }

    fetchWeather();
  }, [city]);


  return (
    <div>
      <header className="App-header">
        <h1>Weather Tracker&nbsp;&nbsp;
          <i className="fa fa-check-square"></i>
        </h1>
      </header>
      <div style={{padding: '15px', backgroundColor: 'lightblue', marginBlockStart: '40px', width: '60%',
           alignContent: 'center', marginLeft: 'auto', marginRight: 'auto', borderRadius: '12px'}}>

      <input type='text' onKeyPress = {(e) => {if (e.key === 'Enter') setCity(tempCity)}} 
        onChange={(e) => setTempCity(e.target.value)}
        style={{height:'40px', borderRadius: '8px', width: '250px' }} ></input>

        &nbsp;&nbsp;&nbsp;
      <button style={{height: '40px', backgroundColor: 'limegreen', borderRadius: '16px', cursor: "pointer"}}
      onClick={() => setCity(tempCity)}>Get weather</button>

      {!city && <div>No data</div> }

      {loading && <div>Loading...</div>}

      {!loading && weather && weather.cod == 200 && (
        <div>
          <h1>Weather in {weather.name}</h1>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>) 
      }

      {!loading && weather && weather.cod != 200 && <h5>Message: {weather.message}</h5>}

      { unhandledError && <div>Error: {unhandledError}</div> }
    </div>
    </div>
  );
}

export default App;
