"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Utensils, ShoppingBag, User } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  // Determine active states
  const isMenuActive = pathname?.includes("/menu") || pathname === "/"
  const isOrdersActive = pathname?.includes("/orders")
  const isAccountActive = pathname?.includes("/account")

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white py-3 pb-8 z-40 border-t">
      <div className="max-w-md mx-auto flex justify-around">
        <Link href="/menu" className="flex flex-col items-center">
          <Utensils className={`h-6 w-6 ${isMenuActive ? "text-taziki-blue" : "text-gray-400"}`} />
          <span className={`text-sm ${isMenuActive ? "text-taziki-blue font-medium" : "text-gray-400"}`}>Menu</span>
        </Link>
        <Link href="/orders" className="flex flex-col items-center">
          <ShoppingBag className={`h-6 w-6 ${isOrdersActive ? "text-taziki-blue" : "text-gray-400"}`} />
          <span className={`text-sm ${isOrdersActive ? "text-taziki-blue font-medium" : "text-gray-400"}`}>Orders</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center">
          <User className={`h-6 w-6 ${isAccountActive ? "text-taziki-blue" : "text-gray-400"}`} />
          <span className={`text-sm ${isAccountActive ? "text-taziki-blue font-medium" : "text-gray-400"}`}>
            Account
          </span>
        </Link>
      </div>
    </div>
  )
}
