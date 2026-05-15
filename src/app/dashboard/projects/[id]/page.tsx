"use client"

import { useState, useEffect } from "react"
import { useFFmpeg } from "@/hooks/use-ffmpeg"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Scissors, Download, Sparkles, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { ClipEditor } from "@/components/dashboard/clip-editor"

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const { clipVideo, loaded, load, progress } = useFFmpeg()
  const [video, setVideo] = useState<any>(null)
  const [clips, setClips] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedClip, setSelectedClip] = useState<any>(null)

  useEffect(() => {
    // In a real app, fetch project and clips from API
    const mockClips = [
        { id: "1", title: "AI Revolution", startTime: 10, endTime: 40, score: 9.8 },
        { id: "2", title: "Why SaaS is Hard", startTime: 120, endTime: 155, score: 8.5 },
    ]
    setClips(mockClips)
    setSelectedClip(mockClips[0])
    setVideo({
        url: "https://example.com/video.mp4",
        title: "Building ClipForge.mp4"
    })
  }, [])

  const handleExport = async (clip: any) => {
    setIsProcessing(true)
    try {
        const duration = clip.endTime - clip.startTime
        const blob = await clipVideo(video.url, clip.startTime, duration)
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${clip.title.replace(/\s+/g, '_')}_clip.mp4`
        a.click()
        toast.success("Clip exported successfully!")
    } catch (error) {
        console.error(error)
        toast.error("Export failed. Check console for details.")
    } finally {
        setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white tracking-tight">{video?.title || "Project Details"}</h1>
        {!loaded && (
            <Button onClick={load} variant="outline" className="border-purple-500/50 text-purple-400">
                Initialize Engine
            </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-black border-white/10 overflow-hidden">
            <div className="aspect-video bg-white/5 flex items-center justify-center relative">
                <Play className="h-12 w-12 text-white/20" />
                {isProcessing && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
                        <p className="text-white font-medium">Processing Clip... {Math.round(progress)}%</p>
                    </div>
                )}
            </div>
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-white/10">
                        <Scissors className="h-4 w-4 mr-2" />
                        Trim
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/10">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Captions
                    </Button>
                </div>
                <p className="text-xs text-gray-500">Duration: 12:45</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clips.map((clip) => (
                <Card key={clip.id} className="bg-white/5 border-white/10 hover:border-purple-500/50 transition-colors">
                    <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-base text-white">{clip.title}</CardTitle>
                            <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded">
                                {clip.score} Viral Score
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-4">
                        <p className="text-xs text-gray-400">
                            {Math.floor(clip.startTime / 60)}:{(clip.startTime % 60).toString().padStart(2, '0')} - 
                            {Math.floor(clip.endTime / 60)}:{(clip.endTime % 60).toString().padStart(2, '0')}
                        </p>
                        <Button 
                            className="w-full bg-white text-black hover:bg-gray-200" 
                            size="sm"
                            onClick={() => handleExport(clip)}
                            disabled={isProcessing}
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Export MP4
                        </Button>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
            {selectedClip && (
                <ClipEditor 
                    duration={video?.duration || 600}
                    startTime={selectedClip.startTime}
                    endTime={selectedClip.endTime}
                    onTimeChange={(start, end) => setSelectedClip({...selectedClip, startTime: start, endTime: end})}
                />
            )}
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-lg text-white">AI Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <h4 className="text-sm font-semibold text-purple-400">TikTok Hook</h4>
                        <p className="text-xs text-gray-300 mt-1">&quot;I bet you didn&apos;t know this AI secret... 😱&quot;</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <h4 className="text-sm font-semibold text-purple-400">Description</h4>
                        <p className="text-xs text-gray-300 mt-1">This strategy changed everything for my business. #SaaS #AI #BuildInPublic</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
