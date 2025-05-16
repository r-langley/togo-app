"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageCarouselProps {
  images: string[]
  interval?: number
}

export function ImageCarousel({ images, interval = 5000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-advance the carousel
  useEffect(() => {
    if (images.length <= 1) return

    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        setDirection("right")
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
          setIsAnimating(false)
        }, 500) // Match this with the CSS transition duration
      }, interval)
    }

    startTimer()

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [images.length, interval, currentIndex])

  const goToPrevious = () => {
    if (isAnimating) return
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setDirection("left")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
      setIsAnimating(false)
    }, 500) // Match this with the CSS transition duration
  }

  const goToNext = () => {
    if (isAnimating) return
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setDirection("right")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      setIsAnimating(false)
    }, 500) // Match this with the CSS transition duration
  }

  if (images.length === 0) return null

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Current Image */}
      <div
        className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
          isAnimating ? (direction === "right" ? "-translate-x-full" : "translate-x-full") : "translate-x-0"
        }`}
      >
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Carousel image ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Next Image (for animation) */}
      <div
        className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
          isAnimating ? "translate-x-0" : direction === "right" ? "translate-x-full" : "-translate-x-full"
        }`}
      >
        <Image
          src={
            images[
              direction === "right"
                ? (currentIndex + 1) % images.length
                : (currentIndex - 1 + images.length) % images.length
            ] || "/placeholder.svg"
          }
          alt={`Carousel image ${
            direction === "right"
              ? ((currentIndex + 1) % images.length) + 1
              : ((currentIndex - 1 + images.length) % images.length) + 1
          }`}
          fill
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-10 h-8 w-8 rounded-full"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-10 h-8 w-8 rounded-full"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-1.5 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
