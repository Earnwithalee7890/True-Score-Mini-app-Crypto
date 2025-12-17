"use client"

import { motion } from "framer-motion"
import { Users, CheckCircle2, UserCheck, ShieldCheck, Zap } from "lucide-react"

interface TalentScoreCardProps {
    builderScore?: number
    creatorScore?: number
    farcasterRevenue?: number
    isHuman?: boolean
    isVerified?: boolean
    handle?: string
}

export function TalentScoreCard({ builderScore, creatorScore, farcasterRevenue, isHuman, isVerified, handle }: TalentScoreCardProps) {
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
                    {handle && (
                        <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-white/50">
                            @{handle}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                    {/* Builder Score */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                        <div className="flex items-center gap-1.5 mb-2">
                            <Zap className="h-3 w-3 text-purple-300" />
                            <span className="text-[9px] font-bold uppercase tracking-wider text-purple-200">Builder</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-white">{builderScore || 0}</span>
                            <span className="text-[10px] font-bold text-purple-300/40">/100</span>
                        </div>
                    </div>

                    {/* Creator Score */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20">
                        <div className="flex items-center gap-1.5 mb-2">
                            <Users className="h-3 w-3 text-pink-300" />
                            <span className="text-[9px] font-bold uppercase tracking-wider text-pink-200">Creator</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-white">{creatorScore || 0}</span>
                            <span className="text-[10px] font-bold text-pink-300/40">/100</span>
                        </div>
                    </div>
                </div>

                {/* Earnings Section */}
                {farcasterRevenue !== undefined && (
                    <div className="mb-5 p-4 rounded-2xl bg-green-500/5 border border-green-500/20 flex flex-col items-center">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-400/60 mb-1">Lifetime Rewards</span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-green-400 font-mono">${farcasterRevenue.toLocaleString()}</span>
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
