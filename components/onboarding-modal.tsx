"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft, Shield, Users, Info, Zap } from "lucide-react"

interface OnboardingModalProps {
    isOpen: boolean
    onClose: () => void
}

const steps = [
    {
        title: "Welcome to TrueScore",
        description: "TrueScore combines multiple reputation systems to give you a clearer picture of trust and credibility in Web3.",
        icon: <Zap className="h-8 w-8 text-yellow-400" />,
        color: "from-yellow-500/20 to-orange-500/20",
        accent: "border-yellow-500/50"
    },
    {
        title: "Neynar Reputation",
        description: "Based on your Farcaster activity and trust signals. Score ranges from 0 to 1 and is computed by Neynar's social graph analysis.",
        icon: <Shield className="h-8 w-8 text-cyan-400" />,
        color: "from-cyan-500/20 to-blue-500/20",
        accent: "border-cyan-500/50"
    },

    {
        title: "Improve Your Score",
        description: "Be active on Farcaster, engage authentically with the community, and build your trust score over time through consistent positive interactions.",
        icon: <Info className="h-8 w-8 text-green-400" />,
        color: "from-green-500/20 to-emerald-500/20",
        accent: "border-green-500/50"
    }
]

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
    const [currentStep, setCurrentStep] = useState(0)

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            onClose()
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className={`relative w-full max-w-md glass-card-strong overflow-hidden border-2 ${steps[currentStep].accent} transition-colors duration-500`}
                >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${steps[currentStep].color} opacity-30`} />

                    <div className="relative p-8 flex flex-col items-center text-center">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Icon Container */}
                        <motion.div
                            key={`icon-${currentStep}`}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mb-6 p-4 rounded-full bg-white/5 border border-white/10 shadow-xl"
                        >
                            {steps[currentStep].icon}
                        </motion.div>

                        {/* Text Content */}
                        <motion.div
                            key={`text-${currentStep}`}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-bold text-white letter-space-wide">
                                {steps[currentStep].title}
                            </h2>
                            <p className="text-white/70 leading-relaxed">
                                {steps[currentStep].description}
                            </p>
                        </motion.div>

                        {/* Progress Pips */}
                        <div className="flex gap-2 mt-8">
                            {steps.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? "w-8 bg-white" : "w-1.5 bg-white/20"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex w-full gap-4 mt-8">
                            {currentStep > 0 && (
                                <button
                                    onClick={handleBack}
                                    className="flex-1 py-3 rounded-xl border border-white/10 bg-white/5 font-semibold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                    Back
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                className="flex-2 py-3 px-8 rounded-xl bg-white text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                style={{ flexGrow: currentStep === 0 ? 1 : 2 }}
                            >
                                {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
