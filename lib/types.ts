
export interface YearRebackData {
    username: string
    displayName: string
    pfpUrl: string
    score: number
    rank: string
    activeDays: number
    totalLikes: number
    followers: number
    castsCount: number
    peakHour?: number
    peakDay?: string
    topCast: {
        text: string
        likes: number
        replies: number
        date: string
    } | null
}
