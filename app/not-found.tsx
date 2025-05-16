import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-taziki-blue mb-2">Page Not Found</h1>
      <p className="text-taziki-blue mb-8">Sorry, the page you're looking for doesn't exist.</p>
      <Link href="/">
        <Button className="bg-taziki-blue flex items-center gap-2">
          <Home className="h-5 w-5" />
          <span>Return Home</span>
        </Button>
      </Link>
    </div>
  )
}
