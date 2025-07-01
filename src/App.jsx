import react, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import GrievanceForm from "./pages/GRV-form/GrivanceForm";
import CitizenProfile from "./components/profile/citizen-profile";

function App() {
  const [profileImage, setProfileImage] = useState(null);
  return (
    <>
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/grv" element={<GrievanceForm />} />
          <Route path="/cp" element={<CitizenProfile profileImage={profileImage} setProfileImage={setProfileImage} />} />
    </Routes>   
    </BrowserRouter>
    </>
  );
}

export default App;
