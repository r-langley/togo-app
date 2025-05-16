"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Trash2, Edit, Plus, Minus, Store, Car, CarFront } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { useCart } from "@/context/cart-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CartRecommendationModal } from "@/components/cart-recommendation-modal"

// Mock previous orders data
const previousOrders = [
  {
    id: "7",
    name: "Baklava",
    price: 3.49,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
  },
  {
    id: "3",
    name: "Grilled Chicken Gyro",
    price: 11.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
  },
  {
    id: "5",
    name: "Roasted Potatoes",
    price: 3.49,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
  },
]

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, itemCount, subtotal, addItem } = useCart()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("current")
  const [orderType, setOrderType] = useState("takeout") // Default value without localStorage

  useEffect(() => {
    // Move localStorage access to useEffect
    const loggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    // Get order type from localStorage safely
    const storedOrderType =
      typeof window !== "undefined" ? localStorage.getItem("selectedOrderType") || "takeout" : "takeout"
    setOrderType(storedOrderType)
  }, [])

  const tax = subtotal * 0.085 // Assuming 8.5% tax rate
  const total = subtotal + tax

  const handleCheckout = () => {
    router.push("/checkout")
  }

  const handleEditItem = (itemId: string) => {
    router.push(`/menu/${itemId}`)
  }

  const handleIncreaseQuantity = (itemId: string, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1)
  }

  const handleDecreaseQuantity = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1)
    } else {
      removeItem(itemId)
    }
  }

  const handleChangeOrderType = () => {
    router.push(`/order-type?locationId=1&orderType=pickup`)
  }

  const handleAddPreviousItem = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })
    setActiveTab("current")
  }

  // Function to get icon for order type
  const getOrderTypeIcon = (type: string) => {
    switch (type) {
      case "takeout":
        return <Store className="h-5 w-5" />
      case "curbside":
        return <Car className="h-5 w-5" />
      case "drivethru":
        return <CarFront className="h-5 w-5" />
      default:
        return <Store className="h-5 w-5" />
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

  return (
    <main className="flex flex-col h-screen relative">
      {/* Cart Recommendation Modal */}
      <CartRecommendationModal />

      {/* Fixed header */}
      <div className="bg-taziki-blue fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/menu">
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl text-white font-medium">Current Order</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Content with padding for fixed header and bottom nav */}
      <div className="flex-grow flex flex-col p-4 pt-20 pb-24 mt-0 z-0">
        <div className="bg-muted/30 p-4 rounded-md mb-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getOrderTypeIcon(orderType)}
            <p className="text-sm text-taziki-blue">{getOrderTypeName(orderType)} - 6345 East Hampden Avenue</p>
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

        {items.length === 0 && activeTab === "current" ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link href="/menu">
              <Button className="bg-taziki-blue">Browse Menu</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Tabs for Current Order and Previous Orders */}
            <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="current">Current Order</TabsTrigger>
                {isLoggedIn && <TabsTrigger value="previous">Previous Orders</TabsTrigger>}
              </TabsList>

              <TabsContent value="current" className="space-y-4 mt-4">
                <div className="space-y-3 mb-6 flex-1 overflow-y-auto">
                  {items.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          {item.image && (
                            <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-taziki-blue">{item.name}</h3>
                              <p className="text-sm font-medium text-taziki-blue">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>

                            {/* Display selected options */}
                            {item.options && Object.entries(item.options).length > 0 && (
                              <div className="mt-1">
                                {Object.entries(item.options).map(([key, value]) => (
                                  <p key={key} className="text-xs text-muted-foreground">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                                  </p>
                                ))}
                              </div>
                            )}

                            {/* Display selected addons */}
                            {item.addons && item.addons.length > 0 && (
                              <div className="mt-1">
                                <p className="text-xs text-muted-foreground">Add-ons: {item.addons.join(", ")}</p>
                              </div>
                            )}

                            {/* Display special instructions */}
                            {item.specialInstructions && (
                              <p className="text-xs text-muted-foreground mt-1">Note: {item.specialInstructions}</p>
                            )}

                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7 rounded-full border-taziki-blue"
                                  onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                >
                                  <Minus className="h-3 w-3 text-taziki-blue" />
                                </Button>
                                <span className="mx-2 text-sm text-taziki-blue">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7 rounded-full border-taziki-blue"
                                  onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                                >
                                  <Plus className="h-3 w-3 text-taziki-blue" />
                                </Button>
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleEditItem(item.id)}
                                >
                                  <Edit className="h-4 w-4 text-taziki-blue" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-taziki-blue" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {items.length > 0 && (
                  <>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-taziki-blue">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-taziki-blue">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium text-taziki-blue">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button className="w-full py-6 bg-taziki-blue" onClick={handleCheckout}>
                      REVIEW DETAILS & CHECKOUT
                    </Button>
                  </>
                )}
              </TabsContent>

              {isLoggedIn && (
                <TabsContent value="previous" className="space-y-4 mt-4">
                  <h2 className="text-lg font-medium text-taziki-blue">Previously Ordered Items</h2>
                  <div className="space-y-3 mb-6 flex-1 overflow-y-auto">
                    {previousOrders.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium text-taziki-blue">{item.name}</h3>
                                <p className="text-sm font-medium text-taziki-blue">${item.price.toFixed(2)}</p>
                              </div>
                              <div className="flex justify-end mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-taziki-blue text-taziki-blue"
                                  onClick={() => handleAddPreviousItem(item)}
                                >
                                  Add to Order
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </>
        )}
      </div>

      <div className="h-20 z-40">
        <BottomNav />
      </div>
    </main>
  )
}
