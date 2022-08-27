import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Activate from './components/auth/Activate'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import Private from './core/Private'
import PrivateRoute from './components/auth/PrivateRoute'
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
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

