import React, { useContext } from 'react';
import { forecastContext } from '../App';
import { formatToLocalTime } from '../services/forecastService';

function LocationContainer() {
  const {
    weatherData: { data },
  } = useContext(forecastContext);

  const { name, country, timezone, dt, currentForecast } = data.forecast;
  const dateHeader =
    currentForecast &&
    formatToLocalTime(currentForecast.dt, timezone, 'cccc, dd LLL yyyy');
  const updatedTime =
    currentForecast && formatToLocalTime(dt, timezone, 'hh:mm a');

  return (
    <div>
      <div className='text-center text-white text-xl'>{dateHeader}</div>
      <div className='text-center text-white text-sm mt-1'>
        {`Updated as of ${updatedTime}`}
      </div>
      <div className='text-center text-white text-3xl my-6'>{`${name}, ${country}`}</div>
    </div>
  );
}

export default LocationContainer;
