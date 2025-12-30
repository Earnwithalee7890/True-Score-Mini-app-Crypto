"use client"

import { useEffect, useState } from "react"

interface ConfettiProps {
    trigger: boolean
    onComplete?: () => void
}

export function Confetti({ trigger, onComplete }: ConfettiProps) {
    const [pieces, setPieces] = useState<Array<{ id: number; x: number; y: number; rotation: number; color: string }>>([])

    useEffect(() => {
        if (trigger) {
            const colors = ["#60a5fa", "#a78bfa", "#f472b6", "#fbbf24", "#34d399"]
            const newPieces = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: -20,
                rotation: Math.random() * 360,
                color: colors[Math.floor(Math.random() * colors.length)],
            }))
            setPieces(newPieces)

            setTimeout(() => {
                setPieces([])
                onComplete?.()
            }, 3000)
        }
    }, [trigger, onComplete])

    if (pieces.length === 0) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {pieces.map((piece) => (
                <div
                    key={piece.id}
                    className="absolute w-3 h-3 animate-confetti"
                    style={{
                        left: `${piece.x}%`,
                        top: `${piece.y}%`,
                        backgroundColor: piece.color,
                        transform: `rotate(${piece.rotation}deg)`,
                        animation: `confetti-fall 3s ease-in-out forwards`,
                        animationDelay: `${Math.random() * 0.5}s`,
                    }}
                />
            ))}
        </div>
    )
}
