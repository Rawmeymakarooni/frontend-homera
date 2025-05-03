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
    <>
    <footer className="bg-[#C4B29A] px-16 py-10 text-sm text-[#5A4B38] grid grid-cols-4 gap-6">
      <div>
        <h4 className="font-bold text-lg text-[#5A4B38]">HOMÉRA</h4>
        <p className="mt-2">Homera is a platform to discover interior design inspirations and collaborate with top designers.</p>
        <p className="mt-2">📞 0857 7926 7830</p>
        <p>✉️ homera@houseinterior.com</p>
      </div>
      <div>
        <h4 className="font-bold text-[#5A4B38]">MENU</h4>
        <ul className="mt-2 space-y-1 text-[#5A4B38]">
          <li>Home</li>
          <li>About Us</li>
          <li>Explore</li>
          <li>Designer</li>
          <li>Blogs</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-[#5A4B38]">FOLLOW US</h4>
        <div className="flex space-x-2 mt-2">
        <i class="ri-instagram-line text-3xl"></i>
        <i class="ri-youtube-line text-3xl"></i>
        <i class="ri-twitter-x-line text-3xl"></i>
        <i class="ri-linkedin-fill text-3xl"></i>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-[#5A4B38]">STAY CONNECTED</h4>
        <div className="flex mt-2">
        <input
          type="email"
          placeholder="Your email"
          className="rounded-full border border-[#5A4B38] px-6 py-1 text-[#5A4B38] outline-none mr-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-[#5A4B38] text-white px-4 py-2 rounded-full focus:outline-none focus:ring-0 active:bg-[#4a3c2d]"
        >
          Send
        </button>
        </div>
      </div>
    </footer>

     {/* bagian credit */}
     <div className="bg-[#5A4B38] text-white text-center py-2 text-sm">
      <i className="ri-copyright-line mr-1"></i>
      2025 HOMÉRA. All rights reserved.
    </div>
    </>
  );
}

export default Footer;