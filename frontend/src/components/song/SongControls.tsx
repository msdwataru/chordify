// src/components/song/SongControls.tsx
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { THEME_COLOR } from '@/themes/colors'

interface SongControlsProps {
  measuresPerRow: number
  setMeasuresPerRow: (value: number) => void
  isPlaying: boolean
  setIsPlaying: (value: boolean) => void
}

export const SongControls = ({ 
  measuresPerRow, 
  setMeasuresPerRow, 
  isPlaying, 
  setIsPlaying 
}: SongControlsProps) => (
  <Box 
    sx={{ 
      display: 'flex', 
      gap: 2, 
      alignItems: 'center',
      bgcolor: 'white',
      py: 1,
      px: 2,
      borderRadius: 1,
      boxShadow: 1
    }}
  >
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel>小節数/行</InputLabel>
      <Select
        value={measuresPerRow}
        label="小節数/行"
        onChange={(e) => setMeasuresPerRow(Number(e.target.value))}
      >
        <MenuItem value={1}>1小節</MenuItem>
        <MenuItem value={2}>2小節</MenuItem>
        <MenuItem value={4}>4小節</MenuItem>
        <MenuItem value={8}>8小節</MenuItem>
      </Select>
    </FormControl>
    <Button
      variant="contained"
      onClick={() => setIsPlaying(!isPlaying)}
      sx={{
        bgcolor: isPlaying ? THEME_COLOR.accent : THEME_COLOR.primary,
        '&:hover': {
          bgcolor: isPlaying ? '#0873C2' : '#1E272E'
        }
      }}
    >
      {isPlaying ? '停止' : '再生'}
    </Button>
  </Box>
)