import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    ppict: null,
    uname: '',
    email: '',
    user_desc: '',
    status: '',
    user_job: '',
    location: '',
    whatsapp: '',
    instagram: '',
    created_at: null
  });
  const [userStatus, setUserStatus] = useState('View');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // Ambil token dari localStorage atau sessionStorage
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('tempAccessToken');
        
        if (!token) {
          throw new Error('Anda harus login untuk melihat profil');
        }

        console.log('Using token for profile request:', token.substring(0, 15) + '...');
        
        // Ambil data profil dari backend dengan URL lengkap
        const response = await axios.get('http://localhost:3000/profile', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        // Log response untuk debugging
        console.log('Full profile response:', response);

        console.log('Profile data response:', response.data);
        
        if (response.data && response.data.data) {
          const userData = response.data.data;
          console.log('Full user data from API:', userData);
          console.log('Created at from API:', userData.created_at);
          
          setUserStatus(userData.status || 'View');
          
          // Format URL gambar profil jika ada
          let profilePicUrl = userData.ppict || null;
          if (profilePicUrl) {
            // Perbaiki URL yang salah format
            if (profilePicUrl.includes('localhost:3000') && !profilePicUrl.includes('localhost:3000/')) {
              profilePicUrl = profilePicUrl.replace('localhost:3000', 'localhost:3000/');
            }
            
            // Gunakan URL lengkap
            if (!profilePicUrl.startsWith('http')) {
              profilePicUrl = `http://localhost:3000/${profilePicUrl.replace(/^\//, '')}`;
            }
          }
          
          // Simpan data sesuai dengan format dari backend
          setProfileData({
            ppict: profilePicUrl,
            uname: userData.uname || '',
            email: userData.email || '',
            user_desc: userData.user_desc || '',
            status: userData.status || '',
            user_job: userData.user_job || '',
            location: userData.location || '',
            whatsapp: userData.whatsapp || '',
            instagram: userData.instagram || '',
            created_at: userData.created_at || null
          });
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError(err.message || 'Gagal mengambil data profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [uid]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 pt-36 pb-20"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="bg-white pt-20 px-6 pb-6 rounded-2xl shadow-xl w-full max-w-2xl relative">
        {/* Foto profil bulat keluar dari putih */}
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img
              src={profileData.ppict || '/default-avatar.png'}
              alt="Profile"
              className="w-45 h-45 rounded-full object-cover border-4 border-white shadow-md"
              style={{ width: '120px', height: '120px' }}
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 text-center text-black">Profil</h2>
        <p className="text-center text-gray-500 mt-2">Status: {profileData.status}</p>

        <div className="space-y-4 mt-6">
          {/* Tampilkan data sesuai urutan yang diminta */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">Username</label>
            <div className="w-full border rounded p-2 text-black bg-gray-50">
              {profileData.uname || '-'}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <div className="w-full border rounded p-2 text-black bg-gray-50">
              {profileData.email || '-'}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">Description</label>
            <div className="w-full border rounded p-2 text-black bg-gray-50 min-h-[75px]">
              {profileData.user_desc || '-'}
            </div>
          </div>

          {/* Tampilkan field tambahan hanya jika status user adalah Post atau Admin */}
          {(userStatus === 'Post' || userStatus === 'Admin') && (
            <>
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-gray-700">Job</label>
                <div className="w-full border rounded p-2 text-black bg-gray-50">
                  {profileData.user_job || '-'}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold text-gray-700">Location</label>
                <div className="w-full border rounded p-2 text-black bg-gray-50">
                  {profileData.location || '-'}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold text-gray-700">WhatsApp</label>
                <div className="w-full border rounded p-2 text-black bg-gray-50">
                  {profileData.whatsapp || '-'}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold text-gray-700">Instagram</label>
                <div className="w-full border rounded p-2 text-black bg-gray-50">
                  {profileData.instagram || '-'}
                </div>
              </div>
            </>
          )}
          
          {/* Tampilkan created_at untuk semua user di bagian akhir */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">Member Since</label>
            <div className="w-full border rounded p-2 text-black bg-gray-50">
              {profileData.created_at ? (
                (() => {
                  console.log('Formatting date:', profileData.created_at);
                  try {
                    return new Date(profileData.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    });
                  } catch (error) {
                    console.error('Error formatting date:', error);
                    return profileData.created_at;
                  }
                })()
              ) : '-'}
            </div>
          </div>
          
          {/* Tombol Settings */}
          <div className="mt-6">
            <button 
              onClick={() => navigate('/profil/settings')} 
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
