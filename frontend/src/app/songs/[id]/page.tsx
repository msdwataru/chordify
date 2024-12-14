'use client'
import { useEffect, useState, useRef } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { Song } from '@/types/song'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import { SectionDisplay } from '@/components/song/SectionDisplay'
import { chunk } from '@/utils/util'
import { MeasureRow } from '@/components/song/MeasureRow'

export default function SongPage({ params }: { params: { id: string } }) {
  const BASE_SCROLL_AMOUNT = 10 // 基本スクロール量
  const BASE_SCROLL_INTERVAL = 100 // 基本インターバル時間（0.2秒）
  const DEFAULT_SCROLL_SPEED = 10

  const [song, setSong] = useState<Song | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [measuresPerRow, setMeasuresPerRow] = useState<number>(2)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState<number>(DEFAULT_SCROLL_SPEED)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()


  // 自動スクロール機能
  const handleAutoScroll = () => {
    setIsAutoScrolling(prev => !prev)
  }

  // スクロール位置をチェックする関数
  const isScrolledToBottom = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    return documentHeight - (scrollTop + windowHeight) < BASE_SCROLL_AMOUNT
  } 

  useEffect(() => {
    if (isAutoScrolling) {
      autoScrollIntervalRef.current = setInterval(() => {
        window.scrollBy({
          top: BASE_SCROLL_AMOUNT * scrollSpeed / DEFAULT_SCROLL_SPEED,
          behavior: 'smooth'
        })

        if (isScrolledToBottom()) {
          setIsAutoScrolling(false)
          if (autoScrollIntervalRef.current) {
            clearInterval(autoScrollIntervalRef.current)
            autoScrollIntervalRef.current = null
          }
        }
      }, BASE_SCROLL_INTERVAL)
    } else {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
        autoScrollIntervalRef.current = null
      }
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
    }
  }, [isAutoScrolling, scrollSpeed])

  // クリックハンドラー
  const handleContentClick = (e: React.MouseEvent) => {
    if (
      e.target instanceof HTMLButtonElement ||
      e.target instanceof HTMLSelectElement ||
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('.MuiSelect-root')
    ) {
      return
    }
    handleAutoScroll()
  }
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/songs/${params.id}`)
        if (!response.ok) {
          throw new Error('曲の取得に失敗しました')
        }
        const data = await response.json()
        setSong(data)
      } catch (err) {
        setError('曲の情報の取得中にエラーが発生しました。')
        console.error('Fetch error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSong()
  }, [params.id])

  if (isLoading) {
    return <Container maxWidth="md"><Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box></Container>
  }

  if (error) {
    return <Container maxWidth="md"><Box sx={{ mt: 4 }}><Typography color="error">{error}</Typography></Box></Container>
  }

  if (!song) {
    return <Container maxWidth="md"><Box sx={{ mt: 4 }}><Typography>曲が見つかりませんでした。</Typography></Box></Container>
  }

  return (
    <Container maxWidth="md">
      <Box 
        sx={{ py: 4 }} 
        onClick={handleContentClick}
        ref={containerRef}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 4 }}
        >
          戻る
        </Button>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {song.title}
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            gutterBottom
            sx={{ mb: 3 }}
          >
            {song.artist}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>1行あたりの小節数</InputLabel>
              <Select
                value={measuresPerRow}
                label="1行あたりの小節数"
                onChange={(e) => setMeasuresPerRow(Number(e.target.value))}
              >
                <MenuItem value={1}>1小節</MenuItem>
                <MenuItem value={2}>2小節</MenuItem>
                <MenuItem value={4}>4小節</MenuItem>
                <MenuItem value={8}>8小節</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>スクロール速度</InputLabel>
              <Select
                value={scrollSpeed}
                label="スクロール速度"
                onChange={(e) => setScrollSpeed(Number(e.target.value))}
              >
                {[...Array(21)].map((_, i) => (
                  <MenuItem key={i} value={i}>
                    {i === 0 ? '停止' : `${i}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 3 }} />

          {song.sections && song.sections.length > 0 ? (
            <Box sx={{ mt: 4 }}>
              {song.sections.map(section => (
                <SectionDisplay 
                  key={section.id} 
                  section={section} 
                  measures={song.measures || []} 
                  measuresPerRow={measuresPerRow}
                />
              ))}
            </Box>
          ) : song.measures && song.measures.length > 0 ? (
            <Box sx={{ mt: 4 }}>
              {chunk(song.measures.sort((a, b) => a.measure_number - b.measure_number), measuresPerRow)
                .map((rowMeasures, index) => (
                  <MeasureRow key={index} measures={rowMeasures} />
                ))}
            </Box>
          ) : (
            <Typography sx={{ mt: 4 }} color="text.secondary">
              歌詞とコードが登録されていません
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  )
}
