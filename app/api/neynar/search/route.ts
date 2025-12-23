import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")

    if (!query) {
        return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    const apiKey = process.env.NEYNAR_API_KEY

    if (!apiKey) {
        return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    try {
        // Check if query is a number (FID) or string (username)
        const isFID = /^\d+$/.test(query)

        let userData

        if (isFID) {
            // Search by FID - use existing bulk user endpoint
            const fid = query
            const userResponse = await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`, {
                headers: {
                    accept: "application/json",
                    "x-api-key": apiKey,
                },
            })

            if (!userResponse.ok) {
                throw new Error("Failed to fetch user from Neynar")
            }

            const data = await userResponse.json()
            const user = data.users?.[0]

            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 })
            }

            userData = user
        } else {
            // Search by username - use search endpoint
            const searchResponse = await fetch(
                `https://api.neynar.com/v2/farcaster/user/search?q=${encodeURIComponent(query)}&limit=1`,
                {
                    headers: {
                        accept: "application/json",
                        "x-api-key": apiKey,
                    },
                }
            )

            if (!searchResponse.ok) {
                throw new Error("Failed to search users")
            }

            const searchData = await searchResponse.json()
            const user = searchData.result?.users?.[0]

            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 })
            }

            userData = user
        }

        // Calculate score and reputation
        const score = userData.experimental?.neynar_user_score ?? 0
        const scorePercent = Math.round(score * 100)

        let reputation: "safe" | "neutral" | "risky" | "spammy" = "neutral"
        if (scorePercent >= 80) reputation = "safe"
        else if (scorePercent >= 50) reputation = "neutral"
        else if (scorePercent >= 25) reputation = "risky"
        else reputation = "spammy"


        return NextResponse.json({
            fid: userData.fid,
            username: userData.username,
            displayName: userData.display_name,
            pfpUrl: userData.pfp_url,
            score: scorePercent,
            reputation,
            followers: userData.follower_count ?? 0,
            following: userData.following_count ?? 0,
            verifiedAddresses: userData.verified_addresses?.eth_addresses ?? [],
        })
    } catch (error) {
        console.error("Search API error:", error)
        return NextResponse.json({ error: "Failed to search users" }, { status: 500 })
    }
}
