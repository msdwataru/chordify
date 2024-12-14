import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { Song } from '@/types/song'

interface SearchResultsProps {
    results: Song[]
    isLoading: boolean
    error: string
    totalCount: number
  }

export const SearchResults = ({ results, isLoading, error }: SearchResultsProps) => {
    if (isLoading) {
    return (
      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography>検索中...</Typography>
      </Paper>
    )
  }

  if (error) {
    return (
      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    )
  }

  if (results.length === 0) {
    return (
      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography>検索結果がありません</Typography>
      </Paper>
    )
  }

  return (
    <Paper sx={{ mt: 2 }}>
      <List>
        {results.map((song) => (
          <ListItem
            key={song.id}
            button
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              },
            }}
          >
            <ListItemText
              primary={song.title}
              secondary={song.artist}
              primaryTypographyProps={{
                fontWeight: 'medium',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
