import React, { useContext } from 'react';
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
  UilClock,
} from '@iconscout/react-unicons';
import { forecastContext } from '../App';
import {
  formatToLocalTime,
  iconUrlFromCode,
} from '../services/forecastService';

function ForecastDetails() {
  const {
    weatherData: { data },
  } = useContext(forecastContext);

  const { timezone } = data.forecast;
  const {
    temp,
    main: details,
    feels_like,
    humidity,
    wind_speed,
    pressure,
    sunrise,
    sunset,
    temp_max,
    temp_min,
    icon,
  } = data.forecast.currentForecast;
  const sunriseTime =
    sunrise && timezone && formatToLocalTime(sunrise, timezone, `hh:mm a`);
  const sunsetTime =
    sunrise && timezone && formatToLocalTime(sunset, timezone, `hh:mm a`);
  return (
    <div className='text-white lg:mt-14 grid grid-cols-2 md:grid-cols-3'>
      <div className='mx-auto'>
        <img src={iconUrlFromCode(icon)} alt='' className='w-25' />
      </div>
      <div>
        <div className='text-center text-6xl'>{`${parseInt(temp)}°`}</div>
        <p className='text-center py-2 text-xl text-cyan-300'>{details}</p>
      </div>
      <div className='space-y-2 mt-3 md:mt-0'>
        <div className='flex font-light text-sm items-center justify-center'>
          <UilTemperature size={18} className='mr-1' />
          Real fell:
          <span className='font-medium ml-1'>{`${parseInt(feels_like)}°`}</span>
        </div>
        <div className='flex font-light text-sm items-center justify-center'>
          <UilTear size={18} className='mr-1' />
          Humidity:
          <span className='font-medium ml-1'>{`${humidity} %`}</span>
        </div>
        <div className='flex font-light text-sm items-center justify-center'>
          <UilWind size={18} className='mr-1' />
          Wind:
          <span className='font-medium ml-1'>{`${wind_speed} KM/H`}</span>
        </div>
        <div className='flex font-light text-sm items-center justify-center'>
          <UilClock size={18} className='mr-1' />
          Pressure:
          <span className='font-medium ml-1'>{`${pressure} hPa`}</span>
        </div>
      </div>
      <div
        className='space-y-2 md:space-y-0 mt-3 flex flex-col md:flex-row 
      md:col-span-3 md:justify-center md:align-bottom md:space-x-6 md:mt-8'
      >
        <div className='flex font-light text-sm items-center justify-center'>
          <UilSun size={18} className='mr-1' />
          Rise: <span className='font-medium ml-1'>{sunriseTime}</span>
        </div>
        <div className='flex font-light text-sm items-center justify-center'>
          <UilSunset size={18} className='mr-1' />
          Set: <span className='font-medium ml-1'>{sunsetTime}</span>
        </div>
        <div className='flex font-light text-sm items-center justify-center'>
          <UilArrowUp size={18} className='mr-1' />
          High:{' '}
          <span className='font-medium ml-1'>{`${parseInt(temp_max)}°`}</span>
        </div>
        <div className='flex font-light text-sm items-center justify-center'>
          <UilArrowDown size={18} className='mr-1' />
          Low:{' '}
          <span className='font-medium ml-1'>{`${parseInt(temp_min)}°`}</span>
        </div>
      </div>
    </div>
  );
}

export default ForecastDetails;
