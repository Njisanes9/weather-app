import React, { useState } from 'react';
import { useEffect } from 'react';
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

  {/* Automatically get weather details based on location*/}
const fetchWeatherByCoords = async (lat, lon) => {
    setWeather(prev => ({
    ...prev,
    loading: true,
    error: false
    }));

        try {
        const res = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
            params: {
            lat,
            lon,
            units: 'metric',
            appid: '644bed12aecaaf39e94824f69bbd2ab2',
         },
        }
    );

    setWeather({
    data: res.data,
    loading: false,
    error: false
    });

    const forecastRes = await axios.get(
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

    setForecast(forecastRes.data.list);
    } catch {
            setWeather({
            data: {},
            loading: false,
            error: true
        });
    }
    };


 {/*Search function*/}
  const search = async (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();

        setWeather(prev => ({
        ...prev,
        loading: true,
        error: false
        }));

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

        setWeather({
            data: res.data,
            loading: false,
            error: false,
        });

        // Getting forecast
        const forecastRes = await axios.get(
            'https://api.openweathermap.org/data/2.5/forecast',
            {
            params: {
                lat: res.data.coord.lat,
                lon: res.data.coord.lon,
                units: 'metric',
                appid: '644bed12aecaaf39e94824f69bbd2ab2',
            },
            }
        );

        setForecast(forecastRes.data.list);
        setInput('');
        } catch {
        setWeather({
            data: {},
            loading: false,
            error: true,
        });

        setForecast([]); // 
        setInput('');
        }
    }
    };

    {/*Confirming with the user their location*/}
    useEffect(() => {
        if (!navigator.geolocation) {
            console.warn('Geolocation not supported');
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
            },
            () => {
            console.warn('User denied location access');
            }
        );
    }, []);


  return (
    <>
        <h1 className="app-name">Weather App</h1>

        {/* Searchbar */}
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