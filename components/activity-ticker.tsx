"use client"

import { useEffect, useState } from "react"
import { Trophy, Star, Zap } from "lucide-react"

export function ActivityTicker() {
    // Hidden by default, only shows if enabled or data loaded.
    // For demo, we just show mock data.

    const events = [
        { icon: Trophy, text: "Alice reached Level 50!", color: "text-yellow-400" },
        { icon: Star, text: "Bob just claimed a badge.", color: "text-purple-400" },
        { icon: Zap, text: "Charlie checked in (Streak: 10)", color: "text-blue-400" },
        { icon: Trophy, text: "Dave hit Top 10% Rank", color: "text-green-400" },
        { icon: Star, text: "Eve verified wallet", color: "text-pink-400" },
    ]

    return (
        <div className="w-full bg-black/40 border-y border-white/5 overflow-hidden h-8 flex items-center mb-4">
            <div className="animate-ticker flex items-center gap-8 whitespace-nowrap min-w-full pl-[100%]">
                {events.map((event, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-white/80">
                        <event.icon className={`h-3 w-3 ${event.color}`} />
                        <span>{event.text}</span>
                    </div>
                ))}
                {events.map((event, i) => (
                    <div key={`dup-${i}`} className="flex items-center gap-2 text-xs font-medium text-white/80">
                        <event.icon className={`h-3 w-3 ${event.color}`} />
                        <span>{event.text}</span>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .animate-ticker {
                    animation: ticker 20s linear infinite;
                }
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>
        </div>
    )
}
