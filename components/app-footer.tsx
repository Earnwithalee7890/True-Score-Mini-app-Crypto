"use client"

import { ExternalLink } from "lucide-react"

export function AppFooter() {
  return (
    <footer className="mt-8 pt-6 border-t border-border/30">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          Your trusted source for real Farcaster reputation data. View authentic Neynar scores, follower stats, and
          account reputation labels.
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a
            href="https://neynar.com"
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
