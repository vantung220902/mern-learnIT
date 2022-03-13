import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'
const LoginForm = () => {
  //State
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })
  const [alert, setAlert] = useState(null)
  //Context
  const { loginUser } = useContext(AuthContext)

  const onChangeInput = event => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value
    })
  }
  const onSubmit = async event => {
    event.preventDefault()
    try {
      const response = await loginUser(loginForm)
      if (!response.success) {
        setAlert({
          type: 'danger',
          message: response.message
        })
        setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error)
    }

  }
  const { username, password } = loginForm

  return (
    <>
      <Form className='my-4' onSubmit={onSubmit}>
        <AlertMessage info={alert} />
        <Form.Group className='mb-3'>
          <Form.Control type="text"
            placeholder="Username" name='username'
            value={username}
            onChange={onChangeInput}
            required />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Control type="password" placeholder="Password"
            value={password}
            name='password'
            onChange={onChangeInput}
            required />
        </Form.Group>
        <Button variant="success" type='submit'>
          Login
        </Button>

      </Form>
      <p>
        Don't have an account
        <Link to='/register'>
          <Button variant='info' size='sm' className='ml-2'>
            Register
          </Button>
        </Link>
      </p>
    </>

  )
}

export default LoginForm