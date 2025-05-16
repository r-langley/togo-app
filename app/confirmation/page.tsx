"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, CheckCircle, Utensils } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function ConfirmationPage() {
  const router = useRouter()
  const [orderNumber, setOrderNumber] = useState("")
  const [pickupTime, setPickupTime] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Generate a random order number
    const randomOrderNum = Math.floor(10000 + Math.random() * 90000)
    setOrderNumber(`TZ-${randomOrderNum}`)

    // Calculate pickup time (15-20 minutes from now)
    const now = new Date()
    const pickupMinutes = 15 + Math.floor(Math.random() * 5)
    now.setMinutes(now.getMinutes() + pickupMinutes)

    const hours = now.getHours()
    const minutes = now.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    setPickupTime(`Today at ${formattedHours}:${formattedMinutes} ${ampm}`)
    setIsLoaded(true)
  }, [])

  // Don't redirect if we're directly on the confirmation page
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-taziki-blue">Loading order details...</p>
      </div>
    )
  }

  return (
    <main className="flex flex-col h-screen">
      {/* Custom header */}
      <div className="bg-taziki-blue">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="w-10"></div> {/* Spacer for alignment */}
          <h1 className="text-xl text-white font-medium">Order Confirmed</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="flex-grow flex flex-col p-4 items-center justify-center">
        <div className="w-full max-w-md space-y-4 text-center">
          <CheckCircle className="h-16 w-16 mx-auto text-green-500" />

          <h1 className="text-2xl font-bold text-taziki-blue">Order Confirmed!</h1>

          <p className="text-taziki-blue">
            Your order has been received and is being prepared. You'll receive a notification when it's ready for
            pickup.
          </p>

          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between text-taziki-blue">
                <span>Order #</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between text-taziki-blue">
                <span>Pickup Time</span>
                <span className="font-medium">{pickupTime}</span>
              </div>
              <div className="flex justify-between text-taziki-blue">
                <span>Location</span>
                <span className="font-medium text-right">
                  Taziki's Hampden
                  <br />
                  6345 East Hampden Avenue
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8 pt-6">
            <Button
              className="w-full py-6 bg-taziki-blue hover:bg-taziki-blue/90 rounded-full flex items-center justify-center gap-2"
              onClick={() => router.push("/menu")}
            >
              <Utensils className="h-5 w-5" />
              <span className="text-base">Order Something Else</span>
            </Button>

            <Link href="/" className="w-full">
              <Button
                variant="outline"
                className="w-full py-6 text-taziki-blue border-taziki-blue hover:bg-taziki-blue/10 rounded-full flex items-center justify-center gap-2"
              >
                <Home className="h-5 w-5" />
                <span className="text-base">Return Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="h-20">
        <BottomNav />
      </div>
    </main>
  )
}
