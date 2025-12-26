import { useEffect, useState } from "react";

import weatherService from "../weatherService";
import CODES from "../weatherCodes.json";

export const Country = ({ country }) => {
  const [temp, setTemp] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [wind, setWind] = useState(null);
  const weatherCodeObj = CODES[weatherCode]?.day;

  useEffect(() => {
    weatherService
      .get(country.latlng[0], country.latlng[1])
      .then((response) => {
        setTemp(response.current.temperature_2m);
        setWeatherCode(response.current.weather_code);
        setWind(response.current.wind_speed_10m);
      });
  }, [country]);

  return (
    <>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map((code) => {
          return <li key={code}>{country.languages[code]}</li>;
        })}
      </ul>
      <img src={country.flags.svg} width={220} />
      <h3>Weather</h3>
      <ul>
        <li>Temperature: {temp}</li>
        {weatherCodeObj && (
          <li>
            <img src={weatherCodeObj.image} alt={weatherCodeObj.description} />
          </li>
        )}
        <li>Wind: {wind}</li>
      </ul>
    </>
  );
};
