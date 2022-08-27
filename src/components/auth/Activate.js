import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import Layout from "../../core/Layout"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import { makeRequest } from "../../service/makeRequest"
import { useJwt } from "react-jwt";

const Activate = () => {

  const initialState = {
    name: "",
    token: "",
    show: true,
  }
  const [activateAccount, setActivateAccount] = useState(initialState)

  let { tokenId } = useParams()
  const { decodedToken, isExpired } = useJwt(tokenId);

  useEffect(() => {
    if (tokenId) {
      setActivateAccount(prevValue => ({ ...prevValue, name: decodedToken?.name, token: tokenId }))
    }
  }, [decodedToken, tokenId])

  const { name, token, show } = activateAccount


  const handleSubmit = async (e) => {
    e.preventDefault()
    makeRequest('/account-activation', {
      method: 'POST',
      data: { token: token }
    }).then((data) => {
      console.log('ACCOUNT ACTIVATION', data)
      setActivateAccount(prevForm => ({ ...initialState, show: false }))
      toast.success(data.message)
    }).catch((err) => {
      console.log('ACCOUNT ACTIVATION ERROR', err)
      toast.error('ACCOUNT ACTIVATION ERROR', err)
    }).finally(() => {
      setActivateAccount(initialState)
    })

  }

  const activationLink = () => {
    return <div className="text-center">
      <h1 className="p-5 ">Hey {name} Ready to activate your account?</h1>
      <button className="btn btn-outline-primary" onClick={handleSubmit}>Activate</button>
    </div>
  }


  const navigate = useNavigate()
  return (
    <Layout>
      <div className="col-d-6">
        <ToastContainer />
        <h1 className="p-5 text-center">Activate Account</h1>
        {activationLink()}
      </div>
    </Layout>
  )
}

export default Activate