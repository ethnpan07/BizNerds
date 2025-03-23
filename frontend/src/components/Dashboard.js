// src/components/Dashboard.jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import DashboardContents from './DashboardContents'
import LeftNav from './LeftNav'
import './Dashboard.css'

export default function Dashboard() {
  const [ticker, setTicker] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const fetchData = async (symbol) => {
    if (!symbol) return
    setError('')
    setData(null)
    try {
      const resp = await axios.get(`/api/dashboard?ticker=${symbol}`)
      setData(resp.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch data')
    }
  }

  useEffect(() => {
    const handleSearch = (e) => {
      const symbol = e.detail
      setTicker(symbol)
      fetchData(symbol)
    }

    window.addEventListener('search', handleSearch)
    return () => window.removeEventListener('search', handleSearch)
  }, [])

  return (
    <div className="dash-container">
      {/*--- Use the separate LeftNav component ---*/}
      <LeftNav />

      {/*--- Main Content ---*/}
      <main className="main-content">
        {error && <p className="error">{error}</p>}
        <DashboardContents data={data} />
      </main>
    </div>
  )
}
