'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-900 shadow-md p-4">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-white">
          🚀 Valuation Copilot
        </Link>
        <div className="space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={`hover:text-blue-400 ${pathname === '/' ? 'text-blue-400' : 'text-white'}`}
          >
            Home
          </Link>
          <Link
            href="/history"
            className={`hover:text-blue-400 ${pathname === '/history' ? 'text-blue-400' : 'text-white'}`}
          >
            History
          </Link>
        </div>
      </div>
    </nav>
  )
}
