import { Link } from "react-router";
import logo from "../../../assets/logo.png";
import {
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiBarChart2,
  FiBox,
  FiPlusCircle,
  FiClipboard,
} from "react-icons/fi";
import SidebarLink from "./SidebarLink";

const DashboardSidebar = ({ role }) => {
  const isAdmin = role === "admin";

  return (
    <div className="sticky top-0 left-0 w-64 h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <Link
        to="/"
        className="p-4 border-b"
      >
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="ZETROO Logo"
            className="w-10 h-10"
          />
          <h2 className="text-xl font-extrabold font-brand">ZETROO</h2>
        </div>
      </Link>

      {/* Menu */}
      <div className="flex-1 p-4 space-y-6">
        {/* ================= ADMIN ================= */}
        {isAdmin && (
          <div>
            <p className="sidebar-title">Admin Panel</p>
            <SidebarLink
              to="/dashboard/statistics"
              icon={<FiBarChart2 />}
              text="Statistics"
            />
            <SidebarLink
              to="/dashboard/add-product"
              icon={<FiPlusCircle />}
              text="Add Product"
            />
            <SidebarLink
              to="/dashboard/manage-products"
              icon={<FiBox />}
              text="Manage Products"
            />
            <SidebarLink
              to="/dashboard/manage-orders"
              icon={<FiClipboard />}
              text="Manage Orders"
            />
            <SidebarLink
              to="/dashboard/manage-users"
              icon={<FiUser/>}
              text="Manage Users"
            />
          </div>
        )}

        {/* ================= USER ================= */}
        {!isAdmin && (
          <div>
            <p className="sidebar-title">User Panel</p>
            <SidebarLink
              to="/dashboard/my-orders"
              icon={<FiShoppingCart />}
              text="My Orders"
            />
            <SidebarLink
              to="/dashboard/wishlist"
              icon={<FiHeart />}
              text="Wishlist"
            />
          </div>
        )}
      </div>

      {/* ================= COMMON ================= */}
      <div className="p-4 border-t">
        <SidebarLink
          to="/dashboard/profile"
          icon={<FiUser />}
          text="Profile"
        />
      </div>
    </div>
  );
};

export default DashboardSidebar;
