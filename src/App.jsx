import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Explore from './pages/Explore';
import Designer from './pages/Designer';

function App() {
  return (
    <>
      <div>
      <Navbar />
        <main className="pt-16 px-0 bg-[#8C6D5A]">
          <Routes>
            <Route path="/" element={<Home />} />  {/* landing page */}
            <Route path="/About-us" element={<AboutUs />} />  {/* Halaman About Us */}
            <Route path="/Explore" element={<Explore />} />
            <Route path="/Designer" element={<Designer />} />
            <Route path="/Home" element={<Home />} />
            {/* Tambahkan route lain sesuai kebutuhan */}
          </Routes>
        </main>
        <Footer />
      </div> 
    </>
  );
}

export default App;
