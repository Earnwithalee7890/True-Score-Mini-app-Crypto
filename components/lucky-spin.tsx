"use client"

import { useState, useEffect } from "react"
import { Disc, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LuckySpin() {
    const [canSpin, setCanSpin] = useState(false)
    const [spinning, setSpinning] = useState(false)
    const [reward, setReward] = useState<string | null>(null)

    useEffect(() => {
        const lastSpin = localStorage.getItem("last_lucky_spin")
        const today = new Date().toDateString()
        if (lastSpin !== today) {
            setCanSpin(true)
        }
    }, [])

    const handleSpin = () => {
        setSpinning(true)
        setCanSpin(false)

        // Mock spin duration
        setTimeout(() => {
            const rewards = ["+10 XP", "+50 XP", "Badge Unlocked!", "2x Streak"]
            const won = rewards[Math.floor(Math.random() * rewards.length)]
            setReward(won)
            setSpinning(false)

            localStorage.setItem("last_lucky_spin", new Date().toDateString())
        }, 2000)
    }

    if (!canSpin && !spinning && !reward) return null

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 p-1">
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                    <h3 className="font-bold text-white uppercase tracking-widest text-sm">Daily Bonus</h3>
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                </div>

                {reward ? (
                    <div className="animate-fade-in py-4">
                        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-1">
                            {reward}
                        </div>
                        <p className="text-xs text-white/60">Come back tomorrow!</p>
                    </div>
                ) : (
                    <div className="py-2">
                        <div className={`relative mb-4 transition-transform duration-[2000ms] ease-out ${spinning ? "rotate-[1080deg]" : ""}`}>
                            <Disc className="h-16 w-16 text-indigo-400" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                        </div>

                        <Button
                            onClick={handleSpin}
                            disabled={spinning}
                            className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 font-bold hover:scale-105 transition-all ${spinning ? "opacity-50" : ""}`}
                        >
                            {spinning ? "Spinning..." : "SPIN NOW"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
