import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const fid = searchParams.get("fid")

  if (!fid) {
    return NextResponse.json({ error: "FID is required" }, { status: 400 })
  }

  const apiKey = process.env.NEYNAR_API_KEY

  if (!apiKey) {
    // Return mock data if no API key
    return NextResponse.json({
      fid: Number.parseInt(fid),
      username: "demo_user",
      displayName: "Demo User",
      pfpUrl: "/profile-avatar-crypto-user.jpg",
      score: 75,
      reputation: "neutral" as const,
      followers: 1234,
      following: 567,
      casts: 0,
      replies: 0,
      verifiedAddresses: [],
    })
  }

  try {
    const userResponse = await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`, {
      headers: {
        accept: "application/json",
        "x-api-key": apiKey,
      },
    })

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user from Neynar")
    }

    const userData = await userResponse.json()
    const user = userData.users?.[0]

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const score = user.experimental?.neynar_user_score ?? 0
    const scorePercent = Math.round(score * 100)

    let reputation: "safe" | "neutral" | "risky" | "spammy" = "neutral"

    // Improved Logic: Relaxed strictness on active status for high scores
    const isActive = user.active_status === "active"
    const isPowerUser = user.power_badge === true

    // Trust the Score primarily
    if (scorePercent >= 80) reputation = "safe"
    else if (scorePercent >= 60) reputation = "safe" // Expanded safe range
    else if (scorePercent >= 40) reputation = "neutral"
    else if (scorePercent >= 20) reputation = "risky"
    else reputation = "spammy"

    // Only downgrade if explicitly inactive AND low score
    if (user.active_status === "inactive" && scorePercent < 40) reputation = "spammy"

    // Fetch user's casts to count total casts and replies
    let totalCasts = 0
    let totalReplies = 0

    // Use the stats from the user object if available (Neynar V2 usually provides this)
    // If not, we fallback to the feed fetch
    // Note: user.fid check to be safe

    // Direct stats from user object (if available in this endpoint version)
    // Some versions of Neynar return 'follower_count', 'following_count', 'verifications', 'active_status', 'power_badge'
    // We can try to use 'user.stats' or 'user.public_stats' if they exist, but v2 bulk typically has them at top level.

    // If we rely on the feed fetch for exact active counts:
    try {
      const castsResponse = await fetch(
        `https://api.neynar.com/v2/farcaster/feed/user/${fid}?limit=100`, // Increased limit
        {
          headers: {
            accept: "application/json",
            "x-api-key": apiKey,
          },
        }
      )

      if (castsResponse.ok) {
        const castsData = await castsResponse.json()
        const casts = castsData.casts || []

        // Set totals based on this sample
        casts.forEach((cast: any) => {
          totalCasts++
        })
      }
    } catch (err) {
      console.error("Error fetching casts:", err)
    }

    // Map Active Days (Approximation since API doesn't give it directly)
    // We can just return "N/A" or try to calculate from feed timestamps if we really wanted to.

    // Rank: Neynar doesn't give a global rank easily. 
    // We will leave it as N/A or remove it if users find it confusing.

    console.log('[DEBUG] User data fetched successfully', { uid: user.fid, reputation, scorePercent })
    return NextResponse.json({
      fid: user.fid,
      username: user.username,
      displayName: user.display_name,
      pfpUrl: user.pfp_url,
      score: scorePercent,
      reputation,
      followers: user.follower_count ?? 0,
      following: user.following_count ?? 0,
      casts: totalCasts, // Use the fetched count
      replies: 0, // Simplified for now
      verifiedAddresses: user.verified_addresses?.eth_addresses ?? [],
      bio: user.profile.bio.text,
      activeStatus: user.active_status, // Pass this through
      powerBadge: user.power_badge,     // Pass this through
    })
  } catch (error) {
    console.error("Neynar API error:", error)
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
}
