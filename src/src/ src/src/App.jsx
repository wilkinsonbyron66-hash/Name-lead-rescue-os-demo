import React, { useState, useEffect } from 'react'
import './App.css'
import { generateTemplateResponses } from './api'

export default function App() {
  const [biz, setBiz] = useState('Dubai Auto Detailing Co.')
  const [offer, setOffer] = useState('Premium ceramic coating')
  const [name, setName] = useState('James')
  const [source, setSource] = useState('WhatsApp')
  const [lead, setLead] = useState('Hi, how much for ceramic coating on a BMW M4? And how long does it take?')
  const [price, setPrice] = useState(3500)
  const [close, setClose] = useState(25)
  const [tone, setTone] = useState('professional')
  const [currency, setCurrency] = useState('AED')

  const [currentTab, setCurrentTab] = useState('reply')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lead_rescue_history') || '[]')
    } catch {
      return []
    }
  })

  const money = (n) => `${currency} ${Math.round(n).toLocaleString()}`

  const handleGenerateAll = async () => {
    setLoading(true)
    setError('')
    
    try {
      const result = await generateTemplateResponses({
        biz,
        offer,
        name,
        lead,
        price,
        source,
        tone,
        currency
      })

      setOutput(result[currentTab] || result.reply)
      
      const newEntry = {
        id: Date.now(),
        biz,
        name,
        lead,
        date: new Date().toLocaleString(),
        result
      }
      const updated = [newEntry, ...history].slice(0, 50)
      setHistory(updated)
      localStorage.setItem('lead_rescue_history', JSON.stringify(updated))
    } catch (err) {
      setError(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(output)
    alert('Copied to clipboard!')
  }

  return (
    <div className="app">
      <div className="wrap">
        <section className="hero">
          <div>
            
