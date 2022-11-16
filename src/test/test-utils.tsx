import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from 'components/theme'
import * as React from 'react'
import { RenderOptions, TMockedGetCurrentPositionCb } from 'types'

function render(ui: React.ReactElement, { theme = 'light', ...options }: RenderOptions = {}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
// override React Testing Library's render with our own
export { render }

export const mockNavigatorGeolocation = () => {
  const getCurrentPositionMock = jest.fn() as jest.Mock<Geolocation['getCurrentPosition'], TMockedGetCurrentPositionCb>
  const clearWatchMock = jest.fn() as jest.Mock<Geolocation['clearWatch'], []>
  const watchPositionMock = jest.fn() as jest.Mock<Geolocation['watchPosition'], []>

  const geolocation = {
    clearWatch: clearWatchMock,
    getCurrentPosition: getCurrentPositionMock,
    watchPosition: watchPositionMock,
  };

  Object.defineProperty(global.navigator, 'geolocation', {
    value: geolocation,
    writable: true,
    configurable: true,
  });

  return { clearWatchMock, getCurrentPositionMock, watchPositionMock };
};
