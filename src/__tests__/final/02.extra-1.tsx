// simple test with React Testing Library
// 💯 use @testing-library/jest-dom
// http://localhost:3000/counter

import { fireEvent, render } from '@testing-library/react'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const { container } = render(<Counter />)
  const [decrement, increment] = container.querySelectorAll('button')
  const message = (container.firstChild as HTMLElement).querySelector('div')

  expect(message).toHaveTextContent('Current count: 0')
  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
