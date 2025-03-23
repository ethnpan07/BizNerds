import { useState, useEffect } from 'react'
import axios from 'axios'
import DashboardContents from './DashboardContents'
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
      {/*--- Left Nav Bar ---*/}
      <nav className="left-nav">
        <ul>
          <li>Stocks</li>
          <li>Bonds</li>
          <li>Dividends</li>
          <li>Index Funds</li>
          <li>ETFs</li>
          <li>Options</li>
          <li>Futures</li>
        </ul>
      </nav>

      {/*--- Main Content ---*/}
      <main className="main-content">
        {error && <p className="error">{error}</p>}
        <DashboardContents data={data} />
      </main>
    </div>
  )
}
