import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Activate from './components/auth/Activate'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import Private from './core/Private'
import PrivateRoute from './components/auth/PrivateRoute'
import Admin from './core/Admin'
import AdminRoute from './components/auth/AdminRoute'
import Forgot from './components/auth/Forgot'
import Reset from './components/auth/Reset'
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/auth/activate/:tokenId' element={<Activate />} />
        <Route path='/private' element={<PrivateRoute>
          <Private />
        </PrivateRoute>} />
        <Route path='/admin' element={<AdminRoute>
          <Admin />
        </AdminRoute>} />
        <Route path='/auth/password/forgot' element={<Forgot />} />
        <Route path='/auth/password/reset/:tokenId' element={<Reset />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

