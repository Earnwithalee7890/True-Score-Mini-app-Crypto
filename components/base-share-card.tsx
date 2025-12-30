"use client"

import { Button } from "@/components/ui/button"
import { Share2, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"
import sdk from "@farcaster/frame-sdk"

interface BaseShareCardProps {
    onShareFarcaster?: () => void
}

export function BaseShareCard({ onShareFarcaster }: BaseShareCardProps) {
    const [copied, setCopied] = useState(false)
    const baseAppUrl = "https://v0-task-to-cash-seven.vercel.app"

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(baseAppUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    const handleShareOnBase = () => {
        const text = `Just checked in on Base! 🔵\n\nEarning rewards daily with TrueScore Mini App 🎯\n\nJoin me:`
        sdk.actions.openUrl(
            `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(baseAppUrl)}`
        )
    }

    return (
        <div className="glass-card-strong p-5 space-y-4 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/10 border-2 border-blue-400/30 box-glow-blue">
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg neon-glow-blue">
                    <Share2 className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-foreground text-lg">Share on Base</h3>
                    <p className="text-xs text-blue-200">Grow the community 🔵</p>
                </div>
            </div>

            <div className="space-y-2">
                {/* Share on Farcaster Button */}
                <Button
                    onClick={onShareFarcaster || handleShareOnBase}
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share on Farcaster
                </Button>

                {/* Copy Link Button */}
                <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="w-full h-12 border-2 border-blue-400/40 bg-blue-500/5 hover:bg-blue-500/10 text-blue-100 font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                    {copied ? (
                        <>
                            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-5 h-5 mr-2" />
                            Copy Link
                        </>
                    )}
                </Button>
            </div>

            <div className="text-center text-xs text-blue-200/60 space-y-1">
                <p>Help us reach the Top 500 Base Builders! 🚀</p>
                <p className="text-[10px]">Every share counts toward our Talent Protocol score</p>
            </div>
        </div>
    )
}
