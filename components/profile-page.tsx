"use client"

import { UserStats } from "./user-stats"
import { DailyCheckin } from "./daily-checkin"
import { CreatorTip } from "./creator-tip"
import type { UserData } from "./truescore-app"

interface ProfilePageProps {
    userData: UserData
}

export function ProfilePage({ userData }: ProfilePageProps) {
    return (
        <div className="space-y-6 pb-24">
            {/* User Info */}
            <div className="flex items-center justify-center gap-4 opacity-0 animate-slide-up stagger-1">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-md animate-pulse" />
                    <img
                        src={userData.pfpUrl || "/placeholder.svg"}
                        alt={userData.displayName}
                        className="relative h-20 w-20 rounded-full border-2 border-primary/50 ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-transform hover:scale-105"
                    />
                </div>
                <div>
                    <p className="font-semibold text-xl text-foreground">{userData.displayName}</p>
                    <p className="text-sm text-muted-foreground">@{userData.username}</p>
                </div>
            </div>

            {/* Followers/Following Stats */}
            <div className="opacity-0 animate-slide-up stagger-2">
                <UserStats followers={userData.followers} following={userData.following} />
            </div>

            {/* Daily Check-in */}
            <div className="opacity-0 animate-slide-up stagger-3">
                <DailyCheckin />
            </div>

            {/* Tip the Creator */}
            <div className="opacity-0 animate-slide-up stagger-4">
                <CreatorTip />
            </div>
        </div>
    )
}
