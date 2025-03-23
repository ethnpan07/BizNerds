// src/components/LeftNav.jsx
import React from 'react'
import './LeftNav.css'

export default function LeftNav() {
  const items = ["Stocks", "Bonds", "Dividends", "Index Funds", "ETFs", "Options", "Futures"]

  return (
    <nav className="left-nav">
      <ul className="nav-list">
        {items.map(item => (
          <li key={item} className="nav-item">{item}</li>
        ))}
      </ul>
      <div className="diversity-box">Diversity Visualization</div>
    </nav>
  )
}
