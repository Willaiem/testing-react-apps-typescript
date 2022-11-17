// testing with context and a custom render method
// 💯 create a custom render method
// http://localhost:3000/easy-button

import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { RenderOptions } from 'types'
import EasyButton from '../../components/easy-button'
import { ThemeProvider } from '../../components/theme'

function renderWithProviders(ui: React.ReactElement, { theme = 'light', ...options }: RenderOptions = {}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )
  return render(ui, { wrapper: Wrapper, ...options })
}

test('renders with the light styles for the light theme', () => {
  renderWithProviders(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the dark styles for the dark theme', () => {
  renderWithProviders(<EasyButton>Easy</EasyButton>, {
    theme: 'dark',
  })
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})
