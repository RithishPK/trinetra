const tabs = [
  {
    id: "digital-arrest",
    label: "Digital Arrest",
    icon: "🚨",
    desc: "Detect fake CBI/ED/Police scam calls"
  },
  {
    id: "message-fraud",
    label: "Message Fraud",
    icon: "💬",
    desc: "Analyse suspicious WhatsApp/SMS messages"
  },
  {
    id: "document-verify",
    label: "Document Verify",
    icon: "📄",
    desc: "Check fake government notices & offer letters"
  },
  {
    id: "community",
    label: "Scam Feed",
    icon: "🗺️",
    desc: "Community scam reports across India"
  }
]

export default function Hero({ activeTab, setActiveTab }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8">
        <p className="text-orange-400 text-xs font-medium tracking-widest uppercase mb-3">
          Powered by AI · Built for Bharat
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
          Detect Scams Before
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            {" "}You Lose
          </span>
        </h1>
        <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
          India lost ₹1,776 crore to digital arrest scams in 2024 alone.
          Trinetra gives every citizen real-time AI fraud protection.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              "p-3 sm:p-4 rounded-xl border text-left transition-all duration-200 " +
              (activeTab === tab.id
                ? "border-orange-500 bg-orange-500/10"
                : "border-white/10 bg-white/5 hover:border-white/20")
            }
          >
            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{tab.icon}</div>
            <div className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">{tab.label}</div>
            <div className="text-white/40 text-xs hidden sm:block">{tab.desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}