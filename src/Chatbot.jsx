import { useEffect, useMemo, useRef, useState } from 'react'

function nowId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function pickReply(message) {
  const m = normalize(message)

  if (!m) {
    return "Tell me what you're looking for — location, plots, amenities, pricing, or a site visit."
  }

  if (/(hi|hello|hey|hii|namaste)\b/.test(m)) {
    return 'Hi! I can help with plots, amenities, location connectivity, pricing enquiry, or booking a site visit.'
  }

  if (/(price|pricing|rate|cost|budget)\b/.test(m)) {
    return 'Pricing is on enquiry and depends on plot size/availability. If you share your preferred size (1,200 / 1,800 / 3,000 / 3,000+ sq.ft), I’ll guide you to the right option.'
  }

  if (/(1200|1,200|1800|1,800|3000|3,000|plot size|sizes|sq\.? ?ft)\b/.test(m)) {
    return 'Available plot configurations: 1,200 sq.ft (compact), 1,800 sq.ft (standard), 3,000 sq.ft (premium), and above 3,000 sq.ft (commercial/villa). Want me to connect you to a site visit?'
  }

  if (/(amenit|facility|features|security|roads|school|hospital|park|cycle)\b/.test(m)) {
    return 'Key amenities: grand entry gate, wide roads, commercial complex, 24×7 security, school, hospital, green areas, and a cycle track.'
  }

  if (/(location|where|connect|airport|metro|railway|station|bus)\b/.test(m)) {
    return 'The project is positioned on the Lucknow–Kanpur growth corridor with strong connectivity. In “Connectivity at a Glance”, you can click any landmark to open a live Google Maps route + distance.'
  }

  if (/(visit|site visit|book|schedule|appointment|meet)\b/.test(m)) {
    return 'Sure — tap “Book Site Visit” and fill the form. If you tell me your city and preferred date, I’ll suggest the best time slots.'
  }

  if (/(address|office|email|contact)\b/.test(m)) {
    return 'Contact: 104, First Floor, JB Metro Height, Near RTO Office & Transport Nagar Metro, Lucknow. Email: info@bsdprojects.in / contact@bsdprojects.in.'
  }

  return 'Got it. Are you looking for location/connectivity, amenities, plot sizes, pricing enquiry, or booking a site visit?'
}

export default function Chatbot({ onOpenContact }) {
  const quickReplies = useMemo(
    () => [
      'Plot sizes',
      'Amenities',
      'Pricing',
      'Connectivity',
      'Book a site visit',
    ],
    [],
  )

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState(() => [
    {
      id: nowId(),
      role: 'bot',
      text: 'Hi! I’m BSD Assist. Ask me about plot sizes, amenities, connectivity, or booking a site visit.',
    },
  ])

  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [messages, open])

  const send = (text) => {
    const userText = String(text || '').trim()
    if (!userText) return

    setMessages((prev) => [
      ...prev,
      { id: nowId(), role: 'user', text: userText },
      { id: nowId(), role: 'bot', text: pickReply(userText) },
    ])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const text = draft
    setDraft('')
    send(text)
  }

  return (
    <div className="chatbot" aria-live="polite">
      <button
        type="button"
        className="chatbot-fab"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chatbot-panel"
      >
        <span className="chatbot-fab-dot" aria-hidden="true" />
        {open ? 'Close' : 'Chat'}
      </button>

      {open ? (
        <div id="chatbot-panel" className="chatbot-panel" role="dialog" aria-label="Chatbot">
          <div className="chatbot-header">
            <div>
              <div className="chatbot-title">BSD Assist</div>
              <div className="chatbot-sub">Quick answers • Site visit help</div>
            </div>
            <button type="button" className="chatbot-x" onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>

          <div className="chatbot-body" ref={bodyRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`chatbot-msg ${m.role === 'user' ? 'chatbot-msg--user' : 'chatbot-msg--bot'}`}
              >
                {m.text}
              </div>
            ))}

            <div className="chatbot-quick">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="chatbot-chip"
                  onClick={() => send(q)}
                >
                  {q}
                </button>
              ))}
              <button
                type="button"
                className="chatbot-chip chatbot-chip--gold"
                onClick={() => {
                  setOpen(false)
                  onOpenContact?.()
                }}
              >
                Open contact form
              </button>
            </div>
          </div>

          <form className="chatbot-input" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your question…"
              aria-label="Type your message"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : null}
    </div>
  )
}

