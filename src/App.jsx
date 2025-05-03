<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
>>>>>>> c1a98235fabad6697b3202a654bf09b165fdf71d
import Navbar from './components/Navbar';
import Designer from './components/designer';
import Hero from './components/Hero';
<<<<<<< HEAD
import AboutUs from './pages/AboutUs';
=======
import Explore from './components/explore';
import Home from './components/home';
import Footer from './components/footer';
>>>>>>> c1a98235fabad6697b3202a654bf09b165fdf71d
//import React, { useState } from 'react';
//import './index.css';
//import './App.css'; 


function App() {
 // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
<<<<<<< HEAD
      <Navbar />
        <main className="pt-16 px-0 bg-[#8C6D5A]">
          <Routes>
            <Route path="/" element={<Hero />} />  {/* Halaman utama */}
            <Route path="/about-us" element={<AboutUs />} />  {/* Halaman About Us */}
            {/* Tambahkan route lain sesuai kebutuhan */}
          </Routes>
        </main>
=======
        <Navbar />

        <Routes>
            <Route path="/designer" element={<Designer />}/>
            <Route path="/blogs" element={<Hero />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/home" element={<Home />} />
        </Routes>

>>>>>>> c1a98235fabad6697b3202a654bf09b165fdf71d
        <Footer />
      </div> 
    </BrowserRouter>
  );
}

export default App;
