import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import './App.css';

function WeatherApp() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const [forecast, setForecast] = useState([]);

  const toDateFunction = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const days = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ];
    const date = new Date();
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  

  const fetchForecast = async (lat, lon) => {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: '644bed12aecaaf39e94824f69bbd2ab2',
        },
      }
    );
    setForecast(response.data.list);
  };

  const search = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setWeather({ ...weather, loading: true });

      try {
        const res = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              q: input,
              units: 'metric',
              appid: '644bed12aecaaf39e94824f69bbd2ab2',
            },
          }
        );

        setWeather({ data: res.data, loading: false, error: false });
        fetchForecast(res.data.coord.lat, res.data.coord.lon);
        setInput('');
      } catch {
        setWeather({ data: {}, loading: false, error: true });
        setInput('');
      }
    }
  };

  return (
    <>
        <h1 className="app-name">Weather App</h1>

        {/* SEARCH ALWAYS ON TOP */}
        <SearchBar input={input} setInput={setInput} onSearch={search} />
        <div className='container'>
    
            {/* Current Weather */}            
            <CurrentWeather weather={weather} toDateFunction={toDateFunction} />
            

            {/* 5 days forecast */}            
            <Forecast weather={weather} forecast={forecast} />
            
            
        </div>
    </>
    
  );
}

export default WeatherApp;