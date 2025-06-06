import { FaUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlinePhotoLibrary } from 'react-icons/md';
import { RiFileUploadLine } from 'react-icons/ri';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoMdInformationCircle } from 'react-icons/io';
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [show, setShow] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [userStatus, setUserStatus] = useState(null); // Status user: null, 'View', 'Post', dll
  const [userId, setUserId] = useState(null); // ID user dari JWT token
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cek token di localStorage (keepLogin = true) atau sessionStorage (keepLogin = false)
    const persistentToken = localStorage.getItem('accessToken');
    const tempToken = sessionStorage.getItem('tempAccessToken');
    const token = persistentToken || tempToken;
    
    // Cek status keepLogin
    const keepLogin = localStorage.getItem('keepLogin') === 'true';
    
    console.log('Persistent token exists:', !!persistentToken);
    console.log('Temporary token exists:', !!tempToken);
    console.log('Keep login:', keepLogin);
    
    // Jika ada token dan (keepLogin = true atau ada tempToken), maka user dianggap login
    if (token && (keepLogin || tempToken)) {
      console.log('User is logged in');
      setIsLoggedIn(true);
      
      // Decode JWT token untuk mendapatkan status user dan ID
      try {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log('JWT payload:', payload);
          if (payload.status) {
            setUserStatus(payload.status);
            console.log('User status:', payload.status);
          }
          if (payload.uid) {
            setUserId(payload.uid);
            console.log('User ID:', payload.uid);
          } else if (payload.id) {
            setUserId(payload.id);
            console.log('User ID:', payload.id);
          }
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
      
      // Ambil profile picture dari backend
      console.log('Fetching profile picture with token:', token.substring(0, 15) + '...');
      axios.get('http://localhost:3000/profile-picture', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log('Profile picture full response:', res);
        console.log('Profile picture data:', res.data);
        console.log('Profile picture URL:', res.data?.ppict);
        
        if (res.data && res.data.ppict) {
          console.log('Setting profile picture to:', res.data.ppict);
          // Validasi URL sebelum menggunakannya
          let url = res.data.ppict;
          
          // Perbaiki URL yang salah format
          if (url.includes('localhost:3000') && !url.includes('localhost:3000/')) {
            url = url.replace('localhost:3000', 'localhost:3000/');
            console.log('Fixed URL format:', url);
          }
          
          // Jika URL menggunakan path prisma/profil, gunakan proxy Vite
          if (url.includes('/prisma/profil/')) {
            // Gunakan path relatif untuk memanfaatkan proxy Vite
            const relativePath = '/profil/' + url.split('/prisma/profil/')[1];
            console.log('Using relative path for proxy:', relativePath);
            setProfilePic(relativePath);
          } else {
            setProfilePic(url);
          }
        } else {
          console.log('No profile picture found in response');
          setProfilePic(null);
        }
      })
      .catch(err => {
        console.error('Error fetching profile picture:', err);
        console.error('Error details:', err.response?.data || err.message);
        // Jangan logout otomatis jika gagal fetch foto
        // Tetap logged in, hanya tidak ada foto profil
        setProfilePic(null);
      });
    } else {
      // Jika tidak ada token atau (keepLogin = false dan tidak ada tempToken), maka user dianggap logout
      console.log('User is not logged in');
      setIsLoggedIn(false);
      setProfilePic(null);
    }
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handler untuk request to post
  const handleRequestPost = () => {
    // Ambil token untuk request ke backend
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('tempAccessToken');
    
    if (token) {
      // Tutup dropdown
      setShowDropdown(false);
      
      // Periksa status request user terlebih dahulu
      console.log('Checking request status');
      axios.get('http://localhost:3000/check-request-status', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log('Request status:', res.data);
        const status = res.data.data.status;
        const message = res.data.data.message;
        
        if (status === 'approved') {
          // User sudah menjadi designer
          showNotification(message, 'success');
        } else if (status === 'pending') {
          // Request sudah diajukan dan sedang menunggu persetujuan
          showNotification(message, 'info');
        } else {
          // Belum ada request, kirim request baru
          console.log('Calling request-poster endpoint');
          // Gunakan URL lengkap ke backend
          axios.post('http://localhost:3000/request-poster', {}, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            console.log('Request to post success:', res.data);
            showNotification('Permintaan untuk posting berhasil dikirim!', 'success');
          })
          .catch(err => {
            console.error('Error during request to post:', err);
            showNotification('Gagal mengirim permintaan: ' + (err.response?.data?.message || 'Terjadi kesalahan'), 'error');
          });
        }
      })
      .catch(err => {
        console.error('Error checking request status:', err);
        showNotification('Gagal memeriksa status permintaan', 'error');
      });
    } else {
      showNotification('Anda harus login terlebih dahulu', 'error');
      setTimeout(() => navigate('/login'), 2000);
    }
  };
  
  // Logout handler (hapus token dan keepLogin)
  const handleLogout = () => {
    // Ambil token untuk request logout ke backend
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('tempAccessToken');
    const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('tempRefreshToken');
    
    if (token && refreshToken) {
      // Panggil API logout di backend untuk invalidasi token
      console.log('Calling logout endpoint with refresh token');
      axios.post('/logout', 
        { refreshToken }, 
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        console.log('Logout success:', res.data);
      })
      .catch(err => {
        console.error('Error during logout:', err);
      })
      .finally(() => {
        // Hapus token dari localStorage dan sessionStorage terlepas dari hasil API call
        performClientLogout();
      });
    } else {
      // Tidak ada token, langsung logout di client
      performClientLogout();
    }
  };
  
  // Fungsi untuk melakukan logout di sisi client
  const performClientLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('keepLogin');
    
    // Hapus token dari sessionStorage
    sessionStorage.removeItem('tempAccessToken');
    sessionStorage.removeItem('tempRefreshToken');
    
    // Reset state
    setIsLoggedIn(false);
    setProfilePic(null);
    setShowDropdown(false);
    
    // Redirect ke halaman login
    console.log('User logged out');
    navigate('/login');
  };

  const handleClick = () => {
    setShow(!show);
    //console.log(show);
  };

  let menuActive = show ? "left-0" : "-left-full";

  // Fungsi untuk menampilkan notifikasi
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    
    // Otomatis hilangkan notifikasi setelah 3 detik
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  return (
    <nav className="fixed flex items-center justify-between pl-7 pr-1 py-1 bg-[#8B7357] text-white w-full top-0 left-0 z-50">
      {/* Notification Popup */}
      {notification.show && (
        <div 
          className={`fixed top-20 right-4 flex items-center p-4 mb-4 rounded-lg z-50 ${
            notification.type === 'success' ? 'bg-green-50 text-green-800' : 
            notification.type === 'info' ? 'bg-blue-50 text-blue-800' : 
            'bg-red-50 text-red-800'
          }`}
          role="alert"
        >
          {notification.type === 'success' ? 
            <IoMdCheckmarkCircle className="w-5 h-5 mr-2" /> : 
            notification.type === 'info' ? 
            <IoMdInformationCircle className="w-5 h-5 mr-2" /> :
            <IoMdCloseCircle className="w-5 h-5 mr-2" />
          }
          <span className="sr-only">
            {notification.type === 'success' ? 'Success' : 
             notification.type === 'info' ? 'Info' : 'Error'}
          </span>
          <div className="ml-3 text-sm font-medium">{notification.message}</div>
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 ${
              notification.type === 'success' ? 'bg-green-50 text-green-500 hover:bg-green-200' : 
              notification.type === 'info' ? 'bg-blue-50 text-blue-500 hover:bg-blue-200' : 
              'bg-red-50 text-red-500 hover:bg-red-200'
            }`}
            onClick={() => setNotification({ show: false, message: '', type: '' })}
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}
      {/* Logo */}
      <div className="flex items-center gap-3 font-serif text-xl">
      <img src="/logo.png" alt="Homéra Logo" className="w-14 h-14 object-contain" />
       <span className="text-white">HOMÉRA</span>
      </div>

      {/* Menu */}
      <ul className={`flex lg:gap-10 md:static md:flex-row md:shadow-none md:bg-transparent md:w-auto md:h-full md:translate-y-0 md:p-0 md:m-0 md:transition-none gap-8 fixed ${menuActive} top-1/2 -translate-y-1/2 flex-col px-8 py-6 rounded shadow-lg shadow-slate-300 bg-amber-950 font-bold mr-15 list-none text-sm text-white transition-all`}>
        <li className="flex item-center gap-2">
          <i className="ri-home-5-line text-3x md:hidden block"></i>
          <Link to="/Home" className="text-[#5A4B38] font-medium hover:text-[#fff8f0]">Home</Link>
        </li>
        <li className="flex item-center gap-3">
          <i className="ri-information-line text-3xl md:hidden block"></i>
          <Link to="/about-us" className="text-[#5A4B38] font-medium hover:text-[#fff8f0]">About Us</Link>
        </li>
        <li className="flex item-center gap-3">
          <i className="ri-compass-3-line text-3xl md:hidden block"></i>
          <Link to="/Explore" className="text-[#5A4B38] font-medium hover:text-[#fff8f0]">Explore</Link>
        </li>
        <li className="flex item-center gap-3">
          <i className="ri-team-line text-3xl md:hidden block"></i>
          <Link to="/Designer" className="text-[#5A4B38] font-medium hover:text-[#fff8f0]">Designer</Link>
        </li>
        <li className="flex item-center gap-3">
        <i className="ri-book-read-line text-3xl md:hidden block"></i>
          <Link to="/blogs" className="text-[#5A4B38] font-medium hover:text-[#fff8f0]">Blogs</Link>
        </li>
      </ul>

      {/* Search & Profile */}
      <div className="flex items-center ml-30 space-x-2 gap-2">
        <div className="flex border border-white rounded-full px-3 py-1">
          <input
            type="text"
            placeholder="Search for design, rooms, or designer..."
            className="bg-transparent outline-none text-white placeholder-white text-sm w-64"
          />
          <FiSearch className="w-5 h-5" />
        </div>
        {/* Profile/Login Icon with Dropdown */}
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <div 
              className="cursor-pointer" 
              onClick={() => setShowDropdown(!showDropdown)} 
              title="Menu Profil"
            >
              <img
                src={profilePic || '/profil/Default.JPG'}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-yellow-300"
                style={{ 
                  minWidth: 32, 
                  minHeight: 32,
                  backgroundColor: 'white',
                  filter: 'none',
                  opacity: 1
                }}
                onError={e => { 
                  console.log('Error loading image:', e.target.src);
                  // Coba perbaiki URL jika mengandung prisma/profil
                  const originalSrc = e.target.src;
                  if (originalSrc.includes('/prisma/profil/')) {
                    // Coba dengan path relatif
                    const filename = originalSrc.split('/').pop();
                    const newSrc = `/profil/${filename}`;
                    console.log('Trying alternative URL:', newSrc);
                    e.target.src = newSrc;
                    // Tambahkan flag untuk mencegah loop tak terbatas
                    e.target.setAttribute('data-retried', 'true');
                  } else if (!e.target.getAttribute('data-retried')) {
                    // Jika belum pernah retry, coba dengan URL lengkap
                    const backendUrl = 'http://localhost:3000';
                    const filename = originalSrc.split('/').pop();
                    const newSrc = `${backendUrl}/profil/${filename}`;
                    console.log('Trying direct backend URL:', newSrc);
                    e.target.src = newSrc;
                    e.target.setAttribute('data-retried', 'true');
                  } else {
                    // Jika sudah retry dan masih gagal, gunakan default
                    e.target.src = '/profil/Default.JPG';
                  }
                }}
              />
            </div>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div 
                  onClick={() => { 
                    // Jika user sudah login, userId seharusnya sudah ada
                    // Tapi kita double check token juga untuk memastikan
                    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('tempAccessToken');
                    
                    if (userId || token) {
                      // Jika userId tidak ada tapi token ada, coba ambil dari token
                      if (!userId && token) {
                        try {
                          const tokenParts = token.split('.');
                          if (tokenParts.length === 3) {
                            const payload = JSON.parse(atob(tokenParts[1]));
                            if (payload.uid) {
                              navigate(`/profil/${payload.uid}`);
                              setShowDropdown(false);
                              return;
                            } else if (payload.id) {
                              navigate(`/profil/${payload.id}`);
                              setShowDropdown(false);
                              return;
                            }
                          }
                        } catch (error) {
                          console.error('Error parsing token:', error);
                        }
                      }
                      
                      // Pastikan userId ada sebelum navigasi
                      if (userId) {
                        navigate(`/profil/${userId}`);
                      } else {
                        console.error('User ID tidak ditemukan dalam token');
                        showNotification('Terjadi kesalahan saat mengakses profil', 'error');
                        navigate('/login');
                      }
                    } else {
                      navigate('/login');
                      showNotification('Anda harus login terlebih dahulu', 'error');
                    }
                    setShowDropdown(false); 
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <CgProfile className="mr-2" />
                  Lihat Profil
                </div>
                <div 
                  onClick={() => { navigate('/portofolio'); setShowDropdown(false); }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <MdOutlinePhotoLibrary className="mr-2" />
                  Portofolio
                </div>
                {/* Tampilkan opsi Request to Post hanya jika user belum menjadi designer */}
                {userStatus !== 'Post' && (
                  <div 
                    onClick={handleRequestPost}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <RiFileUploadLine className="mr-2" />
                    Request to Post
                  </div>
                )}
                <div 
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="cursor-pointer" onClick={() => navigate('/login')} title="Login">
            <FaUser className="w-6 h-6 hover:text-yellow-300 text-white" />
          </div>
        )}

        <div className="flex item-center gap-2">
          <i className="ri-menu-3-line text-3xl md:hidden block" onClick={handleClick}></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
