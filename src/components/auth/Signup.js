import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Layout from "../../core/Layout"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { makeRequest } from "../../service/makeRequest"
import { isAuth } from "../../helpers/helpers"

const Signup = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    buttonText: 'Submit'
  }

  const [formSignUp, setFormSignUp] = useState(initialState)

  const { name, email, password, buttonText } = formSignUp

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormSignUp(prevForm => {
      return {
        ...prevForm,
        [name]: value
      }
    })
  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    setFormSignUp(prevForm => {
      return {
        ...prevForm,
        buttonText: 'Submitting'
      }
    })
    makeRequest('/signup', {
      method: 'POST',
      data: { name, email, password }
    }).then((data) => {
      setFormSignUp(prevForm => ({ ...prevForm, buttonText: 'Submitted' }))
      toast.success('SIGNUP SUCCESS', data.message)
    }).catch((err) => {
      toast.error('SIGNUP ERROR', err)
    }).finally(() => {
      setFormSignUp(initialState)
    })

  }

  const signupForm = () => (
    <Form onSubmit={handelSubmit}>
      <FormGroup>
        <FormLabel className="text-muted">Name</FormLabel>
        <FormControl placeholder="Enter name" name="name" onChange={handleChange} type="text" value={name} />
      </FormGroup>
      <FormGroup>
        <FormLabel className="text-muted">Email</FormLabel>
        <FormControl placeholder="Enter email" name="email" onChange={handleChange} type="email" value={email} />
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel className="text-muted">Password</FormLabel>
        <FormControl placeholder="Enter password" name="password" onChange={handleChange} type="password" value={password} />
      </FormGroup>
      <Button variant="primary" type="submit">{buttonText}</Button>
    </Form>
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth()) {
      navigate('/', { replace: true })
    }

  }, [navigate])

  return (
    <Layout>
      <div className="col-d-6">
        <ToastContainer />
        <h1 className="p-5 text-center">Signup</h1>
        {signupForm()}
        <br />
        <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
          Forgot Password
        </Link>
      </div>
    </Layout>
  )
}

export default Signup