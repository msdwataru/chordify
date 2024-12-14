'use client'
import { useEffect, useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material'
import { Song, Section, Measure } from '@/types/song'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useRouter } from 'next/navigation'

// コードダイアグラムコンポーネント
const ChordDiagram = ({ chord }: { chord: string }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mr: 2,
      minWidth: '80px',
    }}
  >
    <Typography 
      sx={{ 
        fontSize: '1rem',
        fontWeight: 'bold',
        mb: 0.5,
      }}
    >
      {chord}
    </Typography>
    <Box
      component="img"
      src={`/chord-diagrams/${chord}.svg`}
      alt={`${chord} chord`}
      sx={{
        width: '80px',
        height: '100px',
      }}
    />
  </Box>
)

// 小節コンポーネント
const MeasureDisplay = ({ measure }: { measure: Measure }) => {
  const chords = measure.chords.split(' ')
  
  return (
    <Box sx={{ mb: 3 }}>
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          }
        }}
      >
        <Typography 
          variant="subtitle2" 
          color="text.secondary" 
          sx={{ mb: 2 }}
        >
          小節 {measure.measure_number}
        </Typography>
        
        {/* コードダイアグラムの表示 */}
        <Box 
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            mb: 2,
            gap: 2,
          }}
        >
          {chords.map((chord, index) => (
            <ChordDiagram key={index} chord={chord} />
          ))}
        </Box>

        {/* 歌詞の表示 */}
        <Box sx={{ mt: 2 }}>
          <Typography 
            sx={{ 
              color: '#d32f2f', // 赤色の歌詞
              fontSize: '1.2rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}
          >
            {measure.lyrics}
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

// セクションコンポーネント
const SectionDisplay = ({ section, measures }: { section: Section; measures: Measure[] }) => {
  const sectionMeasures = measures.filter(
    m => m.measure_number >= section.start_measure && m.measure_number <= section.end_measure
  ).sort((a, b) => a.measure_number - b.measure_number)

  return (
    <Accordion defaultExpanded sx={{ mb: 2 }}>
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon />}
        sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          '&.Mui-expanded': {
            minHeight: '48px',
          }
        }}
      >
        <Typography variant="h6">{section.section_name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mt: 2 }}>
          {sectionMeasures.map(measure => (
            <MeasureDisplay key={measure.id} measure={measure} />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default function SongPage({ params }: { params: { id: string } }) {
  const [song, setSong] = useState<Song | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const router = useRouter()

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
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    )
  }

  if (!song) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography>曲が見つかりませんでした。</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
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

          <Divider sx={{ my: 3 }} />

          {song.sections && song.sections.length > 0 ? (
            <Box sx={{ mt: 4 }}>
              {song.sections.map(section => (
                <SectionDisplay 
                  key={section.id} 
                  section={section} 
                  measures={song.measures || []} 
                />
              ))}
            </Box>
          ) : song.measures && song.measures.length > 0 ? (
            <Box sx={{ mt: 4 }}>
              {song.measures
                .sort((a, b) => a.measure_number - b.measure_number)
                .map(measure => (
                  <MeasureDisplay key={measure.id} measure={measure} />
                ))
              }
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