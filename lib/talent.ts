/**
 * Talent Protocol API Utility
 * Provides functions to fetch reputation data from Talent Protocol v3
 */

const TALENT_API_BASE = "https://api.talentprotocol.com/api/v3"

export interface TalentScoreData {
    score: number
    activity_score: number
    identity_score: number
    skills_score: number
}

export interface TalentProfileData {
    id: string
    handle: string
    builder_score: number
    human_checkmark: boolean
    verified: boolean
}

/**
 * Fetch Talent Protocol Builder Score and human checkmark status for a Farcaster ID
 */
export async function getTalentProtocolData(fid: number): Promise<TalentProfileData | null> {
    try {
        const apiKey = process.env.TALENT_PROTOCOL_API_KEY || process.env.TALENT_API_KEY || process.env.talent
        if (!apiKey) {
            console.warn("Talent Protocol API Key is not set (checked TALENT_PROTOCOL_API_KEY, TALENT_API_KEY, and talent)")
            return null
        }

        // Talent Protocol often uses wallet addresses or social handles.
        // For Farcaster, we use the specific Farcaster score endpoint if available
        // or the general score endpoint with a farcaster identifier prefix.

        const response = await fetch(`${TALENT_API_BASE}/farcaster/scores?fids=${fid}`, {
            headers: {
                "X-API-KEY": apiKey,
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            console.error("Talent API error:", response.statusText)
            return null
        }

        const data = await response.json()

        // The /farcaster/scores endpoint might return an array
        const userScore = Array.isArray(data.scores) ? data.scores[0] : data.score

        if (!userScore) return null

        return {
            id: String(userScore.profile_id || ""),
            handle: userScore.handle || "",
            builder_score: userScore.score || 0,
            human_checkmark: !!userScore.human_checkmark,
            verified: !!userScore.verified
        }
    } catch (error) {
        console.error("Error fetching Talent Protocol data:", error)
        return null
    }
}
