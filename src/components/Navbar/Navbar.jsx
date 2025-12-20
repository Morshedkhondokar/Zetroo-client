import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { FaRegHeart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
    { name: "About", to: "/about" },
    { name: "Dashboard", to: "/dashboard" },
    { name: "Contact", to: "/contact" },
    { name: "Login", to: "/login" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchTerm);
  };

  return (
    <nav className="sticky top-0 z-50 pr-3 shadow-md lg:pr-6 py-3 flex items-center justify-between bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="ZETROO Logo"
          className="w-12 h-12 object-contain "
        />
        <h2 className="text-2xl font-extrabold font-brand">ZETROO</h2>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-6">
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `relative text-black 
                 after:block after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gray-800 after:transition-all
                 hover:after:w-full ${
                   isActive ? "after:w-full font-medium" : ""
                 }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Section Desktop */}
      <div className="hidden lg:flex items-center gap-4">
        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center"
        >
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-10">
            <input
              type="text"
              placeholder="Search in ZETROO"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 px-4 py-2 bg-[#F5F5F5] text-gray-800 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-[#DB4444] text-white hover:bg-[#e75757] cursor-pointer transition-colors flex items-center justify-center"
            >
              <FaSearch className="text-xl" />
            </button>
          </div>
        </form>

        {/* Cart & Wishlist */}
        <div className="flex items-center gap-4 text-gray-700 text-2xl">
          <div className="relative ">
            <FaRegHeart className="cursor-pointer " />
            <p className="absolute -top-3 -right-3 text-[10px] bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold ">
              20
            </p>
          </div>
          <div className="relative ">
            <IoCartOutline className="cursor-pointer " />
            <p className="absolute -top-3 -right-3 text-[10px] bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold ">
              4
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center ">
        <button onClick={() => setMenuOpen(true)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <MobileMenu
        links={links}
        closeMenu={() => setMenuOpen(false)}
        menuOpen={menuOpen}
      />
    </nav>
  );
};

export default Navbar;
