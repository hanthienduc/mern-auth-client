import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Layout from "../../core/Layout"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { makeRequest } from "../../service/makeRequest"
import { authenticate, isAuth } from "../../helpers/helpers"
import Google from "./Google"
import Facebook from "./Facebook"

const Signin = () => {

  const initialState = {
    email: "",
    password: "",
    buttonText: 'Submit'
  }

  const [formSignIn, setFormSignIn] = useState(initialState)

  const { email, password, buttonText } = formSignIn

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormSignIn(prevForm => {
      return {
        ...prevForm,
        [name]: value
      }
    })
  }

  const informParent = data => {
    authenticate(data, () => {
      isAuth() && isAuth().role === 'admin' ? navigate('/admin') : navigate('/private')
    })
  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    setFormSignIn(prevForm => {
      return {
        ...prevForm,
        buttonText: 'Submitting'
      }
    })
    makeRequest('/signin', {
      method: 'POST',
      data: { email, password }
    }).then((data) => {
      console.log('SIGNIN SUCCESS', data)
      // save the response (user, token) localStorage/cookie
      authenticate(data, () => {
        setFormSignIn(prevForm => ({ ...initialState, buttonText: 'Submitted' }))
        toast.success(`Hey${data.user.name}, Welcome back!`)
        isAuth() && isAuth().role === 'admin' ? navigate('/admin') : navigate('/private')
      })
    }).catch((err) => {
      console.log('SIGNIN ERROR', err)
      toast.error('SIGNIN ERROR', err)
    }).finally(() => {
      setFormSignIn(initialState)
    })

  }

  useEffect(() => {
    if (isAuth()) {
      return navigate('/')
    }
  }, [])



  const signinForm = () => (
    <Form onSubmit={handelSubmit}>
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

  return (
    <Layout>
      <div className="col-d-6">
        <ToastContainer />
        <h1 className="p-5 text-center">Signin</h1>
        {signinForm()}
        <br />
        <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
          Forgot Password
        </Link>
        <br />
        <br />
        <Google informParent={informParent} />
        <br />
        <Facebook informParent={informParent} />
      </div>
    </Layout>
  )
}

export default Signin