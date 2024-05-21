import React, { useState } from 'react';
import Header from './Header';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

const UserPreferences = () => {

    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);

    const handleLocationChange = (e) => setLocation(e.target.value);
    const handleStateChange = (e) => setState(e.target.value);
    const handleCountryChange = (e) => setCountry(e.target.value);
    const handleCityChange = (e) => setCity(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const locationDetails = {location,city,state,country}
        const response = await axios.post("https://weather-dashboard-mern.onrender.com/name",locationDetails)

        setDailyForecast(response.data.list)
        setHourlyForecast(response.data.list)
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
            <h1 className='main-heading'>Weather Dashboard</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter village, suburb" />
                <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city" />
                <input type="text" value={state} onChange={handleStateChange} placeholder="Enter state" />
                <input type="text" value={country} onChange={handleCountryChange} placeholder="Enter country" />
                <button type="submit">Get Weather</button>
            </form>
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

export default UserPreferences