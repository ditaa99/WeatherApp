import React, { useState } from "react";
import axios from "axios";
import './App.css';
import icon from './assets/cloud_sun_icon.png';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=4ebc8a60856148bd4091164a6e3f2b07`;

  //use the searchLocation function when the user presses the Enter key
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(api).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app" /*style={backgroundStyle}*/>
      <div className="logo">
        <img src={icon} width={70} height={70} alt="" />
        <h2>Weather</h2>
      </div>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation} //use the searchLocation function
          placeholder="City: "
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}°C </h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <>
                {/*display the icon for the weather condition*/}
                {/* <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt=""
                /> */}
                <p>{data.weather[0].main}</p>
              </>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold"> {data.main.pressure} hPa</p>
              ) : null}
              <p>Pressure</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.main ? (
                <p className="bold">{data.wind.speed.toFixed()} m/s</p>
              ) : null}
              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
