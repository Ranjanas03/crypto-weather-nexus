'use client'

import { useEffect, useState } from 'react'
import { connectToCryptoWebSocket } from '../lib/websocket'
import toast from 'react-hot-toast'

export default function LivePriceTicker() {
  const [prices, setPrices] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const socket = connectToCryptoWebSocket((data) => {
      setPrices((prev) => {
        const updatedPrices: { [key: string]: number } = { ...prev }

        for (const key in data) {
          const newPrice = data[key]
          const prevPrice = prev[key]

          if (prevPrice !== undefined && newPrice !== prevPrice) {
            toast.success(`${key.toUpperCase()} updated: $${newPrice.toFixed(2)}`)
          }

          updatedPrices[key] = newPrice
        }

        return updatedPrices
      })
    })

    return () => socket.close()
  }, [])

  return (
    <div className="p-4 bg-gray-900 rounded text-white flex gap-6 justify-center text-sm mb-3">
      <h1>💹 Ticker Prices</h1>
      {prices.bitcoin !== undefined && (
        <div>₿ Bitcoin: ${prices.bitcoin.toFixed(2)}</div>
      )}
      {prices.ethereum !== undefined && (
        <div>Ξ Ethereum: ${prices.ethereum.toFixed(2)}</div>
      )}
    </div>
  )
}
