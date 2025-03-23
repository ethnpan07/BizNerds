/* src/components/InfoList.jsx */
import React from 'react'
import './InfoList.css'

export default function InfoList({ info }) {
  return (
    <div className="card-info">
      {Object.entries(info).map(([label, value]) => (
        <div key={label} className="info-item">
          <span className="info-label">{label}</span>
          <span className="info-value">{label === 'Earnings Date' ? new Date(value).toLocaleDateString() : value}</span>
        </div>
      ))}
    </div>
  )
}