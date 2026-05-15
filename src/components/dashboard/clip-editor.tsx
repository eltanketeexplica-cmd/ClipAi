"use client"

import React, { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Type, Palette, Layout } from "lucide-react"

interface SubtitleStyle {
  fontSize: number
  color: string
  position: 'top' | 'middle' | 'bottom'
  fontFamily: string
}

export function ClipEditor({ 
  duration, 
  startTime, 
  endTime, 
  onTimeChange 
}: { 
  duration: number
  startTime: number
  endTime: number
  onTimeChange: (start: number, end: number) => void
}) {
  const [style, setStyle] = useState<SubtitleStyle>({
    fontSize: 24,
    color: "#FFFFFF",
    position: 'bottom',
    fontFamily: "Inter"
  })

  return (
    <div className="space-y-6 bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <Label className="text-white flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Timeline Trimmer
            </Label>
            <span className="text-xs text-gray-400">
                {startTime.toFixed(1)}s - {endTime.toFixed(1)}s
            </span>
        </div>
        <Slider 
          defaultValue={[startTime, endTime]} 
          max={duration} 
          step={0.1}
          onValueChange={(vals: any) => onTimeChange(vals[0], vals[1])}
          className="py-4"
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-white/10">
        <Label className="text-white flex items-center gap-2">
            <Type className="h-4 w-4" />
            Caption Style
        </Label>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label className="text-[10px] text-gray-500 uppercase">Font Size</Label>
                <Slider 
                    value={[style.fontSize]} 
                    max={72} 
                    min={12} 
                    onValueChange={(vals: any) => setStyle({...style, fontSize: vals[0]})} 
                />
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] text-gray-500 uppercase">Position</Label>
                <div className="flex gap-1">
                    {(['top', 'middle', 'bottom'] as const).map((pos) => (
                        <Button 
                            key={pos}
                            size="sm" 
                            variant={style.position === pos ? "default" : "outline"}
                            className="text-[10px] flex-1 h-7 border-white/10"
                            onClick={() => setStyle({...style, position: pos})}
                        >
                            {pos}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/10">
        <Label className="text-white flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Color Palette
        </Label>
        <div className="flex gap-2">
            {["#FFFFFF", "#FACC15", "#4ADE80", "#F87171", "#60A5FA"].map((color) => (
                <button 
                    key={color}
                    className={`h-6 w-6 rounded-full border-2 ${style.color === color ? 'border-purple-500' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setStyle({...style, color})}
                />
            ))}
        </div>
      </div>
    </div>
  )
}
