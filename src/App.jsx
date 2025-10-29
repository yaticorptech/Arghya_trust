import Header from './components/header';
import About from './components/about';
import GallerySlider from './components/GallerySlider';
import Activities from './components/activities';
import JoinContact from './components/footersection';
import FloatingSocialSidebar from './components/FloatingSocialSidebar';
import bg from './assets/images/back.jpg';

function App() {
  return (
    <div className="min-h-screen">
      {/* Fixed background without overlay */}
      <div className="fixed inset-0 -z-20">
        <img
          src="https://i.ibb.co/PZZx6jPw/back.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content starts immediately */}
      <div className="relative z-10">
        <Header />
        <About />
        <GallerySlider />
        <Activities />
        <JoinContact />
      </div>
      <FloatingSocialSidebar /> 
    </div>
  );
}

export default App;