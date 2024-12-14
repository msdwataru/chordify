import { List, ListItem, ListItemText, Paper, Typography, Box, Chip } from '@mui/material'
import { Song } from '@/types/song'
import { useRouter } from 'next/navigation'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

interface SearchResultsProps {
    results: Song[]
    isLoading: boolean
    error: string
    totalCount: number
}

export const SearchResults = ({ results, isLoading, error }: SearchResultsProps) => {
    const router = useRouter()

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

    const handleSongClick = (songId: number) => {
        router.push(`/songs/${songId}`)
    }

    return (
        <Paper sx={{ mt: 2 }}>
            <List>
                {results.map((song) => (
                    <ListItem
                        key={song.id}
                        button
                        onClick={() => handleSongClick(song.id)}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                            },
                            cursor: 'pointer',
                        }}
                    >
                        <ListItemText
                            primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <MusicNoteIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                                    <Typography component="span" fontWeight="medium">
                                        {song.title}
                                    </Typography>
                                    {song.measures && song.measures.length > 0 && (
                                        <Chip
                                            label={`${song.measures.length}小節`}
                                            size="small"
                                            sx={{ ml: 1 }}
                                        />
                                    )}
                                </Box>
                            }
                            secondary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                    <Typography component="span" color="text.secondary">
                                        {song.artist}
                                    </Typography>
                                    {song.sections && song.sections.length > 0 && (
                                        <Typography 
                                            component="span" 
                                            color="text.secondary"
                                            sx={{ fontSize: '0.875rem' }}
                                        >
                                            • {Array.from(new Set(song.sections.map(s => s.section_name))).join(', ')}
                                        </Typography>
                                    )}
                                </Box>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}