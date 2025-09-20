import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function WeatherInfo({ location, setLocation }) {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [manualLocation, setManualLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (lat, lon) => {
    if (!lat || !lon) return;
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      if (!apiKey) {
        setError("Weather API key is not configured.");
        setLoading(false);
        return;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      if (response.data) {
        setWeather({
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          weatherCondition: response.data.weather[0]?.description || '',
          locationName: response.data.name
        });
      } else {
        setError(t('weatherInfo.error'));
      }
    } catch {
      setError(t('weatherInfo.error'));
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather on location change
  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      fetchWeather(location.latitude, location.longitude);
      setManualLocation('');
    }
  }, [location]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualLocation.trim() === '') return;
    // Fetch coords for manual location entered by user
    fetchLatLonForLocation(manualLocation.trim());
  };

  const fetchLatLonForLocation = async (loc) => {
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(loc)}&countrycodes=in&limit=1`
      );
      if (response.data && response.data.length > 0) {
        const locData = response.data[0];
        const lat = parseFloat(locData.lat);
        const lon = parseFloat(locData.lon);
        setLocation({ latitude: lat, longitude: lon });
      } else {
        setError(t('weatherInfo.error'));
      }
    } catch {
      setError(t('weatherInfo.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-label={t('weatherInfo.title')}>
      <h2>{t('weatherInfo.title')}</h2>
      {loading && <p>Loading weather data...</p>}
      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <>
          <p><strong>{t('weatherInfo.location')}:</strong> {weather.locationName || manualLocation}</p>
          <p><strong>{t('weatherInfo.temperature')}:</strong> {weather.temperature} °C</p>
          <p><strong>{t('weatherInfo.humidity')}:</strong> {weather.humidity} %</p>
          <p><strong>{t('weatherInfo.rainfall')}:</strong> {weather.weatherCondition}</p>
        </>
      )}

      <form onSubmit={handleManualSubmit} aria-label={t('weatherInfo.manualLocation')}>
        <label htmlFor="manualLocationInput">{t('weatherInfo.manualLocation')}</label>
        <input
          id="manualLocationInput"
          type="text"
          value={manualLocation}
          onChange={(e) => setManualLocation(e.target.value)}
          placeholder="e.g., Bangalore"
          aria-describedby="manualLocationHint"
        />
        <button type="submit">{t('weatherInfo.manualLocation')}</button>
      </form>
    </section>
  );
}
