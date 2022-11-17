// form testing
// http://localhost:3000/login

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { User } from 'types'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  let submittedData: User | undefined

  const handleSubmit = (data: User) => {
    submittedData = data
  }

  render(<Login onSubmit={handleSubmit} />)
  const username = 'chucknorris'
  const password = 'i need no password'

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  expect(submittedData).toEqual({
    username,
    password,
  })
})
