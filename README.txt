# DOKUMENTASI FRONTEND HOMERA

## INFORMASI UMUM

### Tentang Aplikasi
Homéra adalah platform yang menghubungkan pengguna dengan desainer interior. Aplikasi ini memungkinkan desainer untuk memamerkan portofolio mereka dan pengguna umum untuk menjelajahi desain interior.

### Teknologi
- React 18
- Vite sebagai build tool
- React Router untuk navigasi
- Axios untuk HTTP requests
- Tailwind CSS untuk styling
- React Icons untuk ikon
- JWT untuk autentikasi

### Struktur Direktori
```
Frontend/
├── public/          # Aset statis
├── src/
│   ├── assets/      # Gambar, font, dll
│   ├── components/  # Komponen React yang dapat digunakan kembali
│   ├── contexts/    # Context API untuk state management
│   ├── hooks/       # Custom hooks
│   ├── layouts/     # Layout komponen
│   ├── pages/       # Halaman utama
│   ├── services/    # Layanan API
│   ├── utils/       # Fungsi utilitas
│   ├── App.jsx      # Komponen utama
│   └── main.jsx     # Entry point
└── package.json     # Dependensi
```

## SETUP DAN INSTALASI

### Persyaratan
- Node.js versi 16.0.0 atau lebih tinggi
- NPM versi 8.0.0 atau lebih tinggi

### Langkah Instalasi
1. Clone repositori:
   ```
   git clone [URL_REPOSITORI]
   cd web_homera/Frontend
   ```

2. Install dependensi:
   ```
   npm install
   ```

3. Konfigurasi environment:
   - Buat file `.env` berdasarkan `.env.example`
   - Sesuaikan URL API backend

4. Jalankan aplikasi dalam mode development:
   ```
   npm run dev
   ```

5. Build untuk production:
   ```
   npm run build
   ```

### Konfigurasi
File `.env` harus berisi:
```
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## AUTENTIKASI DAN OTORISASI

### Sistem Autentikasi
- Aplikasi menggunakan JWT (JSON Web Token) untuk autentikasi
- Token disimpan di localStorage atau sessionStorage berdasarkan pilihan "Keep Me Logged In"
- Refresh token disimpan dengan key `refresh_token`
- Context API (`AuthContext`) mengelola state autentikasi

### Fitur "Keep Me Logged In"
- Jika "Keep Me Logged In" dicentang saat login:
  - Token disimpan di localStorage (bertahan setelah browser ditutup)
  - Flag `keepLogin` disimpan di localStorage sebagai `true`
- Jika tidak dicentang:
  - Token disimpan di sessionStorage (hilang saat browser ditutup)
  - Flag `keepLogin` disimpan di localStorage sebagai `false`
- Logika autentikasi:
  - User dianggap login jika: ada token DAN (keepLogin=true ATAU ada token sementara di sessionStorage)
  - User dianggap logout jika: tidak ada token ATAU (keepLogin=false DAN tidak ada token sementara)

### Level Akses
1. **Guest** - Pengunjung yang belum login
2. **View** - Pengguna terdaftar dengan akses dasar
3. **Post** - Desainer yang dapat mengunggah portofolio
4. **Admin** - Administrator dengan akses penuh

### Contoh Penggunaan AuthContext
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Cek apakah user sudah login
  if (isAuthenticated) {
    return <p>Selamat datang, {user.username}!</p>;
  }
  
  return <button onClick={login}>Login</button>;
}
```

## KOMPONEN UTAMA

### Layout

#### MainLayout
Layout utama yang digunakan di sebagian besar halaman.

```jsx
// Contoh penggunaan
import MainLayout from '../layouts/MainLayout';

function HomePage() {
  return (
    <MainLayout>
      <h1>Konten Halaman</h1>
    </MainLayout>
  );
}
```

#### AdminLayout
Layout khusus untuk halaman admin dengan sidebar navigasi.

### Komponen Umum

#### Button
Komponen button dengan variasi style.

```jsx
import Button from '../components/Button';

// Variasi: primary, secondary, outline, danger
<Button variant="primary" onClick={handleClick}>Klik Saya</Button>
```

#### Card
Komponen card untuk menampilkan informasi.

```jsx
import Card from '../components/Card';

<Card title="Judul Card">
  <p>Konten card</p>
</Card>
```

#### Modal
Komponen modal dialog.

