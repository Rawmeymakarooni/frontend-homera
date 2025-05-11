import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Explore from './pages/Explore';
import Designer from './pages/Designer';
import Blogs from './pages/Blogs';
import DesignerDetail from './pages/DesignerDetail';
import DesignDetail from './pages/DesignDetail';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
      <div>
      <ScrollToTop />
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/designer" element={<Designer />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/home" element={<Home />} />
          <Route path="/designer/:id" element={<DesignerDetail />} />
          <Route path="/design/:id" element={<DesignDetail />} />
        </Routes>
        <Footer />
      </div> 
  );
}

export default App;
