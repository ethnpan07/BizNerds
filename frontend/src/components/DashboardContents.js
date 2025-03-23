// src/components/DashboardContents.jsx
import React from 'react'
import Plot from 'react-plotly.js'
import './DashboardContents.css'

export default function DashboardContents({ data }) {
  if (!data) return null

  return (
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
  )
}
