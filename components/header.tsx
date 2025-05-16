import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-taziki-blue p-4 flex justify-between items-center">
      <Link href="/">
        <div className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A4kQSIXC3SRe6a0WThWJzuNc5xai8Y.png"
            width={60}
            height={20}
            alt="Taziki's Logo"
            className="h-5 w-auto"
            priority
          />
        </div>
      </Link>
      <Button variant="ghost" size="icon" className="text-white">
        <Menu className="h-8 w-8" />
      </Button>
    </header>
  )
}
