'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function TopCryptoTable() {
  const { data, loading, error } = useSelector((state: RootState) => state.crypto)

  const top5 = data.slice(0, 5)

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">🏆 Top 5 Cryptocurrencies</h2>

      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && top5.length === 0 && <p>No crypto data available.</p>}

      {!loading && top5.length > 0 && (
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b border-gray-600">
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">24h Change</th>
              <th className="p-2">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {top5.map((coin: any) => (
              <tr key={coin.id} className="border-b border-gray-700">
                <td className="p-2">{coin.name} ({coin.symbol.toUpperCase()})</td>
                <td className="p-2">${parseFloat(coin.priceUsd).toFixed(2)}</td>
                <td className="p-2">{parseFloat(coin.changePercent24Hr).toFixed(2)}%</td>
                <td className="p-2">${parseFloat(coin.marketCapUsd).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
