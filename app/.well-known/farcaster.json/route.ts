import { NextResponse } from "next/server"

export async function GET() {
  const manifest = {
    frame: {
      name: "TrueScore",
      version: "1",
      iconUrl: "https://v0-task-to-cash-seven.vercel.app/icon.png",
      homeUrl: "https://v0-task-to-cash-seven.vercel.app",
      imageUrl: "https://v0-task-to-cash-seven.vercel.app/og-image.png",
      buttonTitle: "View My Score",
      splashImageUrl: "https://v0-task-to-cash-seven.vercel.app/splash.png",
      splashBackgroundColor: "#1a1a2e",
      webhookUrl: "https://v0-task-to-cash-seven.vercel.app/api/webhook",
      subtitle: "Your Real Neynar Reputation",
      description: "View your real Neynar score, engagement analytics, and account reputation on Farcaster. Includes daily check-in and tip features.",
      primaryCategory: "social",
      tags: ["reputation", "analytics", "neynar", "score"],
      screenshotUrls: ["https://v0-task-to-cash-seven.vercel.app/og-image.png"],
      heroImageUrl: "https://v0-task-to-cash-seven.vercel.app/og-image.png",
      tagline: "Track Farcaster reputation",
      ogTitle: "TrueScore - Neynar Scores",
      ogDescription: "View your real Neynar score, engagement analytics, and account reputation on Farcaster",
      ogImageUrl: "https://v0-task-to-cash-seven.vercel.app/og-image.png",
      castShareUrl: "https://v0-task-to-cash-seven.vercel.app"
    }
  }

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "max-age=0",
    },
  })
}
