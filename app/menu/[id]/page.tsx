"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft, ShoppingBag } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"

export default function MenuItemPage() {
  const router = useRouter()
  const params = useParams()
  const { addItem, itemCount } = useCart()
  const itemId = params.id as string
  const [quantity, setQuantity] = useState(1)
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    size: "regular",
    protein: "chicken",
  })
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  // Mock menu item data - in a real app, this would be fetched based on itemId
  const menuItem = {
    id: itemId,
    name:
      itemId === "3"
        ? "Grilled Chicken Gyro"
        : itemId === "7"
          ? "Baklava"
          : itemId === "1"
            ? "Hummus"
            : itemId === "2"
              ? "Taziki Dip"
              : itemId === "4"
                ? "Lamb Gyro"
                : itemId === "5"
                  ? "Roasted Potatoes"
                  : itemId === "6"
                    ? "Basmati Rice"
                    : itemId === "8"
                      ? "Fountain Drink"
                      : "Greek Tea",
    price:
      itemId === "3"
        ? 11.99
        : itemId === "4"
          ? 12.99
          : itemId === "1"
            ? 7.99
            : itemId === "2"
              ? 6.99
              : itemId === "5" || itemId === "6"
                ? 3.49
                : itemId === "7"
                  ? 3.49
                  : 2.99,
    description:
      itemId === "3"
        ? "Grilled chicken, lettuce, tomato, and Taziki sauce wrapped in a warm pita"
        : itemId === "7"
          ? "Flaky phyllo pastry with honey and walnuts"
          : itemId === "1"
            ? "Puréed chickpeas, tahini, olive oil, lemon juice, and garlic"
            : itemId === "2"
              ? "Cucumber, dill, and Greek yogurt"
              : itemId === "4"
                ? "Sliced lamb, lettuce, tomato, and Taziki sauce"
                : itemId === "5"
                  ? "Roasted with olive oil and Greek spices"
                  : itemId === "6"
                    ? "Seasoned rice pilaf"
                    : itemId === "8"
                      ? "Coca-Cola products"
                      : "Sweet tea with a hint of cinnamon",
    calories:
      itemId === "3"
        ? "580-820"
        : itemId === "7"
          ? "440"
          : itemId === "1"
            ? "350"
            : itemId === "2"
              ? "280"
              : itemId === "4"
                ? "650"
                : itemId === "5"
                  ? "220"
                  : itemId === "6"
                    ? "180"
                    : itemId === "8"
                      ? "150"
                      : "120",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png",
    ingredients:
      itemId === "3"
        ? ["Grilled chicken", "Lettuce", "Tomato", "Red onion", "Taziki sauce", "Pita bread"]
        : itemId === "7"
          ? ["Phyllo dough", "Honey", "Walnuts", "Butter", "Cinnamon"]
          : itemId === "1"
            ? ["Chickpeas", "Tahini", "Olive oil", "Lemon juice", "Garlic"]
            : itemId === "2"
              ? ["Cucumber", "Dill", "Greek yogurt", "Garlic", "Lemon juice"]
              : itemId === "4"
                ? ["Sliced lamb", "Lettuce", "Tomato", "Red onion", "Taziki sauce", "Pita bread"]
                : itemId === "5"
                  ? ["Potatoes", "Olive oil", "Greek seasoning", "Garlic"]
                  : itemId === "6"
                    ? ["Basmati rice", "Herbs", "Spices", "Olive oil"]
                    : itemId === "8"
                      ? ["Carbonated water", "High fructose corn syrup", "Caramel color"]
                      : ["Tea", "Sugar", "Cinnamon"],
    allergens:
      itemId === "3"
        ? ["Wheat", "Dairy"]
        : itemId === "7"
          ? ["Wheat", "Nuts"]
          : itemId === "1"
            ? ["Sesame"]
            : itemId === "2"
              ? ["Dairy"]
              : itemId === "4"
                ? ["Wheat", "Dairy"]
                : [],
    options:
      itemId === "3" || itemId === "4"
        ? [
            {
              name: "Size",
              type: "radio",
              key: "size",
              choices: [
                { id: "regular", name: "Regular", price: 0 },
                { id: "large", name: "Large", price: 2.0 },
              ],
            },
            {
              name: "Protein",
              type: "radio",
              key: "protein",
              choices: [
                { id: "chicken", name: "Grilled Chicken", price: 0 },
                { id: "lamb", name: "Lamb", price: 1.5 },
                { id: "beef", name: "Beef", price: 1.0 },
              ],
            },
          ]
        : itemId === "8"
          ? [
              {
                name: "Size",
                type: "radio",
                key: "size",
                choices: [
                  { id: "regular", name: "Regular", price: 0 },
                  { id: "large", name: "Large", price: 1.0 },
                ],
              },
            ]
          : [],
    addons:
      itemId === "3" || itemId === "4"
        ? [
            { id: "feta", name: "Extra Feta", price: 0.99 },
            { id: "sauce", name: "Extra Taziki Sauce", price: 0.5 },
            { id: "olives", name: "Kalamata Olives", price: 0.75 },
          ]
        : itemId === "1"
          ? [
              { id: "pita", name: "Extra Pita", price: 0.99 },
              { id: "olives", name: "Kalamata Olives", price: 0.75 },
            ]
          : [],
  }

  const handleAddToCart = () => {
    // Calculate additional price from options
    let additionalPrice = 0

    // Add option prices
    menuItem.options?.forEach((option) => {
      const selectedOption = option.choices.find((choice) => choice.id === selectedOptions[option.key])
      if (selectedOption) {
        additionalPrice += selectedOption.price
      }
    })

    // Add addon prices
    menuItem.addons?.forEach((addon) => {
      if (selectedAddons.includes(addon.id)) {
        additionalPrice += addon.price
      }
    })

    // Add to cart
    addItem({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price + additionalPrice,
      quantity: quantity,
      options: selectedOptions,
      addons: selectedAddons,
      specialInstructions: specialInstructions,
      image: menuItem.image,
    })

    router.push("/menu")
  }

  const handleOptionChange = (key: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) => (prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]))
  }

  // Calculate total price with options and addons
  const calculateTotalPrice = () => {
    let total = menuItem.price

    // Add option prices
    menuItem.options?.forEach((option) => {
      const selectedOption = option.choices.find((choice) => choice.id === selectedOptions[option.key])
      if (selectedOption) {
        total += selectedOption.price
      }
    })

    // Add addon prices
    menuItem.addons?.forEach((addon) => {
      if (selectedAddons.includes(addon.id)) {
        total += addon.price
      }
    })

    // Multiply by quantity
    total *= quantity

    return total.toFixed(2)
  }

  return (
    <main className="flex flex-col h-screen">
      {/* Custom header */}
      <div className="bg-taziki-blue fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/menu">
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl text-white font-medium">Item Details</h1>
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

      {/* Content with top padding for fixed header */}
      <div className="flex-grow flex flex-col pt-16 pb-24 overflow-y-auto">
        {/* Hero image */}
        <div className="relative w-full" style={{ height: "40vh", minHeight: "250px", maxHeight: "350px" }}>
          <Image
            src={
              menuItem.image ||
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KlWWko2ii0hDl1ZVrxFXG0Ehr9Emy3.png"
            }
            alt={menuItem.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Item details */}
        <div className="p-4 pt-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-taziki-blue">{menuItem.name}</h1>
            <p className="text-taziki-blue mt-1">{menuItem.description}</p>
            <div className="flex justify-between mt-2">
              <p className="font-medium text-taziki-blue">${menuItem.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">{menuItem.calories} cal</p>
            </div>
          </div>

          {/* Ingredients */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-lg font-medium text-taziki-blue mb-2">Ingredients</h2>
              <ul className="list-disc pl-5 text-taziki-blue">
                {menuItem.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              {menuItem.allergens.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-taziki-blue">Allergens:</p>
                  <p className="text-sm text-taziki-blue">{menuItem.allergens.join(", ")}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Options */}
          {menuItem.options && menuItem.options.length > 0 && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <h2 className="text-lg font-medium text-taziki-blue mb-2">Options</h2>
                {menuItem.options.map((option) => (
                  <div key={option.key} className="mb-4">
                    <h3 className="font-medium text-taziki-blue mb-2">{option.name}</h3>
                    <RadioGroup
                      value={selectedOptions[option.key]}
                      onValueChange={(value) => handleOptionChange(option.key, value)}
                    >
                      {option.choices.map((choice) => (
                        <div key={choice.id} className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value={choice.id} id={`${option.key}-${choice.id}`} />
                          <Label htmlFor={`${option.key}-${choice.id}`} className="text-taziki-blue flex-1">
                            {choice.name}
                          </Label>
                          {choice.price > 0 && (
                            <span className="text-sm text-taziki-blue">+${choice.price.toFixed(2)}</span>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Add-ons */}
          {menuItem.addons && menuItem.addons.length > 0 && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <h2 className="text-lg font-medium text-taziki-blue mb-2">Add-ons</h2>
                {menuItem.addons.map((addon) => (
                  <div key={addon.id} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`addon-${addon.id}`}
                      checked={selectedAddons.includes(addon.id)}
                      onCheckedChange={() => handleAddonToggle(addon.id)}
                    />
                    <Label htmlFor={`addon-${addon.id}`} className="text-taziki-blue flex-1">
                      {addon.name}
                    </Label>
                    <span className="text-sm text-taziki-blue">+${addon.price.toFixed(2)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Special instructions */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-lg font-medium text-taziki-blue mb-2">Special Instructions</h2>
              <textarea
                className="w-full p-2 border border-taziki-blue rounded-md text-taziki-blue"
                rows={3}
                placeholder="Any special requests?"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Quantity */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="text-lg font-medium text-taziki-blue mb-2">Quantity</h2>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-taziki-blue text-taziki-blue"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="mx-4 text-lg text-taziki-blue">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-taziki-blue text-taziki-blue"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add to cart button */}
      <div className="fixed bottom-20 left-0 right-0 mx-auto w-full max-w-md px-4 py-3 z-10">
        <Button
          className="w-full py-6 bg-taziki-blue flex items-center justify-between shadow-lg rounded-xl"
          onClick={handleAddToCart}
        >
          <span>Add to Order</span>
          <span>${calculateTotalPrice()}</span>
        </Button>
      </div>

      <div className="h-20">
        <BottomNav />
      </div>
    </main>
  )
}
