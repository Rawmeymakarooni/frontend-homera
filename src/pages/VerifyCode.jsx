import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function VerifyCode() {
  const location = useLocation();
  const email = location.state?.email || 'your email';
  const [codes, setCodes] = useState(['', '', '', '']);

  const handleChange = (e, index) => {
    const value = e.target.value.slice(-1); // Hanya 1 karakter
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Auto focus ke input selanjutnya
    if (value && index < 3) {
      const next = document.getElementById(`code-${index + 1}`);
      next?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const finalCode = codes.join('');
  
    if (finalCode.length < 4) {
      alert('Kode belum lengkap.');
      return;
    }
  
    alert(`Kode ${finalCode} berhasil diverifikasi!`);
    navigate('/newpassword');
  };
  

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 pt-36 pb-20"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Verification code sent to:
        </h2>
        <p className="text-red-600 font-medium mb-6">{email}</p>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-4">
            {codes.map((code, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={code}
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-12 text-center border border-gray-300 rounded text-xl text-black"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
