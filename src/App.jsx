import { Routes, Route, Navigate } from 'react-router-dom';
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
import Template from './pages/Template';
import EditProfile from './pages/EditProfile';
import NewPassword from './pages/Newpassword';
import ForgotPassword from './pages/forgotpassword';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        {/* Redirect root '/' ke '/home' */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        {/* Home utama sekarang di '/home' */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/designer" element={<Designer />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/designer/:id" element={<DesignerDetail />} />
        <Route path="/design/:id" element={<DesignDetail />} />
        {/* Halaman edit profile */}
        <Route path="/edit-profile" element={<EditProfile />} />
        {/* Halaman settings profil */}
        <Route path="/profil/settings" element={<EditProfile />} />
        {/* Halaman profil */}
        <Route path="/profil/:uid" element={<Profile />} />
        {/* Halaman reset password baru */}
        <Route path="/new-password" element={<NewPassword />} />
        {/* Halaman forgot password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Template kosong untuk basis halaman baru */}
        <Route path="/template" element={<Template />} />
        {/* Fallback 404 dengan halaman yang lebih menarik */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
