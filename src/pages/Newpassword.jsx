import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      alert('Semua field harus diisi.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Password tidak cocok.');
      return;
    }

    // Di sini bisa kirim ke backend untuk update password, kalau ada
    alert('Password berhasil diubah! Silakan login kembali.');
    navigate('/login');
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 pt-36 pb-20"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black bg-white">
          Create New Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block mb-2 font-semibold text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded p-2 text-black bg-white"
            required
          />

          <label className="block mb-2 font-semibold text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded p-2 mb-6 text-black bg-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Confirm Password
          </button>
        </form>
      </div>
    </div>
  );
}
