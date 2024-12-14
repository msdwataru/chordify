import { useState, useEffect } from 'react'
import { Song } from '@/types/song'

export const useAutoScroll = (song: Song | null) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentMeasure, setCurrentMeasure] = useState(1)

  useEffect(() => {
    if (!isPlaying || !song) return

    const interval = setInterval(() => {
      setCurrentMeasure(prev => {
        const next = prev + 1
        if (next > (song.measures?.length || 0)) {
          setIsPlaying(false)
          return 1
        }
        return next
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isPlaying, song])

  return {
    isPlaying,
    setIsPlaying,
    currentMeasure,
    setCurrentMeasure
  }
}
