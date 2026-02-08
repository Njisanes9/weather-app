import React from 'react';

function Forecast({ weather,forecast }) {
  if (!forecast.length) return null;

  const dailyForecast = forecast.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    
    <div className='box'>
        
        <h2>
            {weather.data.name}, {weather.data.sys.country}
        </h2>
        
        <div className="forecast">    
            {dailyForecast.map((day, index) => (
                <div key={index} className="forecast-day">
                <p>{new Date(day.dt_txt).toDateString()}</p>

                <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt="forecast icon"
                />

                <p>{Math.round(day.main.temp)}°C</p>
                </div>
            ))}
        </div>
    </div>
    
  );
}

export default Forecast;
