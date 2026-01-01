"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon, Zap } from "lucide-react"

interface ThemeToggleProps {
  theme: "light" | "dark" | "cyberpunk"
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={`h-10 w-10 rounded-full transition-all duration-300 hover:scale-105 ${theme === "cyberpunk"
        ? "bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-400"
        : "bg-secondary/50 hover:bg-secondary"
        }`}
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-foreground transition-transform duration-300" />
      ) : theme === "dark" ? (
        <Moon className="h-5 w-5 text-foreground transition-transform duration-300" />
      ) : (
        <Zap className="h-5 w-5 text-yellow-400 transition-transform duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
