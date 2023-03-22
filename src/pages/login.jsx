import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  let url = `http://localhost:5000/api`
  const initialState = {
    email: '',
    password: '',
  }
  const [state, setState] = useState(initialState)

  async function handleSubmit(e) {
    e.preventDefault()
    const config = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(state),
    }
    try {
      const res = await (await fetch(`${url}/auth/user-login`, config)).json()
      localStorage.setItem('tok', res.data.token)
      localStorage.setItem('id', res.data.user.id)
      if (res.data.user.role === 'PATIENT') {
        navigate('/dash')
      } else navigate('/doc/dash')
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='email'
        name='email'
        onChange={(e) => setState({ ...state, email: e.target.value })}
      />
      <input
        placeholder='password'
        name='password'
        type='password'
        onChange={(e) => setState({ ...state, password: e.target.value })}
      />
      <button>login</button>
    </form>
  )
}
