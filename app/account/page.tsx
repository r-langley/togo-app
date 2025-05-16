"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, User, Settings, CreditCard, Heart, Gift, LogOut, ChevronRight, Plus } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

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

// Mock gift cards
const giftCards = [
  {
    id: "gc1",
    amount: 25.0,
    balance: 15.75,
    lastUsed: "Apr 15, 2023",
  },
  {
    id: "gc2",
    amount: 50.0,
    balance: 50.0,
    lastUsed: "Never used",
  },
]

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("Guest User")
  const [showPaymentMethods, setShowPaymentMethods] = useState(false)
  const [showGiftCards, setShowGiftCards] = useState(false)

  useEffect(() => {
    // Check if user is logged in - only on client side
    if (typeof window === "undefined") return

    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    if (loggedIn) {
      const name = localStorage.getItem("userName") || "Demo User"
      setUserName(name)
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("userName")
    }
    setIsLoggedIn(false)
    setUserName("Guest User")
  }

  // Function to get card icon
  const getCardIcon = (type: string) => {
    return type === "visa" ? "💳 Visa" : type === "mastercard" ? "💳 Mastercard" : "💳"
  }

  return (
    <main className="flex flex-col h-screen">
      {/* Rest of the component remains unchanged */}
      {/* ... */}

      {/* Custom header */}
      <div className="bg-taziki-blue">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl text-white font-medium">My Account</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="flex-grow flex flex-col p-4 overflow-y-auto">
        {/* User info */}
        <div className="flex items-center gap-4 mb-6 p-4">
          <div className="w-16 h-16 rounded-full bg-taziki-blue/10 flex items-center justify-center">
            <User className="h-8 w-8 text-taziki-blue" />
          </div>
          <div>
            <h2 className="text-xl font-medium text-taziki-blue">{userName}</h2>
            {!isLoggedIn ? (
              <Link href="/login" className="text-taziki-blue underline text-sm">
                Sign in or create an account
              </Link>
            ) : (
              <p className="text-sm text-muted-foreground">demo@example.com</p>
            )}
          </div>
        </div>

        {/* Payment Methods Section */}
        {showPaymentMethods ? (
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-taziki-blue">Payment Methods</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowPaymentMethods(false)}>
                Back
              </Button>
            </div>

            {storedPaymentMethods.map((method) => (
              <Card key={method.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-taziki-blue">{getCardIcon(method.type)}</p>
                      <p className="text-sm text-muted-foreground">**** **** **** {method.last4}</p>
                      <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-taziki-blue border-taziki-blue">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button className="w-full bg-taziki-blue">
              <Plus className="mr-2 h-4 w-4" />
              Add New Payment Method
            </Button>
          </div>
        ) : showGiftCards ? (
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-taziki-blue">Gift Cards</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowGiftCards(false)}>
                Back
              </Button>
            </div>

            {giftCards.map((card) => (
              <Card key={card.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-taziki-blue">Taziki's Gift Card</p>
                      <p className="text-sm text-taziki-blue">${card.balance.toFixed(2)} remaining</p>
                      <p className="text-xs text-muted-foreground">Last used: {card.lastUsed}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-taziki-blue">${card.amount.toFixed(2)}</p>
                      <Button variant="outline" size="sm" className="text-taziki-blue border-taziki-blue mt-1">
                        Use
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="space-y-2">
              <Button className="w-full bg-taziki-blue">
                <Plus className="mr-2 h-4 w-4" />
                Add Gift Card
              </Button>
              <Button variant="outline" className="w-full text-taziki-blue border-taziki-blue">
                <Gift className="mr-2 h-4 w-4" />
                Purchase Gift Card
              </Button>
            </div>
          </div>
        ) : (
          /* Account options */
          <div className="space-y-4">
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-taziki-blue" />
                    <span className="text-taziki-blue">Account Settings</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setShowPaymentMethods(true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-taziki-blue" />
                    <span className="text-taziki-blue">Payment Methods</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-taziki-blue" />
                    <span className="text-taziki-blue">Favorites</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setShowGiftCards(true)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Gift className="h-5 w-5 text-taziki-blue" />
                    <span className="text-taziki-blue">Gift Cards</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {isLoggedIn && (
              <Card className="cursor-pointer hover:bg-muted/50 transition-colors mt-8" onClick={handleLogout}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <LogOut className="h-5 w-5 text-red-500" />
                    <span className="text-red-500">Sign Out</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      <div className="h-20">
        <BottomNav />
      </div>
    </main>
  )
}
