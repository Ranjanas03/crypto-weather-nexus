import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
const CITIES = ['New York', 'London', 'Tokyo']

type WeatherData = {
  id: number
  name: string
  main: {
    temp: number
    humidity: number
  }
  weather: {
    description: string
  }[]
}

interface WeatherState {
  data: WeatherData[]
  favorites: string[] // city names
  loading: boolean
  error: string | null
}

// Load persisted favorites
const storedFavorites = typeof window !== 'undefined'
  ? localStorage.getItem('weatherFavorites')
  : null

const initialState: WeatherState = {
  data: [],
  favorites: storedFavorites ? JSON.parse(storedFavorites) : [],
  loading: false,
  error: null,
}

export const fetchWeatherData = createAsyncThunk<WeatherData[]>(
  'weather/fetchWeatherData',
  async () => {
    const responses = await Promise.all(
      CITIES.map((city) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
      )
    )
    return responses.map((res) => res.data)
  }
)

export const fetchCityWeather = createAsyncThunk<WeatherData, string>(
  'weather/fetchCityWeather',
  async (cityName) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    )
    return response.data
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      const city = action.payload
      if (state.favorites.includes(city)) {
        state.favorites = state.favorites.filter((fav) => fav !== city)
      } else {
        state.favorites.push(city)
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('weatherFavorites', JSON.stringify(state.favorites))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeatherData.fulfilled, (state, action: PayloadAction<WeatherData[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong'
      })
      .addCase(fetchCityWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCityWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.loading = false
        const exists = state.data.some(city => city.id === action.payload.id)
        if (!exists) {
          state.data.push(action.payload)
        }
      })
      .addCase(fetchCityWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch city weather'
      })
  },
})

export const { toggleFavoriteCity } = weatherSlice.actions
export default weatherSlice.reducer
