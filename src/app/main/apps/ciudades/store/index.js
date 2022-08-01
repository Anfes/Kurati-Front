import { combineReducers } from '@reduxjs/toolkit';
import cities from './citiesSlice';
import city from './citySlice';

const reducer = combineReducers({
  cities,
  city
});

export default reducer;
