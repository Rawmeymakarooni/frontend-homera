import Footer from './components/footer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
          <Hero />
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default App;
