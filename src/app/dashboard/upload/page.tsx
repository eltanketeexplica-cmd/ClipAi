"use client"

import { useState } from "react"
import { UploadDropzone } from "@/utils/uploadthing"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Video, Upload, Link as LinkIcon } from "lucide-react"

export default function UploadPage() {
  const router = useRouter()
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleYoutubeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!youtubeUrl) return
    
    setIsSubmitting(true)
    try {
        // Mocking YouTube import for now
        const res = await fetch("/api/videos", {
            method: "POST",
            body: JSON.stringify({
                title: "YouTube Video Import",
                url: youtubeUrl,
                duration: 0
            })
        })
        if (res.ok) {
            toast.success("YouTube video imported! Processing started.")
            router.push("/dashboard")
        }
    } catch (error) {
        toast.error("Failed to import YouTube video")
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">New Video</h1>
        <p className="text-gray-400">Upload a file or paste a link to get started.</p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
          <TabsTrigger value="upload" className="data-[state=active]:bg-purple-600">
            <Upload className="mr-2 h-4 w-4" />
            File Upload
          </TabsTrigger>
          <TabsTrigger value="youtube" className="data-[state=active]:bg-purple-600">
            <Video className="mr-2 h-4 w-4" />
            YouTube Link
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-6">
          <Card className="bg-white/5 border-white/10 border-dashed border-2">
            <CardContent className="pt-10 pb-10">
              <UploadDropzone
                endpoint="videoUploader"
                onClientUploadComplete={async (res) => {
                  if (res?.[0]) {
                    await fetch("/api/videos", {
                        method: "POST",
                        body: JSON.stringify({
                            title: res[0].name,
                            url: res[0].url,
                            duration: 0
                        })
                    })
                    toast.success("Upload complete! Processing started.")
                    router.push("/dashboard")
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Upload failed: ${error.message}`)
                }}
                className="ut-label:text-purple-400 ut-button:bg-purple-600 ut-allowed-content:text-gray-500"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="youtube" className="mt-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg">Import from YouTube</CardTitle>
              <CardDescription className="text-gray-400">Paste the URL of the video you want to clip.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleYoutubeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-white">YouTube URL</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input 
                        id="url" 
                        placeholder="https://youtube.com/watch?v=..." 
                        className="bg-white/5 border-white/10 text-white pl-10"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                      />
                    </div>
                    <Button disabled={isSubmitting || !youtubeUrl} type="submit" className="bg-purple-600 hover:bg-purple-700">
                        {isSubmitting ? "Importing..." : "Import"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureInfo title="Up to 128MB" description="Free plan supports files up to 128MB." />
        <FeatureInfo title="AI Moments" description="We automatically find the best clips for you." />
        <FeatureInfo title="9:16 Optimized" description="All clips are automatically reframed for mobile." />
      </div>
    </div>
  )
}

function FeatureInfo({ title, description }: { title: string, description: string }) {
    return (
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="text-sm font-semibold text-white">{title}</h4>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
    )
}
