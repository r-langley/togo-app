"use client"

import { Card, CardContent } from "@/components/ui/card"

interface LocationProps {
  location: {
    id: string
    name: string
    address: string
    city: string
    state: string
    zip: string
    distance: string
  }
  onSelect: () => void
}

export function LocationCard({ location, onSelect }: LocationProps) {
  return (
    <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={onSelect}>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{location.name}</h3>
            <p className="text-sm text-muted-foreground">{location.address}</p>
            <p className="text-sm text-muted-foreground">
              {location.city}, {location.state} {location.zip}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">{location.distance} miles</div>
        </div>
      </CardContent>
    </Card>
  )
}
