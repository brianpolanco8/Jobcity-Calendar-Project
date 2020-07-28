import axios from "axios";

class Api {
  static getWeatherByCity(cityName) {
    return axios.get(
      `https://community-open-weather-map.p.rapidapi.com/weather?q=${cityName}&units=metric`,
      {
        headers: {
          Accept: "application/json",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
      }
    );
  }
}

export default Api;
