import React, { useState, useEffect } from 'react';
import { FaCamera, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    uname: '',
    email: '',
    user_desc: '',
    user_job: '',
    location: '',
    whatsapp: '',
    instagram: '',
    password: '',
  });
  const [memberSince, setMemberSince] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Mengambil data profil saat komponen dimuat
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('tempAccessToken');
        
        if (!token) {
          navigate('/login');
          return;
        }
        
        const response = await axios.get('http://localhost:3000/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data && response.data.data) {
          const userData = response.data.data;
          console.log('User data from API:', userData);
          
          // Format URL gambar profil jika ada
          let profilePicUrl = userData.ppict || null;
          if (profilePicUrl) {
            if (!profilePicUrl.startsWith('http')) {
              profilePicUrl = `http://localhost:3000/${profilePicUrl.replace(/^\//,'')}`;  
            }
          }
          
          setProfileImage(profilePicUrl);
          
          // Simpan data ke state
          setFormData({
            uname: userData.uname || '',
            email: userData.email || '',
            user_desc: userData.user_desc || '',
            user_job: userData.user_job || '',
            location: userData.location || '',
            whatsapp: userData.whatsapp || '',
            instagram: userData.instagram || '',
            password: '',
          });
          
          // Simpan tanggal member since
          if (userData.created_at) {
            setMemberSince(userData.created_at);
          }
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Gagal mengambil data profil');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      
      // Upload gambar ke server
      const uploadImage = async () => {
        try {
          const token = localStorage.getItem('accessToken') || sessionStorage.getItem('tempAccessToken');
          if (!token) return;
          
          const formData = new FormData();
          formData.append('profileImage', file);
          
          await axios.post('http://localhost:3000/profile-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          });
          
          console.log('Profile image uploaded successfully');
        } catch (error) {
          console.error('Error uploading profile image:', error);
        }
      };
      
      uploadImage();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi untuk menampilkan notifikasi
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    
    // Otomatis sembunyikan notifikasi setelah 5 detik
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('tempAccessToken');
      if (!token) {
        navigate('/login');
        return;
      }
      
      // Hapus password kosong dari data yang dikirim
      const dataToSend = {...formData};
      if (!dataToSend.password) delete dataToSend.password;
      
      const response = await axios.put('http://localhost:3000/profile', dataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data && response.data.success) {
        showNotification('Profil berhasil diperbarui!', 'success');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('Gagal memperbarui profil: ' + (error.response?.data?.message || error.message), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 pt-36 pb-20 relative"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Notifikasi */}
      {notification.show && (
        <div 
          className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 py-3 px-6 rounded-lg shadow-lg flex items-center ${notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'}`}
        >
          {notification.type === 'success' ? (
            <FaCheckCircle className="text-green-500 mr-2 text-xl" />
          ) : (
            <FaExclamationCircle className="text-red-500 mr-2 text-xl" />
          )}
          <span className={notification.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {notification.message}
          </span>
        </div>
      )}
      {loading ? (
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl text-center">
          <p className="text-lg">Loading...</p>
        </div>
      ) : error ? (
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl text-center">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => navigate('/login')} 
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
          >
            Kembali ke Login
          </button>
        </div>
      ) : (
        <div className="bg-white pt-20 px-6 pb-6 rounded-2xl shadow-xl w-full max-w-2xl relative">
          {/* Foto profil bulat keluar dari putih */}
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img
                src={profileImage || '/default-avatar.png'}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
              <label htmlFor="profilePic" className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow-md">
                <FaCamera className="text-gray-600" />
                <input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-16 mb-6 text-center text-black">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Username</label>
              <input
                type="text"
                name="uname"
                value={formData.uname}
                onChange={handleChange}
                className="w-full border rounded p-2 text-black bg-white"
              />
            </div>
            
            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded p-2 text-black bg-white"
              />
            </div>
            
            {/* Description */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Description</label>
              <textarea
                name="user_desc"
                rows="3"
                value={formData.user_desc}
                onChange={handleChange}
                className="w-full border rounded p-2 text-black bg-white"
              ></textarea>
            </div>
            
            {/* Job */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Job</label>
              <input
                type="text"
                name="user_job"
                value={formData.user_job}
                onChange={handleChange}
                className="w-full border rounded p-2 text-black bg-white"
              />
            </div>
            
            {/* Location */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded p-2 text-black bg-white"
              />
            </div>
            
            {/* WhatsApp */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full border rounded p-2 text-black bg-white"
              />
            </div>
            
            {/* Instagram */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Instagram</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full border rounded p-2 text-black bg-white"
              />
            </div>
            
            {/* Password */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Password (Kosongkan jika tidak ingin mengubah)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded p-2 text-black bg-white"
              />
            </div>
            
            {/* Member Since (read-only) */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700">Member Since</label>
              <div className="w-full border rounded p-2 text-black bg-gray-50">
                {memberSince ? (
                  (() => {
                    try {
                      return new Date(memberSince).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      });
                    } catch (error) {
                      console.error('Error formatting date:', error);
                      return memberSince;
                    }
                  })()
                ) : '-'}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
            >
              Simpan Perubahan
            </button>
            
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition mt-2"
            >
              Kembali
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
