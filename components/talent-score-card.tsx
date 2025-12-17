"use client"

import { motion } from "framer-motion"
import { Users, CheckCircle2, UserCheck, ShieldCheck } from "lucide-react"

interface TalentScoreCardProps {
    score?: number
    isHuman?: boolean
    isVerified?: boolean
    handle?: string
}

export function TalentScoreCard({ score, isHuman, isVerified, handle }: TalentScoreCardProps) {
    if (score === undefined) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card-strong p-6 rounded-2xl neon-border-purple overflow-hidden relative"
        >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl -mr-16 -mt-16" />

            <div className="flex items-start justify-between relative z-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-purple-300">
                        <Users className="h-4 w-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Talent Builder Score</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">{score}</span>
                        <span className="text-sm text-purple-300/60">/ 100</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 items-end">
                    {isHuman && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-[10px] font-bold text-green-400 uppercase tracking-tighter">
                            <UserCheck className="h-3 w-3" />
                            Human Verified
                        </div>
                    )}
                    {isVerified && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-[10px] font-bold text-blue-400 uppercase tracking-tighter">
                            <ShieldCheck className="h-3 w-3" />
                            Verified
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 uppercase tracking-widest font-bold">
                <span>Reputation Source</span>
                <span className="text-purple-400/80">Talent Protocol</span>
            </div>

            {handle && (
                <div className="mt-2 text-[10px] text-white/30 truncate">
                    ID: {handle}
                </div>
            )}
        </motion.div>
    )
}
