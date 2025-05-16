"use client"

import type { ReactNode } from "react"

type PageTransitionProps = {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  // Simplified version that just renders children
  // This ensures we don't have any issues with the transition
  return <>{children}</>
}
