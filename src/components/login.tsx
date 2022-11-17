// http://localhost:3000/login

import React from "react"
import { User } from "types"

type Props = {
  onSubmit?: (user: User) => void
}

function Login({ onSubmit }: Props) {
  const formRef = React.useRef<HTMLFormElement>(null)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const form = new FormData(formRef.current ?? undefined)

    const username = (form.get('username') ?? '').toString()
    const password = (form.get('password') ?? '').toString()

    if (!onSubmit) {
      console.table({ username, password })
      return
    }

    onSubmit({
      username,
      password,
    })
  }
  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div>
        <label htmlFor="username-field">Username</label>
        <input id="username-field" name="username" type="text" />
      </div>
      <div>
        <label htmlFor="password-field">Password</label>
        <input id="password-field" name="password" type="password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default Login
