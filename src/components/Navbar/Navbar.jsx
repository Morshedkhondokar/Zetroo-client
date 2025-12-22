import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { FaRegHeart, FaSearch, FaBars } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useAuth();

  const links = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
    { name: "About", to: "/about" },

    { name: "Contact", to: "/contact" },
  ];

  if (!user) {
    links.push({ name: "Login", to: "/login" });
  } else {
    links.push({ name: "Dashboard", to: "/dashboard" });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", search);
  };

  return (
    <nav className="sticky top-0 z-50 px-3 lg:px-6 py-3 shadow-md bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="ZETROO Logo"
            className="w-10 h-10 object-contain"
          />
          <h2 className="text-xl md:text-2xl font-extrabold font-brand">
            ZETROO
          </h2>
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

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <form
            onSubmit={handleSubmit}
            className="hidden lg:flex"
          >
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-10">
              <input
                type="text"
                placeholder="Search in ZETROO"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 p-4  bg-[#F5F5F5] focus:outline-none"
              />
              <button className="p-4 bg-[#DB4444] text-white">
                <FaSearch />
              </button>
            </div>
          </form>

          {/* Wishlist & Cart */}
          <div className="flex items-center gap-4 text-2xl">
            <div className="relative">
              <FaRegHeart />
              <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white h-5 w-5 rounded-full flex items-center justify-center">
                20
              </span>
            </div>
            <Link
              to={"/cart"}
              className="relative"
            >
              <IoCartOutline />
              <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white h-5 w-5 rounded-full flex items-center justify-center">
                4
              </span>
            </Link>
            {/* profile */}
            {user && (
              <div
                onClick={logOut}
                className="h-8 w-8 rounded-full bg-green-400 overflow-hidden cursor-pointer"
              >
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Right Section */}
        <div className="md:hidden flex items-center gap-4 text-2xl">
          {/* Wishlist */}
          <div className="relative">
            <FaRegHeart />
            <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white h-5 w-5 rounded-full flex items-center justify-center">
              20
            </span>
          </div>

          {/* Cart */}
          <Link
            to={"/cart"}
            className="relative"
          >
            <IoCartOutline />
            <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white h-5 w-5 rounded-full flex items-center justify-center">
              4
            </span>
          </Link>

          {/* Menu */}
          <button onClick={() => setMenuOpen(true)}>
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileMenu
        links={links}
        menuOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
