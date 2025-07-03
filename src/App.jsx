import react, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import GrievanceForm from "./pages/GRV-form/GrivanceForm";
import ForgotPassword from "./components/auth/ForgotPassword";
import ForgotPasswordOTP from "./components/auth/ForgotPasswordOTP";
import ChangePassword from "./components/auth/ChangePassword";
import AuthForgotPassword from "./pages/auth/AuthForgotPassword";
import TrackGrievancePage from "./pages/Track-GRV/TrackGrievancePage";
import MyGrievances from "./pages/My-Complaints/myGrievance";
import CitizenProfile from "./components/profile/citizen-profile";
import Team from './pages/PGO/Team'
import PGOLayout from './pages/PGO/PGOLayout'
import Dashboard from './pages/PGO/Dashboard'



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/forgotpassword" element={<AuthForgotPassword />} />
          <Route path="/grv" element={<GrievanceForm />} />
          <Route path="/trk-grv" element={<TrackGrievancePage />} />
          <Route path="/myGrievance" element={<MyGrievances />} />
          <Route path="/trk-grv" element={<TrackGrievancePage />} />
          <Route path="/citizen-profile"  element={<CitizenProfile />} />
          <Route path="/help"  element={< HelpCenter/>} />
          <Route path="/PGO-Dashboard" element={<PGOLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='team' element={<Team />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
