import { Paper, Typography, Box } from '@mui/material'
import { ChordDiagram } from './ChordDiagram'
import { Measure } from '@/types/song'

export const MeasureDisplay = ({ measure }: { measure: Measure }) => {
    const chords = measure.chords.split(' ')
    
    return (
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2,
          height: '100%',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          }
        }}
      >
        <Typography 
          variant="subtitle2" 
          color="text.secondary" 
          sx={{ mb: 1 }}
        >
          小節 {measure.measure_number}
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 1,
            gap: 1,
          }}
        >
          {chords.map((chord, index) => (
            <ChordDiagram key={index} chord={chord} />
          ))}
        </Box>
  
        <Box sx={{ mt: 1 }}>
          <Typography 
            sx={{ 
              color: '#d32f2f',
              fontSize: '1.1rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              wordBreak: 'break-word',
            }}
          >
            {measure.lyrics}
          </Typography>
        </Box>
      </Paper>
    )
  }
  