// src/components/LeftNav.jsx
import React from 'react'
import './LeftNav.css'
// src/components/LeftNav.jsx
export default function LeftNav({ onClickItem, selected }) {
    const items = [
      "Stocks",
      "Recommendations",
      "Bonds",
      "Dividends",
      "Index Funds",
      "ETFs",
      "Options",
      "Futures"
    ]
  
    return (
      <nav className="left-nav">
        <ul className="nav-list">
          {items.map(item => (
            <li
              key={item}
              className={`nav-item ${selected === item ? 'active' : ''}`}
              onClick={() => onClickItem(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    )
  }
  