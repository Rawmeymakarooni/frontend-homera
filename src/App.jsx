import React, { useState } from 'react';
import Navbar from './assets/Navbar';
import Hero from './assets/Hero';
import './index.css';
import './App.css'; 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Navbar />
      <Hero />
    </div>
    </>
  )
}

export default App;
