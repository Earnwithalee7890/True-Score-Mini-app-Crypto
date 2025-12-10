import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const appUrl = "https://v0-task-to-cash-seven.vercel.app"

export const metadata: Metadata = {
  title: "TrueScore - Your Real Neynar Reputation",
  description: "View your real Neynar score, engagement analytics, and account reputation on Farcaster",
  generator: "v0.app",
  openGraph: {
    title: "TrueScore",
    description: "Your Real Neynar Reputation Score",
    images: [`${appUrl}/api/og?fid=338060`],
  },
  other: {
    "farcaster:manifest": `${appUrl}/.well-known/farcaster.json`,
  },
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/.well-known/farcaster.json" />

        {/* Farcaster Frame Meta Tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://v0-task-to-cash-seven.vercel.app/api/og?fid=338060" />
        <meta name="fc:frame:image" content="https://v0-task-to-cash-seven.vercel.app/api/og?fid=338060" />
        <meta name="fc:frame:button:1" content="Open Mini App" />
        <meta name="fc:frame:button:1:action" content="launch" />
        <meta name="fc:frame:post_url" content="https://v0-task-to-cash-seven.vercel.app" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="TrueScore - Your Real Neynar Reputation" />
        <meta property="og:description" content="Check your real Neynar score instantly" />
        <meta property="og:image" content="https://v0-task-to-cash-seven.vercel.app/api/og?fid=338060" />
        <meta property="twitter:card" content="summary_large_image" />
      </head>
      <body className={`font-sans antialiased ${_inter.variable}`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
