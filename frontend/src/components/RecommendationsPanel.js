// src/components/RecommendationsPanel.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './RecommendationsPanel.css'

export default function RecommendationsPanel() {
  const [recs, setRecs] = useState([])

  useEffect(() => {
    axios.get('/api/recommendations')
      .then(res => setRecs(res.data))
      .catch(() => setRecs([]))
  }, [])

  return (
    <div className="recommendations-panel">
      <h2>Personalized Recommendations</h2>
      <div className="recommendation-grid">
        {recs.map((r, idx) => (
          <div key={idx} className="rec-card">
            <h3>{r.ticker} — {r.company_name}</h3>
            <p><strong>Sector:</strong> {r.sector_preference}</p>
            <p><strong>21-Day % Change:</strong> {r.percent_change}%</p>
            <p><strong>Personal Score:</strong> {r.personal_score.toFixed(3)}</p>
            <div className="match-tags">
              <span className="tag">{r.risk_tolerance} risk</span>
              <span className="tag">{r.investment_horizon} horizon</span>
            </div>
            <button className="view-btn">View</button>
          </div>
        ))}
      </div>
    </div>
  )
}
