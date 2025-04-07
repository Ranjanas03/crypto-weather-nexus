'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import LivePriceTicker from '@/components/LivePriceTicker'
import BitcoinChart from '@/components/BitcoinChart'
import TopCryptoTable from '@/components/TopCryptoTable'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { fetchCryptoData } from '../redux/slices/cryptoSlice'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCryptoData())
  }, [dispatch])
  return (
    <div className=''>
      <LivePriceTicker />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Weather Card */}
        <Link href="/weather">
          <div className="bg-gray-900 text-white hover:bg-gray-700 border p-6 rounded-xl shadow-md cursor-pointer">
            <h2 className="text-lg font-semibold mb-2">Weather</h2>
          </div>
        </Link>

        {/* Crypto Card */}
        <Link href="/Crypto">
          <div className="bg-gray-900 text-white border p-6 hover:bg-gray-700 rounded-xl shadow-md  cursor-pointer">
            <h2 className="text-lg font-semibold mb-2">Crypto Prices</h2>
          </div>
        </Link>

        {/* News Card */}
        <Link href="/News">
          <div className="bg-gray-900 text-white p-6 border rounded-xl shadow-md hover:bg-gray-700 transition cursor-pointer">
            <h2 className="text-lg font-semibold mb-2">Latest News</h2>
          </div>
        </Link>
      </div>
      <div>
        <BitcoinChart />
        <TopCryptoTable />
      </div>
    </div>

  )
}
