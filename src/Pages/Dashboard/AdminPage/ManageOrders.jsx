import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { FaClipboardList, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

// CHANGED: List of allowed order status options (
const ORDER_STATUSES = ["pending", "Shipped", "Delivered"];

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  /* =======================
      1. FETCH ORDERS (Read)
  ======================== */
  // Query to fetch all orders for the admin view
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      // Calls the backend GET /orders route
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  /* =======================
      2. UPDATE STATUS (Update)
  ======================== */
  // Mutation hook to handle updating the order status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, newStatus }) => {
      // Calls the backend PATCH
      return axiosSecure.patch(`/orders/status/${id}`, { status: newStatus });
    },
    onSuccess: (data, variables) => {
      // Order ID removed from toast message as requested
      toast.success(`Order status updated to ${variables.newStatus}`);
      // Invalidate the cache to refetch the updated order list immediately
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
    },
    onError: () => {
      toast.error("Failed to update order status.");
    },
  });

  // Handler for status change dropdown
  const handleStatusChange = (orderId, newStatus) => {
    updateStatusMutation.mutate({ id: orderId, newStatus });
  };

  // Helper function to render colored status badges
  const getStatusBadge = (status) => {
    let classes = "";

    if (status === "pending") {
      classes = "bg-yellow-100 text-yellow-700";
    } else if (status === "Shipped") {
      classes = "bg-indigo-100 text-indigo-700";
    } else if (status === "Delivered") {
      classes = "bg-green-100 text-green-700";
    } else {
      classes = "bg-gray-100 text-gray-700";
    }

    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${classes}`}
      >
        {status}
      </span>
    );
  };

  // Helper for consistent date formatting
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /* =======================
      LOADING / ERROR / EMPTY STATES
  ======================== */
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <p className="text-red-500 p-6">
        Failed to load order data. Check server connection.
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-10 text-center bg-white rounded-xl shadow-lg m-6">
        <FaClipboardList className="text-6xl text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700">No Orders Found</h2>
        <p className="text-gray-500 mt-2">
          There are currently no orders in the system to manage.
        </p>
      </div>
    );
  }

  /* =======================
      3. UI RENDER
  ======================== */
  return (
    <div className="p-6">
      <header className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
          <FaClipboardList className="text-red-600" /> Manage All Orders (
          {orders.length})
        </h1>
      </header>

      {/* --- ORDER TABLE --- */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* FIX: Ensure no whitespace between <tr> and <th> tags to prevent hydration error */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                  Current Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                  Update Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => {
                // Check if this specific order is currently being updated
                const isUpdating =
                  updateStatusMutation.isLoading &&
                  updateStatusMutation.variables?.id === order._id;

                // Get the name of the first product for easy identification
                const firstProductName =
                  order.products && order.products.length > 0
                    ? order.products[0].name
                    : "N/A";

                return (
                  // FIX: Ensure no whitespace between <tr> and <td> tags to prevent hydration error
                  <tr
                    key={order._id}
                    className="hover:bg-red-50/50 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {order.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {firstProductName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-green-700">
                      ${order.totalPrice ? order.totalPrice.toFixed(2) : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getStatusBadge(order.deliveryStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <select
                        value={order.deliveryStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        // Disable dropdown while API call is in progress
                        disabled={isUpdating}
                        className={`py-2 px-3 border rounded-lg text-sm font-medium transition ${
                          isUpdating
                            ? "bg-gray-200"
                            : "bg-white hover:border-red-500"
                        }`}
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                      {/* Show spinner next to dropdown if currently updating */}
                      {isUpdating && (
                        <FaSpinner className="animate-spin text-red-500 w-4 h-4 inline-block ml-2" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
