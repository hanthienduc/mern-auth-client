import 'react-toastify/dist/ReactToastify.min.css'
import { makeRequest } from "../../service/makeRequest"
import { GoogleLogin } from '@react-oauth/google';

const Google = ({ informParent }) => {

  const responseGoogle = (response) => {
    console.log(response);
    makeRequest(`/google-login`, {
      method: 'POST',
      data: { idToken: response.credential }
    }).then(data => {
      console.log('GOOGLE SIGNIN SUCCESS', data)
      // inform parent component
      informParent(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        responseGoogle(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
      useOneTap
    />
  )
}

export default Google