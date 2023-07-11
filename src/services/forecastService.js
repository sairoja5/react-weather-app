import axios from 'axios';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

const getWeatherData = (infoType, searchParams) => {
  const url = process.env.REACT_APP_BASE_URL + '/' + infoType;

  return axios.get(url, {
    params: { ...searchParams, appid: process.env.REACT_APP_API_KEY },
  });
};

const formatCurrentWeather = ({ data }) => {
  const {
    coord: { lat, lon },
    name,
    dt,
    sys: { country },
  } = data;

  return {
    lat,
    lon,
    name,
    country,
    dt,
  };
};

const formatForecastWeather = ({ data }) => {
  let { timezone, daily } = data;

  daily = daily.slice(0, 8).map((d) => {
    return {
      id: uuidv4(),
      title: formatToLocalTime(d.dt, timezone, 'ccc dd'),
      temp: d.temp.day,
      temp_max: d.temp.max,
      temp_min: d.temp.min,
      sunrise: d.sunrise,
      sunset: d.sunset,
      feels_like: d.feels_like.day,
      humidity: d.humidity,
      pressure: d.pressure,
      dt: d.dt,
      wind_speed: d.wind_speed,
      main: d.weather[0].main,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily };
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeatherData(
      'weather',
      searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('onecall', {
      lat,
      lon,
      units: searchParams.units,
      exclude: 'current,minutely,hourly,alerts',
    }).then(formatForecastWeather);
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    return { error: 'Something went wrong. Please try again.' };
  }
};

const formatToLocalTime = (secs, zone, format = 'cccc, dd LLL yyyy') =>
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
