import React from 'react';
import DailyForecastComponent from './DailyForecastComponent';

function DailyForecastContainer() {
  return (
    <div className='mt-8'>
      <h3 className='text-white text-center text-xl mb-6 uppercase tracking-wider'>
        Daily Forecast
      </h3>
      <DailyForecastComponent />
    </div>
  );
}

export default DailyForecastContainer;
