// http://localhost:3000/counter-hook

import * as React from 'react'

type TUseCounter = {
  initialCount?: number
  step?: number
}

function useCounter({ initialCount = 0, step = 1 }: TUseCounter = {}) {
  const [count, setCount] = React.useState(initialCount)
  const increment = () => setCount(c => c + step)
  const decrement = () => setCount(c => c - step)
  return { count, increment, decrement }
}

export default useCounter
