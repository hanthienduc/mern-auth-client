import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Signup from './components/auth/Signup'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

