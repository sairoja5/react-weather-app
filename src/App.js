import { useEffect, useReducer, createContext, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import LoadingIcons from 'react-loading-icons';
import ApplicationContainer from './components/ApplicationContainer';
import Header from './components/Header';
import SearchContainer from './components/SearchContainer';
import LocationContainer from './components/LocationContainer';
import ForecastDetails from './components/ForecastDetails';
import DailyForecast from './components/DailyForecastContainer';
import getFormattedWeatherData from './services/forecastService';
import Information from './components/Information';
import forecastReducer, { initialState } from './reducers/forecastReducer';
import {
  SET_CURRENT_LOCATION,
  SET_LOADING,
  SET_ERROR,
  GET_FORECAST_SUCCESS,
} from './actions/actionTypes';
import 'react-toastify/dist/ReactToastify.css';

export const forecastContext = createContext(null);

function App() {
  const [weatherData, dispatch] = useReducer(forecastReducer, initialState);

  const setCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          if (result.state === 'granted') {
            navigator.geolocation.getCurrentPosition((position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              dispatch({ type: SET_CURRENT_LOCATION, payload: [lat, lon] });
            });
          } else {
            toast.info('Please allow your browser to access your location');
          }
        });
    }
  }, []);

  useEffect(() => {
    setCurrentLocation();
  }, [setCurrentLocation]);

  useEffect(() => {
    async function getWeatherData(searchParams) {
      dispatch({ type: SET_LOADING });
      const data = await getFormattedWeatherData(searchParams);
      if (data?.error) {
        dispatch({ type: SET_ERROR, payload: { error: data.error } });
        toast.error(data.error);
      } else {
        dispatch({ type: GET_FORECAST_SUCCESS, payload: data });
      }
    }

    const searchParams = weatherData?.data?.location?.place
      ? {
          q: weatherData?.data?.location?.place,
          units: weatherData?.data?.units,
        }
      : weatherData?.data?.location?.currentCoords.length
      ? {
          lat: weatherData?.data?.location?.currentCoords[0],
          lon: weatherData?.data?.location?.currentCoords[1],
          units: weatherData?.data?.units,
        }
      : {};

    if (Object.keys(searchParams).length) {
      getWeatherData(searchParams);
    }
  }, [
    weatherData.data.location.place,
    weatherData.data.location.currentCoords,
    weatherData.data.units,
  ]);

  return (
    <div className='w-full h-full min-h-screen bg-gradient-to-br from-sky-800 to-blue-400'>
      <ApplicationContainer>
        <forecastContext.Provider value={{ weatherData, dispatch }}>
          <Header />
          <SearchContainer setCurrentLocation={setCurrentLocation} />
          {!weatherData.loading &&
            !weatherData.data.location.place &&
            !weatherData.data.location.currentCoords.length && <Information />}
          {weatherData.loading && (
            <div className='flex justify-center m-60'>
              <LoadingIcons.ThreeDots />
            </div>
          )}
          {!weatherData.loading && weatherData.data?.forecast?.daily?.length && (
            <>
              <LocationContainer />
              <ForecastDetails />
              <DailyForecast />
            </>
          )}
        </forecastContext.Provider>
      </ApplicationContainer>
      <ToastContainer />
    </div>
  );
}

export default App;
