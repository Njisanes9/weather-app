import React from 'react';
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

function CurrentWeather({ weather, toDateFunction }) {
  if (weather.loading) {
    return (
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        visible={true}
        ariaLabel="oval-loading"
      />
    );
  }

  if (weather.error) {
    return (
      <div className="error-message">
        <FontAwesomeIcon icon={faFrown} size="3x" />
        <p>City not found. Please try again.</p>
      </div>
    );
  }

  if (!weather.data.main) return null;

  return (
    <div className="current">
      <h2>
        {weather.data.name}, {weather.data.sys.country}
      </h2>
      <p className="date">{toDateFunction()}</p>

      <img
        src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
        alt="weather icon"
      />

      <p>{Math.round(weather.data.main.temp)}°C</p>
      <p className="description">{weather.data.weather[0].description}</p>
      <p>Feels like: {Math.round(weather.data.main.feels_like)}°C</p>
      <p>Humidity: {weather.data.main.humidity}%</p>
    </div>
  );
}

export default CurrentWeather;
