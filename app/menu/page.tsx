"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ShoppingBag, Store, Car, CarFront } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { LocationHeader } from "@/components/location-header"

export default function MenuPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addItem, itemCount } = useCart()
  const [activeSection, setActiveSection] = useState("appetizers")
  const [isTabsSticky, setIsTabsSticky] = useState(false)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const locationHeaderRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  // Get the order type from URL params or localStorage
  const locationId = searchParams?.get("locationId") || "1"
  const orderType = searchParams?.get("orderType") || "pickup"
  const [subType, setSubType] = useState<string>("takeout")

  useEffect(() => {
    // Get subType from URL or localStorage safely
    const urlSubType = searchParams?.get("subType")
    if (urlSubType) {
      setSubType(urlSubType)
      // Store in localStorage for future use
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedOrderType", urlSubType)
      }
    } else if (typeof window !== "undefined") {
      const storedSubType = localStorage.getItem("selectedOrderType")
      setSubType(storedSubType || "takeout")
    }
  }, [searchParams])

  // Rest of the component remains unchanged
  // ...

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
  }

  // Mock menu categories and items
  const categories = [
    { id: "appetizers", name: "Appetizers" },
    { id: "entrees", name: "Entrées" },
    { id: "sides", name: "Sides" },
    { id: "desserts", name: "Desserts" },
    { id: "drinks", name: "Drinks" },
  ]

  const menuItems = {
    appetizers: [
      {
        id: "1",
        name: "Hummus",
        price: 7.99,
        description: "Puréed chickpeas, tahini, olive oil, lemon juice, and garlic",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
      },
      {
        id: "2",
        name: "Taziki Dip",
        price: 6.99,
        description: "Cucumber, dill, and Greek yogurt",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
      },
    ],
    entrees: [
      {
        id: "3",
        name: "Grilled Chicken Gyro",
        price: 11.99,
        description: "Grilled chicken, lettuce, tomato, and Taziki sauce",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
      },
      {
        id: "4",
        name: "Lamb Gyro",
        price: 12.99,
        description: "Sliced lamb, lettuce, tomato, and Taziki sauce",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
      },
    ],
    sides: [
      {
        id: "5",
        name: "Roasted Potatoes",
        price: 3.49,
        description: "Roasted with olive oil and Greek spices",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
      },
      {
        id: "6",
        name: "Basmati Rice",
        price: 3.49,
        description: "Seasoned rice pilaf",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
      },
    ],
    desserts: [
      {
        id: "7",
        name: "Baklava",
        price: 3.49,
        description: "Flaky phyllo pastry with honey and nuts",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
      },
    ],
    drinks: [
      {
        id: "8",
        name: "Fountain Drink",
        price: 2.99,
        description: "Coca-Cola products",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
      },
      {
        id: "9",
        name: "Greek Tea",
        price: 2.99,
        description: "Sweet tea with a hint of cinnamon",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
      },
    ],
  }

  // Handle scroll to determine active section and sticky tabs
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      // Check if tabs should be sticky
      if (locationHeaderRef.current && tabsRef.current) {
        const locationHeaderBottom = locationHeaderRef.current.offsetTop + locationHeaderRef.current.offsetHeight
        setIsTabsSticky(scrollPosition > locationHeaderBottom - 64) // 64px is the height of the top nav
      }

      // Find the section that is currently in view
      const offset = isTabsSticky ? 120 : 64 // Adjust offset based on whether tabs are sticky

      for (const category of categories) {
        const section = sectionRefs.current[category.id]
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition + offset >= sectionTop && scrollPosition + offset < sectionBottom) {
            setActiveSection(category.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [categories, isTabsSticky])

  const scrollToSection = (categoryId: string) => {
    const section = sectionRefs.current[categoryId]
    if (section) {
      const offset = isTabsSticky ? 120 : 180 // Adjust offset based on whether tabs are sticky
      const y = section.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  const handleQuickAdd = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })
  }

  // Function to get icon for order type
  const getOrderTypeIcon = (type: string) => {
    switch (type) {
      case "takeout":
        return <Store className="h-4 w-4" />
      case "curbside":
        return <Car className="h-4 w-4" />
      case "drivethru":
        return <CarFront className="h-4 w-4" />
      default:
        return <Store className="h-4 w-4" />
    }
  }

  // Function to get display name for order type
  const getOrderTypeName = (type: string) => {
    switch (type) {
      case "takeout":
        return "Take Out"
      case "curbside":
        return "Curbside"
      case "drivethru":
        return "Drive Thru"
      default:
        return "Take Out"
    }
  }

  // Handle changing order type
  const handleChangeOrderType = () => {
    router.push(`/order-type?locationId=${locationId}&orderType=${orderType}`)
  }

  return (
    <main className="flex flex-col h-screen relative">
      {/* Fixed top navigation */}
      <div className="bg-taziki-blue fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="h-7 w-7" />
            </Button>
          </Link>
          <h1 className="text-xl text-white font-medium">Menu</h1>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="text-white relative">
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Content with padding for fixed header */}
      <div className="pt-16 flex-1 flex flex-col">
        {/* Location Header with Order Type */}
        <div ref={locationHeaderRef}>
          <LocationHeader
            name={location.name}
            address={location.address}
            city={location.city}
            state={location.state}
            zip={location.zip}
            hours={location.hours}
            hasCatering={location.hasCatering}
            fulfillmentTypes={location.fulfillmentTypes}
          />

          {/* Order Type Indicator */}
          <div className="px-4 py-2 bg-taziki-blue/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {getOrderTypeIcon(subType)}
              <span className="text-sm font-medium text-taziki-blue">{getOrderTypeName(subType)}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-taziki-blue text-taziki-blue"
              onClick={handleChangeOrderType}
            >
              Change
            </Button>
          </div>
        </div>

        {/* Category tabs - becomes fixed on scroll */}
        <div
          ref={tabsRef}
          className={`bg-white border-b overflow-x-auto z-40 ${isTabsSticky ? "fixed top-16 left-0 right-0" : ""}`}
        >
          <div className="flex space-x-1 px-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToSection(category.id)}
                className={`px-4 py-3 whitespace-nowrap text-sm font-medium transition-colors ${
                  activeSection === category.id
                    ? "text-taziki-blue border-b-2 border-taziki-blue"
                    : "text-gray-600 hover:text-taziki-blue"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Spacer div that takes up space when tabs become fixed */}
        {isTabsSticky && <div className="h-12"></div>}

        {/* Menu content */}
        <div className="flex-grow flex flex-col p-4 pb-20 z-0">
          {/* Render all menu sections */}
          {categories.map((category) => (
            <div
              key={category.id}
              id={category.id}
              ref={(el) => (sectionRefs.current[category.id] = el)}
              className="mb-8"
            >
              <h2 className="text-xl font-bold text-taziki-blue mb-4">{category.name}</h2>
              <div className="space-y-4">
                {menuItems[category.id as keyof typeof menuItems].map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => router.push(`/menu/${item.id}`)}
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={
                          item.image ||
                          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-taziki-blue">{item.name}</h3>
                          <p className="text-base text-taziki-blue">{item.description}</p>
                          <p className="text-base font-medium text-taziki-blue mt-1">${item.price.toFixed(2)}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-taziki-blue text-taziki-blue"
                          onClick={(e) => {
                            e.stopPropagation() // Prevent card click
                            handleQuickAdd(item)
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-20 z-40">
        <BottomNav />
      </div>
    </main>
  )
}
