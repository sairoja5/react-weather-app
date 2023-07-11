import React, { useContext } from 'react';
import { UilSun, UilSunset } from '@iconscout/react-unicons';
import { forecastContext } from '../App';
import { iconUrlFromCode } from '../services/forecastService';
import { SELECT_DAY_FORECAST } from '../actions/actionTypes';

function DailyForecastComponent() {
  const {
    weatherData: { data },
    dispatch,
  } = useContext(forecastContext);
  const { daily, currentForecast } = data.forecast;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
      {daily.map((item) => (
        <div
          key={item.id}
          onClick={() =>
            dispatch({
              type: SELECT_DAY_FORECAST,
              payload: { id: item.id },
            })
          }
          className={`max-w-full text-white rounded-lg overflow-hidden shadow-md p-2 
				bg-cyan-300 bg-opacity-30 hover:bg-opacity-50
				mt-2 cursor-pointer transition ease-out hover:scale-105 ${
          item.id === currentForecast.id && 'border'
        }`}
        >
          <div className='text-lg text-center'>{item.title}</div>
          <div className='flex items-center justify-evenly'>
            <img
              src={iconUrlFromCode(item.icon)}
              className='w-16 my-1'
              alt=''
            />
            <p className='font-medium text-4xl'>{`${parseInt(item.temp)}°`}</p>
          </div>
          <div className='flex items-center flex-wrap justify-around px-4 space-x-1'>
            <div className='flex font-light text-sm items-center justify-center'>
              <UilSun size={18} className='mr-1' />
              Max:{' '}
              <span className='font-medium ml-1'>{`${parseInt(
                item.temp_max
              )}°`}</span>
            </div>
            <div className='flex font-light text-sm items-center justify-center'>
              <UilSunset size={18} className='mr-1' />
              Min:{' '}
              <span className='font-medium ml-1'>{`${parseInt(
                item.temp_min
              )}°`}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DailyForecastComponent;
