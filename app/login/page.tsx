"use client"

import { useState } from "react"
import { ArrowRight, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 bg-black/40 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-purple-600/10 animate-pulse" />
        <CardHeader className="space-y-1 pt-6">
          <CardTitle className="text-2xl font-bold tracking-tight text-white">Welcome back</CardTitle>
          <CardDescription className="text-gray-400">Enter your credentials to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  placeholder="company@example.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
                />
                <div className="absolute inset-0 rounded-md pointer-events-none transition-all peer-focus:ring-2 peer-focus:ring-purple-500" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                "Logging in..."
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black/40 px-2 text-gray-400">Or continue with</span>
              </div>
            </div>
            <Button variant="outline" className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20">
              <Fingerprint className="mr-2 h-4 w-4" />
              Biometric Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

