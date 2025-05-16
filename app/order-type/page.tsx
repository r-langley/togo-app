"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Store, Car, CarFront } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { LocationHeader } from "@/components/location-header"
import { PageHeader } from "@/components/page-header"

export default function OrderTypePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const locationId = searchParams.get("locationId") || "1"
  const orderType = searchParams.get("orderType") || "pickup"

  // Mock location data
  const location = {
    id: "1",
    name: "Hampton",
    address: "123 Address Street",
    city: "Boulder",
    state: "CO",
    zip: "80302",
    hours: "11pm",
    hasCatering: true,
    fulfillmentTypes: ["Pickup", "Curbside", "Drive Thru"],
    orderTypes: ["Take Out", "Drive Thru", "Curbside"],
  }

  const handleSelectOrderType = (subType: string) => {
    // Store the selected order type in localStorage
    localStorage.setItem("selectedOrderType", subType)
    router.push(`/menu?locationId=${locationId}&orderType=${orderType}&subType=${subType}`)
  }

  return (
    <main className="flex flex-col h-screen">
      {/* Custom header */}
      <PageHeader title="Choose Pickup Method" backHref="/" />

      {/* Location Header */}
      <LocationHeader
        name={location.name}
        address={location.address}
        city={location.city}
        state={location.state}
        zip={location.zip}
        hours={location.hours}
        hasCatering={location.hasCatering}
        fulfillmentTypes={location.fulfillmentTypes}
        hideFulfillmentTypes={true}
      />

      <div className="flex-grow flex flex-col p-4">
        <div className="space-y-4 flex-1">
          <Card
            className="border cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleSelectOrderType("takeout")}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Store className="h-6 w-6 text-taziki-blue mt-0.5" />
                <div>
                  <p className="font-medium text-taziki-blue">Take Out</p>
                  <p className="text-sm text-taziki-blue">Order ahead and pick up inside the restaurant</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleSelectOrderType("drivethru")}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <CarFront className="h-6 w-6 text-taziki-blue mt-0.5" />
                <div>
                  <p className="font-medium text-taziki-blue">Drive Thru</p>
                  <p className="text-sm text-taziki-blue">Pick up your order at the drive thru window</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleSelectOrderType("curbside")}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Car className="h-6 w-6 text-taziki-blue mt-0.5" />
                <div>
                  <p className="font-medium text-taziki-blue">Curbside</p>
                  <p className="text-sm text-taziki-blue">We'll bring your order to your car</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="h-20">
        <BottomNav />
      </div>
    </main>
  )
}
