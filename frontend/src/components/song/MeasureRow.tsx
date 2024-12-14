import { Box } from '@mui/material'
import { Measure } from '@/types/song'
import { MeasureDisplay } from './MeasureDisplay'

export const MeasureRow = ({ measures }: { measures: Measure[] }) => (
    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${measures.length}, 1fr)`,
        gap: 2,
        mb: 2,
        width: '100%',
      }}
    >
      {measures.map(measure => (
        <Box key={measure.id}>
          <MeasureDisplay measure={measure} />
        </Box>
      ))}
    </Box>
  )
