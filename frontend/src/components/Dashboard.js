import { useState } from 'react'
import axios from 'axios'
import Plot from 'react-plotly.js'
import SearchBar from './SearchBar'
import './Dashboard.css'

export default function Dashboard() {
  const [ticker, setTicker] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  // Single function to fetch data from /api/dashboard
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

  // When user picks from SearchBar suggestions
  const handleSelectSymbol = symbol => {
    setTicker(symbol)
    fetchData(symbol) // auto-search
  }

  // If user typed something else and pressed "Search"
  const handleSubmit = e => {
    e.preventDefault()
    fetchData(ticker)
  }

  return (
    <div className="dash-container">
      {/*--- Top Nav Bar ---*/}
      <header className="top-nav">
        <div className="top-left">
          {/* Logo */}
          <img src="/myLogo.png" alt="Brand Logo" className="brand-logo" />
          {/* Triple-dot icon as 'home' */}
          <div className="menu-icon">⋮</div>
        </div>
        <div className="top-right">
          <button
            className="rec-button"
            onClick={() => window.location.href = '/recommendations'}
          >
            Recommendations
          </button>
        </div>
      </header>

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
        <form className="search-form" onSubmit={handleSubmit}>
          <SearchBar 
            value={ticker} 
            onSelect={handleSelectSymbol} 
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
        
        {error && <p className="error">{error}</p>}

        {data && (
          <div className="dashboard-card">
            <header className="card-header">
              <img src={data.company.image} alt="" className="company-logo" />
              <h2>{data.company.companyName} ({data.company.ticker})</h2>
            </header>

            <div className="card-plot">
              <Plot
                data={data.plot.data}
                layout={{ ...data.plot.layout, width: 700, height: 450 }}
                useResizeHandler
              />
            </div>

            <div className="card-info">
              {[
                ...Object.entries(data.bottom_info).filter(([label]) => label !== 'Earnings Date'),
                ['Earnings Date', data.bottom_info['Earnings Date']]
              ].map(([label, value]) => (
                <div key={label} className="info-item">
                  <span className="info-label">{label}</span>
                  <span className="info-value">
                    {label === 'Earnings Date'
                      ? new Date(value).toLocaleDateString()
                      : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
