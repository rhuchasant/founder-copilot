'use client'

import { useEffect, useState } from 'react'

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])

  const fetchHistory = async () => {
    try {
      const res = await fetch('https://go3twfspu7.execute-api.us-east-1.amazonaws.com/history')
      const data = await res.json()
      setHistory(data.reverse())
    } catch (err) {
      console.error('Error fetching history', err)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold mb-4">🕘 Valuation History</h1>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => (
            <li key={item.id} className="p-4 rounded-xl bg-gray-800 border border-gray-700 text-white">
              <p className="text-sm text-gray-400">📅 {new Date(item.timestamp).toLocaleString()}</p>
              <p><strong>Market:</strong> {item.market}</p>
              <p><strong>Revenue:</strong> ${item.revenue}</p>
              <p><strong>Growth:</strong> {item.growth}</p>
              <p className="mt-2"><strong>💡 Valuation:</strong><br />{item.valuation_response}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
