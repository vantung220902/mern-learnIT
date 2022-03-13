import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'
const RegisterForm = () => {
    //State
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    })
    const [alert, setAlert] = useState(null)
    //Context
    const { registerUser } = useContext(AuthContext)

    const onChangeInput = event => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value
        })
    }
    const { username, password, confirmPassword } = registerForm
    const onSubmit = async event => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setAlert({
                type: 'danger',
                message: 'Password do not match'
            })
            setTimeout(() => setAlert(null), 5000)
            return
        }
        try {
            const response = await registerUser({ username, password })
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

    return (
        <>
            <Form className='my-4' onSubmit={onSubmit}>
                <AlertMessage info={alert} />
                <Form.Group className='mb-3'>
                    <Form.Control type="text" onChange={onChangeInput}
                        placeholder="Username" name='username' required />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control type="password" onChange={onChangeInput}
                        placeholder="Password" name='password' required />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control type="password" onChange={onChangeInput}
                        placeholder="Confirm Password" name='confirmPassword' required />
                </Form.Group>
                <Button variant="success" type='submit'>
                    Register
                </Button>
            </Form>
            <p>
                Already have an account
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-2'>
                        Login
                    </Button>
                </Link>
            </p>
        </>

    )
}

export default RegisterForm