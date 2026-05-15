import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle, Zap, Shield, BarChart3, ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6 text-purple-500 fill-purple-500" />
          <span className="ml-2 text-xl font-bold tracking-tighter">ClipForge AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="#pricing">
            Pricing
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link href="/login">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4">
          <div className="container mx-auto flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Turn Long Videos Into <br />
                <span className="text-purple-500">Viral Shorts</span> In Seconds
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                AI-powered clipping, subtitling, and optimization. Grow your social presence across TikTok, Reels, and Shorts without the manual effort.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8">
                  Start Creating Free <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white/10 hover:bg-white/5">
                Watch Demo
              </Button>
            </div>
            {/* Glassmorphism Video Preview Placeholder */}
            <div className="relative mt-16 w-full max-w-4xl aspect-video rounded-xl border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl shadow-purple-500/20">
               <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="h-20 w-20 text-white/20" />
               </div>
               <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to go viral</h2>
              <p className="text-gray-400 max-w-[600px] mx-auto">Our AI handles the boring stuff so you can focus on creativity.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Zap className="h-10 w-10 text-purple-500" />}
                title="AI Moment Detection"
                description="Automatically finds the most engaging parts of your video based on speech and visual cues."
              />
              <FeatureCard 
                icon={<Shield className="h-10 w-10 text-blue-500" />}
                title="Auto-Reframing"
                description="Converts horizontal video to perfect 9:16 vertical format while keeping the subject in frame."
              />
              <FeatureCard 
                icon={<BarChart3 className="h-10 w-10 text-green-500" />}
                title="Smart Subtitles"
                description="Generates accurate, stylish, and animated subtitles that keep viewers engaged."
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-24">
           <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple Pricing</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <PricingCard 
                  title="Free"
                  price="$0"
                  features={["3 clips per month", "Standard quality", "Watermark included", "Basic templates"]}
                  cta="Get Started"
                />
                <PricingCard 
                  title="Pro"
                  price="$29"
                  featured
                  features={["Unlimited clips", "4K Export", "No watermark", "Custom branding", "Priority processing"]}
                  cta="Go Pro"
                />
              </div>
           </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/10 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-purple-500 fill-purple-500" />
            <span className="font-bold">ClipForge AI</span>
          </div>
          <p className="text-sm text-gray-500 text-center md:text-left">
            © 2024 ClipForge AI Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
             <Link className="text-sm text-gray-500 hover:text-white" href="#">Privacy</Link>
             <Link className="text-sm text-gray-500 hover:text-white" href="#">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors space-y-4">
      {icon}
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function PricingCard({ title, price, features, cta, featured = false }: { title: string, price: string, features: string[], cta: string, featured?: boolean }) {
  return (
    <div className={`p-8 rounded-2xl border ${featured ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-white/5'} flex flex-col space-y-6 relative`}>
      {featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>}
      <div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-gray-400">/month</span>
        </div>
      </div>
      <ul className="space-y-3 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-300">
            <ChevronRight className="h-4 w-4 text-purple-500" />
            {f}
          </li>
        ))}
      </ul>
      <Button className={featured ? 'bg-purple-600 hover:bg-purple-700' : 'bg-white text-black hover:bg-gray-200'}>
        {cta}
      </Button>
    </div>
  )
}
