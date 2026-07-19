import { useState, useEffect } from "react"
import axios from "axios"

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh"
]

const SCAM_TYPES = [
  "Digital Arrest", "Job Scam", "KYC Scam", "Investment Scam",
  "Lottery Scam", "Task Scam", "Fake Document", "Other"
]

export default function ScamReportFeed() {
  const [feed, setFeed] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    scam_type: "Digital Arrest",
    description: "",
    city: "",
    state: "Karnataka"
  })

  useEffect(() => {
    fetchFeed()
  }, [])

  const fetchFeed = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/scam-report/feed")
      setFeed(res.data.reports)
    } catch (e) {
      console.error("Feed fetch failed", e)
    } finally {
      setLoading(false)
    }
  }

  const submitReport = async () => {
    if (!form.description.trim()) return
    setSubmitting(true)
    try {
      await axios.post("http://localhost:8000/api/scam-report/report", form)
      setSubmitted(true)
      setShowForm(false)
      setForm({ scam_type: "Digital Arrest", description: "", city: "", state: "Karnataka" })
      fetchFeed()
    } catch (e) {
      console.error("Submit failed", e)
    } finally {
      setSubmitting(false)
    }
  }

  const timeAgo = (dateStr) => {
    const diff = Math.floor((new Date() - new Date(dateStr)) / 1000)
    if (diff < 60) return diff + "s ago"
    if (diff < 3600) return Math.floor(diff / 60) + "m ago"
    if (diff < 86400) return Math.floor(diff / 3600) + "h ago"
    return Math.floor(diff / 86400) + "d ago"
  }

  const scamColor = (type) => {
    if (type === "Digital Arrest") return "text-red-400 border-red-400/30 bg-red-400/10"
    if (type === "Job Scam") return "text-orange-400 border-orange-400/30 bg-orange-400/10"
    if (type === "Investment Scam") return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
    return "text-white/50 border-white/20 bg-white/5"
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Community Scam Feed</h2>
          <p className="text-white/40 text-sm">Real-time scam reports from citizens across India</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setSubmitted(false) }}
          className="px-4 py-2 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm hover:bg-orange-500/30 transition-colors"
        >
          + Report a Scam
        </button>
      </div>

      {submitted && (
        <div className="mb-4 p-4 rounded-xl border border-green-400/30 bg-green-400/10 text-green-400 text-sm">
          ✓ Report submitted. Thank you for helping protect other citizens.
        </div>
      )}

      {showForm && (
        <div className="mb-6 p-5 rounded-xl border border-white/10 bg-white/5">
          <p className="text-white/70 text-sm font-medium mb-4">Report a scam you encountered</p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Scam Type</label>
              <select
                value={form.scam_type}
                onChange={(e) => setForm({ ...form, scam_type: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50"
              >
                {SCAM_TYPES.map(t => (
                  <option key={t} value={t} className="bg-gray-900">{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">State</label>
              <select
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50"
              >
                {INDIAN_STATES.map(s => (
                  <option key={s} value={s} className="bg-gray-900">{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">City (optional)</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="e.g. Bengaluru"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50"
            />
          </div>

          <div className="mb-4">
            <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Briefly describe the scam you encountered..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 resize-none"
              maxLength={500}
            />
            <p className="text-white/20 text-xs mt-1">{form.description.length}/500</p>
          </div>

          <button
            onClick={submitReport}
            disabled={!form.description.trim() || submitting}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {submitting ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-white/30 text-sm text-center py-8">Loading reports...</div>
      ) : feed.length === 0 ? (
        <div className="text-white/30 text-sm text-center py-8">No reports yet. Be the first to report a scam.</div>
      ) : (
        <div className="space-y-3">
          {feed.map((report) => (
            <div key={report.id} className="p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={"text-xs px-2 py-0.5 rounded-full border " + scamColor(report.scam_type)}>
                      {report.scam_type}
                    </span>
                    {report.state && (
                      <span className="text-xs text-white/40">
                        📍 {report.city ? report.city + ", " : ""}{report.state}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/70">{report.description}</p>
                </div>
                <span className="text-white/20 text-xs whitespace-nowrap">{timeAgo(report.reported_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}