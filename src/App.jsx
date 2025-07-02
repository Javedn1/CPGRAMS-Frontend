import react, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import GrievanceForm from "./pages/GRV-form/GrivanceForm";
import CitizenProfile from "./components/profile/citizen-profile";

// import react from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'
import GrievanceForm from './pages/GRV-form/GrivanceForm'
import ForgotPassword from './components/auth/ForgotPassword'
import ForgotPasswordOTP from './components/auth/ForgotPasswordOTP'
import ChangePassword from './components/auth/ChangePassword'
import AuthForgotPassword from './pages/auth/AuthForgotPassword'
import MyGrievances from './pages/My Complaints/myGrievance';
>>>>>>> 019c44e7704c1fe99b762990c451a585036687c3

function App() {
  const [profileImage, setProfileImage] = useState(null);
  return (
    <>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/grv" element={<GrievanceForm />} />
          <Route path="/cp" element={<CitizenProfile profileImage={profileImage} setProfileImage={setProfileImage} />} />
        </Routes>
      </BrowserRouter>
=======
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/forgotpassword' element={<AuthForgotPassword />} />
          <Route path='/grv' element={<GrievanceForm />} />
          <Route path='/myGrievance' element={<MyGrievances />} />
        </Routes>
      </BrowserRouter>

>>>>>>> 019c44e7704c1fe99b762990c451a585036687c3
    </>
  );
}

export default App;
