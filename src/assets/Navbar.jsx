import { FaUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#8C6D5A] text-white">
      {/* Logo */}
      <div className="font-bold text-xl">
        <span className="bg-white text-[#8C6D5A] px-2 py-1 rounded-sm">HOMÉRA</span>
      </div>

      {/* Menu */}
      <ul className="flex gap-8 text-sm font-medium">
        <li>Home</li>
        <li>About Us</li>
        <li>Explore</li>
        <li>Designer</li>
        <li>Blogs</li>
      </ul>

      {/* Search & Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-white rounded-full px-3 py-1">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white placeholder-white text-sm"
          />
          <FiSearch className="ml-2" />
        </div>
        <FaUser />
      </div>
    </nav>
  );
}

export default Navbar;
