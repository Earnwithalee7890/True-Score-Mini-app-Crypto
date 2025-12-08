import { Metadata } from "next"
import { redirect } from "next/navigation"

interface SharePageProps {
    searchParams: Promise<{
        fid?: string
        score?: string
        username?: string
        displayName?: string
        reputation?: string
    }>
}

const appUrl = "https://v0-task-to-cash-seven.vercel.app"

export async function generateMetadata({ searchParams }: SharePageProps): Promise<Metadata> {
    const params = await searchParams
    const score = params.score || "0"
    const username = params.username || "User"
    const displayName = params.displayName || username
    const reputation = params.reputation || "neutral"

    // Build dynamic OG image URL
    const ogImageUrl = `${appUrl}/api/og?score=${encodeURIComponent(score)}&username=${encodeURIComponent(username)}&displayName=${encodeURIComponent(displayName)}&reputation=${encodeURIComponent(reputation)}`

    // Build embed JSON for Farcaster
    const embedJson = JSON.stringify({
        version: "1",
        imageUrl: ogImageUrl,
        button: {
            title: "Check My Score",
            action: {
                type: "launch_miniapp",
                name: "TrueScore",
                url: appUrl,
                splashImageUrl: `${appUrl}/splash.png`,
                splashBackgroundColor: "#1a1a2e"
            }
        }
    })

    return {
        title: `${displayName}'s TrueScore - ${score} Points`,
        description: `${displayName} (@${username}) has a Neynar score of ${score}. Check your own TrueScore!`,
        openGraph: {
            title: `${displayName}'s TrueScore`,
            description: `Neynar Score: ${score} | Reputation: ${reputation}`,
            images: [ogImageUrl],
        },
        twitter: {
            card: "summary_large_image",
            title: `${displayName}'s TrueScore`,
            description: `Neynar Score: ${score} | Reputation: ${reputation}`,
            images: [ogImageUrl],
        },
        other: {
            "fc:frame": embedJson,
            "fc:miniapp": embedJson,
        },
    }
}

export default async function SharePage({ searchParams }: SharePageProps) {
    // Redirect to the main app - the meta tags will be picked up by crawlers
    redirect("/")
}
