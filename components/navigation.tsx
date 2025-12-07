"use client"

import { Home, User } from "lucide-react"

interface NavigationProps {
    activeTab: "home" | "profile"
    onTabChange: (tab: "home" | "profile") => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border/50 z-50">
            <div className="max-w-md mx-auto flex items-center justify-around h-16 px-4">
                <button
                    onClick={() => onTabChange("home")}
                    className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-all duration-200 ${activeTab === "home"
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Home className="h-5 w-5" />
                    <span className="text-xs font-medium">Home</span>
                </button>

                <button
                    onClick={() => onTabChange("profile")}
                    className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-all duration-200 ${activeTab === "profile"
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <User className="h-5 w-5" />
                    <span className="text-xs font-medium">Profile</span>
                </button>
            </div>
        </div>
    )
}
