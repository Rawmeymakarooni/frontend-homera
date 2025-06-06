// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    unameOrEmail: '',
    password: '',
  });
  const [keepLogin, setKeepLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeepLoginChange = (e) => {
    setKeepLogin(e.target.checked);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.unameOrEmail || !formData.password) {
      setError('Mohon isi username/email dan password');
      return;
    }
    
    try {
      setIsLoading(true);
      // Kirim field uname ke backend (boleh username atau email)
      const response = await loginUser({
        uname: formData.unameOrEmail,
        password: formData.password,
        setCookie: keepLogin // true jika keep me logged in, false jika tidak
      });
      // Simpan token ke localStorage atau sessionStorage berdasarkan keepLogin
      if (response.token) {
        if (keepLogin) {
          // Jika keepLogin dicentang, simpan di localStorage (bertahan setelah browser ditutup)
          localStorage.setItem('accessToken', response.token);
          localStorage.removeItem('tempAccessToken'); // Hapus dari sessionStorage jika ada
        } else {
          // Jika keepLogin tidak dicentang, simpan di sessionStorage (hilang saat browser ditutup)
          sessionStorage.setItem('tempAccessToken', response.token);
          localStorage.removeItem('accessToken'); // Hapus dari localStorage jika ada
        }
      }
      
      if (response.refreshToken) {
        if (keepLogin) {
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.removeItem('tempRefreshToken');
        } else {
          sessionStorage.setItem('tempRefreshToken', response.refreshToken);
          localStorage.removeItem('refreshToken');
        }
      }
      
      // Simpan status keepLogin
      localStorage.setItem('keepLogin', keepLogin.toString());
      
      console.log('Login berhasil:', response);
      console.log('Keep login status:', keepLogin);
      
      // Reload halaman agar Navbar memperbarui status login
      window.location.href = '/home'; // Gunakan window.location untuk full reload
    } catch (err) {
      setError(err.message || 'Login gagal, periksa kredensial Anda');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 pt-36 pb-20"
      style={{
        backgroundImage: "url('/bg.png')" }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black bg-white">Log In</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block mb-2 font-semibold text-gray-700">Username atau Email</label>
          <input
            type="text"
            name="unameOrEmail"
            placeholder="Masukkan username atau email"
            value={formData.unameOrEmail}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-4 text-black bg-white"
            required
          />

          <label className="block mb-2 font-semibold text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-6 text-black bg-white"
            required
          />
<div className="flex items-center justify-between mt-4">
  {/* Checkbox */}
  <label className="flex items-center space-x-2 text-gray-700 text-sm">
          <input
            type="checkbox"
            checked={keepLogin}
            onChange={handleKeepLoginChange}
            className="form-checkbox h-4 w-4 text-red-500 border-gray-300 rounded"
          /> <span>Keep me signed in</span>
  </label>

  {/* Forgot password link */}
  <a href="/forgot-password" className="text-sm text-red-500 hover:underline">
    Forgot your password?
  </a>
</div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Processing...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-black bg-white mt-2">
          Don't have an account?{' '}
          <span
            className="text-red-600 hover:underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </span>
        </p>

        <p className="text-center text-[10px] text-gray-400 mt-4">
          By logging in, you agree to Homéra’s Terms & Conditions and Privacy Policy
        </p>
      </div>
    </div>
  );
}
