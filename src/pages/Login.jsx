// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sementara: validasi dummy
    if (formData.email && formData.password) {
      alert('Login sukses!');
      navigate('/'); // Arahkan ke home atau dashboard
    } else {
      alert('Mohon isi email dan password');
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

        <form onSubmit={handleSubmit} className="space-y-4">
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
      className="form-checkbox h-4 w-4 text-red-500 border-gray-300 rounded"
    />
    <span>Keep me signed in</span>
  </label>

  {/* Forgot password link */}
  <Link to="/forgotpassword" className="text-sm text-red-500 hover:underline">
  Forgot your password?
</Link>

</div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Log In
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
