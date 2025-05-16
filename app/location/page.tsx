"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, MapPin, Search, Target } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"

export default function LocationPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock locations data
  const locations = [
    {
      id: "1",
      name: "Taziki's Hampden",
      address: "6345 East Hampden Avenue",
      city: "Denver",
      state: "CO",
      zip: "80222",
      distance: "10.13",
    },
    {
      id: "2",
      name: "Taziki's Downtown",
      address: "1201 16th Street",
      city: "Denver",
      state: "CO",
      zip: "80202",
      distance: "5.7",
    },
  ]

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectLocation = (locationId: string) => {
    router.push(`/order-type?locationId=${locationId}`)
  }

  // Request location services
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location granted:", position.coords)
          // In a real app, we would use these coordinates to find nearby locations
        },
        (error) => {
          console.log("Location denied:", error)
        },
      )
    }
  }

  return (
    <main className="flex flex-col h-screen">
      {/* Custom header */}
      <div className="bg-taziki-blue">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl text-white font-medium">Choose a location</h1>
          <Button variant="ghost" size="icon" className="text-white">
            <MapPin className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="flex-grow flex flex-col p-4">
        {/* Search input */}
        <div className="relative mb-4">
          <Input
            placeholder="Search by city, zip, or location name"
            className="w-full py-6 pl-10 pr-12 rounded-full border-taziki-gray text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-12 w-12"
            onClick={requestLocation}
          >
            <Target className="h-5 w-5 text-taziki-blue" />
          </Button>
        </div>

        {/* Location cards */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-24">
          {filteredLocations.map((location) => (
            <Card
              key={location.id}
              className="overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleSelectLocation(location.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-taziki-blue">{location.name}</h3>
                    <p className="text-base text-taziki-blue">{location.address}</p>
                    <p className="text-base text-taziki-blue">
                      {location.city}, {location.state} {location.zip}
                    </p>
                  </div>
                  <div className="text-sm text-taziki-blue">{location.distance} miles</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="h-20">
        <BottomNav />
      </div>
    </main>
  )
}
