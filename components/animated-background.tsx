"use client"

import { ReactNode } from "react"

interface AnimatedBackgroundProps {
    children: ReactNode
    theme?: "light" | "dark" | "cyberpunk"
}

export function AnimatedBackground({ children, theme = "dark" }: AnimatedBackgroundProps) {
    const bgClass = theme === "cyberpunk"
        ? "bg-gradient-to-br from-yellow-950/40 via-purple-950/40 to-slate-900 bg-slate-950"
        : theme === "light"
            ? "bg-gradient-to-br from-slate-100 via-white to-slate-50"
            : "bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-900"

    return (
        <div className={`relative min-h-screen overflow-hidden ${bgClass} transition-colors duration-500`}>
            {/* Content layer */}
            <div className="relative z-10">
                {children}
            </div>

            {theme === "cyberpunk" && (
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.1),transparent_50%)]" />
            )}
        </div>
    )
}
