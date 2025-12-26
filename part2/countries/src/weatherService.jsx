import axios from "axios";

const get = (lat, long) => {
  const request = axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code,wind_speed_10m`
  );
  return request.then((response) => response.data);
};

export default {
  get: get,
};
