// src/components/TopNav.jsx
import React from 'react'
import SearchBar from './SearchBar'
import './TopNav.css'

export default function TopNav({ searchValue, onSearchChange, onSearchSelect, onSearchSubmit, onRecommendations }) {
  return (
    <nav className="top-nav">
        <div className="top-left">
            <div className="logo">MyApp</div>

            <div className="search-container">
                <SearchBar value={searchValue} onChange={onSearchChange} onSelect={onSearchSelect} />
                <button className="search-btn" onClick={onSearchSubmit}>Search</button>
            </div>
        </div>
      <div className="top-right">
        <button className="rec-button" onClick={onRecommendations}>Recommendations</button>
      </div>
    </nav>
  )
}