```jsx
import Modal from '../components/Modal';

function Example() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Buka Modal</Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Judul Modal">
        <p>Konten modal</p>
      </Modal>
    </>
  );
}
```

#### Loading
Komponen loading spinner.

```jsx
import Loading from '../components/Loading';

// Ukuran: sm, md, lg
<Loading size="md" />
```

#### ProtectedRoute
Komponen untuk melindungi rute yang memerlukan autentikasi.

```jsx
import ProtectedRoute from '../components/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute requiredRole="Post">
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
```

## HALAMAN UTAMA

### Halaman Publik

#### HomePage
Halaman utama yang menampilkan portofolio unggulan dan desainer populer.

#### ExplorePage
Halaman untuk menjelajahi semua portofolio dengan filter kategori.

#### PortfolioDetailPage
Halaman detail portofolio yang menampilkan informasi lengkap tentang portofolio dan desainer.

#### DesignerListPage
Halaman yang menampilkan daftar semua desainer.

#### DesignerDetailPage
Halaman profil desainer yang menampilkan informasi dan portofolio desainer.

#### LoginPage
Halaman login dengan opsi login email dan Google OAuth.

#### RegisterPage
Halaman pendaftaran untuk pengguna baru.

### Halaman User

#### ProfilePage
Halaman profil pengguna untuk melihat dan mengedit informasi profil.

#### ChangePasswordPage
Halaman untuk mengubah password.

### Halaman Desainer

#### DashboardPage
Dashboard untuk desainer yang menampilkan ringkasan aktivitas.

#### MyPortfoliosPage
Halaman untuk mengelola portofolio desainer.

#### CreatePortfolioPage
Halaman untuk membuat portofolio baru.

#### EditPortfolioPage
Halaman untuk mengedit portofolio yang sudah ada.

### Halaman Admin

#### AdminDashboardPage
Dashboard untuk admin dengan ringkasan statistik.

#### UserManagementPage
Halaman untuk mengelola pengguna.

#### RequestApprovalPage
Halaman untuk menyetujui permintaan menjadi desainer.

## INTEGRASI API

### Service Layer

Aplikasi menggunakan pattern service layer untuk memisahkan logika API dari komponen UI. Semua interaksi dengan backend API dikelola melalui service yang berada di direktori `src/services/`.

### Struktur Service

#### authService.js
Menangani semua operasi terkait autentikasi.

```jsx
import axios from '../utils/axios';

const authService = {
  // Login dengan email dan password
  login: async (email, password) => {
    const response = await axios.post('/login', { email, password });
    return response.data;
  },
  
  // Register user baru
  register: async (userData) => {
    const response = await axios.post('/register', userData);
    return response.data;
  },
  
  // Logout
  logout: async () => {
    const response = await axios.post('/logout');
    return response.data;
  },
  
  // Refresh token
  refreshToken: async () => {
    const response = await axios.post('/refresh-token');
    return response.data;
  },
  
  // Login dengan Google
  googleLogin: async (tokenId) => {
    const response = await axios.post('/login-google', { token: tokenId });
    return response.data;
  }
};

export default authService;
```

#### userService.js
Menangani operasi terkait pengguna.

```jsx
import axios from '../utils/axios';

const userService = {
  // Mendapatkan profil user
  getProfile: async () => {
    const response = await axios.get('/profile');
    return response.data;
  },
  
  // Update profil user
  updateProfile: async (profileData) => {
    const response = await axios.put('/profile', profileData);
    return response.data;
  },
  
  // Update foto profil
  updateProfilePicture: async (formData) => {
    const response = await axios.put('/profile/picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  
  // Ubah password
  changePassword: async (passwordData) => {
    const response = await axios.put('/change-password', passwordData);
    return response.data;
  },
  
  // Hapus akun
  deleteAccount: async () => {
    const response = await axios.delete('/user');
    return response.data;
  }
};

export default userService;
```

#### portfolioService.js
Menangani operasi terkait portofolio.

