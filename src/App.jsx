import react from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'
import GrievanceForm from './pages/GRV-form/GrivanceForm'
import ForgotPassword from './components/auth/ForgotPassword'
import ForgotPasswordOTP from './components/auth/ForgotPasswordOTP'
import ChangePassword from './components/auth/ChangePassword'
import AuthForgotPassword from './pages/auth/AuthForgotPassword'
import TrackGrievancePage from './pages/Track-GRV/TrackGrievancePage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/forgotpassword' element={<AuthForgotPassword />} />
          <Route path='/grv' element={<GrievanceForm />} />
          <Route path='/trk-grv' element={<TrackGrievancePage />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
