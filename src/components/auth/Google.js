import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import { makeRequest } from "../../service/makeRequest"
import { authenticate, isAuth } from "../../helpers/helpers"
import { GoogleLogin } from 'react-google-login';

const Google = () => {

  const responseGoogle = (response) => {
    console.log(response);
    makeRequest(`/google-login`, {
      method: 'POST',
      data: { idToken: response.tokenId }
    }).then(data => {
      console.log('GOOGLE SIGNIN SUCCESS', data)
      // inform parent component
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}
            className="btn btn-danger btn-lg btn-block" >
            <i className="fab fa-google"></i> SIGNIN WITH GOOGLE</button>
        )}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default Google