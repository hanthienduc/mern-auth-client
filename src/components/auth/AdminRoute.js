import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuth } from '../../helpers/helpers'

const AdminRoute = ({ children }) => {

  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuth() || isAuth().role !== 'admin') {
      // not signed in so redirect to login page with the return url
      return navigate('/', { replace: true })
    }
  }, [])

  // authorized so return with components
  return children
}

export default AdminRoute