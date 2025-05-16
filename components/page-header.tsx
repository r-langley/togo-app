import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface PageHeaderProps {
  title: string
  backHref: string
  rightElement?: React.ReactNode
}

export function PageHeader({ title, backHref, rightElement }: PageHeaderProps) {
  return (
    <div className="bg-taziki-blue">
      <div className="flex items-center justify-between px-4 h-16">
        <Link href={backHref}>
          <Button variant="ghost" size="icon" className="text-white">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl text-white font-medium">{title}</h1>
        {rightElement ? rightElement : <div className="w-10"></div>}
      </div>
    </div>
  )
}
