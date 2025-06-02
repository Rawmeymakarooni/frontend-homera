// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan konfirmasi tidak sama");
      return;
    }
    // Lanjutkan ke proses register (bisa simpan ke backend atau localStorage)
    alert('Registrasi berhasil!');
    navigate('/login'); // Redirect ke login page
  };

 return (
  <div
    className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 pt-36 pb-20"
    style={{
      backgroundImage: "url('/bghome4.jpg')" }}
  >
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-black bg-white">Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block mb-2 font-semibold text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4 text-black bg-white"
          required
        />

        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4 text-black bg-white"
          required
        />

        <label className="block mb-2 font-semibold text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4 text-black bg-white"
          required
        />

        <label className="block mb-2 font-semibold text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-6 text-black bg-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Sign Up
        </button>
      </form>


      <p className="text-center text-sm text-black bg-white">
        Already have an account?{" "}
        <span
          className="text-red-600 hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Log in
        </span>
      </p>

      <p className="text-center text-[10px] text-gray-400 mt-4">
        By logging in, you agree to Homéra’s Terms & Conditions and Privacy Policy
      </p>
    </div>
  </div>
);
}
