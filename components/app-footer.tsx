"use client"
import { useState } from "react"
import { AboutModal } from "./about-modal"

export function AppFooter() {
  const [showAbout, setShowAbout] = useState(false)

  return (
    <>
      <footer className="py-6 text-center space-y-4">
        <div className="flex gap-4 text-xs text-muted-foreground/60">
          <a href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-cyan-400 transition-colors">Terms</a>
          <a
            href="mailto:support@truescore.xyz?subject=TrueScore%20Feedback"
            className="hover:text-cyan-400 transition-colors"
          >
            Feedback
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
