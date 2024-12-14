import { Box, Typography } from '@mui/material'

interface ChordDiagramProps {
  chord: string
}

export const ChordDiagram = ({ chord }: ChordDiagramProps) => (
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
