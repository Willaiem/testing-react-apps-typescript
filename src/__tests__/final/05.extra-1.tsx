// mocking HTTP requests
// 💯 reuse server request handlers
// http://localhost:3000/login-submission

import { build, fake } from '@jackfranklin/test-data-bot'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { handlers } from 'test/server-handlers'
import { User } from 'types'
import Login from '../../components/login-submission'

const buildLoginForm = build<User>({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const { username, password } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByText(username)).toBeInTheDocument()
})
