"use client"

import { Flame, Zap, Trophy } from "lucide-react"

interface StreakCounterProps {
    currentStreak: number
    bestStreak?: number
}

export function StreakCounter({ currentStreak, bestStreak = 0 }: StreakCounterProps) {
    const getStreakEmoji = (streak: number) => {
        if (streak >= 30) return "🔥🔥🔥"
        if (streak >= 7) return "🔥🔥"
        if (streak >= 3) return "🔥"
        return "⚡"
    }

    const getStreakColor = (streak: number) => {
        if (streak >= 30) return "from-orange-500 to-red-500"
        if (streak >= 7) return "from-yellow-500 to-orange-500"
        if (streak >= 3) return "from-yellow-400 to-yellow-500"
        return "from-cyan-400 to-blue-500"
    }

    if (currentStreak === 0) return null

    return (
        <div className="glass-card-strong p-4 space-y-3 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-yellow-500/10 border-2 border-orange-400/30">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${getStreakColor(currentStreak)} flex items-center justify-center shadow-lg animate-pulse-glow`}>
                        <Flame className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Current Streak</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
                        </p>
                    </div>
                </div>

                <div className="text-4xl animate-float">
                    {getStreakEmoji(currentStreak)}
                </div>
            </div>

            {bestStreak > 0 && bestStreak > currentStreak && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-orange-400/20 pt-2">
                    <Trophy className="h-3 w-3" />
                    <span>Best streak: {bestStreak} days</span>
                </div>
            )}

            {currentStreak >= 3 && (
                <div className="text-center">
                    <p className="text-xs text-orange-200 font-semibold">
                        {currentStreak >= 30 ? "🏆 Legendary Streak!" :
                            currentStreak >= 7 ? "🔥 On Fire!" :
                                "⚡ Keep it up!"}
                    </p>
                </div>
            )}
        </div>
    )
}