```jsx
import axios from '../utils/axios';

const portfolioService = {
  // Mendapatkan semua portofolio
  getAllPortfolios: async (page = 1, limit = 8) => {
    const response = await axios.get(`/portofolio?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  // Mendapatkan portofolio berdasarkan kategori
  getPortfoliosByCategory: async (category, page = 1, limit = 8) => {
    const response = await axios.get(`/portofolio/category/${category}?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  // Mendapatkan detail portofolio
  getPortfolioDetail: async (portfolioId) => {
    const response = await axios.get(`/portofolio/${portfolioId}`);
    return response.data;
  },
  
  // Membuat portofolio baru
  createPortfolio: async (formData) => {
    const response = await axios.post('/portofolio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  
  // Update portofolio
  updatePortfolio: async (portfolioId, portfolioData) => {
    const response = await axios.put(`/portofolio/${portfolioId}`, portfolioData);
    return response.data;
  },
  
  // Hapus portofolio
  deletePortfolio: async (portfolioId) => {
    const response = await axios.delete(`/portofolio/${portfolioId}`);
    return response.data;
  }
};

export default portfolioService;
```

### Axios Instance

Aplikasi menggunakan instance Axios kustom untuk menangani interceptor dan header otomatis.

```jsx
// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor untuk menambahkan token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor untuk handle error dan refresh token
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Jika error 401 dan belum pernah retry
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Coba refresh token
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/refresh-token`,
          { refreshToken }
        );
        
        const { token } = response.data;
        localStorage.setItem('auth_token', token);
        
        // Retry original request dengan token baru
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (err) {
        // Jika refresh token gagal, logout
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
  }
);

export default instance;
```

## MANAJEMEN STATE

### Context API

Aplikasi menggunakan React Context API untuk manajemen state global. Beberapa context yang digunakan:

#### AuthContext
Mengelola state autentikasi dan informasi user.

```jsx
// src/contexts/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Cek autentikasi saat aplikasi dimuat
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          const response = await userService.getProfile();
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Login function
  const login = async (email, password) => {
    const response = await authService.login(email, password);
    const { token, refreshToken, user } = response.data;
    
    localStorage.setItem('auth_token', token);
    localStorage.setItem('refresh_token', refreshToken);
    
    setUser(user);
    setIsAuthenticated(true);
    
    return user;
  };
  
  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };
  
  // Google login
  const googleLogin = async (tokenId) => {
    const response = await authService.googleLogin(tokenId);
    const { token, refreshToken, user } = response.data;
    
    localStorage.setItem('auth_token', token);
    localStorage.setItem('refresh_token', refreshToken);
    
    setUser(user);
    setIsAuthenticated(true);
    
    return user;
  };
  
  // Update user data setelah profile update
  const updateUserData = async () => {
    const response = await userService.getProfile();
    setUser(response.data);
    return response.data;
  };
  
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    googleLogin,
    updateUserData
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
```

#### PortfolioContext
Mengelola state portofolio untuk halaman explore dan filter.

#### NotificationContext
Mengelola notifikasi dan pesan toast.

## ROUTING

### React Router

Aplikasi menggunakan React Router v6 untuk navigasi. Konfigurasi routing berada di `src/App.jsx`.

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExplorePage from './pages/ExplorePage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import DesignerListPage from './pages/DesignerListPage';
import DesignerDetailPage from './pages/DesignerDetailPage';

// User Pages
import ProfilePage from './pages/ProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';

// Designer Pages
import DashboardPage from './pages/DashboardPage';
import MyPortfoliosPage from './pages/MyPortfoliosPage';
import CreatePortfolioPage from './pages/CreatePortfolioPage';
import EditPortfolioPage from './pages/EditPortfolioPage';

// Admin Pages
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import RequestApprovalPage from './pages/RequestApprovalPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
            <Route path="/designers" element={<DesignerListPage />} />
            <Route path="/designer/:id" element={<DesignerDetailPage />} />
            
            {/* User Routes - Requires Authentication */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/change-password" 
              element={
                <ProtectedRoute>
                  <ChangePasswordPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Designer Routes - Requires Post Role */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="Post">
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-portfolios" 
              element={
                <ProtectedRoute requiredRole="Post">
                  <MyPortfoliosPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-portfolio" 
              element={
                <ProtectedRoute requiredRole="Post">
                  <CreatePortfolioPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-portfolio/:id" 
              element={
                <ProtectedRoute requiredRole="Post">
                  <EditPortfolioPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes - Requires Admin Role */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <UserManagementPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/requests" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <RequestApprovalPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
```

## UTILITIES

### Helpers dan Formatters

Aplikasi menggunakan beberapa fungsi helper untuk membantu operasi umum:

#### dateFormatter.js
Format tanggal ke format yang lebih user-friendly.

```jsx
// src/utils/dateFormatter.js
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

export const formatDateTime = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};
```

