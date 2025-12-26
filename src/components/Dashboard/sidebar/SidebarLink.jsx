import { Link } from "react-router";

const SidebarLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{text}</span>
  </Link>
);

export default SidebarLink