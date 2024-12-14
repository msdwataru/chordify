// src/components/common/Header.tsx
import { Box, Container, AppBar, Toolbar } from '@mui/material'
import { THEME_COLOR } from '@/themes/colors'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => (
  <AppBar 
    position="fixed" 
    elevation={0}
    sx={{ 
      bgcolor: '#1A1A1A',
      borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
    }}
  >
    <Container maxWidth="lg">
      <Toolbar sx={{ px: { xs: 0 } }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Image
            src="/logo.svg"
            alt="Chordify Logo"
            width={140}
            height={32}
            style={{
              animation: 'pulse 2s infinite ease-in-out',
            }}
          />
        </Link>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </Container>
  </AppBar>
)

// グローバルスタイルとしてアニメーションを追加
const globalStyles = `
  @keyframes pulse {
    0% { opacity: 0.6 }
    50% { opacity: 1 }
    100% { opacity: 0.6 }
  }
`

export default Header