import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isAuth } from '../../helpers/helpers'

const PrivateRoute = ({ children }) => {

  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuth()) {
      // not signed in so redirect to login page with the return url
      return navigate('/signin', { replace: true })
    }
  }, [])

  // authorized so return with components
  return children
}

export default PrivateRoute