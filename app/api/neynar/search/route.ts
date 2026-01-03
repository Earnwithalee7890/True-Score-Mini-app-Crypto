import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")

    if (!query) {
        return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    const apiKey = process.env.NEYNAR_API_KEY
    // Handle case where API key is missing (Dev mode) check
    if (!apiKey) {
        // Mock response if query matches demo users
        if (query.toLowerCase() === 'demo' || query === '1') {
            return NextResponse.json({
                fid: 1,
                username: "demo_user",
                displayName: "Demo User",
                pfpUrl: "/profile-avatar-crypto-user.jpg",
                score: 85,
                reputation: "safe",
                followers: 1337,
                following: 42,
                casts: 500,
                replies: 100,
                verifiedAddresses: [],
                activeStatus: "active",
                powerBadge: true
            })
        }
        return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    try {
        // Check if query is a number (FID) or string (username)
        // Trim whitespace and remove '@' prefix if user typed it
        const cleanQuery = query.trim().replace(/^@/, '')
        const isFID = /^\d+$/.test(cleanQuery)

        let userData

        if (isFID) {
            // Search by FID
            const userResponse = await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${cleanQuery}`, {
                headers: { accept: "application/json", "x-api-key": apiKey }
            })

            if (!userResponse.ok) throw new Error("Failed to fetch user from Neynar")

            const data = await userResponse.json()
            userData = data.users?.[0]
        } else {
            // Search by username
            const searchResponse = await fetch(
                `https://api.neynar.com/v2/farcaster/user/search?q=${encodeURIComponent(cleanQuery)}&limit=1`,
                {
                    headers: { accept: "application/json", "x-api-key": apiKey }
                }
            )

            if (!searchResponse.ok) throw new Error("Failed to search users")

            const searchData = await searchResponse.json()
            // Robust check for response structure
            userData = searchData.result?.users?.[0] || searchData.users?.[0]
        }

        if (!userData) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Calculate score and reputation (standardized logic)
        const score = userData.experimental?.neynar_user_score ?? 0
        const scorePercent = Math.round(score * 100)

        let reputation: "safe" | "neutral" | "risky" | "spammy" = "neutral"
        if (scorePercent >= 80) reputation = "safe"
        else if (scorePercent >= 50) reputation = "neutral"
        else if (scorePercent >= 25) reputation = "risky"
        else reputation = "spammy"

        if (userData.active_status === "inactive" && scorePercent < 30) reputation = "spammy"

        return NextResponse.json({
            fid: userData.fid,
            username: userData.username,
            displayName: userData.display_name,
            pfpUrl: userData.pfp_url,
            score: scorePercent,
            reputation,
            followers: userData.follower_count ?? 0,
            following: userData.following_count ?? 0,
            casts: userData.power_badge ? 100 : 0, // Fallback if regular search doesn't give stats
            verifiedAddresses: userData.verified_addresses?.eth_addresses ?? [],
            activeStatus: userData.active_status,
            powerBadge: userData.power_badge
        })
    } catch (error) {
        console.error("Search API error:", error)
        return NextResponse.json({ error: "Failed to search users" }, { status: 500 })
    }
}
