"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  const router = useRouter()

  const handleGuestOrder = () => {
    router.push("/home")
  }

  const handleLogin = () => {
    router.push("/login")
  }

  const handleSignUp = () => {
    router.push("/signup")
  }

  return (
    <main className="flex flex-col h-screen bg-white">
      {/* Logo and branding */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mb-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A4kQSIXC3SRe6a0WThWJzuNc5xai8Y.png"
            width={120}
            height={40}
            alt="Taziki's Logo"
            className="w-auto h-auto"
            priority
          />
        </div>
        <h1 className="text-xl text-taziki-blue font-medium text-center mb-2">LIVE THE GOOD LIFE</h1>
      </div>

      {/* Action buttons */}
      <div className="p-6 space-y-4 mb-8">
        <Button className="w-full py-6 bg-taziki-blue hover:bg-taziki-blue/90 rounded-full" onClick={handleGuestOrder}>
          START A GUEST ORDER
        </Button>

        <Button
          variant="outline"
          className="w-full py-6 text-taziki-blue border-taziki-blue hover:bg-taziki-blue/10 rounded-full"
          onClick={handleSignUp}
        >
          SIGN UP
        </Button>

        <Button
          variant="outline"
          className="w-full py-6 text-taziki-blue border-taziki-blue hover:bg-taziki-blue/10 rounded-full"
          onClick={handleLogin}
        >
          LOG IN
        </Button>
      </div>
    </main>
  )
}
