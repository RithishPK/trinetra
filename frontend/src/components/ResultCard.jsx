const verdictConfig = {
  SAFE: { color: "text-green-400", bg: "bg-green-400/10 border-green-400/30", label: "SAFE" },
  LIKELY_LEGITIMATE: { color: "text-green-400", bg: "bg-green-400/10 border-green-400/30", label: "LIKELY LEGITIMATE" },
  SUSPICIOUS: { color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30", label: "SUSPICIOUS" },
  LOW_RISK: { color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30", label: "LOW RISK" },
  MODERATE_RISK: { color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30", label: "MODERATE RISK" },
  LIKELY_FRAUDULENT: { color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30", label: "LIKELY FRAUDULENT" },
  LIKELY_SCAM: { color: "text-red-400", bg: "bg-red-400/10 border-red-400/30", label: "LIKELY SCAM" },
  HIGH_RISK: { color: "text-red-400", bg: "bg-red-400/10 border-red-400/30", label: "HIGH RISK" },
  DEFINITE_SCAM: { color: "text-red-500", bg: "bg-red-500/10 border-red-500/30", label: "DEFINITE SCAM" },
  CONFIRMED_SCAM: { color: "text-red-500", bg: "bg-red-500/10 border-red-500/30", label: "CONFIRMED SCAM" },
  CONFIRMED_FRAUDULENT: { color: "text-red-500", bg: "bg-red-500/10 border-red-500/30", label: "CONFIRMED FRAUDULENT" },
}

export default function ResultCard({ result }) {
  if (!result) return null
  const config = verdictConfig[result.verdict] || verdictConfig["MODERATE_RISK"]

  const riskScore = result.risk_score || 0
  const scoreColor =
    riskScore >= 86 ? "bg-red-500" :
    riskScore >= 66 ? "bg-orange-500" :
    riskScore >= 21 ? "bg-yellow-500" : "bg-green-500"

  const reportUrl = result.report_to && result.report_to !== "not_required"
    ? "https://" + result.report_to
    : null

  return (
    <div className={"mt-6 rounded-xl border p-6 " + config.bg}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Verdict</p>
          <p className={"text-2xl font-bold " + config.color}>{config.label}</p>
        </div>
        <div className="text-right">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Risk Score</p>
          <p className={"text-3xl font-bold " + config.color}>{riskScore}</p>
        </div>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2 mb-6">
        <div
          className={"h-2 rounded-full transition-all duration-700 " + scoreColor}
          style={{ width: riskScore + "%" }}
        />
      </div>

      {result.signals_detected && (
        <div className="mb-4">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Signals Detected</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(result.signals_detected).map(([key, val]) => (
              <div
                key={key}
                className={
                  "text-xs px-3 py-1.5 rounded-full border " +
                  (val
                    ? "border-red-400/40 bg-red-400/10 text-red-300"
                    : "border-white/10 bg-white/5 text-white/30")
                }
              >
                {val ? "⚠ " : "✓ "}
                {key.replace(/_/g, " ")}
              </div>
            ))}
          </div>
        </div>
      )}

      {result.key_red_flags && result.key_red_flags.length > 0 && (
        <div className="mb-4">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Red Flags</p>
          <ul className="space-y-1">
            {result.key_red_flags.map((flag, i) => (
              <li key={i} className="text-sm text-red-300 flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span> {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.red_flags && result.red_flags.length > 0 && (
        <div className="mb-4">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Red Flags</p>
          <ul className="space-y-1">
            {result.red_flags.map((flag, i) => (
              <li key={i} className="text-sm text-red-300 flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span> {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.safe_signals && result.safe_signals.length > 0 && (
        <div className="mb-4">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Safe Signals</p>
          <ul className="space-y-1">
            {result.safe_signals.map((s, i) => (
              <li key={i} className="text-sm text-green-300 flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.fraud_type && (
        <div className="mb-4">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Fraud Type</p>
          <p className="text-sm text-white/70">{result.fraud_type}</p>
        </div>
      )}

      {result.document_type && (
        <div className="mb-4">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Document Type</p>
          <p className="text-sm text-white/70">{result.document_type}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {result.urgency_detected !== undefined && (
          <div className={"text-xs px-3 py-1.5 rounded-full border " +
            (result.urgency_detected
              ? "border-red-400/40 bg-red-400/10 text-red-300"
              : "border-white/10 bg-white/5 text-white/30")}>
            {result.urgency_detected ? "⚠ Urgency detected" : "✓ No urgency"}
          </div>
        )}
        {result.payment_requested !== undefined && (
          <div className={"text-xs px-3 py-1.5 rounded-full border " +
            (result.payment_requested
              ? "border-red-400/40 bg-red-400/10 text-red-300"
              : "border-white/10 bg-white/5 text-white/30")}>
            {result.payment_requested ? "⚠ Payment requested" : "✓ No payment"}
          </div>
        )}
        {result.payment_demanded !== undefined && (
          <div className={"text-xs px-3 py-1.5 rounded-full border " +
            (result.payment_demanded
              ? "border-red-400/40 bg-red-400/10 text-red-300"
              : "border-white/10 bg-white/5 text-white/30")}>
            {result.payment_demanded ? "⚠ Payment demanded" : "✓ No payment"}
          </div>
        )}
      </div>

      {result.analysis_limitation && (
        <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white/30 text-xs">{result.analysis_limitation}</p>
        </div>
      )}

      {result.citizen_advice && (
        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-1">What to do</p>
          <p className="text-sm text-white/80">{result.citizen_advice}</p>
          {reportUrl && (
            <a
              href={reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs text-orange-400 hover:text-orange-300 underline"
            >
              {"Report at " + result.report_to + " →"}
            </a>
          )}
        </div>
      )}

      {result.case_id && (
        <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10 flex justify-between items-center flex-wrap gap-2">
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest">Case ID</p>
            <p className="text-white/60 text-xs font-mono mt-0.5">{result.case_id}</p>
          </div>
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest">Analysed at</p>
            <p className="text-white/60 text-xs font-mono mt-0.5">{result.analyzed_at}</p>
          </div>
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest">Platform</p>
            <p className="text-white/60 text-xs font-mono mt-0.5">{result.platform}</p>
          </div>
        </div>
      )}
    </div>
  )
}