"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    return (
        <div className="fixed bottom-20 right-4 z-50 transition-opacity duration-300 pointer-events-none md:pointer-events-auto">
            <button
                type="button"
                onClick={scrollToTop}
                className={`bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 pointer-events-auto ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                aria-label="Scroll to top"
            >
                <ArrowUp className="h-5 w-5" />
            </button>
        </div>
    )
}
