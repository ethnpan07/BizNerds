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
        <h2>
          {data.company.companyName} ({data.company.ticker})
        </h2>
      </header>

      {/* NEW: Display the summary text if available */}
      {data.company.summary && (
        <div className="company-summary">
          <p>{data.company.summary}</p>
        </div>
      )}

      <div className="card-plot">
        <Plot
          data={data.plot.data}
          layout={{
            ...data.plot.layout,
            // Provide a dynamic or max width to better fill the container
            // and reduce height so there's more space for text
            width: 900,          // or '100%' if you set style below
            height: 350,
            autosize: true
          }}
          // Ensures Plotly automatically resizes if parent changes
          useResizeHandler
          style={{ width: '100%', maxWidth: '900px' }}
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
