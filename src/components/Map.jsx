import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Header from './Header';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Map= () => {
    const [position, setPosition] = useState(null);
    const [weatherPopup, setWeatherPopup] = useState(null);

    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);

    const fetchWeather = async (params) => {
        try {
            const response = await axios.get('https://weather-dashboard-mern.onrender.com/weather', { params });
            return response.data;
        } catch (error) {
            alert('Could not fetch weather data');
        }
    };

        const fetchHourlyForecast = async (lat, lon) => {
        try {
            const response = await axios.get('https://weather-dashboard-mern.onrender.com/weather/hourly', {
                params: { lat, lon },
            });
            setHourlyForecast(response.data.list);
        } catch (error) {
            alert('Could not fetch hourly forecast data');
        }
    };

    const fetchDailyForecast = async (lat, lon) => {
        try {
            const response = await axios.get('https://weather-dashboard-mern.onrender.com/weather/daily', {
                params: { lat, lon },
            });
            setDailyForecast(response.data.list);
        } catch (error) {
            alert('Could not fetch daily forecast data');
        }
    };



    const LocationMarker = () => {
        const map = useMapEvents({
            click: async (e) => {
                const { lat, lng } = e.latlng;

                try {
                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
                    const { address } = response.data;
                    let cityName = address.town || address.city;
                    let locationName = address.village || address.hamlet || address.suburb || cityName || address.state_district || address.state || address.country;

                    if (!locationName) {
                        locationName = `${address.state || ''}, ${address.country}`;
                    }

                    const weatherData = await fetchWeather({ hamlet: address.hamlet, village: address.village, city: cityName, state: address.state, country: address.country, lat, lon: lng });
                    console.log(weatherData)
                    setPosition([lat, lng]);
                    setWeatherPopup({
                        position: [lat, lng],
                        content: (
                            <div>
                                <h3>Weather in {locationName}</h3>
                                <p>Temperature: {weatherData.main.temp} °C</p>
                                <p>Weather: {weatherData.weather[0].description}</p>
                            </div>
                        ),
                    });
                    fetchHourlyForecast(lat, lng);
                    fetchDailyForecast(lat, lng);
                } catch (error) {
                    console.error('Error fetching location or weather data:', error);
                }
            },
        });

        return position ? (
            <>
                {weatherPopup && (
                        <Popup position= {weatherPopup.position} onClose={() => setWeatherPopup(null)}>{weatherPopup.content}</Popup>
                )}
            </>
        ) : null;
    };

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };



  return (
    <div className="container">
        <Header />
        
        <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: '500px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
            </MapContainer>
            <div className='forecast-container'>
                <h3>Hourly Forecast</h3>
                <p>slide the weather forcast</p>
                <Slider {...sliderSettings}>
                    {hourlyForecast.map((forecast, index) => (
                        <div key={index} className="forecast-item">
                            <p>{new Date(forecast.dt * 1000).toLocaleTimeString()}: {forecast.main.temp} °C</p>
                            <p>{forecast.weather[0].description}</p>
                            <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="Weather Icon" />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className='forecast-container'>
                <h3>Daily Forecast</h3>
                <p>slide the weather forcast</p>
                <Slider {...sliderSettings}>
                    {dailyForecast.map((forecast, index) => (
                        <div key={index} className="forecast-item">
                            <p>{forecast.dt_txt}: {forecast.main.temp} °C</p>
                            <p>{forecast.weather[0].description}</p>
                            <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="Weather Icon" />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
  )
}

export default Map