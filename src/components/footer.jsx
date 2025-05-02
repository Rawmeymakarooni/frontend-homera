import React, { useState } from "react";

function Footer() {
  const [email, setEmail] = useState('');
  const handleSend = () => {
    if (email.trim() === '') {
      alert('Email tidak boleh kosong!');
      return;
    }
  
    // Di sini kamu bisa sambungkan ke backend
    console.log("Email yang dikirim:", email);
    alert(`Email "${email}" berhasil dikirim!`);
    setEmail(''); // reset input
  };
  
  return (
    <footer className="bg-[#c4B29a] px-24 py-12 text-sm text-white-700 grid grid-cols-4 gap-10">
      <div>
        <h4 className="font-bold text-lg text-[#573c22]">HOMÉRA</h4>
        <p className="mt-2">Homera is a platform to discover interior design inspirations and collaborate with top designers.</p>
        <p className="mt-2">📞 0857 7926 7830</p>
        <p>✉️ homera@houseinterior.com</p>
      </div>
      <div>
        <h4 className="font-bold text-[#573c22]">MENU</h4>
        <ul className="mt-2 space-y-1 text-white">
          <li>Home</li>
          <li>About Us</li>
          <li>Explore</li>
          <li>Designer</li>
          <li>Blogs</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-[#573c22]">FOLLOW US</h4>
        <div className="flex space-x-3 mt-2">
        <i class="ri-instagram-line text-2xl"></i>
        <i class="ri-youtube-line text-2xl"></i>
        <i class="ri-twitter-x-line text-2xl"></i>
        <i class="ri-linkedin-fill text-2xl"></i>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-[#573c22]">STAY CONNECTED</h4>
        <div className="flex mt-2">
        <input
          type="email"
          placeholder="Your email"
          className="rounded-l-full border border-gray-300 px-2 py-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-[#b4906b] text-white px-4 rounded-r-full"
        >
          Send
        </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;