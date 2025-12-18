"use client"

import { motion } from "framer-motion"
import { Users, CheckCircle2, UserCheck, ShieldCheck, Zap, User } from "lucide-react"
import { getScoreLevel } from "@/lib/talent"
import sdk from "@farcaster/frame-sdk"

interface TalentScoreCardProps {
    builderScore?: number
    creatorScore?: number
    farcasterRevenue?: number
    isHuman?: boolean
    isVerified?: boolean
    handle?: string
}

export function TalentScoreCard({ builderScore = 0, creatorScore = 0, farcasterRevenue, isHuman, isVerified, handle }: TalentScoreCardProps) {
    const builderLevel = getScoreLevel(builderScore)
    const creatorLevel = getScoreLevel(creatorScore)

    if (builderScore === undefined && creatorScore === undefined) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full relative group"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-2xl -z-10 opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="glass-card-strong p-5 rounded-3xl neon-border-purple border-purple-500/30 overflow-hidden relative">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/30">
                            <ShieldCheck className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-[11px] font-black uppercase tracking-tighter text-purple-300">Verified Reputation</h3>
                            <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Talent Protocol v3</p>
                        </div>
                    </div>
                    {/* Debug info - hidden but searchable in DOM */}
                    <div className="hidden debug-scores" data-builder={builderScore} data-creator={creatorScore} />
                    {handle && (
                        <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-white/50">
                            @{handle}
                        </div>
                    )}
                </div>

                {/* Show Scores Grid if ANY identity or score data is found */}
                {(handle || builderScore > 0 || creatorScore > 0 || isHuman || isVerified) ? (
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        {/* Builder Score */}
                        <div className="group/score relative p-4 rounded-3xl bg-gradient-to-br from-purple-500/20 via-purple-500/5 to-transparent border border-purple-500/30 flex flex-col items-center text-center overflow-hidden transition-all hover:scale-[1.02] hover:border-purple-500/50">
                            <div className="absolute inset-0 bg-purple-500/5 blur-xl -z-10 group-hover/score:opacity-100 opacity-0 transition-opacity" />
                            <div className="flex items-center gap-1.5 mb-2">
                                <Zap className="h-3.5 w-3.5 text-purple-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-200">Builder</span>
                            </div>
                            <span className="text-4xl font-black text-white mb-2 font-mono tracking-tighter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                                {builderScore}
                            </span>
                            <div className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 ${builderLevel.color} shadow-lg shadow-purple-500/10`}>
                                Lvl {builderLevel.level}: {builderLevel.name}
                            </div>
                        </div>

                        {/* Creator Score */}
                        <div className="group/score relative p-4 rounded-3xl bg-gradient-to-br from-pink-500/20 via-pink-500/5 to-transparent border border-pink-500/30 flex flex-col items-center text-center overflow-hidden transition-all hover:scale-[1.02] hover:border-pink-500/50">
                            <div className="absolute inset-0 bg-pink-500/5 blur-xl -z-10 group-hover/score:opacity-100 opacity-0 transition-opacity" />
                            <div className="flex items-center gap-1.5 mb-2">
                                <Users className="h-3.5 w-3.5 text-pink-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-200">Creator</span>
                            </div>
                            <span className="text-4xl font-black text-white mb-2 font-mono tracking-tighter drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                                {creatorScore}
                            </span>
                            <div className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 ${creatorLevel.color} shadow-lg shadow-pink-500/10`}>
                                Lvl {creatorLevel.level}: {creatorLevel.name}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-5 p-5 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center gap-2">
                        <User className="h-8 w-8 text-white/20 mb-1" />
                        <p className="text-[11px] font-bold text-white/60">Talent Protocol Profile</p>
                        <p className="text-[9px] text-white/30 max-w-[180px]">Score data will appear here once connected to Talent Protocol.</p>
                    </div>
                )}

                {/* Earnings Section */}
                {farcasterRevenue !== undefined && farcasterRevenue > 0 && (
                    <div className="mb-5 p-4 rounded-2xl bg-green-500/5 border border-green-500/20 flex flex-col items-center">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-400/60 mb-1">Lifetime Rewards</span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-green-400 font-mono italic">${farcasterRevenue.toLocaleString()}</span>
                            <span className="text-[10px] font-black text-green-400/40 uppercase">usdc</span>
                        </div>
                    </div>
                )}

                {/* Verification Badges */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {isHuman && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-black text-green-400 uppercase tracking-tighter">
                            <UserCheck className="h-3 w-3" />
                            Human Verified
                        </div>
                    )}
                    {isVerified && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-tighter">
                            <ShieldCheck className="h-3 w-3" />
                            Account Verified
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
