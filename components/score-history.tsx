"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface ScoreHistoryProps {
    currentScore: number
}

// Mock historical data generator
const generateHistory = (currentScore: number) => {
    // Generate 7 days of "history" ending in current score
    // Varied slightly to look realistic
    const history = []
    let val = currentScore - (Math.random() * 5)
    for (let i = 0; i < 6; i++) {
        history.push(Math.max(0, Math.min(100, val)))
        val += (Math.random() * 4) - 1.5 // Random walk
    }
    history.push(currentScore)
    return history
}

export function ScoreHistory({ currentScore }: ScoreHistoryProps) {
    const history = generateHistory(currentScore)
    const max = Math.max(...history, 100)
    const min = Math.min(...history) - 5
    const range = max - min

    return (
        <Card className="glass-card p-4 space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">7-Day Trend</h3>
            <div className="h-16 flex items-end justify-between gap-1">
                {history.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${((val - min) / range) * 100}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`w-full rounded-t-sm ${i === history.length - 1 ? 'bg-cyan-400' : 'bg-white/10'}`}
                    />
                ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground/60">
                <span>7d ago</span>
                <span>Today</span>
            </div>
        </Card>
    )
}
