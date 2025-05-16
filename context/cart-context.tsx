"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  options?: Record<string, string>
  addons?: string[]
  specialInstructions?: string
  image?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("tazikisCart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse saved cart", e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("tazikisCart", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      // Check if item with same ID and options already exists
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === newItem.id &&
          JSON.stringify(item.options) === JSON.stringify(newItem.options) &&
          JSON.stringify(item.addons) === JSON.stringify(newItem.addons) &&
          item.specialInstructions === newItem.specialInstructions,
      )

      let updatedItems
      let toastMessage

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        toastMessage = `Updated ${newItem.name} quantity to ${updatedItems[existingItemIndex].quantity}`
      } else {
        // Add new item
        updatedItems = [...prevItems, newItem]
        toastMessage = `Added ${newItem.quantity} ${newItem.name} to your order`
      }

      // Show toast notification
      toast({
        description: toastMessage,
        variant: "blue",
        duration: 2000,
      })

      return updatedItems
    })
  }

  const removeItem = (itemId: string) => {
    const itemToRemove = items.find((item) => item.id === itemId)

    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId)

      if (itemToRemove) {
        // Show toast notification
        toast({
          description: `Removed ${itemToRemove.name} from your order`,
          variant: "blue",
          duration: 2000,
        })
      }

      return updatedItems
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === itemId) {
          // Show toast notification only if quantity changed
          if (item.quantity !== quantity) {
            toast({
              description: `Updated ${item.name} quantity to ${quantity}`,
              variant: "blue",
              duration: 2000,
            })
          }
          return { ...item, quantity }
        }
        return item
      })

      return updatedItems
    })
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("tazikisCart")
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
