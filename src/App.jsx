// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import './App.css';

// const App = () => {
//     const [weatherDetails, setWeatherDetails] = useState(null);
//     const [position, setPosition] = useState(null);
//     const [weatherPopup, setWeatherPopup] = useState(null);
//     const [location, setLocation] = useState('');
//     const [city, setCity] = useState('');
//     const [state, setState] = useState('');
//     const [country, setCountry] = useState('');
//     const [hourlyForecast, setHourlyForecast] = useState([]);
//     const [dailyForecast, setDailyForecast] = useState([]);

//     const handleLocationChange = (e) => setLocation(e.target.value);
//     const handleStateChange = (e) => setState(e.target.value);
//     const handleCountryChange = (e) => setCountry(e.target.value);
//     const handleCityChange = (e) => setCity(e.target.value);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response = await fetch('http://localhost:3005/weather/name', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ location, city, state, country }),
//         });

//         const data = await response.json();
//         console.log(data)
//         setDailyForecast(data.list)
//         setHourlyForecast(data.list)
//     };

//     const fetchWeather = async (params) => {
//         try {
//             const response = await axios.get('http://localhost:3005/weather', { params });
//             return response.data;
//         } catch (error) {
//             alert('Could not fetch weather data');
//         }
//     };

//     const fetchHourlyForecast = async (lat, lon) => {
//         try {
//             const response = await axios.get('http://localhost:3005/weather/hourly', {
//                 params: { lat, lon },
//             });
//             setHourlyForecast(response.data.list);
//         } catch (error) {
//             alert('Could not fetch hourly forecast data');
//         }
//     };

//     const fetchDailyForecast = async (lat, lon) => {
//         try {
//             const response = await axios.get('http://localhost:3005/weather/daily', {
//                 params: { lat, lon },
//             });
//             setDailyForecast(response.data.list);
//         } catch (error) {
//             alert('Could not fetch daily forecast data');
//         }
//     };

//     const LocationMarker = () => {
//         const map = useMapEvents({
//             click: async (e) => {
//                 const { lat, lng } = e.latlng;

//                 try {
//                     const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
//                     const { address } = response.data;
//                     let cityName = address.town || address.city;
//                     let locationName = address.village || address.hamlet || address.suburb || cityName || address.state_district || address.state || address.country;

//                     if (!locationName) {
//                         locationName = `${address.state || ''}, ${address.country}`;
//                     }
//                     const stateName = address.state;
//                     const countryName = address.country;

//                     const weatherData = await fetchWeather({ hamlet: address.hamlet, village: address.village, city: cityName, state: address.state, country: address.country, lat, lon: lng });
//                     console.log(weatherData)
//                     setPosition([lat, lng]);
//                     setWeatherPopup({
//                         position: [lat, lng],
//                         content: (
//                             <div>
//                                 <h3>Weather in {locationName}</h3>
//                                 <p>Temperature: {weatherData.main.temp} °C</p>
//                                 <p>Weather: {weatherData.weather[0].description}</p>
//                             </div>
//                         ),
//                     });

//                     fetchHourlyForecast(lat, lng);
//                     fetchDailyForecast(lat, lng);
//                 } catch (error) {
//                     console.error('Error fetching location or weather data:', error);
//                 }
//             },
//         });

//         return position ? (
//             <>
//                 {weatherPopup && (
//                     <Marker position={weatherPopup.position}>
//                         <Popup onClose={() => setWeatherPopup(null)}>{weatherPopup.content}</Popup>
//                     </Marker>
//                 )}
//             </>
//         ) : null;
//     };


//     return (
//         <div className="container">
//             <h1>Weather Dashboard</h1>

//             <form onSubmit={handleSubmit}>
//                 <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter village, suburb" />
//                 <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city" />
//                 <input type="text" value={state} onChange={handleStateChange} placeholder="Enter state" />
//                 <input type="text" value={country} onChange={handleCountryChange} placeholder="Enter country" />
//                 <button type="submit">Get Weather</button>
//             </form>
//             <div>
//                 <h3>Hourly Forecast</h3>
//                 <ul>
//                     {hourlyForecast.map((forecast, index) => (
//                         <li key={index}>
//                             {new Date(forecast.dt * 1000).toLocaleTimeString()}: {forecast.main.temp} °C, {forecast.weather[0].description}
//                             {<img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="Weather Icon" />}
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             <div>
//                 <h3>Daily Forecast</h3>
//                 <ul>
//                     {dailyForecast.map((forecast, index) => (
//                         <li key={index}>
//                             {forecast.dt_txt}: {forecast.main.temp} °C, {forecast.weather[0].description},
//                             {<img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="Weather Icon" />}
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: '500px', width: '100%' }}>
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <LocationMarker />
//             </MapContainer>
//         </div>
//     );
// };

// export default App;
import { BrowserRouter,Route,Routes } from "react-router-dom";

import React from 'react'
import UserPreferences from "./components/UserPreferences";
import Map from "./components/Map";
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path = "/" element = {<UserPreferences />} />
        <Route exact path = "/map" element = {<Map />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
