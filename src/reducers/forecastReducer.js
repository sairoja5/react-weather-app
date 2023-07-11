import produce from 'immer';
import {
  GET_FORECAST_SUCCESS,
  SET_CURRENT_LOCATION,
  SET_LOADING,
  SET_LOCATION,
  CHANGE_UNITS,
  SELECT_DAY_FORECAST,
  SET_ERROR,
} from '../actions/actionTypes';

export const initialState = {
  loading: false,
  data: {
    location: {
      place: '',
      currentCoords: [],
    },
    units: 'metric',
    forecast: {},
  },
  error: {
    message: '',
  },
};

const forecastReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return produce(state, (draftState) => {
        draftState.loading = true;
      });
    case SET_CURRENT_LOCATION:
      return produce(state, (draftState) => {
        draftState.data.location.place = '';
        draftState.data.location.currentCoords = action.payload;
      });
    case SET_LOCATION:
      return produce(state, (draftState) => {
        draftState.data.location.place = action.payload.location;
        draftState.data.location.currentCoords = [];
      });
    case GET_FORECAST_SUCCESS:
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.data.forecast = action?.payload;
        draftState.data.forecast.currentForecast = action?.payload?.daily[0];
      });
    case CHANGE_UNITS:
      return produce(state, (draftState) => {
        draftState.data.units = action.payload.units;
      });
    case SELECT_DAY_FORECAST:
      return produce(state, (draftState) => {
        const dayForecast = draftState.data.forecast.daily.find(
          (dayData) => dayData.id === action.payload.id
        );
        draftState.data.forecast.currentForecast = dayForecast;
      });
    case SET_ERROR:
      return produce(state, (draftState) => {
        draftState.loading = false;
      });
    default:
      return state;
  }
};

export default forecastReducer;
