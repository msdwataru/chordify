'use client'
import { useState } from 'react'
import {
  Container,
  TextField,
  IconButton,
  Paper,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import { SearchResults } from '@/components/SearchResults'
import { SearchResponse } from '@/types/searchResponse'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<SearchResponse>({ count: 0, songs: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`http://localhost:8080/api/songs/search?q=${encodeURIComponent(searchQuery)}`)
      if (!response.ok) {
        throw new Error('API request failed')
      }
      const data: SearchResponse = await response.json()
      setResults(data)
    } catch (err) {
      setError('検索中にエラーが発生しました。もう一度お試しください。')
      console.error('Search error:', err)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 8,
          pb: 4,
        }}
      >
        {/* ロゴとタイトル */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <MusicNoteIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            Chordify
          </Typography>
        </Box>

        {/* 説明文 */}
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          お気に入りの曲のコードと歌詞を検索して、
          <br />
          自動スクロールで快適な演奏を
        </Typography>

        {/* 検索フォーム */}
        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={{
            width: '100%',
            maxWidth: 600,
            p: 2,
            boxShadow: 3,
          }}
        >
          <TextField
            fullWidth
            placeholder="曲のタイトルを入力..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* 検索結果 */}
        <Box sx={{ mt: 4, width: '100%', maxWidth: 600 }}>
          <SearchResults
            results={results.songs}
            isLoading={isLoading}
            error={error}
            totalCount={results.count}
          />
        </Box>
      </Box>
    </Container>
  )
}