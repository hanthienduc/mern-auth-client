import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Activate from './components/auth/Activate'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/auth/activate/:tokenId' element={<Activate />} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

