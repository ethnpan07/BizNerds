// src/components/SecondLeftNav.jsx
import React from 'react'
import './SecondLeftNav.css'

export default function SecondLeftNav({ stocks }) {
  return (
    <nav className="second-left-nav">
      <h3 className="nav-title">Your Stocks</h3>
      <ul className="nav-list">
        {stocks.map((stk) => (
          <li key={stk} className="nav-item">{stk}</li>
        ))}
      </ul>
    </nav>
  )
}
