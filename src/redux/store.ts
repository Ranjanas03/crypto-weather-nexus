import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './slices/weatherSlice'
import cryptoReducer from './slices/cryptoSlice'
import newsreducer from "./slices/newsSlice"
import favoritesReducer from './slices/favoriteSlice'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news : newsreducer,
    favorites: favoritesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
