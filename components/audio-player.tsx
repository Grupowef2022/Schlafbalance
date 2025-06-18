"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react"

interface Track {
  id: number
  title: string
  duration: string
}

interface AudioPlayerProps {
  tracks: Track[]
}

export function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([70])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Simular duração em segundos baseado na string de duração
  const parseDuration = (durationStr: string) => {
    const parts = durationStr.split(":")
    if (parts.length === 2) {
      return Number.parseInt(parts[0]) * 60 + Number.parseInt(parts[1])
    }
    return 180 // 3 minutos padrão
  }

  useEffect(() => {
    if (tracks[currentTrack]) {
      setDuration(parseDuration(tracks[currentTrack].duration))
      setCurrentTime(0)
    }
  }, [currentTrack, tracks])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            handleNext()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, duration])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setCurrentTime(0)
  }

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setCurrentTime(0)
  }

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
  }

  if (!tracks[currentTrack]) {
    return <div>Keine Tracks verfügbar</div>
  }

  return (
    <div className="space-y-4">
      <Card className="border-purple-100">
        <CardContent className="p-4">
          <div className="text-center mb-4">
            <h3 className="font-medium">{tracks[currentTrack]?.title}</h3>
            <p className="text-sm text-gray-500">{tracks[currentTrack]?.duration}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <Slider value={[currentTime]} onValueChange={handleSeek} max={duration} step={1} className="mb-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <Button variant="outline" size="icon" onClick={handlePrevious}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-12 w-12 bg-purple-600 hover:bg-purple-700" onClick={handlePlayPause}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-gray-500" />
            <Slider value={volume} onValueChange={handleVolumeChange} max={100} step={1} className="flex-1" />
            <span className="text-sm text-gray-500 w-8">{volume[0]}%</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Playlist</h3>
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
              index === currentTrack ? "border-purple-300 bg-purple-50" : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => {
              setCurrentTrack(index)
              setCurrentTime(0)
            }}
          >
            <div>
              <p className="font-medium text-sm">{track.title}</p>
              <p className="text-xs text-gray-500">{track.duration}</p>
            </div>
            {index === currentTrack && (
              <div className="flex items-center gap-1">
                {isPlaying ? (
                  <>
                    <div className="w-1 h-3 bg-purple-600 rounded animate-pulse"></div>
                    <div className="w-1 h-2 bg-purple-600 rounded animate-pulse delay-75"></div>
                    <div className="w-1 h-4 bg-purple-600 rounded animate-pulse delay-150"></div>
                  </>
                ) : (
                  <div className="w-4 h-4 border-2 border-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Audio element for future real audio implementation */}
      <audio
        ref={audioRef}
        style={{ display: "none" }}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(Math.floor(audioRef.current.currentTime))
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(Math.floor(audioRef.current.duration))
          }
        }}
        onEnded={handleNext}
      />

      {/* Notification for demo */}
      {isPlaying && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-3">
            <p className="text-sm text-blue-800 text-center">
              🎵 <strong>Demo-Modus:</strong> Musik wird simuliert. In der vollständigen Version würden hier echte
              Audiodateien abgespielt.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
