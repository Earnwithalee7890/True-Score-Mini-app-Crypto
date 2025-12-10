import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const fid = searchParams.get("fid")

        console.log("Quotient API - Received FID:", fid)

        if (!fid) {
            return NextResponse.json(
                { error: "FID is required" },
                { status: 400 }
            )
        }

        // Validate FID is a valid number
        const fidNumber = parseInt(fid)
        if (isNaN(fidNumber) || fidNumber <= 0) {
            console.error("Invalid FID format:", fid)
            return NextResponse.json(
                { error: "Invalid FID format. Must be a positive number." },
                { status: 400 }
            )
        }

        console.log("Fetching Quotient data for FID:", fidNumber)

        // Fetch from official Quotient API
        const quotientUrl = `https://api.quotient.social/v1/user-reputation?fid=${fidNumber}`
        console.log("Quotient API URL:", quotientUrl)

        const response = await fetch(quotientUrl, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        console.log("Quotient API response status:", response.status)

        if (!response.ok) {
            const errorText = await response.text()
            console.error(`Quotient API error: ${response.status} - ${errorText}`)
            throw new Error(`Quotient API returned ${response.status}`)
        }

        const data = await response.json()
        console.log("Quotient API response:", data)

        return NextResponse.json({
            quotientScore: data.quotientScore || 0,
            quotientScoreRaw: data.quotientScoreRaw || 0,
            rank: data.rank || 0,
        })
    } catch (error) {
        console.error("Error fetching Quotient data:", error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch Quotient score" },
            { status: 500 }
        )
    }
}
