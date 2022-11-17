// this one doesn't really make sense to render on its own, so don't bother.

import * as React from 'react'
import { ThemeColors } from 'types'

type TThemeContext = [ThemeColors, React.Dispatch<React.SetStateAction<ThemeColors>>] | null

const ThemeContext = React.createContext<TThemeContext>(null)

function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme should be used within a ThemeProvider')
  }
  return context
}

type Props = {
  initialTheme?: ThemeColors
  children: React.ReactNode
}

function ThemeProvider({ initialTheme = 'light', ...props }: Props) {
  const [theme, setTheme] = React.useState(initialTheme)
  return <ThemeContext.Provider value={[theme, setTheme]} {...props} />
}

export { useTheme, ThemeProvider }
