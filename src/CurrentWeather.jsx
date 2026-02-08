import React from 'react';
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function CurrentWeather({ weather, toDateFunction }) {

  // 1️⃣ Loading FIRST
  if (weather.loading) {
    return (
      <div className="Loader">
        <Oval height={80} width={80} color="#4fa94d" />
      </div>
    );
  }

  // 2️⃣ Error SECOND
  if (weather.error) {
    return (
      <div className="error-message">
        <FontAwesomeIcon icon={faFrown} size="3x" />
        <p>City not found. Please try again.</p>
      </div>
    );
  }

  // 3️⃣ No data yet (initial state)
  if (!weather.data || !weather.data.main) {
    return (
      <div className="current">
        <p>Search for a city to see the weather 🌍</p>
      </div>
    );
  }

  // 4️⃣ Valid data
  return (
    <div className="current">
      <h2>
        {weather.data.name}, {weather.data.sys.country}
      </h2>
      <p className="date">{toDateFunction()}</p>

      <div className="results">
        <img
          src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
          alt="weather icon"
        />

        <div className="details">
          <p>{Math.round(weather.data.main.temp)}°C</p>
          <p className="description">
            {weather.data.weather[0].description}
          </p>
          <p>Feels like: {Math.round(weather.data.main.feels_like)}°C</p>
          <p>Humidity: {weather.data.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
}


export default CurrentWeather;
