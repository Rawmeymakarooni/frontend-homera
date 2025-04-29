import { FaUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#8C6D5A] text-white w-full">
      {/* Logo */}
      <div className="font-bold text-xl">
        <span className="bg-white text-[#8C6D5A] px-2 py-1 rounded-sm">HOMÉRA</span>
      </div>

      {/* Menu */}
      <ul className="flex ml-10 space-x-13 list-none text-sm text-brown-800">
        <li className="hover:underline">Home</li>
        <li className="hover:underline">About Us</li>
        <li className="hover:underline">Explore</li>
        <li className="hover:underline">Designer</li>
        <li className="hover:underline">Blogs</li>
      </ul>

      {/* Search & Profile */}
      <div className="flex items-center ml-60 space-x-4 gap-6">
        <div className="flex border border-white rounded-full px-1 py-1">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white placeholder-white text-sm"
          />
          <FiSearch className="w-5 h-5" />
        </div>
        <FaUser />
      </div>
    </nav>
  );
}

export default Navbar;
