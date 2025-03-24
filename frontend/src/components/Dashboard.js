// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DashboardContents from './DashboardContents'
import LeftNav from './LeftNav'
import SecondLeftNav from './SecondLeftNav'
import './Dashboard.css'
import RecommendationsPanel from './RecommendationsPanel'

export default function Dashboard() {
  const [ticker, setTicker] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  
  const [isLoggedIn, setIsLoggedIn] = useState(false) 
  const [stocks, setStocks] = useState([])  
  const [selectedMenu, setSelectedMenu] = useState('')

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

  useEffect(() => {
    // Check for survey results when component mounts
    const surveyResults = localStorage.getItem('surveyResults');
    if (surveyResults) {
      const results = JSON.parse(surveyResults);
      console.log('Received survey results:', results);
      // You can use these results to customize the dashboard
      // For example, set initial recommendations based on risk tolerance
      localStorage.removeItem('surveyResults'); // Clean up after reading
    }
  }, []);

  // Simulate login check
  useEffect(() => {
    axios.get('/check_session')
      .then(resp => {
        if (resp.data.logged_in) {
          setIsLoggedIn(true)
          setStocks(['AAPL', 'NVDA', 'TSLA'])
        }
      })
      .catch(() => setIsLoggedIn(false))
  }, [])

  const handleNavClick = (item) => {
    setSelectedMenu(item)
  }

  let mainContent = null
  // inside Dashboard's mainContent logic:
  if (selectedMenu === 'Recommendations') {
    mainContent = <RecommendationsPanel />
  }
  if (!isLoggedIn) {
    if (selectedMenu === 'Stocks') {
      mainContent = <div /> // blank
    } else if (selectedMenu) {
      mainContent = <div>Coming soon...</div>
    } else {
      mainContent = <DashboardContents data={data} />
    }
  } else {
    mainContent = data
      ? <DashboardContents data={data} />
      : <div>Please pick or search a ticker.</div>
  }

  // Dynamically add a "logged-in" or "logged-out" class
  const containerClass = isLoggedIn 
    ? "dash-container logged-in" 
    : "dash-container logged-out"

  return (
    <div className={containerClass}>
      <div className="outer-nav">
        <LeftNav onClickItem={handleNavClick} />
        {isLoggedIn && <SecondLeftNav stocks={stocks} />}
      </div>

      <main className="main-content">
        {error && <p className="error">{error}</p>}
        {mainContent}
      </main>
    </div>
  )
}

