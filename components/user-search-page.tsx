"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Loader2, User as UserIcon, AlertCircle } from "lucide-react"
import { ScoreDisplay } from "./score-display"
import { ReputationBadge } from "./reputation-badge"
import { TalentScoreCard } from "./talent-score-card"
import { ProfileStatsRow } from "./profile-stats-row"
import type { UserData } from "./truescore-app"

export function UserSearchPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [searchedUser, setSearchedUser] = useState<UserData | null>(null)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!searchQuery.trim()) {
            setError("Please enter a FID or username")
            return
        }

        setLoading(true)
        setError(null)
        setSearchedUser(null)

        try {
            const response = await fetch(`/api/neynar/search?q=${encodeURIComponent(searchQuery.trim())}`)

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "User not found")
            }

            const userData = await response.json()
            setSearchedUser(userData)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to search user")
            setSearchedUser(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Search Header */}
            <div className="opacity-0 animate-slide-up stagger-1">
                <Card className="glass-card-strong p-5 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 border-2 border-cyan-400/40 box-glow-aqua">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg neon-glow-cyan">
                            <Search className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground text-lg">Search Users</h3>
                            <p className="text-xs text-cyan-200">Find by FID or username</p>
                        </div>
                    </div>

                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter FID (e.g. 338060) or username"
                            className="flex-1 px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Search className="h-5 w-5" />
                            )}
                        </Button>
                    </form>
                </Card>
            </div>

            {/* Error Message */}
            {error && (
                <div className="opacity-0 animate-slide-up stagger-2">
                    <Card className="glass-card-strong p-4 bg-red-500/10 border-2 border-red-400/40">
                        <div className="flex items-center gap-3 text-red-400">
                            <AlertCircle className="h-5 w-5" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    </Card>
                </div>
            )}

            {/* Search Results */}
            {searchedUser && (
                <div className="space-y-4">
                    {/* User Profile Card */}
                    <div className="opacity-0 animate-slide-up stagger-2">
                        <Card className="glass-card-strong p-5 border-2 border-cyan-400/40">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={searchedUser.pfpUrl || "/placeholder-user.jpg"}
                                    alt={searchedUser.displayName}
                                    className="h-16 w-16 rounded-full border-2 border-cyan-400/60 ring-2 ring-cyan-400/30 object-cover"
                                />
                                <div>
                                    <h3 className="font-bold text-foreground text-xl">{searchedUser.displayName}</h3>
                                    <p className="text-sm text-muted-foreground">@{searchedUser.username}</p>
                                    <p className="text-xs text-cyan-300 mt-1">FID: {searchedUser.fid}</p>
                                </div>
                            </div>

                            <ProfileStatsRow
                                followers={searchedUser.followers}
                                following={searchedUser.following}
                                casts={searchedUser.casts || 0}
                                replies={searchedUser.replies || 0}
                            />
                        </Card>
                    </div>

                    {/* Neynar Score */}
                    <div className="opacity-0 animate-slide-up stagger-3">
                        <ScoreDisplay score={searchedUser.score} />
                    </div>

                    {/* Reputation Badge */}
                    <div className="flex justify-center opacity-0 animate-slide-up stagger-4">
                        <ReputationBadge reputation={searchedUser.reputation} />
                    </div>

                    {/* Talent Protocol Scores */}
                    {(searchedUser.builderScore !== undefined || searchedUser.creatorScore !== undefined) && (
                        <div className="opacity-0 animate-slide-up stagger-5">
                            <TalentScoreCard
                                builderScore={searchedUser.builderScore}
                                creatorScore={searchedUser.creatorScore}
                                farcasterRevenue={searchedUser.farcasterRevenue}
                                isHuman={searchedUser.isHuman}
                                isVerified={searchedUser.isVerified}
                                handle={searchedUser.talentHandle}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Empty State */}
            {!searchedUser && !error && !loading && (
                <div className="opacity-0 animate-slide-up stagger-2">
                    <Card className="glass-card-strong p-8 text-center border-2 border-dashed border-cyan-400/30">
                        <UserIcon className="h-12 w-12 text-cyan-400/50 mx-auto mb-3" />
                        <p className="text-muted-foreground text-sm">
                            Search for any Farcaster user by their FID or username
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-2">
                            Try searching: 338060, dwr, vitalik.eth
                        </p>
                    </Card>
                </div>
            )}
        </div>
    )
}
