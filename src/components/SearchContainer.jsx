import React, { useState, useContext } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import { forecastContext } from '../App';
import { SET_LOCATION } from '../actions/actionTypes';

function SearchContainer({ setCurrentLocation }) {
  const [location, setLocation] = useState('');
  const { dispatch } = useContext(forecastContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      setLocation('');
      dispatch({ type: SET_LOCATION, payload: { location } });
    }
  };

  return (
    <div className='mt-16 mb-10 flex flex-row items-center justify-center space-x-4'>
      <form onSubmit={handleSubmit} className='w-1/2'>
        <input
          type='text'
          placeholder='Search...'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className='text-xl font-light p-2 w-full shadow-xl rounded-md focus:outline-none capitalize placeholder:lowercase'
        />
      </form>
      <UilSearch
        size={25}
        onClick={handleSubmit}
        className='text-white cursor-pointer transition ease-out hover:scale-125'
      />
      <UilLocationPoint
        size={25}
        onClick={setCurrentLocation}
        className='text-white cursor-pointer transition ease-out hover:scale-125'
      />
    </div>
  );
}

export default SearchContainer;
