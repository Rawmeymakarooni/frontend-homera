import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './pages/AboutUs';
//import React, { useState } from 'react';
//import './index.css';
//import './App.css'; 


function App() {
 // const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Navbar />
        <main className="pt-16 px-0 bg-[#8C6D5A]">
          <Routes>
            <Route path="/" element={<Hero />} />  {/* Halaman utama */}
            <Route path="/about-us" element={<AboutUs />} />  {/* Halaman About Us */}
            {/* Tambahkan route lain sesuai kebutuhan */}
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
