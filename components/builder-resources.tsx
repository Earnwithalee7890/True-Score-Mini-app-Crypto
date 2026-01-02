"use client"

import { ExternalLink, Zap, Hammer, BookOpen } from "lucide-react"

export function BuilderResources() {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Hammer className="h-4 w-4" />
                Build on Base
            </h3>

            <div className="grid grid-cols-2 gap-3">
                <a
                    href="https://bridge.base.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group"
                >
                    <div className="flex items-center justify-between">
                        <Zap className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
                        <ExternalLink className="h-3 w-3 text-blue-400/50" />
                    </div>
                    <span className="text-xs font-bold text-blue-200">Official Bridge</span>
                </a>

                <a
                    href="https://docs.base.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-2 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all group"
                >
                    <div className="flex items-center justify-between">
                        <BookOpen className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                        <ExternalLink className="h-3 w-3 text-purple-400/50" />
                    </div>
                    <span className="text-xs font-bold text-purple-200">Base Docs</span>
                </a>
            </div>

            <a
                href="https://talentprotocol.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20 hover:border-violet-500/40 transition-all group"
            >
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                        <span className="text-base">🏆</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-violet-200">Talent Protocol</span>
                        <span className="text-[10px] text-violet-400">Join the Builders Leaderboard</span>
                    </div>
                </div>
                <ExternalLink className="h-4 w-4 text-violet-400/50 group-hover:text-violet-400 transition-colors" />
            </a>
        </div>
    )
}
