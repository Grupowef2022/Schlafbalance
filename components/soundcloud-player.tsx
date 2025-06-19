"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { SkipForward, SkipBack, Volume2, Clock } from "lucide-react"

declare global {
  interface Window {
    SC: any
  }
}

interface SoundCloudTrack {
  id: string
  title: string
  url: string
  embedUrl: string
  duration: string
  category: string
}

interface SoundCloudPlayerProps {
  category: "lullabies" | "white-noise"
}

export function SoundCloudPlayer({ category }: SoundCloudPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([70])

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<any>(null)

  useEffect(() => {
    if (iframeRef.current) {
      // Carregar a API do SoundCloud Widget
      const script = document.createElement("script")
      script.src = "https://w.soundcloud.com/player/api.js"
      script.onload = () => {
        if (window.SC) {
          widgetRef.current = window.SC.Widget(iframeRef.current)
          widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
            // Widget está pronto
            widgetRef.current.setVolume(volume[0])
          })
        }
      }
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [currentTrack, volume])

  // Dados reais do SoundCloud organizados
  const lullabies: SoundCloudTrack[] = [
    {
      id: "1",
      title: "Air on the G String",
      url: "https://soundcloud.com/musicadeninar-music/air-on-the-g-string",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/musicadeninar-music/air-on-the-g-string&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "3:24",
      category: "classical",
    },
    {
      id: "2",
      title: "Piano para Dormir",
      url: "https://soundcloud.com/musicadeninar-music/piano-para-dormir",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/musicadeninar-music/piano-para-dormir&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "4:15",
      category: "piano",
    },
    {
      id: "3",
      title: "Música Calma para Dormir",
      url: "https://soundcloud.com/musicadeninar-music/musica-calma-para-dormir",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/musicadeninar-music/musica-calma-para-dormir&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "5:30",
      category: "ambient",
    },
    {
      id: "4",
      title: "Baa Baa Black Sheep",
      url: "https://soundcloud.com/musicadeninar-music/baa-baa",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/musicadeninar-music/baa-baa&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "2:45",
      category: "traditional",
    },
    {
      id: "5",
      title: "Row Row Row Your Boat",
      url: "https://soundcloud.com/babysleepcorner/row-row-row-your-boat",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/babysleepcorner/row-row-row-your-boat&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "2:30",
      category: "traditional",
    },
    {
      id: "6",
      title: "Itsy Bitsy Spider",
      url: "https://soundcloud.com/babysleepaid/itsy-bitsy-spider",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/babysleepaid/itsy-bitsy-spider&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "2:15",
      category: "traditional",
    },
    {
      id: "7",
      title: "London Bridge is Falling Down",
      url: "https://soundcloud.com/lullabybabys/london-bridge-is-falling-down",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/lullabybabys/london-bridge-is-falling-down&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "2:50",
      category: "traditional",
    },
    {
      id: "8",
      title: "Vale Verde",
      url: "https://soundcloud.com/musicadeninar-music/vale-verde",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/musicadeninar-music/vale-verde&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "4:20",
      category: "ambient",
    },
  ]

  const whiteNoise: SoundCloudTrack[] = [
    {
      id: "1",
      title: "First Class Sleeping Quarters - Airplane White Noise",
      url: "https://soundcloud.com/relaxing-white-noise/first-class-sleeping-quarters-sleep-to-airplane-white-noise-75-minutes",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/relaxing-white-noise/first-class-sleeping-quarters-sleep-to-airplane-white-noise-75-minutes&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "75:00",
      category: "airplane",
    },
    {
      id: "2",
      title: "Baby Sleep Sound - Cólica Relief",
      url: "https://soundcloud.com/relaxing-white-noise/colicky-baby-sleep-sound-75-minutes",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/relaxing-white-noise/colicky-baby-sleep-sound-75-minutes&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "75:00",
      category: "baby",
    },
    {
      id: "3",
      title: "Fan Noise for Sleeping",
      url: "https://soundcloud.com/relaxing-white-noise/fan-noise-for-sleeping",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/relaxing-white-noise/fan-noise-for-sleeping&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "75:00",
      category: "fan",
    },
    {
      id: "4",
      title: "Air Conditioner White Noise",
      url: "https://soundcloud.com/relaxing-white-noise/air-conditioner-white-noise",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/relaxing-white-noise/air-conditioner-white-noise&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "75:00",
      category: "appliance",
    },
    {
      id: "5",
      title: "Baby White Noise - Hairdryer",
      url: "https://soundcloud.com/relaxing-white-noise/baby-white-noise-hairdryer",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/relaxing-white-noise/baby-white-noise-hairdryer&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "75:00",
      category: "baby",
    },
    {
      id: "6",
      title: "Rain for Sleep (No Thunder)",
      url: "https://soundcloud.com/relaxing-white-noise/rain-for-sleep-or-relaxation-no-thunder-white-noise-75-minutes",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/relaxing-white-noise/rain-for-sleep-or-relaxation-no-thunder-white-noise-75-minutes&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "75:00",
      category: "rain",
    },
    {
      id: "7",
      title: "Thunderstorm with Rain",
      url: "https://soundcloud.com/relaxing-white-noise/relaxing-sounds-of-rain-thunderstorm-white-noise-for-sleeping-studying-or-stress-75-minutes",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/relaxing-white-noise/relaxing-sounds-of-rain-thunderstorm-white-noise-for-sleeping-studying-or-stress-75-minutes&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "75:00",
      category: "rain",
    },
    {
      id: "8",
      title: "Vacuum Cleaner for Babies",
      url: "https://soundcloud.com/relaxing-white-noise/sleep-sounds-for-babies-vacuum-cleaner-white-noise-75-minutes",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/relaxing-white-noise/sleep-sounds-for-babies-vacuum-cleaner-white-noise-75-minutes&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "75:00",
      category: "baby",
    },
    {
      id: "9",
      title: "Ocean Waves",
      url: "https://soundcloud.com/relaxing-white-noise/beach-waves-beautiful-views-75-minutes",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/relaxing-white-noise/beach-waves-beautiful-views-75-minutes&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "75:00",
      category: "water",
    },
    {
      id: "10",
      title: "Celestial White Noise",
      url: "https://soundcloud.com/relaxing-white-noise/celestial-white-noise",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/relaxing-white-noise/celestial-white-noise&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
      duration: "75:00",
      category: "space",
    },
  ]

  const tracks = category === "lullabies" ? lullabies : whiteNoise
  const currentTrackData = tracks[currentTrack]

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
  }

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    if (widgetRef.current) {
      widgetRef.current.setVolume(value[0])
    }
  }

  return (
    <div className="space-y-4">
      {/* Current Track Player */}
      <Card className="border-purple-100 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-purple-800 text-center">{currentTrackData?.title}</CardTitle>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{currentTrackData?.duration}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* SoundCloud Embed */}
          <div className="w-full">
            <iframe
              ref={iframeRef}
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={currentTrackData?.embedUrl}
              className="rounded-xl"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={handlePrevious} className="border-purple-200">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext} className="border-purple-200">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-gray-500" />
            <Slider value={volume} onValueChange={handleVolumeChange} max={100} step={1} className="flex-1" />
            <span className="text-sm text-gray-500 w-8">{volume[0]}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Track List */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">
          {category === "lullabies" ? "Schlaflieder" : "Weißes Rauschen"} ({tracks.length} Tracks)
        </h3>
        <div className="grid gap-2">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                index === currentTrack
                  ? "border-purple-300 bg-purple-50 shadow-md"
                  : "border-gray-200 hover:bg-gray-50 hover:border-purple-200"
              }`}
              onClick={() => setCurrentTrack(index)}
            >
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-800">{track.title}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{track.duration}</span>
                  <span className="capitalize">• {track.category}</span>
                </div>
              </div>
              {index === currentTrack && (
                <div className="flex items-center gap-1 ml-2">
                  <div className="w-1 h-3 bg-purple-600 rounded animate-pulse"></div>
                  <div className="w-1 h-2 bg-purple-600 rounded animate-pulse delay-75"></div>
                  <div className="w-1 h-4 bg-purple-600 rounded animate-pulse delay-150"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
