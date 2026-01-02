"use client"

import { useBlockNumber } from "wagmi"
import { base } from "wagmi/chains"
import { useEffect, useState } from "react"
import { Activity } from "lucide-react"

export function NetworkStatus() {
    const { data: blockNumber } = useBlockNumber({
        chainId: base.id,
        watch: true,
    })

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/50 font-mono mt-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/5 border border-green-500/10">
                <div className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </div>
                <span>Base Mainnet</span>
            </div>

            {blockNumber && (
                <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    <span>#{blockNumber.toString()}</span>
                </div>
            )}
        </div>
    )
}
