
import React from 'react';
import { Input } from '@/components/ui/input';

function Footer() {
  return (
<footer className="bg-[#b4906b]/30 px-24 py-12 text-sm text-gray-700 grid grid-cols-4 gap-10">
        <div>
          <h4 className="font-bold text-lg text-[#b4906b]">HOMÉRA</h4>
          <p className="mt-2">Homera is a platform to discover interior design inspirations and collaborate with top designers.</p>
          <p className="mt-2">📞 0857 7926 7830</p>
          <p>✉️ homera@houseinterior.com</p>
        </div>
        <div>
          <h4 className="font-bold text-[#b4906b]">MENU</h4>
          <ul className="mt-2 space-y-1">
            <li>Home</li>
            <li>About Us</li>
            <li>Explore</li>
            <li>Designer</li>
            <li>Blogs</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[#b4906b]">FOLLOW US</h4>
          <div className="flex space-x-3 mt-2">
            <img src="/icons/ig.svg" alt="IG" className="w-5 h-5" />
            <img src="/icons/youtube.svg" alt="YT" className="w-5 h-5" />
            <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5" />
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-[#b4906b]">STAY CONNECTED</h4>
          <div className="flex mt-2">
            <Input placeholder="Your email" className="rounded-l-full border-gray-300" />
            <button className="bg-[#b4906b] text-white px-4 rounded-r-full">Send</button>
          </div>
        </div>
      </footer>
  );
}

export default Footer;