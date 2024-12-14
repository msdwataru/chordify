// src/components/song/SongHeader.tsx
import { Box, Container, Typography } from '@mui/material'
import { THEME_COLOR } from '@/themes/colors'
import { Song } from '@/types/song'
import { SongControls } from './SongControls'

interface SongHeaderProps {
  song: Song
  measuresPerRow: number
  setMeasuresPerRow: (value: number) => void
  isPlaying: boolean
  setIsPlaying: (value: boolean) => void
}

export const SongHeader = ({ 
  song, 
  measuresPerRow, 
  setMeasuresPerRow, 
  isPlaying, 
  setIsPlaying 
}: SongHeaderProps) => (
  <Box
    sx={{
      position: 'sticky',
      top: '64px', // AppBarの高さ
      bgcolor: THEME_COLOR.background,
      borderBottom: `1px solid ${THEME_COLOR.divider}`,
      zIndex: 900,
      py: 2,
    }}
  >
    <Container maxWidth="lg">
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
      }}>
        <Box>
          <Typography variant="h5" sx={{ color: THEME_COLOR.primary }}>
            {song.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: THEME_COLOR.secondary }}>
            {song.artist}
          </Typography>
        </Box>
        <SongControls
          measuresPerRow={measuresPerRow}
          setMeasuresPerRow={setMeasuresPerRow}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </Box>
    </Container>
  </Box>
)
