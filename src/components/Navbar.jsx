import { FaUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { useState } from "react";

function Navbar() {
  const[show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
    //console.log(show);
  };

  let menuActive = show ? "left-0" : "-left-full";

  return (
    <nav className="fixed flex items-center justify-between px-8 py-4 bg-[#8C6D5A] text-white w-full top-0 left-0 z-50">
      {/* Logo */}
      <div className="font-bold text-xl">
        <span className="bg-white text-[#8C6D5A] px-2 py-1 rounded-sm">HOMÉRA</span>
      </div>

      {/* Menu */}
      <ul className={`flex lg:gap-12 md:static md:flex-row md:shadow-none md:bg-transparent md:w-auto md:h-full md:translate-y-0 md:p-0 md:m-0 md:transition-nonegap-8 fixed ${menuActive} top-1/2 -translate-y-1/2 flex-col px-8 py-6 rounded shadow-lg shadow-slate-300 bg-amber-950 font-bold mr-15 list-none text-sm text-white transition-all`}>
        <li className="flex item-center gap-3">
          <i className="ri-home-5-line text-3xl md:hidden block"></i>
          <a  href="#">Home</a>
        </li>
        <li className="flex item-center gap-3">
          <i className="ri-information-line text-3xl md:hidden block"></i>
          <a href="#">About Us</a>
        </li>
        <li className="flex item-center gap-3">
          <i class="ri-compass-3-line text-3xl md:hidden block"></i>
          <a href="#">Explore</a>
        </li>
        <li className="flex item-center gap-3">
          <i class="ri-team-line text-3xl md:hidden block"></i>
          <a href="#">Designer</a>
        </li>
        <li className="flex item-center gap-3">
        <i class="ri-book-read-line text-3xl md:hidden block"></i>
          <a href="#">Blogs</a>
        </li>
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
        <div className="flext item-center gap-2">
          <i class="ri-menu-3-line text-3xl md:hidden block" onClick={handleClick}></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
