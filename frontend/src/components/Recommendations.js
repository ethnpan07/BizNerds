import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Recommendations() {
  const [html, setHtml] = useState('Loading…')

  useEffect(() => {
    axios.get('/recommendations')
      .then(r => setHtml(r.data))
      .catch(() => setHtml('<p>Error loading recommendations</p>'))
  }, [])

  return (
    <div>
      <h2>Personalized Recommendations</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
