// mocking Browser APIs and modules
// 💯 mock the module
// http://localhost:3000/location

import { act, render, screen } from '@testing-library/react'
import * as React from 'react'
import ReactUseGeolocation from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation', (): typeof ReactUseGeolocation => ({
  useCurrentPosition: jest.fn()
}))
const mockedUseCurrentPosition = jest.mocked(ReactUseGeolocation).useCurrentPosition

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }

  let setReturnValue: React.Dispatch<[{
    coords: {
      latitude: number;
      longitude: number;
    };
  }] | []>

  function useMockCurrentPosition() {
    const state = React.useState<[typeof fakePosition] | []>([])
    setReturnValue = state[1]
    return state[0]
  }
  mockedUseCurrentPosition.mockImplementation(() => {
    const [position] = useMockCurrentPosition()
    return [position as GeolocationPosition, undefined]
  })

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})
