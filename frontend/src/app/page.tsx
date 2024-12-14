// src/app/page.tsx
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
import { commonStyles } from '@/themes/components'

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
      <Box sx={commonStyles.container.main}>
        {/* メインコンテンツのロゴ */}
        <Box sx={commonStyles.logo.wrapper}>
          <Typography
            variant="h3"
            component="h1"
            sx={commonStyles.logo.text}
          >
            Chordify
          </Typography>
        </Box>

        {/* 説明文 */}
        <Typography
          variant="h6"
          sx={commonStyles.description}
        >
          お気に入りの曲のコードと歌詞を検索して、
          <br />
          自動スクロールで快適な演奏を
        </Typography>

        {/* 検索フォーム */}
        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={commonStyles.searchForm.wrapper}
          elevation={0}
        >
          <TextField
            fullWidth
            placeholder="曲のタイトルを入力..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    type="submit" 
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* 検索結果 */}
        <Box sx={commonStyles.results.wrapper}>
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