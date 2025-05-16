"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ShoppingBag, ChevronRight } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { Badge } from "@/components/ui/badge"

// Mock previous orders data
const mockOrders = [
  {
    id: "ORD-12345",
    date: "May 12, 2023",
    time: "12:30 PM",
    status: "Completed",
    total: 19.97,
    items: [
      {
        id: "7",
        name: "Baklava",
        quantity: 1,
        price: 3.49,
      },
      {
        id: "3",
        name: "Grilled Chicken Gyro",
        quantity: 1,
        price: 11.99,
      },
      {
        id: "5",
        name: "Roasted Potatoes",
        quantity: 1,
        price: 3.49,
      },
    ],
  },
  {
    id: "ORD-12346",
    date: "May 5, 2023",
    time: "6:45 PM",
    status: "Completed",
    total: 24.97,
    items: [
      {
        id: "4",
        name: "Lamb Gyro",
        quantity: 1,
        price: 12.99,
      },
      {
        id: "1",
        name: "Hummus",
        quantity: 1,
        price: 7.99,
      },
      {
        id: "8",
        name: "Fountain Drink",
        quantity: 1,
        price: 2.99,
      },
    ],
  },
]

export default function OrdersPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [orders, setOrders] = useState<typeof mockOrders>([])

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    // If logged in, show mock orders
    if (loggedIn) {
      setOrders(mockOrders)
    }
  }, [])

  return (
    <main className="flex flex-col h-screen">
      {/* Custom header */}
      <div className="bg-taziki-blue">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl text-white font-medium">My Orders</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="flex-grow flex flex-col p-4">
        {!isLoggedIn || orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <ShoppingBag className="h-16 w-16 text-taziki-blue/30 mb-4" />
            <h2 className="text-xl font-medium text-taziki-blue mb-2">No Recent Orders</h2>
            <p className="text-center text-taziki-blue/70 mb-6">
              {isLoggedIn
                ? "Your order history will appear here once you've placed an order."
                : "Sign in to view your order history."}
            </p>
            {isLoggedIn ? (
              <Link href="/menu">
                <Button className="bg-taziki-blue hover:bg-taziki-blue/90 px-6">Start an Order</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-taziki-blue hover:bg-taziki-blue/90 px-6">Sign In</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-taziki-blue">Recent Orders</h2>

            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium text-taziki-blue">
                        {order.date} at {order.time}
                      </h3>
                      <p className="text-sm text-muted-foreground">{order.id}</p>
                    </div>
                    <Badge className="bg-green-500">{order.status}</Badge>
                  </div>

                  <div className="border-t border-b py-2 my-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between py-1">
                        <span className="text-sm text-taziki-blue">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-sm text-taziki-blue">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium text-taziki-blue">Total: ${order.total.toFixed(2)}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-taziki-blue border-taziki-blue flex items-center gap-1"
                    >
                      Order Again
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="h-20">
        <BottomNav />
      </div>
    </main>
  )
}
