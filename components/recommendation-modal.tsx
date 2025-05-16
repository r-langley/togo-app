"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Mock recommendations data
const recommendations = [
  {
    id: "3",
    name: "Grilled Chicken Gyro",
    description: "Based on your previous orders, we think you'll love our most popular gyro!",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
  },
  {
    id: "7",
    name: "Baklava",
    description: "Have you tried our delicious Baklava? It's the perfect sweet treat!",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
  },
  {
    id: "1",
    name: "Hummus",
    description: "Our freshly made hummus is a customer favorite. Try it with warm pita!",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
  },
]

export function RecommendationModal() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Randomly select a recommendation
  const recommendation = recommendations[Math.floor(Math.random() * recommendations.length)]

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Check if we've shown the recommendation recently
    const lastShown = localStorage.getItem("recommendationLastShown")
    const now = new Date().getTime()

    // Only show once per day
    if (!lastShown || now - Number.parseInt(lastShown) > 24 * 60 * 60 * 1000) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setOpen(true)
        localStorage.setItem("recommendationLastShown", now.toString())
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleViewItem = () => {
    setOpen(false)
    router.push(`/menu/${recommendation.id}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[350px] max-w-[90%] p-3 rounded-xl shadow-sm">
        <DialogHeader className="space-y-1 pb-1">
          <DialogTitle className="text-taziki-blue text-lg">Just for You</DialogTitle>
          <DialogDescription className="text-sm">We have a personalized recommendation for you.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center p-2 my-2">
          <div className="relative w-full h-36 mb-3 rounded-lg overflow-hidden">
            <Image
              src={recommendation.image || "/placeholder.svg"}
              alt={recommendation.name}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <h3 className="text-base font-bold text-taziki-blue mb-1">{recommendation.name}</h3>
          <p className="text-center text-muted-foreground text-sm mb-3">{recommendation.description}</p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="sm:flex-1 border-taziki-blue text-taziki-blue text-sm h-9"
          >
            Maybe Later
          </Button>
          <Button onClick={handleViewItem} className="sm:flex-1 bg-taziki-blue hover:bg-taziki-blue/90 text-sm h-9">
            View Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
