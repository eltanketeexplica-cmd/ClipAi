"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Zap, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error("Failed to start checkout session")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Billing & Plans</h1>
        <p className="text-gray-400">Manage your subscription and usage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white/5 border-white/10 flex flex-col">
          <CardHeader>
            <CardTitle className="text-white text-xl">Free Plan</CardTitle>
            <CardDescription className="text-gray-400">Perfect for getting started</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="text-3xl font-bold text-white">$0 <span className="text-sm font-normal text-gray-500">/mo</span></div>
            <ul className="space-y-2">
              <FeatureItem text="3 AI Clips per month" />
              <FeatureItem text="720p Export" />
              <FeatureItem text="Standard templates" />
              <FeatureItem text="Watermark included" />
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-white/10 text-white" disabled>Current Plan</Button>
          </CardFooter>
        </Card>

        <Card className="bg-purple-600/10 border-purple-500/50 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-400 fill-purple-400" />
                Pro Plan
            </CardTitle>
            <CardDescription className="text-gray-400">For serious creators</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="text-3xl font-bold text-white">$29 <span className="text-sm font-normal text-gray-500">/mo</span></div>
            <ul className="space-y-2">
              <FeatureItem text="Unlimited AI Clips" />
              <FeatureItem text="4K Export" />
              <FeatureItem text="No watermarks" />
              <FeatureItem text="Priority AI processing" />
              <FeatureItem text="Custom brand styles" />
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpgrade} disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Upgrade to Pro
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
            <CardTitle className="text-white text-lg">Usage</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monthly Clips</span>
                    <span className="text-white">1 / 3</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-1/3" />
                </div>
                <p className="text-[10px] text-gray-500">Your plan resets in 12 days.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-gray-300">
      <Check className="h-4 w-4 text-purple-400" />
      {text}
    </li>
  )
}
