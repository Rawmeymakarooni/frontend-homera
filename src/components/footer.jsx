import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Footer() {
  const [email, setEmail] = useState('');
  const handleSend = () => {
    if (email.trim() === '') {
      alert('Email tidak boleh kosong!');
      return;
    }
    console.log("Email yang dikirim:", email);
    alert(`Email "${email}" berhasil dikirim!`);
    setEmail('');
  };

  return (
    <>
      <footer className="bg-[#C4B29A] px-6 md:px-16 py-10 text-sm text-[#5A4B38]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-10 max-w-[1200px] mx-auto">
          <div>
            <h4 className="font-bold text-lg">HOMÉRA</h4>
            <p className="mt-2">Homera is a platform to discover interior design inspirations and collaborate with top designers.</p>
            <p className="mt-2">📞 0857 7926 7830</p>
            <p>✉️ homera@houseinterior.com</p>
          </div>
          <div>
            <h4 className="font-bold">MENU</h4>
            <ul className="mt-2 space-y-1">
              <li><Link to="/Home" className="footer-link">Home</Link></li>
              <li><Link to="/about-us" className="footer-link">About Us</Link></li>
              <li><Link to="/Explore" className="footer-link">Explore</Link></li>
              <li><Link to="/Designer" className="footer-link">Designer</Link></li>
              <li><Link to="/blogs" className="footer-link">Blogs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">FOLLOW US</h4>
            <div className="flex space-x-3 mt-2 text-2xl">
              <i className="ri-instagram-line"></i>
              <i className="ri-youtube-line"></i>
              <i className="ri-twitter-x-line"></i>
              <i className="ri-linkedin-fill"></i>
            </div>
          </div>
          <div>
            <h4 className="font-bold">STAY CONNECTED</h4>
            <div className="flex flex-wrap mt-2 gap-1">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-[150px] rounded-full border border-[#5A4B38] px-6 py-1 text-[#5A4B38] outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleSend}
                className="bg-[#5A4B38] text-white px-4 py-2 rounded-full hover:bg-[#4a3c2d] transition"
              >
                Send
              </button>
            </div>
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
