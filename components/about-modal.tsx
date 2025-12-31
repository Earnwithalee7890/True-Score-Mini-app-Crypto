"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Info, ExternalLink } from "lucide-react"

interface AboutModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-sm glass-card-strong p-6 rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-500/20"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                <Info className="h-5 w-5 text-cyan-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">About TrueScore</h2>
                        </div>

                        <div className="text-sm text-gray-300 space-y-3 leading-relaxed">
                            <p>
                                TrueScore helps you track your <strong className="text-cyan-400">Farcaster Reputation</strong> in real-time.
                            </p>
                            <p>
                                Our scores are powered directly by <strong className="text-purple-400">Neynar's OpenRank</strong> algorithms, analyzing your casts, engagement, and graph.
                            </p>

                            <div className="bg-white/5 p-3 rounded-xl border border-white/10 mt-2">
                                <h4 className="text-xs font-bold text-cyan-300 uppercase mb-2">Reputation Tiers</h4>
                                <ul className="space-y-1 text-xs">
                                    <li className="flex justify-between"><span className="text-green-400">Safe (>80)</span> <span>High Trust</span></li>
                                    <li className="flex justify-between"><span className="text-yellow-400">Neutral (50-79)</span> <span>Average</span></li>
                                    <li className="flex justify-between"><span className="text-orange-400">Risky (25-49)</span> <span>Low Activity</span></li>
                                    <li className="flex justify-between"><span className="text-red-400">Spammy (<25)</span> <span>Filtered</span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <a
                                href="https://neynar.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs text-white/60"
                            >
                                Powered by Neynar <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
