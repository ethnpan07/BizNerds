// src/components/TopNav.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import './TopNav.css'

export default function TopNav({ 
  searchValue, 
  onSearchChange, 
  onSearchSelect, 
  onSearchSubmit, 
  onRecommendations 
}) {
  return (
    <header className="top-header">
      {/* Left Box: Centered Logo */}
      <div className="logo-box">
        <Link to="/">
          <img src="/logo.png" alt="My Logo" className="brand-logo" />
        </Link>
      </div>

      {/* Right Container: Search & Recommendations */}
      <div className="right-container">
        <div className="search-container">
          <SearchBar 
            value={searchValue} 
            onChange={onSearchChange} 
            onSelect={onSearchSelect} 
          />
          <button className="search-btn" onClick={onSearchSubmit}>Search</button>
        </div>
        <button className="rec-button" onClick={onRecommendations}>
          Recommendations
        </button>
      </div>
    </header>
  )
}
