
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import React, { useState } from 'react';
import './index.css';
import './App.css'; 
5aea69d433c1060d87b5d3962c86c912c2ad34bb

function App() {
 // const [count, setCount] = useState(0)

  return (
    <>
    <div className="flex flex-col">
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-red-500"></div>
      <div className="w-10 h-10 bg-blue-500"></div>
    </div>

      <Navbar />
      <Hero />
    </div>
    </>
  )
}

export default App;
