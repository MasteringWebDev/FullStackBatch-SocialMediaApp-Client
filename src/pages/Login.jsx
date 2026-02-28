import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
import axios from 'axios'

function Login({ setCurrentUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function loginUser() {
    try {
      const API_URL = import.meta.env.VITE_API_URL
      const res = await axios.post(`${API_URL}/users/signin`, {
        email,
        password
      })
      setCurrentUser(res.data.user)

      // Alert
      const { fullName } = res.data.user
      alert(`Welcome, ${fullName}!`)

      // Reset
      setEmail('')
      setPassword('')

      // Navigate to LandingPage
      navigate('/')
    } catch (error) {
      console.log({...error})
      if(error.response.status == 401) {
        alert('Invalid credentials')
        return
      }
      alert('Something went wrong')
      console.log('Something went wrong', error)
    }
  }

  return (
    <div>
      <h1 className="display-4">Login</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email"
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
          />
        </Form.Group>
        <Button variant="dark" type="button" onClick={loginUser}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;