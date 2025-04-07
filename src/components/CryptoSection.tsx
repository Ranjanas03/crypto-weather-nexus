'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCryptoData } from '../redux/slices/cryptoSlice'
import { toggleFavoriteCrypto } from '../redux/slices/favoriteSlice'
import { RootState, AppDispatch } from '../redux/store'
import { FaStar } from 'react-icons/fa'

export default function CryptoSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.crypto)
  const favorites = useSelector((state: RootState) => state.favorites.cryptos)

  useEffect(() => {
    dispatch(fetchCryptoData())
  }, [dispatch])

  const handleToggleFavorite = (coinName: string) => {
    dispatch(toggleFavoriteCrypto(coinName))
  }

  const isFavorite = (coinName: string) => favorites.includes(coinName)

  return (
    <section className="rounded-lg">
      <h2 className="text-2xl font-bold mb-4">💰 Crypto Prices</h2>

      {loading && <p>Loading crypto data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 text-white md:grid-cols-3 gap-4">
        {data.map((coin: any) => (
          <div key={coin.id} className="bg-gray-900 p-4 rounded-lg shadow relative">
            <button
              onClick={() => handleToggleFavorite(coin.name)}
              className="absolute top-2 right-2"
              
            >
              <FaStar className={isFavorite(coin.name) ? 'fill-yellow-400 text-yellow-400' : 'text'}/>
            </button>
            <h3 className="text-xl font-semibold mb-3">
              {coin.name} ({coin.symbol.toUpperCase()})
            </h3>
            <p>💵 Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
            <p>📈 24h Change: {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
            <p>🌐 Market Cap: ${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
