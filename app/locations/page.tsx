"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { Target, MapIcon, List } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import { MapView } from "@/components/map-view"

export default function LocationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const orderType = searchParams.get("orderType") || "pickup"
  const searchQuery = searchParams.get("query") || ""
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const [activeTab, setActiveTab] = useState<"all" | "pickup" | "kiosk" | "curbside" | "drivethru">("all")
  const [isLoading, setIsLoading] = useState(true)
  const [locations, setLocations] = useState<any[]>([])
  const [showMap, setShowMap] = useState(false)
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt">("prompt")

  // Mock locations data
  const allLocations = [
    {
      id: "1",
      name: "Hampton",
      address: "123 Address Street",
      city: "Boulder",
      state: "CO",
      zip: "80302",
      hasDelivery: true,
      hasCatering: true,
      distance: "10.13",
      hours: "11pm",
      fulfillmentTypes: ["Pickup", "Curbside", "Drive Thru", "Kiosk"],
      coordinates: { lat: 40.015, lng: -105.2705 },
    },
    {
      id: "2",
      name: "Cherry Street",
      address: "123 Address Street",
      city: "Boulder",
      state: "CO",
      zip: "80302",
      hasDelivery: false,
      hasCatering: true,
      distance: "5.7",
      hours: "11pm",
      fulfillmentTypes: ["Pickup", "Curbside"],
      coordinates: { lat: 40.018, lng: -105.2755 },
    },
    {
      id: "3",
      name: "Tulsa 71st & Yale",
      address: "123 Address Street",
      city: "Boulder",
      state: "CO",
      zip: "80302",
      hasDelivery: true,
      hasCatering: false,
      distance: "3.2",
      hours: "11pm",
      fulfillmentTypes: ["Pickup", "Kiosk"],
      coordinates: { lat: 40.012, lng: -105.265 },
    },
  ]

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setLocations(allLocations)
      setIsLoading(false)
    }, 500)
  }, [])

  // Filter locations based on active tab
  const filteredLocations = locations.filter((location) => {
    if (activeTab === "all") return true
    if (activeTab === "pickup") return location.fulfillmentTypes.includes("Pickup")
    if (activeTab === "kiosk") return location.fulfillmentTypes.includes("Kiosk")
    if (activeTab === "curbside") return location.fulfillmentTypes.includes("Curbside")
    if (activeTab === "drivethru") return location.fulfillmentTypes.includes("Drive Thru")
    return true
  })

  // Handle location selection
  const handleSelectLocation = (location: any) => {
    // If user has filtered by a specific order type, skip the order type selection
    if (activeTab !== "all") {
      // Map the active tab to the corresponding order type
      let selectedOrderType = "takeout" // Default
      let orderTypeParam = "pickup" // Default for URL param

      if (activeTab === "pickup") {
        selectedOrderType = "takeout"
        orderTypeParam = "pickup"
      } else if (activeTab === "kiosk") {
        selectedOrderType = "kiosk"
        orderTypeParam = "pickup"
      } else if (activeTab === "curbside") {
        selectedOrderType = "curbside"
        orderTypeParam = "pickup"
      } else if (activeTab === "drivethru") {
        selectedOrderType = "drivethru"
        orderTypeParam = "pickup"
      }

      // Skip to menu with the selected order type
      router.push(`/menu?locationId=${location.id}&orderType=${orderTypeParam}&subType=${selectedOrderType}`)
    } else {
      // If no specific filter is selected, go to order type selection
      if (orderType === "pickup") {
        router.push(`/order-type?locationId=${location.id}&orderType=pickup`)
      } else {
        router.push(`/menu?locationId=${location.id}&orderType=delivery`)
      }
    }
  }

  // Handle location selection by ID (for map view)
  const handleSelectLocationById = (locationId: string) => {
    const location = locations.find((loc) => loc.id === locationId)
    if (location) {
      handleSelectLocation(location)
    }
  }

  // Request location services
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location granted:", position.coords)
          setLocationPermission("granted")
          // In a real app, we would use these coordinates to find nearby locations
          // For now, just simulate finding locations
          setIsLoading(true)
          setTimeout(() => {
            // Sort locations by "distance" to simulate finding nearby locations
            const sortedLocations = [...allLocations].sort(
              (a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance),
            )
            setLocations(sortedLocations)
            setIsLoading(false)
          }, 1000)
        },
        (error) => {
          console.log("Location denied:", error)
          setLocationPermission("denied")
        },
      )
    }
  }

  const handleSearch = () => {
    // In a real app, we would use this to search for locations
    setIsLoading(true)
    setTimeout(() => {
      setLocations(allLocations)
      setIsLoading(false)
    }, 500)
  }

  const toggleMapView = () => {
    setShowMap(!showMap)
  }

  return (
    <main className="flex flex-col h-screen relative">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <PageHeader
          title="Choose a location"
          backHref="/home"
          rightElement={
            showMap ? (
              <Button variant="ghost" size="icon" className="text-white" onClick={toggleMapView}>
                <List className="h-6 w-6" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="text-white" onClick={toggleMapView}>
                <MapIcon className="h-6 w-6" />
              </Button>
            )
          }
        />
      </div>

      {/* Full page map view */}
      {showMap ? (
        <div className="fixed inset-0 pt-16 z-40">
          <MapView
            locations={filteredLocations.map((loc) => ({
              id: loc.id,
              name: loc.name,
              coordinates: loc.coordinates,
              distance: loc.distance,
            }))}
            onSelectLocation={handleSelectLocationById}
            onToggleView={toggleMapView}
          />
        </div>
      ) : (
        <>
          {/* Search and tabs - now scrolls with content */}
          <div className="bg-white z-10 px-4 pt-20 pb-2 shadow-sm">
            {/* Search input */}
            <div className="relative mb-4">
              <Input
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter ZIP code or address"
                className="w-full py-6 pl-4 pr-12 rounded-full border-taziki-gray text-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-12 w-12"
                onClick={requestLocation}
              >
                <Target className="h-6 w-6 text-taziki-blue" />
              </Button>
            </div>

            {/* Fulfillment type tabs - horizontal scrollable */}
            <div className="overflow-x-auto pb-2">
              <div className="flex space-x-2 min-w-max">
                <Button
                  variant={activeTab === "all" ? "default" : "outline"}
                  className={`px-6 py-2 rounded-full ${
                    activeTab === "all"
                      ? "bg-taziki-blue text-white"
                      : "border-taziki-blue text-taziki-blue hover:bg-taziki-blue/10"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </Button>
                <Button
                  variant={activeTab === "pickup" ? "default" : "outline"}
                  className={`px-6 py-2 rounded-full ${
                    activeTab === "pickup"
                      ? "bg-taziki-blue text-white"
                      : "border-taziki-blue text-taziki-blue hover:bg-taziki-blue/10"
                  }`}
                  onClick={() => setActiveTab("pickup")}
                >
                  Pickup
                </Button>
                <Button
                  variant={activeTab === "kiosk" ? "default" : "outline"}
                  className={`px-6 py-2 rounded-full ${
                    activeTab === "kiosk"
                      ? "bg-taziki-blue text-white"
                      : "border-taziki-blue text-taziki-blue hover:bg-taziki-blue/10"
                  }`}
                  onClick={() => setActiveTab("kiosk")}
                >
                  Kiosk
                </Button>
                <Button
                  variant={activeTab === "curbside" ? "default" : "outline"}
                  className={`px-6 py-2 rounded-full ${
                    activeTab === "curbside"
                      ? "bg-taziki-blue text-white"
                      : "border-taziki-blue text-taziki-blue hover:bg-taziki-blue/10"
                  }`}
                  onClick={() => setActiveTab("curbside")}
                >
                  Curbside
                </Button>
                <Button
                  variant={activeTab === "drivethru" ? "default" : "outline"}
                  className={`px-6 py-2 rounded-full ${
                    activeTab === "drivethru"
                      ? "bg-taziki-blue text-white"
                      : "border-taziki-blue text-taziki-blue hover:bg-taziki-blue/10"
                  }`}
                  onClick={() => setActiveTab("drivethru")}
                >
                  Drive Thru
                </Button>
              </div>
            </div>
          </div>

          {/* Content with padding only for bottom nav */}
          <div className="flex-grow flex flex-col px-4 pb-20 pt-4 z-0">
            {/* Location permission message */}
            {locationPermission === "denied" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                <p className="text-sm text-yellow-700">
                  Location access was denied. Please enable location services in your browser settings to find nearby
                  locations.
                </p>
              </div>
            )}

            {/* Location cards */}
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <p>Loading locations...</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4 pb-24 pt-4">
                {filteredLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleSelectLocation(location)}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-taziki-blue">{location.name}</h3>
                            <p className="text-base text-taziki-blue">{location.address}</p>
                            <p className="text-base text-taziki-blue">
                              {location.city}, {location.state} {location.zip}
                            </p>
                          </div>
                          <div className="text-sm text-taziki-blue">{location.distance} miles</div>
                        </div>

                        <p className="text-base text-taziki-blue mt-2">Pickup available until {location.hours}</p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {location.fulfillmentTypes.map((type: string) => (
                            <Badge
                              key={type}
                              className="bg-taziki-blue/10 text-taziki-blue hover:bg-taziki-blue/20 px-3 py-1 text-sm"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Floating Map View button - only show when in list view */}
          <div className="fixed bottom-24 left-0 right-0 flex justify-center z-40 pointer-events-none">
            <Button
              className="bg-taziki-blue hover:bg-taziki-blue/90 shadow-lg rounded-full px-6 py-2 pointer-events-auto flex items-center gap-2"
              onClick={toggleMapView}
            >
              <MapIcon className="h-5 w-5" />
              <span>Map View</span>
            </Button>
          </div>

          {/* Bottom Navigation */}
          <div className="h-20 z-40">
            <BottomNav />
          </div>
        </>
      )}
    </main>
  )
}
