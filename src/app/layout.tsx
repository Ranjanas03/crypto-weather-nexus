import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '../redux/provider'
import { Toaster } from 'react-hot-toast'
import DashboardLayout from '@/components/DashboardLayout'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <DashboardLayout>{children}</DashboardLayout>
          <Toaster position="bottom-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  )
}
