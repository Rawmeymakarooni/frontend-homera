import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Designer from './components/designer';
import Hero from './components/Hero';
import Explore from './components/explore';
import Home from './components/home';
import Footer from './components/footer';
//import React, { useState } from 'react';
//import './index.css';
//import './App.css'; 


function App() {
 // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <Routes>
            <Route path="/designer" element={<Designer />}/>
            <Route path="/blogs" element={<Hero />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/home" element={<Home />} />
        </Routes>

        <Footer />
      </div> 
    </BrowserRouter>
  );
}

export default App;
