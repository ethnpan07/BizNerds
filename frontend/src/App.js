// src/App.jsx
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUpPage from './components/SignUpPage'
import TopNav from './components/TopNav'
import Dashboard from './components/Dashboard'
import Recommendations from './components/Recommendations'
import SignInPage from './components/SignInPage'

export default function App() {
  const [query, setQuery] = useState('')

  const handleRecommendations = () => {
    window.location.href = '/recommendations'
  }

  return (
    <BrowserRouter>
    
      <TopNav
        searchValue={query}
        onSearchChange={setQuery}
        onSearchSelect={(symbol) => setQuery(symbol)}
        onSearchSubmit={() => window.dispatchEvent(new CustomEvent('search', { detail: query }))}
        onRecommendations={handleRecommendations}
      />

      <Routes>
        <Route path="/" element={<Dashboard initialTicker={query} />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/SignUpPage" element={<SignUpPage />} /> 
        <Route path="/SignInPage" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  )
}
