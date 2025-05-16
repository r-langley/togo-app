"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)

      // Mock successful login for demo@example.com / password
      if (email === "demo@example.com" && password === "password") {
        // Store login state
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userName", "Demo User")

        toast({
          title: "Login successful",
          description: "Welcome back, Demo User!",
          variant: "blue",
        })

        // Navigate to menu with pre-selected location
        router.push("/menu?locationId=1&orderType=pickup&subType=takeout")
      } else {
        toast({
          title: "Login failed",
          description: "For demo, use demo@example.com / password",
          variant: "destructive",
        })
      }
    }, 1000)
  }

  return (
    <main className="flex flex-col h-screen">
      {/* Custom header */}
      <div className="bg-taziki-blue">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl text-white font-medium">Log In</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="flex-grow flex flex-col p-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-taziki-blue">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-taziki-blue">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-taziki-blue">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-taziki-blue"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-taziki-blue" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                <p>For demo, use:</p>
                <p className="font-medium">Email: demo@example.com</p>
                <p className="font-medium">Password: password</p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-taziki-blue">
                Sign up
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
