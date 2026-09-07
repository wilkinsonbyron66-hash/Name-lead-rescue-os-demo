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
            <div className="eyebrow">Demo • Free to test</div>
            <h1>Lead Rescue OS</h1>
            <p>Turn an ignored, vague or "just enquiring" lead into a qualified conversation, a persuasive reply and a follow-up sequence — instantly.</p>
          </div>
          <div className="badge">
            v2.0 • Template Demo • built for service businesses
          </div>
        </section>

        <div className="grid">
          <section className="card">
            <h2>1. Lead intelligence</h2>
            <div className="row">
              <div>
                <label>Business</label>
                <input value={biz} onChange={(e) => setBiz(e.target.value)} />
              </div>
              <div>
                <label>Offer</label>
                <input value={offer} onChange={(e) => setOffer(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div>
                <label>Lead name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label>Lead source</label>
                <select value={source} onChange={(e) => setSource(e.target.value)}>
                  <option>WhatsApp</option>
                  <option>Instagram</option>
                  <option>Website</option>
                  <option>Facebook</option>
                  <option>Referral</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>Lead message</label>
              <textarea value={lead} onChange={(e) => setLead(e.target.value)} />
            </div>
            <div className="row">
              <div>
                <label>Typical price ({currency})</label>
                <input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} />
              </div>
              <div>
                <label>Target close rate (%)</label>
                <input type="number" value={close} onChange={(e) => setClose(+e.target.value)} />
              </div>
            </div>
            <div className="actions">
              <button className="primary" onClick={handleGenerateAll} disabled={loading}>
                {loading ? 'Generating...' : 'Generate rescue pack'}
              </button>
            </div>
          </section>

          <section className="card">
            <h2>2. Revenue opportunity</h2>
            <p className="small">A simple calculator that turns "we need more leads" into a measurable follow-up problem.</p>
            <div className="kpis">
              <div className="kpi">
                <span className="small">1 recovered sale</span>
                <b>{money(price)}</b>
              </div>
              <div className="kpi">
                <span className="small">10 recovered sales</span>
                <b>{money(price * 10)}</b>
              </div>
              <div className="kpi">
                <span className="small">100 leads @ target rate</span>
                <b>{money(100 * (close / 100) * price)}</b>
              </div>
            </div>
            <div style={{ marginTop: '18px' }} className="small">The product is deliberately ROI-first: sell the outcome, not "AI".</div>
          </section>

          <section className="card full">
            <div className="tabs">
              <button 
                className={`tab ${currentTab === 'reply' ? 'active' : ''}`}
                onClick={() => setCurrentTab('reply')}
              >
                Instant reply
              </button>
              <button 
                className={`tab ${currentTab === 'follow' ? 'active' : ''}`}
                onClick={() => setCurrentTab('follow')}
              >
                5-touch follow-up
              </button>
              <button 
                className={`tab ${currentTab === 'qualify' ? 'active' : ''}`}
                onClick={() => setCurrentTab('qualify')}
              >
                Qualification
              </button>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="output">{output || 'Click "Generate rescue pack" to see outputs'}</div>
            <div className="actions" style={{ marginTop: '12px' }}>
              <button className="secondary" onClick={handleCopyOutput}>Copy output</button>
              <button className="secondary" onClick={handleGenerateAll}>Regenerate</button>
            </div>
          </section>

          {history.length > 0 && (
            <section className="card full">
              <h2>Recent leads ({history.length})</h2>
              <div className="history">
                {history.slice(0, 5).map(item => (
                  <div key={item.id} className="history-item">
                    <div>
                      <b>{item.name}</b> from {item.biz}
                      <br />
                      <span className="small">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="card full">
            <h2>Demo version</h2>
            <p><b>What this is:</b> A free template-based demo. All responses are proven sales templates, no API costs.</p>
            <p><b>What it shows:</b> The workflow, UX, and quality of follow-up sequences your prospects would get.</p>
            <p><b>Ready to upgrade?</b> Switch to real Claude AI (costs ~0.5–2 cents per lead) by deploying the full version with an API key.</p>
            <p><b>Sell to your market:</b> "I install a simple AI-assisted follow-up system that helps service businesses stop losing warm enquiries." — AED 750–1,500 setup + AED 250–500/month.</p>
            <p className="small">🎯 Best prospects: detailing, clinics, gyms, home services, photographers, real estate, wedding vendors — any lead-driven SMB.</p>
          </section>
        </div>
        <div className="footer">Lead Rescue OS • Free Demo Version • Template-based • $0 cost</div>
      </div>
    </div>
  )
}
