/**
 * API Service untuk Frontend Homera
 * Berisi fungsi-fungsi untuk mengakses API backend
 */

// Base URL API - menggunakan environment variable atau fallback ke proxy
const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Ambil 5 user random status Post yang punya portofolio aktif
 * @returns {Promise<Array>} daftar user
 */


/**
 * Ambil daftar portofolio berdasarkan kategori (atau semua)
 * @param {string} category - kategori (all, living, bath, bed, kitchen, terrace, pool)
 * @returns {Promise<Array>} daftar portofolio
 */


/**
 * Ambil detail designer by UID
 * @param {number|string} uid
 * @returns {Promise<Object>} data designer
 */
export async function getDesignerDetailsByUid(uid) {
  const res = await fetch(`${API_URL}/designerdetails?uid=${uid}`);
  if (!res.ok) {
    throw new Error('Gagal mengambil detail designer');
  }
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Gagal mengambil detail designer');
  return data.data;
}

/**
 * Ambil daftar portofolio khusus Explore (kategori, cover, user)
 * @param {string} category - kategori (all, living, bath, bed, kitchen, terrace, pool)
 * @returns {Promise<Array>} daftar portofolio
 */
export async function getExplorePortofoliosByCategory(category) {
  const res = await fetch(`${API_URL}/portofolio/explore/${category}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Gagal mengambil data explore portofolio');
  }
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    console.error('Expected JSON, got:', text);
    throw new Error('Response bukan JSON, kemungkinan proxy/frontend salah URL atau backend error');
  }
  try {
    const data = await res.json();
    // Jika backend pakai {data: ...} atau array langsung
    return Array.isArray(data) ? data : (data.data || []);
  } catch (e) {
    const text = await res.text();
    console.error('Gagal parse JSON:', text);
    throw new Error('Gagal parse JSON dari backend');
  }
}

export async function getPortofoliosByCategory(category) {
  const res = await fetch(`${API_URL}/portofolio/category/${category}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Gagal mengambil data portofolio');
  }
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    console.error('Expected JSON, got:', text);
    throw new Error('Response bukan JSON, kemungkinan proxy/frontend salah URL atau backend error');
  }
  try {
    const data = await res.json();
    // Jika backend pakai {data: ...} atau array langsung
    return Array.isArray(data) ? data : (data.data || []);
  } catch (e) {
    const text = await res.text();
    console.error('Gagal parse JSON:', text);
    throw new Error('Gagal parse JSON dari backend');
  }
}

export async function getHomePortos() {
  console.log('Fetching home portos from:', `${API_URL}/home-portos`);
  const res = await fetch(`${API_URL}/home-portos`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    },
  });
  if (!res.ok) {
    throw new Error('Gagal mengambil data portofolio home');
  }
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    console.error('Expected JSON, got:', text);
    throw new Error('Response bukan JSON, kemungkinan proxy/frontend salah URL atau backend error');
  }
  try {
    const data = await res.json();
    return Array.isArray(data) ? data : (data.data || []);
  } catch (e) {
    const text = await res.text();
    console.error('Gagal parse JSON:', text);
    throw new Error('Gagal parse JSON dari backend');
  }
}

export async function getRandomPostUsers() {
  const res = await fetch(`${API_URL}/randompost`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Gagal mengambil data featured users');
  }
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    console.error('Expected JSON, got:', text);
    throw new Error('Response bukan JSON, kemungkinan proxy/frontend salah URL atau backend error');
  }
  try {
    const data = await res.json();
    return data.users || [];
  } catch (e) {
    const text = await res.text();
    console.error('Gagal parse JSON:', text);
    throw new Error('Gagal parse JSON dari backend');
  }
}

/**
 * Helper fetch untuk endpoint yang butuh login:
 * - Otomatis kirim Authorization: Bearer <token>
 * - Jika 401, otomatis refresh token dan retry sekali
 * - Selalu kirim credentials: 'include'
 *
 * @param {string} url - endpoint url
 * @param {object} options - fetch options (method, headers, body, dsb)
 * @returns {Promise<Response>} fetch response
 */
