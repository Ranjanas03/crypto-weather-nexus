'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Star } from 'lucide-react'

export default function FavoritesSection() {
  const favorites = useSelector((state: RootState) => state.favorites)

  return (
    <section>


      {/* Favorite Cities */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🌤 Favorite Cities</h2>
        {favorites.cities.length === 0 ? (
          <p className="text-gray-400 text-white">No favorite cities yet.</p>
        ) : (
          <div className="grid text-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.cities.map((city) => (
              <div
                key={city}
                className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-medium">{city}</h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Favorite Cryptos */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">💰 Favorite Cryptos</h2>
        {favorites.cryptos.length === 0 ? (
          <p className="text-gray-400 text-white">No favorite cryptos yet.</p>
        ) : (
          <div className="grid grid-cols-1 text-white sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.cryptos.map((crypto) => (
              <div
                key={crypto}
                className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-medium">{crypto}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
