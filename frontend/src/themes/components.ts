// src/themes/components.ts
import { THEME_COLOR } from './colors'

export const commonStyles = {
    container: {
      main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: { xs: 4, sm: 6 }, // 下部のパディングもレスポンシブに
      }
    },
    logo: {
      wrapper: {
        display: 'flex',
      alignItems: 'center',
      mb: 4,
    },
    icon: {
      fontSize: 48,
      color: THEME_COLOR.accent,
      mr: 2,
    },
    text: {
      fontWeight: 'bold',
      color: THEME_COLOR.primary,
    },
  },
  description: {
    mb: 4,
    textAlign: 'center',
    color: THEME_COLOR.secondary,
    lineHeight: 1.8,
  },
  searchForm: {
    wrapper: {
      width: '100%',
      maxWidth: 600,
      p: 2,
      bgcolor: 'white',
      borderRadius: 2,
    },
  },
  results: {
    wrapper: {
      width: '100%',
      mt: 4,
    },
  },
}