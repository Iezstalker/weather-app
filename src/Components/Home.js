import React, { useState } from 'react';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

const Home = (props) => {

  const [input, setInput] = useState('')
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false
  })

  const fetchWeather = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setInput('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      await axios
        .get(url, {
          params: {
            q: input,
            units: 'metric',
            appid: props.apiKey,
          },
        })
        .then((res) => {
          console.log('res', res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput('');
          console.log('error', error);
        });
    }
  };

  const date = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date1 = d.getDate();
    return day + ", " + date1 + ", " + month;
  }

  return (
    <>
      <div className='container my-5 d-block justify-content-center'>
        <h1>Weather App</h1>
        <div className="container-fluid">
          <form className="d-flex" role="search">
            <div className="container d-flex justify-content-center ah5gn-items-center">
              <input className="form-control me-2 w-25 mt-3" type="search" value={input} name='query' id='city' placeholder="Enter City Name..." aria-label="Search" onChange={(e) => { setInput(e.target.value) }} onKeyPress={fetchWeather} />
            </div>
          </form>
          {weather.loading && (
            <>
              <br />
              <Spinner />
            </>)}
          {weather.error && (
            <>
              <br />
              <span className="error-message">
                <FontAwesomeIcon icon={faFrown} />
                <span style={{ fontSize: '20px' }}> City not found</span>
              </span>
            </>)}
          {weather && weather.data && weather.data.main && (
            <div className="container">
              <h1 className="my-4 text-center"><span id="cityName">{weather.data.name}</span>, <span id="countryName">{weather.data.sys.country}</span></h1>
              <h5> <span id="date">{date()}</span> </h5>
              <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt="" />
              <h2><span id="temp">{weather.data.main.temp}</span>&deg;C</h2>
              <div id="weather">{weather.data.weather[0].description.charAt(0).toUpperCase()+weather.data.weather[0].description.slice(1)}</div>
              <div className="my-2">
              <h5 >Wind Speed : <span id="min_temp">{weather.data.wind.speed}m/s</span></h5>
              </div>
              <p id="windspeed"></p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home