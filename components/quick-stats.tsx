"use client"

import { TrendingUp, Users, Zap, Activity } from "lucide-react"

interface StatsCardProps {
    icon: React.ReactNode
    label: string
    value: string | number
    trend?: string
    color: string
}

function StatCard({ icon, label, value, trend, color }: StatsCardProps) {
    return (
        <div className={`glass-card-strong p-4 space-y-2 bg-gradient-to-br ${color} border-2 backdrop-blur-xl`}>
            <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-white/10">
                    {icon}
                </div>
                {trend && (
                    <span className="text-xs font-semibold text-green-400 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-white/70">{label}</p>
            </div>
        </div>
    )
}

interface QuickStatsProps {
    totalCheckIns?: number
    currentStreak?: number
    reputation?: string
    lastCheckIn?: string
}

export function QuickStats({
    totalCheckIns = 0,
    currentStreak = 0,
    reputation = "safe",
    lastCheckIn
}: QuickStatsProps) {
    const getReputationEmoji = (rep: string) => {
        switch (rep.toLowerCase()) {
            case "safe": return "✅"
            case "neutral": return "⚡"
            case "risky": return "⚠️"
            default: return "📊"
        }
    }

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground px-1">Quick Stats</h3>

            <div className="grid grid-cols-2 gap-3">
                <StatCard
                    icon={<Zap className="h-5 w-5 text-white" />}
                    label="Total Check-Ins"
                    value={totalCheckIns}
                    trend={totalCheckIns > 5 ? "+2 this week" : undefined}
                    color="from-cyan-500/20 to-blue-500/20 border-cyan-400/30"
                />

                <StatCard
                    icon={<Activity className="h-5 w-5 text-white" />}
                    label="Current Streak"
                    value={`${currentStreak}d`}
                    color="from-orange-500/20 to-red-500/20 border-orange-400/30"
                />
            </div>

            <div className="glass-card-strong p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/20">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground">Reputation</p>
                        <p className="text-lg font-bold text-purple-300 capitalize">
                            {getReputationEmoji(reputation)} {reputation}
                        </p>
                    </div>
                    <Users className="h-8 w-8 text-purple-300/50" />
                </div>
            </div>

            {lastCheckIn && (
                <div className="text-center text-xs text-muted-foreground">
                    Last check-in: {lastCheckIn}
                </div>
            )}
        </div>
    )
}
