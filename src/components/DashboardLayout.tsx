'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  CloudSun,
  Bitcoin,
  Newspaper,
  Menu,
  ChevronLeft,
  Star,
} from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { label: 'Weather', href: '/weather', icon: <CloudSun size={20} /> },
    { label: 'Crypto', href: '/Crypto', icon: <Bitcoin size={20} /> },
    { label: 'News', href: '/News', icon: <Newspaper size={20} /> },
    { label: 'Favorites', href: '/Favorite', icon: <Star size={20} /> },
  ]

  return (
    <div className="flex h-screen max-h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'} flex flex-col`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-6 self-end hover:text-gray-300"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
        <ul className="list-none space-y-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 no-underline text-lg hover:bg-blue-800 ${
                  pathname === item.href ? 'bg-blue-800' : ''
                }`}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">CryptoWeather Nexus</h1>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-md border border-gray-300 focus:ring focus:outline-none w-64"
          />
        </div>

        {/* Page Content */}
        <div className="p-2 overflow-y-auto flex-1 bg-gray-50">{children}</div>
      </div>
    </div>
  )
}
