import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavoritesState {
  cities: string[]
  cryptos: string[]
}

const initialState: FavoritesState = {
  cities: [],
  cryptos: [],
}

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      const city = action.payload
      if (state.cities.includes(city)) {
        state.cities = state.cities.filter((c) => c !== city)
      } else {
        state.cities.push(city)
      }
    },
    toggleFavoriteCrypto: (state, action: PayloadAction<string>) => {
      const crypto = action.payload
      if (state.cryptos.includes(crypto)) {
        state.cryptos = state.cryptos.filter((c) => c !== crypto)
      } else {
        state.cryptos.push(crypto)
      }
    },
  },
})

export const { toggleFavoriteCity, toggleFavoriteCrypto } = favoriteSlice.actions
export default favoriteSlice.reducer
