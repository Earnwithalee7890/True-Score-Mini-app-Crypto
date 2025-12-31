"use client"
import { useState } from "react"
import { AboutModal } from "./about-modal"

export function AppFooter() {
  const [showAbout, setShowAbout] = useState(false)

  return (
    <>
      <footer className="py-6 text-center space-y-4">
        <div className="text-xs text-muted-foreground/60 space-x-4">
          <button onClick={() => setShowAbout(true)} className="hover:text-cyan-400 transition-colors">
            About TrueScore
          </button>
          <span>•</span>
          <a href="https://warpcast.com/aleekhoso" className="hover:text-cyan-400 transition-colors">
            Developer
          </a>
        </div>
        <p className="text-[10px] text-muted-foreground/40 font-light">
          Built with Neynar & Farcaster Frames
        </p>
      </footer>
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </>
  )
}
