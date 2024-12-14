// src/app/layout.tsx
'use client'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { THEME_COLOR } from '@/themes/colors'
import Header from '@/components/common/Header'
import { Noto_Sans_JP } from 'next/font/google' // Google Fontsをインポート

// フォントの設定
const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],  // 必要なウェイトを指定
  subsets: ['latin'],
  display: 'swap',
})

// テーマの作成
const theme = createTheme({
  typography: {
    fontFamily: [
      notoSansJP.style.fontFamily,
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    // 各タイポグラフィバリアントのスタイルをカスタマイズ
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: THEME_COLOR.primary,
    },
    secondary: {
      main: THEME_COLOR.secondary,
    },
    background: {
      default: THEME_COLOR.background,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline:before': {
            borderBottom: `1px solid ${THEME_COLOR.divider}`,
          },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: `2px solid ${THEME_COLOR.accent}`,
          },
          '& .MuiInput-underline.Mui-focused:after': {
            borderBottom: `2px solid ${THEME_COLOR.accent}`,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: THEME_COLOR.accent,
          '&:hover': {
            backgroundColor: `${THEME_COLOR.accent}10`,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthMd: {
          maxWidth: '1200px', // ここで希望のmax-widthを設定
          '@media (min-width: 900px)': {
            maxWidth: '1200px', // ここで希望のmax-widthを設定
          },
        },
      },
    },
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ 
            minHeight: '100vh',
            bgcolor: THEME_COLOR.background,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Header />
            <Box 
              component="main" 
              sx={{ 
                flex: 1,
                pt: { xs: 8, sm: 10 }, // ヘッダーとの間隔をレスポンシブに設定
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  )
}