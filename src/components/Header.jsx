import React, { useContext } from 'react';
import { forecastContext } from '../App';
import { CHANGE_UNITS } from '../actions/actionTypes';

function Header() {
  const {
    weatherData: { data },
    dispatch,
  } = useContext(forecastContext);
  const { units } = data;

  return (
    <div className='flex justify-between items-baseline'>
      <h1 className='text-3xl font-bold text-white'>Weather Forecast</h1>
      <div className='flex flex-row w-1/4 items-baseline justify-center'>
        <button
          name='metric'
          className={`text-xl text-white ${
            units === 'metric' ? 'font-semibold' : 'font-extralight'
          } transition ease-out hover:scale-125 mx-2`}
          onClick={() =>
            dispatch({
              type: CHANGE_UNITS,
              payload: { units: 'metric' },
            })
          }
        >
          °C
        </button>
        <button
          name='imperial'
          className={`text-xl text-white ${
            units === 'imperial' ? 'font-semibold' : 'font-extralight'
          } transition ease-out hover:scale-125 mx-2`}
          onClick={() =>
            dispatch({
              type: CHANGE_UNITS,
              payload: { units: 'imperial' },
            })
          }
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Header;
