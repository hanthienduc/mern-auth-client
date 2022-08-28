import { useEffect, useState } from "react"
import Layout from "../../core/Layout"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { makeRequest } from "../../service/makeRequest"
import { useNavigate, useParams } from "react-router-dom"
import { useJwt } from "react-jwt"
const Reset = () => {

  const initialState = {
    name: "",
    token: "",
    newPassword: "",
    buttonText: 'Reset password '
  }

  const [formReset, setFormReset] = useState(initialState)

  const { tokenId } = useParams()

  const { decodedToken, isExpired } = useJwt(tokenId);

  useEffect(() => {
    if (tokenId) {
      setFormReset(prevValue => ({ ...prevValue, name: decodedToken?.name, token: tokenId }))
    }
  }, [decodedToken, tokenId])

  const { name, token, newPassword, buttonText } = formReset

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormReset(prevForm => {
      return {
        ...prevForm,
        [name]: value
      }
    })
  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    setFormReset(prevForm => {
      return {
        ...prevForm,
        buttonText: 'Submitting'
      }
    })
    makeRequest('/reset-password', {
      method: 'PUT',
      data: { newPassword, resetPasswordLink: token }
    }).then((data) => {
      console.log('RESET PASSWORD SUCCESS', data)
      setFormReset(prevForm => ({ ...initialState, buttonText: 'Submitted' }))
      toast.success(`${data.message}`)
      navigate('/signin', { replace: true })
    }).catch((err) => {
      console.log('RESET PASSWORD ERROR', err)
      toast.error(err)
    }).finally(() => {
      setFormReset(initialState)
    })
  }

  const passwordResetForm = () => (
    <Form onSubmit={handelSubmit}>
      <FormGroup>
        <FormLabel className="text-muted">Password</FormLabel>
        <FormControl placeholder="New password" name="newPassword" onChange={handleChange} type="password" value={newPassword}
          required
        />
      </FormGroup>
      <Button variant="primary" type="submit">{buttonText}</Button>
    </Form>
  )

  return (
    <Layout>
      <div className="col-d-6">
        <ToastContainer />
        <h1 className="p-5 text-center">Hey {name}, please enter new password!</h1>
        {passwordResetForm()}
      </div>
    </Layout>
  )
}

export default Reset