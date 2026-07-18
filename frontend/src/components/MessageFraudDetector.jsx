import { useState } from "react"
import axios from "axios"
import ResultCard from "./ResultCard"

export default function MessageFraudDetector() {
  const [text, setText] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyze = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const res = await axios.post("http://localhost:8000/api/message-fraud/analyze", { text })
      setResult(res.data)
    } catch (e) {
      setError("Analysis failed. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1">Message Fraud Detector</h2>
        <p className="text-white/40 text-sm">
          Paste a suspicious WhatsApp message, SMS, or Telegram message for instant fraud analysis.
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste suspicious message here... e.g. fake job offer, KYC scam, investment scheme"
        className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 resize-none"
        maxLength={5000}
      />
      <div className="flex items-center justify-between mt-2 mb-4">
        <span className="text-white/20 text-xs">{text.length}/5000 characters</span>
        {text && (
          <button onClick={() => { setText(""); setResult(null) }} className="text-white/30 text-xs hover:text-white/50">
            Clear
          </button>
        )}
      </div>

      <button
        onClick={analyze}
        disabled={!text.trim() || loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        {loading ? "Analysing..." : "Analyse Message"}
      </button>

      {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
      <ResultCard result={result} />
    </div>
  )
}