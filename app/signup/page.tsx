"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/location")
    }, 1000)
  }

  return (
    <main className="flex flex-col h-screen">
      {/* Custom header */}
      <div className="bg-taziki-blue">
        {/* Greek pattern */}
        <div className="greek-pattern"></div>
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl text-white font-medium">Sign Up</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="flex-grow flex flex-col p-4 overflow-y-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-taziki-blue">Create an account</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-taziki-blue">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-taziki-blue"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-taziki-blue">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-taziki-blue"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-taziki-blue">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 555-5555"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-taziki-blue"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-taziki-blue">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-taziki-blue"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm text-taziki-blue">
                  I agree to the{" "}
                  <Link href="/terms" className="text-taziki-blue underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-taziki-blue underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full bg-taziki-blue" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-taziki-blue">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="h-20">
        <BottomNav />
      </div>
    </main>
  )
}
