import { useState } from "react"
import Layout from "../../core/Layout"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { makeRequest } from "../../service/makeRequest"
const Forgot = () => {

  const initialState = {
    email: "",
    buttonText: 'Request password reset link'
  }

  const [formSignIn, setFormSignIn] = useState(initialState)

  const { email, buttonText } = formSignIn

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormSignIn(prevForm => {
      return {
        ...prevForm,
        [name]: value
      }
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
    makeRequest('/forgot-password', {
      method: 'PUT',
      data: { email }
    }).then((data) => {
      console.log('SEND FORGOT LINK SUCCESS', data)
      setFormSignIn(prevForm => ({ ...initialState, buttonText: 'Requested' }))
      toast.success(`${data.message}`)
    }).catch((err) => {
      console.log('SEND FORGOT LINK ERROR', err)
      toast.error(err)
    }).finally(() => {
      setFormSignIn(initialState)
    })

  }

  const forgotForm = () => (
    <Form onSubmit={handelSubmit}>
      <FormGroup className="mb-2">
        <FormLabel className="text-muted">Email</FormLabel>
        <FormControl placeholder="Enter email" name="email" onChange={handleChange} type="email" value={email} />
      </FormGroup>
      <Button variant="primary" type="submit">{buttonText}</Button>
    </Form>
  )

  return (
    <Layout>
      <div className="col-d-6">
        <ToastContainer />
        <h1 className="p-5 text-center">Forgot password</h1>
        {forgotForm()}
      </div>
    </Layout>
  )
}

export default Forgot