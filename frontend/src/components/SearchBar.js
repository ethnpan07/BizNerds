import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './SearchBar.css'

export default function SearchBar({ value = '', onChange, onSelect }) {
  const [localValue, setLocalValue] = useState(value)
  const [suggestions, setSuggestions] = useState([])
  const wrapper = useRef(null)

  // Keep localValue in sync with parent's 'value'
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Debounce search suggestions
  useEffect(() => {
    if (!localValue) {
      setSuggestions([])
      return
    }
    const timer = setTimeout(async () => {
      try {
        const { data } = await axios.get(`/api/search?q=${localValue}`)
        setSuggestions(data)
      } catch {
        setSuggestions([])
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [localValue])

  // Hide suggestions if click outside
  useEffect(() => {
    const handleClick = e => {
      if (!wrapper.current?.contains(e.target)) setSuggestions([])
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Called on each keystroke
  const handleChange = e => {
    const val = e.target.value
    setLocalValue(val)
    onChange?.(val) // tell parent about new input
  }

  // Called when user picks from suggestions
  const pickSuggestion = s => {
    setLocalValue(s.symbol)
    setSuggestions([])
    onSelect?.(s.symbol) // immediate fetch in parent
  }

  return (
    <div className="search-wrapper" ref={wrapper}>
      <input
        className="search-input"
        value={localValue}
        onChange={handleChange}
        placeholder="Search ticker or company..."
      />
      {suggestions.length > 0 && (
        <ul className="search-dropdown">
          {suggestions.map(s => (
            <li 
              key={s.symbol} 
              className="search-item"
              onClick={() => pickSuggestion(s)}
            >
              <img src={s.image} alt={s.symbol} className="search-logo" />
              <span><strong>{s.symbol}</strong> — {s.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
