"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { MapPin, ShoppingBag, Truck, Search, X } from "lucide-react"
import { ImageCarousel } from "@/components/image-carousel"
import { RecommendationModal } from "@/components/recommendation-modal"

export default function HomePage() {
  const router = useRouter()
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // Carousel images - using the same image multiple times for now
  const carouselImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-P5891P0weXFKwG02jXDALWWXskFEX7.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-P5891P0weXFKwG02jXDALWWXskFEX7.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-P5891P0weXFKwG02jXDALWWXskFEX7.png",
  ]

  // Handle location permission request
  const requestLocationPermission = () => {
    // For prototype, always navigate to locations page
    router.push(`/locations?orderType=${orderType}`)
  }

  // Handle manual search
  const handleSearch = () => {
    // Always navigate to locations page, even with empty query
    const query = searchQuery.trim() ? searchQuery : "Denver"
    router.push(`/locations?orderType=${orderType}&query=${encodeURIComponent(query)}`)
  }

  // Toggle between pickup and delivery
  const toggleOrderType = (type: "pickup" | "delivery") => {
    setOrderType(type)
    setSearchQuery("")
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <main className="flex flex-col h-screen">
      <Header />

      {/* Recommendation Modal */}
      <RecommendationModal />

      {/* Image Carousel - maintaining the previous height */}
      <div className="relative w-full h-[35vh]">
        <ImageCarousel images={carouselImages} interval={5000} />
      </div>

      {/* Content area */}
      <div className="flex-grow flex flex-col px-6 py-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-taziki-blue text-center mb-3">Welcome to Taziki's!</h1>
          <h2 className="text-xl text-taziki-blue text-center mb-6">Let's find your nearest location</h2>
        </div>

        <div className="w-full space-y-3">
          <div className="flex gap-2">
            <Button
              variant={orderType === "pickup" ? "default" : "outline"}
              className={`w-full py-6 ${
                orderType === "pickup"
                  ? "bg-taziki-blue hover:bg-taziki-blue/90"
                  : "text-taziki-blue border-taziki-blue hover:bg-taziki-blue/10"
              } rounded-full flex items-center justify-center gap-2`}
              onClick={() => toggleOrderType("pickup")}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-base">Pickup</span>
            </Button>

            <Button
              variant={orderType === "delivery" ? "default" : "outline"}
              className={`w-full py-6 ${
                orderType === "delivery"
                  ? "bg-taziki-blue hover:bg-taziki-blue/90"
                  : "text-taziki-blue border-taziki-blue hover:bg-taziki-blue/10"
              } rounded-full flex items-center justify-center gap-2`}
              onClick={() => toggleOrderType("delivery")}
            >
              <Truck className="h-5 w-5" />
              <span className="text-base">Delivery</span>
            </Button>
          </div>

          <div className="relative">
            <Input
              placeholder={orderType === "pickup" ? "Find your nearest location" : "Enter your address"}
              className="w-full py-6 pl-4 pr-12 rounded-full border-taziki-gray text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={searchQuery ? handleSearch : requestLocationPermission}
            >
              {searchQuery ? (
                <Search className="h-5 w-5 text-taziki-blue" />
              ) : (
                <MapPin className="h-5 w-5 text-taziki-blue" />
              )}
            </div>
            {searchQuery && (
              <div
                className="absolute right-12 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={clearSearch}
              >
                <X className="h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>

          <div className="text-center">
            <p className="text-base text-taziki-blue">
              Feeding a crowd?{" "}
              <Link href="/catering" className="underline">
                Start a catering order
              </Link>
            </p>
          </div>
        </div>

        <div className="flex-1"></div>
      </div>

      {/* Bottom nav - fixed height with increased padding */}
      <div className="h-20">
        <BottomNav />
      </div>
    </main>
  )
}
