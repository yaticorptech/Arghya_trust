import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy imports
const Header = lazy(() => import('./components/header'));
const About = lazy(() => import('./components/about'));
const GallerySlider = lazy(() => import('./components/GallerySlider'));
const Activities = lazy(() => import('./components/activities'));
const JoinContact = lazy(() => import('./components/footersection'));
const FloatingSocialSidebar = lazy(() => import('./components/FloatingSocialSidebar'));
const SankalpaLogin = lazy(() => import('./Pages/Login/SankalpaLogin'));
const Sankalpa = lazy(() => import('./Pages/Certificate/Sankalpa'));
const Thankyou = lazy(() => import('./Pages/Certificate/Thankyou'));
const AdminLogin = lazy(() => import('./Pages/Login/AdminLogin'));
const Admin = lazy(() => import('./Pages/Admin/Admin'));
const ParticipationLogin = lazy(() => import('./Pages/Login/ParticipationLogin'));
const CertificateParticipation = lazy(() => import('./Pages/Certificate/CertificateParticipation'));

function App() {
  return (
    <Router>
      {/* Full-screen spinner while components load */}
      <Suspense
        fallback={
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-blue-700 font-medium animate-pulse">
              Loading...
            </p>
          </div>
        }
      >
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

          {/* Other routes */}
          <Route path="/sankalpalogin" element={<SankalpaLogin />} />
          <Route path="/sankalpa" element={<Sankalpa />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/certificatelogin" element={<ParticipationLogin />} />
          <Route path="/certificate" element={<CertificateParticipation />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
