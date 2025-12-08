import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Path to store notification tokens
const TOKENS_FILE = path.join(process.cwd(), "data", "notification-tokens.json")

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Load tokens from file
function loadTokens() {
  ensureDataDir()
  if (!fs.existsSync(TOKENS_FILE)) {
    return { tokens: [] }
  }
  const data = fs.readFileSync(TOKENS_FILE, "utf-8")
  return JSON.parse(data)
}

// Save tokens to file
function saveTokens(data: any) {
  ensureDataDir()
  fs.writeFileSync(TOKENS_FILE, JSON.stringify(data, null, 2))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Log webhook events
    console.log("Farcaster webhook received:", JSON.stringify(body, null, 2))

    const eventType = body.event

    // Handle frame added event
    if (eventType === "frame_added") {
      console.log("Frame added by FID:", body.notificationDetails?.fid)
    }

    // Handle notifications enabled event - store the token
    if (eventType === "notifications_enabled" || eventType === "frame_added") {
      const notificationDetails = body.notificationDetails

      if (notificationDetails?.token && notificationDetails?.url) {
        const tokens = loadTokens()

        // Check if token already exists
        const existingIndex = tokens.tokens.findIndex(
          (t: any) => t.fid === notificationDetails.fid
        )

        const tokenData = {
          fid: notificationDetails.fid,
          token: notificationDetails.token,
          url: notificationDetails.url,
          enabled: true,
          addedAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        }

        if (existingIndex >= 0) {
          // Update existing token
          tokens.tokens[existingIndex] = tokenData
          console.log("Updated notification token for FID:", notificationDetails.fid)
        } else {
          // Add new token
          tokens.tokens.push(tokenData)
          console.log("Stored new notification token for FID:", notificationDetails.fid)
        }

        saveTokens(tokens)
      }
    }

    // Handle notifications disabled event
    if (eventType === "notifications_disabled") {
      const notificationDetails = body.notificationDetails

      if (notificationDetails?.fid) {
        const tokens = loadTokens()
        const index = tokens.tokens.findIndex((t: any) => t.fid === notificationDetails.fid)

        if (index >= 0) {
          tokens.tokens[index].enabled = false
          tokens.tokens[index].lastUpdated = new Date().toISOString()
          saveTokens(tokens)
          console.log("Disabled notifications for FID:", notificationDetails.fid)
        }
      }
    }

    // Handle frame removed event
    if (eventType === "frame_removed") {
      const notificationDetails = body.notificationDetails

      if (notificationDetails?.fid) {
        const tokens = loadTokens()
        tokens.tokens = tokens.tokens.filter((t: any) => t.fid !== notificationDetails.fid)
        saveTokens(tokens)
        console.log("Removed notification token for FID:", notificationDetails.fid)
      }
    }

    // Return success
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function GET() {
  // Return success for health checks
  return NextResponse.json({ status: "ok" }, { status: 200 })
}
