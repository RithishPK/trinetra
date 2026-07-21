import { useState } from "react"
import axios from "axios"
import ResultCard from "./ResultCard"

export default function DocumentVerifier() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyze = async () => {
    if (!file) return
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await axios.post(
        "https://trinetra-backend-209a.onrender.com/api/document-verify/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 120000
        }
      )
      setResult(res.data)
    } catch (e) {
      setError("Analysis failed. Backend may be starting up — please wait 30 seconds and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-bold mb-1">Document Verifier</h2>
        <p className="text-white/40 text-sm">
          Upload a suspicious PDF — fake government notice, legal summons, or job offer letter.
        </p>
      </div>

      <div className="border-2 border-dashed border-white/10 rounded-xl p-6 sm:p-8 text-center hover:border-orange-500/30 transition-colors">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => { setFile(e.target.files[0]); setResult(null) }}
          className="hidden"
          id="pdf-upload"
        />
        <label htmlFor="pdf-upload" className="cursor-pointer">
          <div className="text-3xl sm:text-4xl mb-3">📄</div>
          {file ? (
            <div>
              <p className="text-white/80 text-sm font-medium">{file.name}</p>
              <p className="text-white/30 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          ) : (
            <div>
              <p className="text-white/50 text-sm">Tap to upload PDF</p>
              <p className="text-white/20 text-xs mt-1">Fake notices, offer letters, legal summons</p>
            </div>
          )}
        </label>
      </div>

      {file && (
        <button
          onClick={() => { setFile(null); setResult(null) }}
          className="mt-2 text-white/30 text-xs hover:text-white/50"
        >
          Remove file
        </button>
      )}

      <button
        onClick={analyze}
        disabled={!file || loading}
        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        {loading ? "Analysing... (first load may take 60s)" : "Verify Document"}
      </button>

      {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
      <ResultCard result={result} />
    </div>
  )
}
