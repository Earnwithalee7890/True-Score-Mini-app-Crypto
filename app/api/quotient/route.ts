import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { fid } = await request.json()

        if (!fid) {
            return NextResponse.json({ error: "FID is required" }, { status: 400 })
        }

        const quotientApiKey = process.env.QUOTIENT_API_KEY
        if (!quotientApiKey) {
            console.error("QUOTIENT_API_KEY not found")
            return NextResponse.json({ quotientScore: 0, quotientRank: 0 }, { status: 200 })
        }

        const response = await fetch("https://api.quotient.social/v1/user-reputation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fids: [fid],
                api_key: quotientApiKey,
            }),
        })

        if (!response.ok) {
            console.error("Quotient API error:", response.status)
            return NextResponse.json({ quotientScore: 0, quotientRank: 0 }, { status: 200 })
        }

        const data = await response.json()

        if (data.data && data.data.length > 0) {
            return NextResponse.json({
                quotientScore: data.data[0].quotientScore || 0,
                quotientScoreRaw: data.data[0].quotientScoreRaw || 0,
                quotientRank: data.data[0].quotientRank || 0,
                quotientProfileUrl: data.data[0].quotientProfileUrl || "",
            })
        }

        return NextResponse.json({ quotientScore: 0, quotientRank: 0 }, { status: 200 })
    } catch (error) {
        console.error("Quotient API error:", error)
        return NextResponse.json({ quotientScore: 0, quotientRank: 0 }, { status: 200 })
    }
}
