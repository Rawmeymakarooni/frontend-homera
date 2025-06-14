// src/pages/Register.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCropper from '../components/ImageCropper';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // State untuk image cropping dan drag-drop
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs untuk canvas dan file input
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const cropAreaRef = useRef(null);
  const previewCanvasRef = useRef(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  // Handle cropped image from ImageCropper component
  const handleCroppedImage = (file) => {
    if (file) {
      setCroppedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle drag and drop events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setPreview(null);
        setCroppedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Function to handle image cropping
  const handleCrop = () => {
    if (!imageRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;
    
    // Create a rounded rectangle crop
    canvas.width = 150;
    canvas.height = 150;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw circular crop
    ctx.save();
    ctx.beginPath();
    ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    
    // Calculate aspect ratio to center the image
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerX = (canvas.width - img.width * ratio) / 2;
    const centerY = (canvas.height - img.height * ratio) / 2;
    
    // Draw centered image
    ctx.drawImage(
      img, 
      0, 0, img.width, img.height,
      centerX, centerY, img.width * ratio, img.height * ratio
    );
    ctx.restore();
    
    // Convert to blob for upload
    canvas.toBlob((blob) => {
      setCroppedImage(blob);
      setPreview(canvas.toDataURL());
    }, 'image/jpeg', 0.95);
  };
  
  // Handle form submission with image upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setSuccessMessage('');

    try {
      // Validasi manual sebelum kirim ke server
      if (!formData.uname || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('Semua field wajib diisi');
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Password tidak cocok');
      }
      if (formData.password.length < 6) {
        throw new Error('Password minimal 6 karakter');
      }

      // Validasi format email yang lebih longgar
      // Hanya cek apakah ada @ dan setidaknya satu titik setelahnya
      if (!formData.email.includes('@') || formData.email.indexOf('@') === formData.email.length - 1) {
        throw new Error('Format email tidak valid');
      }
      
      console.log('Email valid, mengirim data ke server...');

      // Create FormData for multipart/form-data submission (includes file)
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Add profile photo if available
      if (croppedImage) {
        formDataToSend.append('ppict', new File([croppedImage], 'profile.jpg', { type: 'image/jpeg' }));
      }
      
      // Log untuk debugging
      console.log('Mengirim data ke endpoint /register');
      
      // Tentukan base URL berdasarkan environment
      const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://webhomera.vercel.app'
        : '';
      
      // Coba endpoint /api/register terlebih dahulu (untuk Vercel)
      let response;
      try {
        // Tambahkan header untuk CORS
        const fetchOptions = {
          method: 'POST',
          body: formDataToSend,
          mode: 'cors',
          headers: {
            // FormData akan otomatis mengatur Content-Type yang benar
            // Jangan tambahkan Content-Type manual untuk FormData
          }
        };
        
        console.log('Mencoba endpoint /api/register');
        try {
          response = await fetch(`${baseUrl}/api/register`, fetchOptions);
          console.log('Response dari /api/register:', response.status);
        } catch (apiError) {
          console.warn('Error saat akses /api/register:', apiError.message);
          // Jika gagal dengan endpoint pertama, coba endpoint kedua
          console.log('Mencoba endpoint /register sebagai fallback');
          response = await fetch(`${baseUrl}/register`, fetchOptions);
          console.log('Response dari /register:', response.status);
        }
        
        // Jika masih 404, coba endpoint tanpa baseUrl (untuk development)
        if (response.status === 404) {
          console.log('Mencoba endpoint lokal tanpa baseUrl');
          response = await fetch('/register', fetchOptions);
          console.log('Response dari endpoint lokal:', response.status);
        }
      } catch (fetchError) {
        console.error('Semua fetch request gagal:', fetchError);
        throw new Error(`Gagal terhubung ke server: ${fetchError.message}. Periksa koneksi internet Anda atau coba lagi nanti.`);
      }
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        // Coba parse response sebagai JSON jika ada
        let errorText = '';
        try {
          // Cek content-type untuk menentukan cara parsing yang tepat
          const contentType = response.headers.get('content-type');
          console.log('Error response content-type:', contentType);
          
          // Coba dapatkan teks response terlebih dahulu
          errorText = await response.text();
          console.log('Raw error response text:', errorText);
          
          // Jika ada teks dan kemungkinan valid JSON, coba parse
          if (errorText && errorText.trim()) {
            // Coba parse sebagai JSON terlepas dari content-type
            // karena beberapa server mungkin mengirim JSON dengan content-type yang salah
            try {
              const err = JSON.parse(errorText);
              console.log('Parsed error response:', err);
              
              // Cek berbagai format error response dari backend
              if (err.message) {
                throw new Error(err.message);
              } else if (err.error) {
                throw new Error(err.error);
              } else if (typeof err === 'string') {
                throw new Error(err);
              } else if (err.errors && Array.isArray(err.errors)) {
                // Format validasi error dengan array errors
                throw new Error(err.errors.map(e => e.msg || e.message || e).join(', '));
              } else {
                // Jika tidak ada format yang dikenali, gunakan status code
                throw new Error(`Error ${response.status}: ${err.toString() || 'Gagal registrasi'}`);
              }
            } catch (jsonParseError) {
              // Jika bukan JSON valid, gunakan teks mentah
              console.error('JSON parsing error:', jsonParseError);
              
              // Coba deteksi pesan error dari teks HTML (jika server mengirim HTML error page)
              if (errorText.includes('<!DOCTYPE html>')) {
                // Ini adalah halaman HTML, ekstrak pesan error jika mungkin
                if (response.status === 405) {
                  throw new Error('Metode HTTP tidak diizinkan (405). Gunakan endpoint yang benar untuk registrasi.');
                } else if (response.status === 404) {
                  throw new Error('Endpoint tidak ditemukan (404). URL registrasi mungkin salah.');
                } else if (response.status === 500) {
                  throw new Error('Server mengalami kesalahan internal (500). Silakan coba lagi nanti.');
                } else {
                  throw new Error(`Error ${response.status}: Server mengembalikan halaman HTML bukan JSON`);
                }
              } else {
                // Gunakan teks mentah sebagai pesan error
                throw new Error(errorText || `Error ${response.status}: Gagal registrasi`);
              }
            }
          } else {
            // Response kosong
            if (response.status === 405) {
              throw new Error('Metode tidak diizinkan (405). Gunakan endpoint yang benar untuk registrasi.');
            } else if (response.status === 404) {
              throw new Error('Endpoint tidak ditemukan (404). URL registrasi mungkin salah.');
            } else if (response.status === 500) {
              throw new Error('Server mengalami kesalahan internal (500). Silakan coba lagi nanti.');
            } else if (response.status === 413) {
              throw new Error('Ukuran file terlalu besar (413). Gunakan gambar yang lebih kecil.');
            } else {
              throw new Error(`Error ${response.status}: Server mengembalikan respons kosong`);
            }
          }
        } catch (responseError) {
          if (responseError instanceof Error) {
            throw responseError;
          } else {
            throw new Error(`Error ${response.status}: Server tidak merespon dengan benar`);
          }
        }
      }
      
      setSuccessMessage('Registrasi berhasil! Silakan login.');
      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      console.error('Registration error:', error);
      setError(typeof error === 'object' && error.message ? 
        error.message : 
        'Terjadi kesalahan saat registrasi. Silahkan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 pt-36 pb-20" style={{ backgroundImage: "url('/bghome4.jpg')" }}>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="text-3xl font-bold mb-6 text-center text-black bg-white">Sign Up</h2>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 relative text-center">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uname">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="uname"
            type="text"
            name="uname"
            value={formData.uname}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Konfirmasi Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        
        {/* Profile Picture Upload Section dengan ImageCropper */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Foto Profil (Opsional)
          </label>
          
          <div className="mt-2">
            {preview ? (
              <div className="w-full text-center">
                <div className="relative w-32 h-32 mx-auto mb-3 overflow-hidden rounded-full border-2 border-gray-200 shadow-md">
                  <img 
                    src={preview} 
                    alt="Cropped Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setCroppedImage(null);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm py-1 px-3 rounded"
                  >
                    Hapus Foto
                  </button>
                </div>
              </div>
            ) : (
              <ImageCropper onCropComplete={handleCroppedImage} />
            )}
          </div>
        </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Mendaftar...' : 'Daftar'}
          </button>
        
        <p className="text-center text-sm text-gray-600 mt-4">
          Sudah punya akun?{' '}
          <span
            className="text-red-600 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}