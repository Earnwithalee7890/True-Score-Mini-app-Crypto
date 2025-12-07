// CreatorTip component – allows users to tip the creator in USDC
import { useCallback } from "react"
import { Button } from "@/components/ui/button" // assuming a button component exists, otherwise use plain button

// Placeholder tip handler – replace with actual payment integration later
const tipAmounts = [3, 5, 10, 20, 50]

export function CreatorTip() {
    const handleTip = useCallback((amount: number) => {
        // TODO: integrate USDC payment flow (e.g., via Stripe, Coinbase, or custom wallet)
        console.log(`Tip creator $${amount} USDC`)
        // You could call a backend endpoint here to create a payment request
    }, [])

    return (
        <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-foreground mb-2">Tip the creator</h3>
            <div className="grid grid-cols-3 gap-2">
                {tipAmounts.map((amt) => (
                    <Button
                        key={amt}
                        onClick={() => handleTip(amt)}
                        className="bg-primary text-primary-foreground hover:bg-primary/80 transition"
                    >
                        ${amt} USDC
                    </Button>
                ))}
            </div>
        </div>
    )
}
