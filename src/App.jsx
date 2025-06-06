import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
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
import ForgotPassword from './pages/forgotpassword';
import NewPassword from './pages/Newpassword';
import EditProfile from './pages/EditProfile';

function App() {
  return (
      <div>
      <ScrollToTop />
      <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/designer" element={<Designer />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/home" element={<Home />} />
          <Route path="/designer/:id" element={<DesignerDetail />} />
          <Route path="/design/:id" element={<DesignDetail />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/Newpassword" element={<NewPassword />} />
          <Route path="/EditProfile" element={<EditProfile />} />
        </Routes>
        <Footer />
      </div> 
  );
}

export default App;
