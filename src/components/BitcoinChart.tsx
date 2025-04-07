'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function BitcoinChart() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const fetchBitcoinHistory = async () => {
      const res = await fetch('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1')
      const json = await res.json()
      const formattedData = json.data.map((item: any) => ({
        date: new Date(item.date).toLocaleDateString(),
        price: parseFloat(item.priceUsd),
      }))
      setChartData(formattedData.slice(-30)) // Last 30 days
    }

    fetchBitcoinHistory()
  }, [])

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow mt-3 h-70 mb-3">
      <h2 className="text-2xl font-bold mb-4">📈 Bitcoin Price (30d)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#facc15" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
