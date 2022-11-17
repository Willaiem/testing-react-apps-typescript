// mocking Browser APIs and modules
// http://localhost:3000/location

import { act, render, screen } from '@testing-library/react'
import { mockNavigatorGeolocation } from 'test/test-utils'
import { Rejector, Resolver } from 'types'
import Location from '../../examples/location'

beforeAll(() => {
  mockNavigatorGeolocation()
})

function deferred() {
  let resolve: Resolver | undefined
  let reject: Rejector | undefined
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }
  const { promise, resolve } = deferred()

  const { getCurrentPositionMock } = mockNavigatorGeolocation()
  getCurrentPositionMock.mockImplementation(onSuccess => promise.then(() => onSuccess(
    fakePosition as GeolocationPosition
  )))

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(async () => {
    resolve?.(undefined)
    await promise
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})
