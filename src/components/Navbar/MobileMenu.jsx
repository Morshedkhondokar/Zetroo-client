import { NavLink } from "react-router";
import { IoClose } from "react-icons/io5";

const MobileMenu = ({ links, closeMenu, menuOpen }) => {
  return (
    <div
     className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transition duration-300 
      ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={closeMenu}>
          <IoClose className="text-3xl text-gray-700" />
        </button>
      </div>

      {/* Menu Links */}
      <ul className="flex flex-col items-center gap-6 mt-6">
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `relative text-lg font-medium text-gray-800
                 ${
                   isActive
                     ? "after:block after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-red-500"
                     : ""
                 }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
