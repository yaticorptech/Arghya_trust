import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import About from './components/about';
import GallerySlider from './components/GallerySlider';
import Activities from './components/activities';
import JoinContact from './components/footersection';
import FloatingSocialSidebar from './components/FloatingSocialSidebar';
import SankalpaLogin from './Pages/Login/SankalpaLogin';
import Sankalpa from './Pages/Certificate/Sankalpa';
import Thankyou from './Pages/Certificate/Thankyou';
import AdminLogin from './Pages/Login/AdminLogin';
import FooterSection from './components/footersection';
import Admin from './Pages/Admin/Admin';
import ParticipationLogin from './Pages/Login/ParticipationLogin';
import CertificateParticipation from './Pages/Certificate/CertificateParticipation';

function App() {
  return (
    <Router>
    
      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            <div className="min-h-screen">
              {/* Fixed background */}
              <div className="fixed inset-0 -z-20">
                <img
                  src="https://i.ibb.co/PZZx6jPw/back.jpg"
                  alt="background"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Homepage content */}
              <div className="relative z-10">
                <Header />
                <About />
                <GallerySlider />
                <Activities />
                <JoinContact />
              </div>

              <FloatingSocialSidebar />
            </div>
          }
        />

        {/* Login route */}
        <Route path="/sankalpalogin" element={<SankalpaLogin />} />
        <Route path="/sankalpa" element={ <Sankalpa />} />
         <Route path="/thankyou" element={ <Thankyou />} />
          <Route path="/adminlogin" element={ <AdminLogin />} />
          <Route path="/admin" element={ <Admin />} />
           <Route path="/certificatelogin" element={ <ParticipationLogin />} />
            <Route path="/certificate" element={ <CertificateParticipation/>} />
          
      </Routes>
      
    </Router>
  );
}

export default App;
