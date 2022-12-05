import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Search } from "./components/search/Search";
import { CurrentWeather } from "./components/current-weather/CurrentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { Forecast } from "./components/forecast/Forecast";
import { Footer } from "./components/Footer";
import styled from "styled-components";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    // "
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        console.log("--------");
        console.log({ city: searchData.label, ...weatherResponse });
        console.log({ forecastResponse });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const HeadStyle = styled.h2`
    color: #fff;
    border-bottom: 4px solid #edd382;
    /* border-top: 4px solid #edd382; */
    border-radius: 10px;
    padding: 5px;
    margin-top: 26px;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  `;

  return (
    <div className="container">
      <HeadStyle>Weather Forecast</HeadStyle>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      <Footer />
    </div>
  );
}

export default App;

