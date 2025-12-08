import { NextResponse } from "next/server"

export async function POST() {
    try {
        // Send the specific notification message the user requested
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL || "https://v0-task-to-cash-seven.vercel.app"}/api/send-notification`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: "TrueScore Update 🎯",
                    body: "Neynar score updated - check now!",
                    targetUrl: "https://v0-task-to-cash-seven.vercel.app",
                }),
            }
        )

        const data = await response.json()

        return NextResponse.json(data)
    } catch (error) {
        console.error("Notification action error:", error)
        return NextResponse.json(
            { error: "Failed to send notification", details: String(error) },
            { status: 500 }
        )
    }
}

export async function GET() {
    // Also allow GET for easy triggering via browser/curl
    return POST()
}
