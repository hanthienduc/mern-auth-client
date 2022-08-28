import 'react-toastify/dist/ReactToastify.min.css'
import { makeRequest } from "../../service/makeRequest"
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Facebook = ({ informParent }) => {

  const responseFacebook = (response) => {
    // console.log(response);

    makeRequest(`/facebook-login`, {
      method: 'POST',
      data: { userId: response.userID, accessToken: response.accessToken }
    }).then(data => {
      console.log('Facebook SIGNIN SUCCESS', data)
      // inform parent component
      informParent(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <FacebookLogin
      appId={`${process.env.REACT_APP_FACEBOOK_ID}`}
      autoLoad={false}
      callback={responseFacebook}
      cssClass="my-facebook-button-class"
      icon="fa-facebook"
      render={renderProps => (
        <button
          className='btn btn-primary btn-lg btn-block'
          onClick={renderProps.onClick}>
          <i className='fab fa-facebook pr-2'></i> Login with facebook</button>
      )}
    />
  )
}

export default Facebook