import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../redux/features/weatherSlice'
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logger)
})
export default store;