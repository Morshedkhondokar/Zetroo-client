import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { FaTrashAlt, FaSearch } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { useState } from "react"; 

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Example placeholder function for handling delete
  const handleDeleteUser = (user) => {
    // SECURITY CHECK: This check should also be done on the backend (server-side)
    if (user.role === 'admin') {
      alert(`Action Forbidden: Cannot delete user with the 'admin' role.`);
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete user: ${user.email}?`)) {
        alert(`Deleting user: ${user.email}`);
        // Logic for delete mutation/API call would go here
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) 
    ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function for Role Badges (unchanged)
  const getRoleBadge = (role) => {
    const roleClasses = {
      admin: "bg-blue-100 text-blue-800",
      guest: "bg-green-100 text-green-800",
      user: "bg-green-100 text-green-800",
      default: "bg-gray-100 text-gray-800",
    };
    const className = roleClasses[role] || roleClasses.default;
    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${className}`}>
        {role}
      </span>
    );
  };
  
  // Helper for simplified Date/Time formatting (unchanged)
  const formatUserDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /* =======================
      LOADING / ERROR STATES (unchanged)
  ======================== */
  if (isLoading) return <Loading />;
  if (isError) return (
    <div className="p-6 text-center bg-red-50 border border-red-200 rounded-xl m-4">
        <p className="text-xl font-semibold text-red-700">❌ Error loading user data.</p>
        <p className="text-red-500 mt-1">Please check the network connection or try again later.</p>
    </div>
  );

  /* =======================
      UI
  ======================== */
  return (
    <div className="p-6">
      {/* Header and Search Bar (unchanged) */}
      <header className="mb-6 flex justify-between items-center border-b pb-4">
        <h2 className="text-3xl font-extrabold text-gray-900">
          👥 Manage Users ({users.length})
        </h2>
        <span className="bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full text-lg font-bold">
            Total: {users.length}
        </span>
      </header>
      <div className="mb-6 relative max-w-lg">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Email or Role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
        />
      </div>


      {/* --- TABLE CONTAINER --- */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          {filteredUsers.length === 0 && users.length > 0 && (
            <div className="p-6 text-center text-gray-500">
                No users match your search criteria.
            </div>
          )}

          {filteredUsers.length === 0 && users.length === 0 && (
            <div className="p-10 text-center bg-yellow-50 border-l-4 border-yellow-500">
                <p className="text-lg font-semibold text-yellow-800">No Users in the System</p>
                <p className="text-yellow-600 mt-1">The user database is currently empty.</p>
            </div>
          )}

          {filteredUsers.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> 
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => {
                  // NEW LOGIC: Check if action should be disabled
                  const isAdmin = user.role === 'admin';
                  
                  return (
                    <tr
                      key={user._id}
                      className="hover:bg-indigo-50/50 transition duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatUserDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <div className="flex justify-center space-x-3">
                              {isAdmin ? (
                                  <span
                                    className="p-2 text-gray-400 cursor-not-allowed"
                                    title="Cannot delete an admin user"
                                  >
                                    <FaBan className="w-5 h-5" />
                                  </span>
                              ) : (
                                  <button
                                      onClick={() => handleDeleteUser(user)}
                                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"
                                      title="Delete User"
                                  >
                                      <FaTrashAlt className="w-5 h-5" />
                                  </button>
                              )}
                          </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;