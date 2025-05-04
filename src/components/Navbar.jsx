import { FaUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { useState } from "react";
import { Link } from 'react-router-dom';

function Navbar() {
  const[show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
    //console.log(show);
  };

  let menuActive = show ? "left-0" : "-left-full";

  return (
    <nav className="fixed flex items-center justify-between pl-7 pr-1 py-1 bg-[#8B7357] text-white w-full top-0 left-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 font-serif text-xl">
      <img src="/logo.png" alt="Homéra Logo" className="w-14 h-14 object-contain" />
       <span className="text-white">HOMÉRA</span>
      </div>

      {/* Menu */}
      <ul className={`flex lg:gap-10 md:static md:flex-row md:shadow-none md:bg-transparent md:w-auto md:h-full md:translate-y-0 md:p-0 md:m-0 md:transition-none gap-8 fixed ${menuActive} top-1/2 -translate-y-1/2 flex-col px-8 py-6 rounded shadow-lg shadow-slate-300 bg-amber-950 font-bold mr-15 list-none text-sm text-white transition-all`}>
        <li className="flex item-center gap-2">
          <i className="ri-home-5-line text-3xl md:hidden block"></i>
          <Link to="/Home">Home</Link>
        </li>
        <li className="flex item-center gap-3">
          <i className="ri-information-line text-3xl md:hidden block"></i>
          <Link to="/About-us">About Us</Link>
        </li>
        <li className="flex item-center gap-3">
          <i className="ri-compass-3-line text-3xl md:hidden block"></i>
          <Link to="/Explore">Explore</Link>
        </li>
        <li className="flex item-center gap-3">
          <i className="ri-team-line text-3xl md:hidden block"></i>
          <Link to="/Designer">Designer</Link>
        </li>
        <li className="flex item-center gap-3">
        <i className="ri-book-read-line text-3xl md:hidden block"></i>
          <Link to="/blogs">Blogs</Link>
        </li>
      </ul>

      {/* Search & Profile */}
      <div className="flex items-center ml-30 space-x-2 gap-2">
        <div className="flex border border-white rounded-full px-3 py-1">
          <input
            type="text"
            placeholder="Search for design, rooms, or designer..."
            className="bg-transparent outline-none text-white placeholder-white text-sm w-64"
          />
          <FiSearch className="w-5 h-5" />
        </div>
        <FaUser className="w-6 h-6" />
        <div className="flex item-center gap-2">
          <i className="ri-menu-3-line text-3xl md:hidden block" onClick={handleClick}></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