#### validation.js
Fungsi validasi untuk form.

```jsx
// src/utils/validation.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // Min 8 karakter, setidaknya 1 huruf dan 1 angka
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};

export const validateUsername = (username) => {
  // 3-20 karakter, hanya huruf, angka, dan underscore
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return re.test(username);
};
```

## PANDUAN PENGGUNAAN

### Untuk Pengguna Umum

1. **Menjelajahi Portofolio**
   - Kunjungi halaman utama untuk melihat portofolio unggulan
   - Gunakan halaman Explore untuk melihat semua portofolio
   - Filter portofolio berdasarkan kategori
   - Klik pada portofolio untuk melihat detail

2. **Menjelajahi Desainer**
   - Kunjungi halaman Designers untuk melihat daftar desainer
   - Klik pada desainer untuk melihat profil dan portofolio mereka

3. **Registrasi dan Login**
   - Klik tombol Register untuk membuat akun baru
   - Isi formulir dengan data yang valid
   - Setelah registrasi berhasil, login dengan email dan password
   - Atau gunakan opsi Login dengan Google

4. **Mengelola Profil**
   - Setelah login, klik avatar di navbar untuk akses dropdown menu profil
   - Menu dropdown berisi: "Lihat Profil", "Portofolio", dan "Logout"
   - Pilih "Lihat Profil" untuk melihat dan mengedit profil
   - Ubah foto profil dengan mengklik foto profil saat ini
   - Pilih "Change Password" untuk mengubah password
   - URL profil menggunakan format `/profil/{uid}` dimana uid diambil dari token JWT

### Untuk Desainer

1. **Menjadi Desainer**
   - Login ke akun
   - Klik "Become a Designer" di halaman profil
   - Tunggu persetujuan dari admin

2. **Mengelola Portofolio**
   - Setelah disetujui sebagai desainer, akses Dashboard
   - Klik "My Portfolios" untuk melihat portofolio yang telah dibuat
   - Klik "Create Portfolio" untuk membuat portofolio baru
   - Isi formulir dengan judul, kategori, deskripsi, dan cover
   - Tambahkan furnitur dengan nama, keterangan, dan foto
   - Klik "Edit" pada portofolio untuk mengubah detail
   - Klik "Delete" untuk menghapus portofolio

### Untuk Admin

1. **Dashboard Admin**
   - Login dengan akun admin
   - Akses dashboard admin melalui menu di navbar
   - Lihat statistik pengguna dan portofolio

2. **Mengelola Pengguna**
   - Klik "Users" di sidebar admin
   - Lihat daftar semua pengguna
   - Klik "Delete" untuk menghapus pengguna
   - Klik "Undelete" untuk memulihkan pengguna yang dihapus

3. **Mengelola Request**
   - Klik "Requests" di sidebar admin
   - Lihat daftar permintaan untuk menjadi desainer
   - Klik "Approve" untuk menyetujui permintaan
   - Klik "Reject" untuk menolak permintaan

## TROUBLESHOOTING

### Masalah Umum

1. **Tidak bisa login**
   - Pastikan email dan password benar
   - Periksa koneksi internet
   - Coba refresh halaman
   - Coba clear cache browser

2. **Gambar tidak muncul**
   - Pastikan backend server berjalan
   - Periksa URL gambar di developer tools
   - Pastikan CORS diatur dengan benar di backend

3. **Form tidak bisa disubmit**
   - Periksa validasi form, pastikan semua field diisi dengan benar
   - Periksa error di console browser
   - Pastikan backend server berjalan

### Kontak Support

Jika mengalami masalah teknis, hubungi tim Homéra melalui:
- Email: support@homera.com
- Discord: discord.gg/homera

---

## PENGEMBANGAN LANJUTAN

### Menambahkan Fitur Baru

1. Buat komponen baru di direktori `src/components/`
2. Tambahkan halaman baru di direktori `src/pages/`
3. Update routing di `src/App.jsx`
4. Tambahkan service baru jika diperlukan di `src/services/`

### Best Practices

1. Gunakan komponen yang reusable
2. Pisahkan logika bisnis dari komponen UI
3. Gunakan Context API untuk state global
4. Validasi input di frontend sebelum mengirim ke backend
5. Gunakan error handling yang konsisten

---

**Dokumentasi ini dibuat untuk tim pengembangan Homéra. Untuk informasi lebih lanjut, hubungi lead developer.**
