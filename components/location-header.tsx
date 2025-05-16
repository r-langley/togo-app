import { Heart } from "lucide-react"

interface LocationHeaderProps {
  name: string
  address: string
  city: string
  state: string
  zip: string
  hours: string
  hasCatering?: boolean
  fulfillmentTypes?: string[]
  hideFulfillmentTypes?: boolean
}

export function LocationHeader({
  name,
  address,
  city,
  state,
  zip,
  hours,
  fulfillmentTypes,
  hasCatering,
  hideFulfillmentTypes,
}: LocationHeaderProps) {
  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-taziki-blue">{name}</h2>
          <p className="text-taziki-blue">{address}</p>
          <p className="text-taziki-blue">
            {city}, {state} {zip}
          </p>

          {hours && <p className="text-taziki-blue mt-2">Pickup available until {hours}</p>}
        </div>
        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
          <Heart className="h-5 w-5 text-taziki-blue/60" />
        </div>
      </div>
    </div>
  )
}
