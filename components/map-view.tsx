"use client"

import { useEffect, useRef } from "react"
import { MapIcon, List } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MapViewProps {
  locations: Array<{
    id: string
    name: string
    coordinates: { lat: number; lng: number }
    distance: string
  }>
  onSelectLocation: (locationId: string) => void
  onToggleView: () => void
}

export function MapView({ locations, onSelectLocation, onToggleView }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is where we would initialize Mapbox with the API key
    // For now, we'll just show a placeholder
    // Example Mapbox initialization code (commented out until API key is added)
    /*
    if (!mapContainerRef.current) return;
    
    mapboxgl.accessToken = 'YOUR_MAPBOX_API_KEY';
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-105.2705, 40.015], // Default center (Boulder, CO)
      zoom: 12
    });

    // Add markers for each location
    locations.forEach(location => {
      const marker = new mapboxgl.Marker()
        .setLngLat([location.coordinates.lng, location.coordinates.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <h3 class="font-medium">${location.name}</h3>
          <p class="text-sm">${location.distance} miles</p>
        `))
        .addTo(map);
    });
    */
  }, [locations])

  return (
    <div className="w-full h-full relative" ref={mapContainerRef}>
      {/* Placeholder for Mapbox map */}
      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
        <div className="text-center p-4">
          <MapIcon className="h-12 w-12 text-taziki-blue mx-auto mb-2" />
          <p className="text-taziki-blue font-medium">Map View</p>
          <p className="text-sm text-gray-500 mt-1">{locations.length} locations found</p>
          <p className="text-sm text-gray-500 mt-4">Mapbox integration will be added with API key</p>
          <div className="mt-4 space-y-2">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-white p-2 rounded-md shadow-sm cursor-pointer hover:bg-blue-50"
                onClick={() => onSelectLocation(location.id)}
              >
                <p className="font-medium text-taziki-blue">{location.name}</p>
                <p className="text-xs text-gray-500">{location.distance} miles</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating List View button */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <Button
          className="bg-taziki-blue hover:bg-taziki-blue/90 shadow-lg rounded-full px-6 py-2 flex items-center gap-2"
          onClick={onToggleView}
        >
          <List className="h-5 w-5" />
          <span>List View</span>
        </Button>
      </div>
    </div>
  )
}
