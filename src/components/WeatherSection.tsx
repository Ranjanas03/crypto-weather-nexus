'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeatherData, fetchCityWeather } from '../redux/slices/weatherSlice'
import { RootState, AppDispatch } from '../redux/store'
import { toggleFavoriteCity } from '../redux/slices/favoriteSlice'
import { FaStar } from 'react-icons/fa'

export default function WeatherSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.weather)
  const favorites = useSelector((state: RootState) => state.favorites.cities)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchWeatherData())
  }, [dispatch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      dispatch(fetchCityWeather(search.trim()))
      setSearch('')
    }
  }

  const handleToggleFavorite = (cityName: string) => {
    dispatch(toggleFavoriteCity(cityName))

  }

  const isFavorite = (cityName: string) => favorites.includes(cityName)

  return (
    <main>
      <h1 className="text-3xl font-bold mb-5">🌤 Weather Data</h1>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter city name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md flex-1 text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading weather...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((city: any) => (
          <div key={city.id} className="p-4 text-white rounded bg-gray-900 relative">
            <button
              onClick={() => handleToggleFavorite(city.name)}
              className="absolute top-2 right-2"
            >
              <FaStar className={isFavorite(city.name) ? 'fill-yellow-400 text-yellow-400' : 'text'} />
            </button>
            <h2 className="text-xl mb-3 font-semibold">{city.name}</h2>
            <p>🌡 Temp: {city.main.temp}°C</p>
            <p>💧 Humidity: {city.main.humidity}%</p>
            <p>☁️ Condition: {city.weather[0].description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
