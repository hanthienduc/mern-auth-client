import Layout from "./Layout"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { makeRequest } from "../service/makeRequest"
import { getCookie, isAuth, signout, updateUser } from "../helpers/helpers"
import { useNavigate } from "react-router-dom"

const Admin = () => {
  const initialState = {
    name: "heloo",
    email: "han@gmail",
    password: "asdfasdf",
    role: "none",
    buttonText: 'Submit'
  }

  const [formProfile, setFormProfile] = useState(initialState)

  const token = getCookie('token')

  useEffect(() => {
    loadProfile()
  }, [])
  const navigate = useNavigate()
  const loadProfile = () => {
    makeRequest(`user/${isAuth()._id}`, {
      'method': 'GET',
      'headers': {
        Authorization: `Bearer ${token}`
      }
    }).then(data => {
      const { role, name, email } = data.user
      setFormProfile(prevValues => {
        return {
          ...prevValues,
          role,
          name,
          email
        }
      })
    }).catch(err => {
      console.log('PRIVATE PROFILE UPDATE ERROR', err)
      signout(() => {
        navigate('/')
      })
    })
  }

  const { name, email, password, role, buttonText } = formProfile

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormProfile(prevForm => {
      return {
        ...prevForm,
        [name]: value
      }
    })
  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    setFormProfile(prevForm => {
      return {
        ...prevForm,
        buttonText: 'Submitting'
      }
    })
    makeRequest('/admin/update', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { name, password }
    }).then((data) => {
      console.log('PRIVATE PROFILE UPDATE SUCCESS')
      updateUser(data, () => {
        setFormProfile(prevForm => ({ ...prevForm, buttonText: 'Submitted' }))
        toast.success('Profile updated successfully', data.message)
      })

    }).catch((err) => {
      console.log('PRIVATE PROFILE UPDATE FAILED')
      toast.error(err)
    }).finally(() => {
      setFormProfile(initialState)
    })

  }

  const updateForm = () => (
    <Form onSubmit={handelSubmit}>
      <FormGroup>
        <FormLabel className="text-muted">Role</FormLabel>
        <FormControl disabled name="role" type="text" value={role} />
      </FormGroup>
      <FormGroup>
        <FormLabel className="text-muted">Name</FormLabel>
        <FormControl placeholder="Enter name" name="name" onChange={handleChange} type="text" value={name} />
      </FormGroup>
      <FormGroup>
        <FormLabel className="text-muted">Email</FormLabel>
        <FormControl disabled={true} name="email" type="email" value={email} />
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel className="text-muted">Password</FormLabel>
        <FormControl placeholder="Enter password" name="password" onChange={handleChange} type="password" value={password} />
      </FormGroup>
      <Button variant="primary" type="submit">{buttonText}</Button>
    </Form>
  )

  return (
    <Layout>
      <div className="col-d-6">
        <ToastContainer />
        <h1 className="pt-5 text-center">Private</h1>
        <p className="lead text-center">Profile update</p>
        {updateForm()}
      </div>
    </Layout>
  )
}

export default Admin