export async function authFetch(url, options = {}) {
  let token = localStorage.getItem('accessToken');
  let headers = {
    ...(options.headers || {}),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
  let fetchOptions = {
    ...options,
    headers,
    credentials: 'include',
  };
  // Ensure URL has API_URL prefix if it's not an absolute URL
  const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;
  let response = await fetch(fullUrl, fetchOptions);
  if (response.status === 401) {
    // Coba refresh token sekali
    try {
      const refreshResult = await refreshToken();
      if (refreshResult && refreshResult.token) {
        localStorage.setItem('accessToken', refreshResult.token);
        token = refreshResult.token;
        headers = {
          ...(options.headers || {}),
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        };
        fetchOptions = {
          ...options,
          headers,
          credentials: 'include',
        };
        response = await fetch(url, fetchOptions);
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
    } catch (err) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      throw err;
    }
  }
  return response;
}

/**
 * Fungsi register user baru
 * @param {Object} userData - data user untuk register
 * @param {string} userData.uname - username 
 * @param {string} userData.email - email
 * @param {string} userData.password - password
 * @param {string} userData.confirmPassword - konfirmasi password
 * @param {File} userData.ppict - foto profil (opsional)
 * @returns {Promise} - hasil register dari API
 */
export const registerUser = async (userData) => {
  try {
    // Gunakan FormData karena backend mengharapkan multipart/form-data untuk file
    const formData = new FormData();
    
    // Pastikan semua field sesuai ekspektasi backend
    if (!userData.uname) {
      throw new Error('Username tidak boleh kosong');
    }
    if (!userData.email) {
      throw new Error('Email tidak boleh kosong');
    }
    if (!userData.password) {
      throw new Error('Password tidak boleh kosong');
    }
    if (!userData.confirmPassword) {
      throw new Error('Konfirmasi password tidak boleh kosong');
    }
    if (userData.password !== userData.confirmPassword) {
      throw new Error('Password dan konfirmasi password tidak cocok');
    }
    
    formData.append('uname', userData.uname);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('confirmPassword', userData.confirmPassword);
    
    // Tambahkan file foto jika ada
    if (userData.ppict) {
      // Pastikan ini adalah objek File yang valid
      if (!(userData.ppict instanceof File)) {
        console.warn('ppict bukan objek File yang valid');
      }
      formData.append('ppict', userData.ppict);
    }
    
    // Debug: Log FormData (tidak bisa langsung di-log)
    console.log('Form keys being sent:');
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1] instanceof File ? `File: ${pair[1].name} (${pair[1].type}, ${pair[1].size} bytes)` : pair[1]}`);
    }
    
    // Hapus log yang tidak digunakan lagi
    
    try {
      console.log('Sending registration request to:', `${API_URL}/register`);
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: formData,
        // Jangan set Content-Type karena browser akan otomatis set boundary untuk FormData
        // credentials: 'include' untuk menerima cookie dari server
        credentials: 'include'
      });
      
      console.log('Response status:', response.status);
      
      // Baca response sebagai text terlebih dahulu
      const responseText = await response.text();
      console.log('Raw response text:', responseText);
      
      // Coba parse sebagai JSON jika response tidak kosong
      let responseData;
      try {
        if (responseText) {
          responseData = JSON.parse(responseText);
          console.log('Parsed JSON response:', responseData);
        } else {
          responseData = { message: 'No response data' };
        }
      } catch (e) {
        console.warn('Response is not valid JSON:', e);
        responseData = { message: responseText || 'Invalid response format' };
      }
      
      if (!response.ok) {
        // Error dari server dengan status code error (4xx/5xx)
        const errorMsg = responseData.message || `Registration failed with status ${response.status}`;
        console.error('Server returned error:', errorMsg, responseData);
        throw new Error(errorMsg);
      }
      
      return responseData;
    } catch (error) {
      // Tangkap semua error termasuk error jaringan (network) dan CORS
      console.error('Registration failed:', error.name, error.message);
      // Jika error tidak memiliki message yang informatif, berikan pesan yang lebih jelas
      if (!error.message || error.message === '{}') {
        throw new Error('Tidak dapat menghubungi server. Periksa koneksi Anda atau server mungkin sedang tidak aktif.');
      }
      throw error;
    }
  } catch (error) {
    console.error('Register error caught in outer try-catch:', error);
    throw error;
  }
};

/**
 * Fungsi login user
 * @param {Object} credentials - data login
 * @param {string} credentials.uname - username atau email
 * @param {string} credentials.password - password
 * @returns {Promise} - hasil login dari API
 */
/**
 * Fungsi login user
 * @param {Object} credentials - data login
 * @param {string} credentials.uname - username atau email
 * @param {string} credentials.password - password
 * @param {boolean} [credentials.setCookie] - jika true, cookie long-lived (keep me logged in), jika false, session-only
 * @returns {Promise} - hasil login dari API, termasuk token dan refreshToken
 */
export const loginUser = async (credentials) => {
  try {
    console.log('Login attempt with:', credentials.uname || credentials.email);
    const uname = credentials.uname || credentials.email;
    
    // Gunakan API URL yang dikonfigurasi untuk memastikan request dikirim ke backend yang benar
    const loginUrl = `${API_URL}/login`;
    console.log('Sending login request to:', loginUrl);
    
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uname,
        password: credentials.password,
        setCookie: credentials.setCookie === true // default true, jika undefined
      }),
      credentials: 'include'
    });

    console.log('Login response status:', response.status);
    
    // PENTING: Hanya baca response body satu kali
    // Clone response sebelum membaca body jika perlu debugging
    if (!response.ok) {
      // Jika response tidak OK, kita perlu memeriksa apakah ada pesan error dari server
      const errorResponse = await response.text(); // Baca sebagai text untuk menghindari error parsing
      console.error('Login failed with status:', response.status, errorResponse);
      
      let errorMessage = `Login failed with status ${response.status}`;
      try {
        // Coba parse sebagai JSON jika memungkinkan
        const errorData = JSON.parse(errorResponse);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Jika bukan JSON valid, gunakan response text asli
        errorMessage = errorResponse || errorMessage;
      }
      
      throw new Error(errorMessage);
    }
    
    // Jika response OK, baca JSON data
    const data = await response.json();
    console.log('Login successful, token received');
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Fungsi mendapatkan profil user
 * @returns {Promise} - data profil dari API
 */
export const getUserProfile = async () => {
  try {
    const response = await authFetch(`${API_URL}/user/profile`, {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Gagal mengambil profil');
    }
    return data.data;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};


/**
 * Fungsi logout user
 * @returns {Promise} - hasil logout dari API
 */
export const logoutUser = async () => {
  try {
    const response = await authFetch(`${API_URL}/user/logout`, {
      method: 'POST',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Logout gagal');
    }
    return data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Fungsi refresh token
 * @returns {Promise} - token baru dari API
 */
export const refreshToken = async () => {
  try {
    const response = await fetch(`${API_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem('accessToken', data.token);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      throw new Error(data.message || 'Refresh token gagal');
    }
    return data;
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    throw error;
  }
};
