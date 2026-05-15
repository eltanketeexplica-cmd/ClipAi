import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, PlusCircle, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-gray-400">Here&apos;s what&apos;s happening with your videos.</p>
        </div>
        <Link href="/dashboard/upload">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Video
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Videos" value="12" icon={<Video className="h-4 w-4" />} />
        <StatsCard title="Viral Clips" value="48" icon={<TrendingUp className="h-4 w-4" />} />
        <StatsCard title="Processing" value="1" icon={<Clock className="h-4 w-4" />} />
        <StatsCard title="Time Saved" value="24h" icon={<TrendingUp className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                        <div className="h-16 w-28 bg-white/10 rounded-md flex items-center justify-center">
                            <Video className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-white">How to build a SaaS in 2024.mp4</h4>
                            <p className="text-xs text-gray-500">Uploaded 2 days ago • 12:45</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">Completed</span>
                            <p className="text-[10px] text-gray-500">8 clips generated</p>
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Processing: Podcast_Ep12.mp4</span>
                        <span className="text-purple-400">65%</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full w-[65%]" />
                    </div>
                    <p className="text-[10px] text-gray-500 italic">Generating AI viral moments...</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
        <div className="text-gray-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  )
}
