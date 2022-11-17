// testing with context and a custom render method
// 💯 add a test for the dark theme
// http://localhost:3000/easy-button

import { render, screen } from '@testing-library/react'
import * as React from 'react'
import EasyButton from '../../components/easy-button'
import { ThemeProvider } from '../../components/theme'

test('renders with the light styles for the light theme', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme="light">{children}</ThemeProvider>
  )
  render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper })
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the dark styles for the dark theme', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
  )
  render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper })
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})
