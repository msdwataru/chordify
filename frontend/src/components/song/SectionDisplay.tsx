import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Section, Measure } from '@/types/song'
import { chunk } from '@/utils/util'
import { MeasureRow } from './MeasureRow'

export const SectionDisplay = ({ 
    section, 
    measures, 
    measuresPerRow 
  }: { 
    section: Section; 
    measures: Measure[]; 
    measuresPerRow: number;
  }) => {
    const sectionMeasures = measures
      .filter(m => m.measure_number >= section.start_measure && m.measure_number <= section.end_measure)
      .sort((a, b) => a.measure_number - b.measure_number)
  
    const measureRows = chunk(sectionMeasures, measuresPerRow)
  
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
            {measureRows.map((rowMeasures, index) => (
              <MeasureRow key={index} measures={rowMeasures} />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    )
  }