"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface ProcessingPaymentProps {
  onComplete: () => void
}

export function ProcessingPayment({ onComplete }: ProcessingPaymentProps) {
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState("Initializing payment...")

  useEffect(() => {
    // Simulate payment processing steps
    const steps = [
      { progress: 20, message: "Verifying payment details..." },
      { progress: 40, message: "Processing payment..." },
      { progress: 60, message: "Confirming order..." },
      { progress: 80, message: "Sending to kitchen..." },
      { progress: 100, message: "Order confirmed!" },
    ]

    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress)
        setStatusMessage(steps[currentStep].message)
        currentStep++
      } else {
        clearInterval(interval)
        // Allow the 100% state to display briefly before completing
        setTimeout(onComplete, 1000)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-taziki-blue animate-spin mb-6" />

        <h2 className="text-xl font-bold text-taziki-blue mb-4">{statusMessage}</h2>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-taziki-blue h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-muted-foreground text-center">Please don't close this page while we process your order.</p>
      </div>
    </div>
  )
}
