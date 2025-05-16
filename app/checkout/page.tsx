"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, CreditCard, Gift, Percent, ShoppingBag, Store, Car, CarFront, Check, Plus } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { ProcessingPayment } from "@/components/processing-payment"

// Mock stored payment methods
const storedPaymentMethods = [
  {
    id: "card1",
    type: "visa",
    last4: "4242",
    expiry: "05/25",
    name: "John Doe",
  },
  {
    id: "card2",
    type: "mastercard",
    last4: "8888",
    expiry: "12/24",
    name: "John Doe",
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, itemCount, subtotal, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [tipAmount, setTipAmount] = useState("0")
  const [tipPercentage, setTipPercentage] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showStoredPayments, setShowStoredPayments] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Get the current order type
  const [orderType, setOrderType] = useState(() => {
    return localStorage.getItem("selectedOrderType") || "takeout"
  })

  // Calculate tax and tip
  const taxRate = 0.085 // 8.5% tax rate
  const tax = subtotal * taxRate
  const tip = Number.parseFloat(tipAmount) || 0
  const total = subtotal + tax + tip

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    setIsLoaded(true)
  }, [])

  // Calculate tip percentages
  useEffect(() => {
    if (tipPercentage === "15") {
      const calculatedTip = (subtotal * 0.15).toFixed(2)
      setTipAmount(calculatedTip)
    } else if (tipPercentage === "20") {
      const calculatedTip = (subtotal * 0.2).toFixed(2)
      setTipAmount(calculatedTip)
    } else if (tipPercentage === "0") {
      setTipAmount("0")
    }
  }, [tipPercentage, subtotal])

  const handleTipChange = (value: string) => {
    setTipPercentage(value)
  }

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTipPercentage(null)
    setTipAmount(e.target.value)
  }

  const handlePlaceOrder = () => {
    // Show processing screen
    setIsProcessing(true)

    // The ProcessingPayment component will handle the redirect
  }

  const handleProcessingComplete = () => {
    // Clear the cart after successful order
    clearCart()
    // Navigate to confirmation page
    router.push("/confirmation")
  }

  const handleChangeOrderType = () => {
    router.push(`/order-type?locationId=1&orderType=pickup`)
  }

  const handleSelectPaymentMethod = (id: string) => {
    setPaymentMethod(id)
    setShowStoredPayments(false)
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

  // Function to get card icon
  const getCardIcon = (type: string) => {
    return type === "visa" ? "💳 Visa" : type === "mastercard" ? "💳 Mastercard" : "💳"
  }

  // For prototype, allow direct access to checkout page
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-taziki-blue">Loading checkout...</p>
      </div>
    )
  }

  // If cart is empty but we're directly accessing the page, show a sample item
  const hasItems = items.length > 0 || window.location.href.includes("/checkout")

  // Show processing payment screen if processing
  if (isProcessing) {
    return <ProcessingPayment onComplete={handleProcessingComplete} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 bg-taziki-blue z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl text-white font-medium">Checkout</h1>
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
      </header>

      {/* Main content - with padding for fixed header and bottom nav */}
      <main className="flex-1 pt-16 pb-20 px-4 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-6 py-4">
          {/* Order Details */}
          <section>
            <h2 className="text-lg font-medium mb-2 text-taziki-blue">Order Details</h2>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center text-taziki-blue">
                  <div className="flex items-center gap-2">
                    {getOrderTypeIcon(orderType)}
                    <span>{getOrderTypeName(orderType)}</span>
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
                <div className="flex justify-between text-taziki-blue">
                  <span>Address</span>
                  <span className="text-right font-medium">6345 East Hampden Avenue</span>
                </div>
                <div className="flex justify-between text-taziki-blue">
                  <span>Time</span>
                  <div className="text-right">
                    <Select defaultValue="asap">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP (15 min)</SelectItem>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="45min">45 minutes</SelectItem>
                        <SelectItem value="60min">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Order Summary */}
          <section>
            <h2 className="text-lg font-medium mb-2 text-taziki-blue">Order Summary</h2>
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <div className="w-12 h-12 relative rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-taziki-blue">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-taziki-blue">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))
                  ) : (
                    // Sample item for prototype
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 relative rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png"
                            alt="Baklava"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-taziki-blue">Baklava</p>
                          <p className="text-xs text-muted-foreground">Qty: 1</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-taziki-blue">$3.49</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="text-lg font-medium mb-2 text-taziki-blue">Payment Method</h2>
            <Card>
              <CardContent className="p-4">
                {isLoggedIn && !showStoredPayments && (
                  <>
                    {paymentMethod ? (
                      <div
                        className="flex justify-between items-center p-3 border rounded-md mb-3 cursor-pointer"
                        onClick={() => setShowStoredPayments(true)}
                      >
                        <div>
                          <p className="font-medium text-taziki-blue">
                            {getCardIcon(storedPaymentMethods.find((m) => m.id === paymentMethod)?.type || "")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            **** **** **** {storedPaymentMethods.find((m) => m.id === paymentMethod)?.last4}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-taziki-blue">
                          Change
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full justify-between h-auto py-3 mb-3 text-taziki-blue border-taziki-blue"
                        onClick={() => setShowStoredPayments(true)}
                      >
                        <span className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Select Payment Method</span>
                        </span>
                        <ChevronLeft className="h-4 w-4 rotate-180" />
                      </Button>
                    )}
                  </>
                )}

                {isLoggedIn && showStoredPayments && (
                  <div className="mb-4 space-y-3">
                    <h3 className="font-medium text-taziki-blue">Saved Payment Methods</h3>
                    {storedPaymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`flex justify-between items-center p-3 border rounded-md cursor-pointer ${
                          paymentMethod === method.id ? "border-taziki-blue bg-taziki-blue/5" : ""
                        }`}
                        onClick={() => handleSelectPaymentMethod(method.id)}
                      >
                        <div>
                          <p className="font-medium text-taziki-blue">{getCardIcon(method.type)}</p>
                          <p className="text-sm text-muted-foreground">**** **** **** {method.last4}</p>
                          <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                        </div>
                        {paymentMethod === method.id && <Check className="h-5 w-5 text-taziki-blue" />}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full justify-start h-auto py-3 text-taziki-blue border-dashed border-taziki-blue"
                      onClick={() => {
                        // In a real app, this would open a form to add a new card
                        setShowStoredPayments(false)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Add New Card</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-taziki-blue border-taziki-blue"
                      onClick={() => setShowStoredPayments(false)}
                    >
                      Back
                    </Button>
                  </div>
                )}

                {(!isLoggedIn || !showStoredPayments) && (
                  <>
                    {!paymentMethod && (
                      <Button
                        variant="outline"
                        className={`w-full justify-start h-auto py-3 mb-3 text-taziki-blue ${paymentMethod === "card" ? "border-2 border-taziki-blue bg-blue-50" : "border-taziki-blue"}`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Add Payment Method</span>
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      className={`w-full justify-start h-auto py-3 mb-3 text-taziki-blue ${paymentMethod === "gift" ? "border-2 border-taziki-blue bg-blue-50" : "border-taziki-blue"}`}
                      onClick={() => setPaymentMethod("gift")}
                    >
                      <Gift className="mr-2 h-4 w-4" />
                      <span>Gift Card</span>
                    </Button>

                    <Button
                      variant="outline"
                      className={`w-full justify-start h-auto py-3 text-taziki-blue ${paymentMethod === "promo" ? "border-2 border-taziki-blue bg-blue-50" : "border-taziki-blue"}`}
                      onClick={() => setPaymentMethod("promo")}
                    >
                      <Percent className="mr-2 h-4 w-4" />
                      <span>Enter Promo Code</span>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Tip */}
          <section>
            <h2 className="text-lg font-medium mb-2 text-taziki-blue">Tip</h2>
            <Card>
              <CardContent className="p-4">
                <RadioGroup value={tipPercentage || ""} onValueChange={handleTipChange}>
                  <div className="grid grid-cols-3 gap-2">
                    <Label
                      htmlFor="tip-0"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-taziki-blue"
                    >
                      <RadioGroupItem value="0" id="tip-0" className="sr-only" />
                      <span className="text-sm text-taziki-blue">No Tip</span>
                    </Label>
                    <Label
                      htmlFor="tip-15"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-taziki-blue"
                    >
                      <RadioGroupItem value="15" id="tip-15" className="sr-only" />
                      <span className="text-sm text-taziki-blue">15%</span>
                      <span className="text-xs text-taziki-blue">${(subtotal * 0.15).toFixed(2)}</span>
                    </Label>
                    <Label
                      htmlFor="tip-20"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-taziki-blue"
                    >
                      <RadioGroupItem value="20" id="tip-20" className="sr-only" />
                      <span className="text-sm text-taziki-blue">20%</span>
                      <span className="text-xs text-taziki-blue">${(subtotal * 0.2).toFixed(2)}</span>
                    </Label>
                  </div>
                  <div className="mt-3">
                    <Label htmlFor="custom-tip" className="text-sm text-taziki-blue">
                      Custom Tip
                    </Label>
                    <div className="flex items-center mt-1">
                      <span className="mr-2 text-taziki-blue">$</span>
                      <Input
                        id="custom-tip"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        onChange={handleCustomTipChange}
                        value={tipPercentage === null ? tipAmount : ""}
                        className="border-taziki-blue"
                      />
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </section>

          {/* Order Total */}
          <section>
            <h2 className="text-lg font-medium mb-2 text-taziki-blue">Order Total</h2>
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between text-taziki-blue">
                  <span>Subtotal</span>
                  <span>${items.length > 0 ? subtotal.toFixed(2) : "3.49"}</span>
                </div>
                <div className="flex justify-between text-taziki-blue">
                  <span>Tax</span>
                  <span>${items.length > 0 ? tax.toFixed(2) : "0.30"}</span>
                </div>
                <div className="flex justify-between text-taziki-blue">
                  <span>Tip</span>
                  <span>${tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t text-taziki-blue">
                  <span>Total</span>
                  <span>${items.length > 0 ? total.toFixed(2) : "3.79"}</span>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Place Order Button */}
          <Button
            className="w-full py-6 bg-taziki-blue mt-6"
            onClick={handlePlaceOrder}
            disabled={!paymentMethod && items.length > 0}
          >
            PLACE ORDER
          </Button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <BottomNav />
      </div>
    </div>
  )
}
