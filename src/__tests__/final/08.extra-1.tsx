// testing custom hooks
// 💯 fake component
// http://localhost:3000/counter-hook

import { act, render } from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  let result: ReturnType<typeof useCounter> | undefined
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result?.count).toBe(0)
  act(() => result?.increment())
  expect(result?.count).toBe(1)
  act(() => result?.decrement())
  expect(result?.count).toBe(0)
})
