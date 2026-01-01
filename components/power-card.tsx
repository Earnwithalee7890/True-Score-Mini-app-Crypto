"use client"

import { Zap, Shield, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PowerCardProps {
    userData: any
}

export function PowerCard({ userData }: PowerCardProps) {
    // Determine card rarity/style based on score
    let rarity = "Common"
    let color = "from-gray-500 to-slate-600"
    let border = "border-gray-400"

    if (userData.score > 90) {
        rarity = "Legendary"
        color = "from-yellow-400 via-orange-500 to-red-500"
        border = "border-yellow-400"
    } else if (userData.score > 75) {
        rarity = "Epic"
        color = "from-purple-500 to-pink-500"
        border = "border-purple-400"
    } else if (userData.score > 50) {
        rarity = "Rare"
        color = "from-blue-500 to-cyan-500"
        border = "border-blue-400"
    }

    return (
        <div className="mt-8">
            <h3 className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-4">Your Power Card</h3>

            <div className={`relative aspect-[3/4] max-w-[280px] mx-auto rounded-3xl p-1 bg-gradient-to-br ${color} shadow-2xl`}>
                {/* Holographic overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-50 rounded-3xl pointer-events-none" />

                <div className="h-full bg-black/80 backdrop-blur-sm rounded-[20px] p-4 flex flex-col relative overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded bg-white/10 ${border.replace('border', 'text')}`}>{rarity}</span>
                        <div className="flex items-center gap-1 text-yellow-400">
                            <Zap className="h-3 w-3 fill-current" />
                            <span className="font-mono font-bold">{userData.score}</span>
                        </div>
                    </div>

                    {/* Image */}
                    <div className={`aspect-square rounded-xl border-2 ${border} relative mb-4 overflow-hidden group`}>
                        <img src={userData.pfpUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center">
                            <span className="font-bold text-white text-sm truncate block">{userData.displayName}</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-auto">
                        <div className="bg-white/5 rounded p-2 text-center">
                            <span className="block text-gray-400 text-[10px]">Followers</span>
                            <span className="font-bold">{userData.followers}</span>
                        </div>
                        <div className="bg-white/5 rounded p-2 text-center">
                            <span className="block text-gray-400 text-[10px]">Active Days</span>
                            <span className="font-bold">{userData.activeDays || "N/A"}</span>
                        </div>
                        <div className="bg-white/5 rounded p-2 text-center">
                            <span className="block text-gray-400 text-[10px]">Rank</span>
                            <span className="font-bold">#{userData.rank || "---"}</span>
                        </div>
                        <div className="bg-white/5 rounded p-2 text-center">
                            <span className="block text-gray-400 text-[10px]">Casts</span>
                            <span className="font-bold">{userData.casts || 0}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                        <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3 text-cyan-400" />
                            <span className="text-[10px] text-cyan-400 uppercase">{userData.reputation}</span>
                        </div>
                        <Crown className="h-4 w-4 text-yellow-400" />
                    </div>
                </div>
            </div>

            <Button className="w-full max-w-[280px] mx-auto block mt-4 bg-white/10 hover:bg-white/20 text-white border border-white/10">
                Download Card
            </Button>
        </div>
    )
}
