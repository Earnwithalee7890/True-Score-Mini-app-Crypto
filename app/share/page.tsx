import { Metadata, ResolvingMetadata } from "next"
import ShareClient from "./share-client"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    props: Props
): Promise<Metadata> {
    const searchParams = await props.searchParams
    const fid = searchParams.fid ? String(searchParams.fid) : "338060"
    const score = searchParams.s ? String(searchParams.s) : "0"
    const rep = searchParams.r ? String(searchParams.r) : "unknown"
    const username = searchParams.u ? String(searchParams.u) : "user"
    const ts = searchParams._ ? String(searchParams._) : Date.now().toString()

    // Pass shortened params to OG image for max proxy compatibility
    const appUrl = "https://v0-task-to-cash-seven.vercel.app"
    const imageUrl = `${appUrl}/api/og?fid=${fid}&s=${score}&u=${encodeURIComponent(username)}&r=${encodeURIComponent(rep)}&_=${ts}`

    return {
        title: "TrueScore",
        openGraph: {
            title: "TrueScore",
            description: "Check your Neynar reputation instantly",
            images: [imageUrl]
        },
        other: {
            "fc:frame": JSON.stringify({
                version: "1",
                imageUrl,
                button: {
                    title: "Check Neynar Score",
                    action: {
                        type: "launch_frame",
                        name: "TrueScore",
                        url: appUrl,
                    }
                }
            }),
            "fc:miniapp": JSON.stringify({
                version: "1",
                imageUrl,
                button: {
                    title: "Check Neynar Score",
                    action: {
                        type: "launch_miniapp",
                        name: "TrueScore",
                        url: appUrl,
                    }
                }
            })
        }
    }
}

export default function SharePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShareClient />
        </Suspense>
    )
}
