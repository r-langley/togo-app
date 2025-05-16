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
import { useCart } from "@/context/cart-context"
import { Plus } from "lucide-react"

// Mock recommendations data - desserts and sides that pair well with main dishes
const recommendations = [
  {
    id: "7",
    name: "Baklava",
    description: "Complete your meal with our delicious Baklava - the perfect sweet ending!",
    price: 3.49,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
  },
  {
    id: "5",
    name: "Roasted Potatoes",
    description: "Add our savory Roasted Potatoes to complete your meal!",
    price: 3.49,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
  },
  {
    id: "8",
    name: "Fountain Drink",
    description: "Don't forget to add a refreshing drink to your order!",
    price: 2.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
  },
]

export function CartRecommendationModal() {
  const [open, setOpen] = useState(false)
  const { addItem, items } = useCart()

  // Randomly select a recommendation that's not already in the cart
  const getRecommendation = () => {
    const cartItemIds = items.map((item) => item.id)
    const availableRecommendations = recommendations.filter((rec) => !cartItemIds.includes(rec.id))

    // If all recommendations are already in cart, just pick a random one
    if (availableRecommendations.length === 0) {
      return recommendations[Math.floor(Math.random() * recommendations.length)]
    }

    return availableRecommendations[Math.floor(Math.random() * availableRecommendations.length)]
  }

  const recommendation = getRecommendation()

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Check if we've shown the cart recommendation recently
    const lastShown = localStorage.getItem("cartRecommendationLastShown")
    const now = new Date().getTime()

    // Only show once per day
    if (!lastShown || now - Number.parseInt(lastShown) > 24 * 60 * 60 * 1000) {
      // Only show if there are items in the cart
      if (items.length > 0) {
        // Show modal after a short delay
        const timer = setTimeout(() => {
          setOpen(true)
          localStorage.setItem("cartRecommendationLastShown", now.toString())
        }, 1000)

        return () => clearTimeout(timer)
      }
    }
  }, [items.length])

  const handleAddItem = () => {
    addItem({
      id: recommendation.id,
      name: recommendation.name,
      price: recommendation.price,
      quantity: 1,
      image: recommendation.image,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[350px] max-w-[90%] p-3 rounded-xl shadow-sm">
        <DialogHeader className="space-y-1 pb-1">
          <DialogTitle className="text-taziki-blue text-lg">Complete Your Order</DialogTitle>
          <DialogDescription className="text-sm">Would you like to add this to your order?</DialogDescription>
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
          <p className="text-center text-muted-foreground text-sm mb-1">{recommendation.description}</p>
          <p className="font-medium text-taziki-blue">${recommendation.price.toFixed(2)}</p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="sm:flex-1 border-taziki-blue text-taziki-blue text-sm h-9"
          >
            No Thanks
          </Button>
          <Button
            onClick={handleAddItem}
            className="sm:flex-1 bg-taziki-blue hover:bg-taziki-blue/90 text-sm h-9 flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add to Order</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
