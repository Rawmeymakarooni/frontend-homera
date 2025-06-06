import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email) {
      // Arahkan ke halaman verifikasi dengan mengirim email via state
      navigate('/verifycode', { state: { email } });
    } else {
      alert('Mohon masukkan email terlebih dahulu.');
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 pt-36 pb-20"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center text-black bg-white">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please write your email to receive a confirmation code to set a new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 mb-6 text-black bg-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
