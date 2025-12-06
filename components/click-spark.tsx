"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Spark {
    id: number
    x: number
    y: number
}

export function ClickSpark() {
    const [sparks, setSparks] = useState<Spark[]>([])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const id = Date.now()
            setSparks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }])
            setTimeout(() => {
                setSparks((prev) => prev.filter((s) => s.id !== id))
            }, 1000)
        }

        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [])

    return (
        <AnimatePresence>
            {sparks.map((spark) => (
                <SparkBurst key={spark.id} x={spark.x} y={spark.y} />
            ))}
        </AnimatePresence>
    )
}

function SparkBurst({ x, y }: { x: number; y: number }) {
    return (
        <div
            style={{ left: x, top: y }}
            className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        >
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                    animate={{
                        scale: 0,
                        opacity: 0,
                        x: Math.cos((i * Math.PI) / 4) * 50,
                        y: Math.sin((i * Math.PI) / 4) * 50,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent"
                />
            ))}
        </div>
    )
}
