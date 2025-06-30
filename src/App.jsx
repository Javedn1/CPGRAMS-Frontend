import react from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'
import GrievanceForm from './pages/GRV-form/GrivanceForm'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/grv' element={<GrievanceForm />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
