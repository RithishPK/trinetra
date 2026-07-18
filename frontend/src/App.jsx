import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import DigitalArrestDetector from "./components/DigitalArrestDetector"
import MessageFraudDetector from "./components/MessageFraudDetector"
import DocumentVerifier from "./components/DocumentVerifier"

export default function App() {
  const [activeTab, setActiveTab] = useState("digital-arrest")

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <Navbar />
      <Hero activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-4xl mx-auto px-4 pb-20">
        {activeTab === "digital-arrest" && <DigitalArrestDetector />}
        {activeTab === "message-fraud" && <MessageFraudDetector />}
        {activeTab === "document-verify" && <DocumentVerifier />}
      </main>
    </div>
  )
}