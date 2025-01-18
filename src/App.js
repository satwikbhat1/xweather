import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a valid city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=8f982a1b135f4c3ea50134119251801&q=${city}`
      );
      setWeatherData(response.data);
    } catch (err) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeather();
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="loading-message">Loading data...</p>}

      {error && <p className="error-message">{error}</p>}

      <div className="weather-cards">
        {weatherData && (
          <div className="weather-cards">
            <div className="weather-card">
              Temperature: {weatherData.current.temp_c} °C
            </div>
            <div className="weather-card">
              Humidity: {weatherData.current.humidity} %
            </div>
            <div className="weather-card">
              Condition: {weatherData.current.condition.text}
            </div>
            <div className="weather-card">
              Wind Speed: {weatherData.current.wind_kph} kph
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
