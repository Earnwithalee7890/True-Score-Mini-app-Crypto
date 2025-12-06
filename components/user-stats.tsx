"use client"

import { Card } from "@/components/ui/card"
import { Users, UserPlus } from "lucide-react"

interface UserStatsProps {
  followers: number
  following: number
}

export function UserStats({ followers, following }: UserStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const stats = [
    { label: "Followers", value: followers, icon: Users, color: "from-primary/20 to-primary/5" },
    { label: "Following", value: following, icon: UserPlus, color: "from-chart-2/20 to-chart-2/5" },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <Card
          key={stat.label}
          className="glass-card group p-3 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-default"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} transition-transform group-hover:scale-110`}
          >
            <stat.icon className="h-5 w-5 text-foreground/80" />
          </div>
          <p className="text-xl font-bold text-foreground tabular-nums">{formatNumber(stat.value)}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{stat.label}</p>
        </Card>
      ))}
    </div>
  )
}
