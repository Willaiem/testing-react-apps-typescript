// http://localhost:3000/counter-hook

import useCounter from '../components/use-counter'

function Counter() {
  const { count, increment, decrement } = useCounter()
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default Counter
