import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const TOKENS_FILE = path.join(process.cwd(), "data", "notification-tokens.json")

// Load tokens from file
function loadTokens() {
    if (!fs.existsSync(TOKENS_FILE)) {
        return { tokens: [] }
    }
    const data = fs.readFileSync(TOKENS_FILE, "utf-8")
    return JSON.parse(data)
}

export async function POST(request: Request) {
    try {
        const { title, body: message, targetUrl } = await request.json()

        if (!title || !message) {
            return NextResponse.json(
                { error: "Title and body are required" },
                { status: 400 }
            )
        }

        // Load stored notification tokens
        const tokensData = loadTokens()
        const enabledTokens = tokensData.tokens.filter((t: any) => t.enabled)

        if (enabledTokens.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No enabled notification tokens found. Users need to add the app and enable notifications first."
                },
                { status: 200 }
            )
        }

        console.log(`Sending notifications to ${enabledTokens.length} users...`)

        // Send notifications to each token
        const results = await Promise.allSettled(
            enabledTokens.map(async (tokenData: any) => {
                try {
                    const response = await fetch(tokenData.url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            notificationId: `notif_${Date.now()}_${tokenData.fid}`,
                            title,
                            body: message,
                            targetUrl: targetUrl || "https://v0-task-to-cash-seven.vercel.app",
                            tokens: [tokenData.token],
                        }),
                    })

                    if (!response.ok) {
                        throw new Error(`Failed to send to FID ${tokenData.fid}: ${response.statusText}`)
                    }

                    return { fid: tokenData.fid, status: "success" }
                } catch (error) {
                    console.error(`Error sending to FID ${tokenData.fid}:`, error)
                    return { fid: tokenData.fid, status: "failed", error: String(error) }
                }
            })
        )

        const successful = results.filter((r) => r.status === "fulfilled").length
        const failed = results.filter((r) => r.status === "rejected").length

        console.log(`Notification results: ${successful} successful, ${failed} failed`)

        return NextResponse.json({
            success: true,
            message: `Notifications sent to ${successful} of ${enabledTokens.length} users`,
            details: {
                total: enabledTokens.length,
                successful,
                failed,
            },
        })
    } catch (error) {
        console.error("Send notification error:", error)
        return NextResponse.json(
            { error: "Failed to send notifications", details: String(error) },
            { status: 500 }
        )
    }
}

export async function GET() {
    // Return info about stored tokens
    try {
        const tokensData = loadTokens()
        const enabledCount = tokensData.tokens.filter((t: any) => t.enabled).length

        return NextResponse.json({
            totalTokens: tokensData.tokens.length,
            enabledTokens: enabledCount,
            message: enabledCount > 0
                ? `Ready to send notifications to ${enabledCount} users`
                : "No users have enabled notifications yet"
        })
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}
