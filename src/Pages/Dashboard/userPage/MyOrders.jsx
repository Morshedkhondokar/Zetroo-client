import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../components/hooks/useAuth";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import { FaClipboardList, FaSpinner } from "react-icons/fa";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user.email}`);
      return res.data;
    },
  });

  // Helper function for status badges
  const getStatusBadge = (status) => {
    let classes = "";
    switch (status?.toLowerCase()) {
      case "pending":
        classes = "bg-yellow-100 text-yellow-700";
        break;
      case "delivered":
        classes = "bg-green-100 text-green-700";
        break;
      // ... Add other statuses as needed
      default:
        classes = "bg-gray-100 text-gray-700";
    }
    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${classes}`}>
        {status || 'Unknown'}
      </span>
    );
  };
  
  // Helper for date formatting
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /* FLATTEN DATA: 
    Create a single array of items, attaching the order metadata (date, status) 
    to each product for easy table rendering.
  */
  const items = orders.flatMap(order => 
    order.products.map(product => ({
      ...product, // Contains name, img, quantity, price
      orderId: order._id,
      orderDate: order.createdAt,
      orderStatus: order.deliveryStatus,
      // Use the image if available, otherwise a placeholder
      imageUrl: product.image || "https://via.placeholder.com/50x50?text=Item",
    }))
  );

  /* =======================
      LOADING / EMPTY STATES
  ======================== */
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <FaSpinner className="animate-spin text-4xl text-indigo-500 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Loading your items...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="p-10 text-center bg-white rounded-xl shadow-lg m-6">
        <FaClipboardList className="text-6xl text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700">No Purchased Items Found</h2>
        <p className="text-gray-500 mt-2">Your order history is currently empty.</p>
      </div>
    );
  }

  /* =======================
      UI
  ======================== */
  return (
    <div className="p-6">
      <header className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
          <FaClipboardList className="text-indigo-600" /> All Purchased Items ({items.length})
        </h1>
      </header>

      {/* --- ORDER ITEMS TABLE --- */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* NO WHITESPACE/NEWLINE INSIDE TR! */}
            <thead className="bg-gray-50"><tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Order Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Status</th>
            </tr></thead>
            
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item, index) => (
                // NO WHITESPACE/NEWLINE INSIDE TR!
                <tr key={`${item.orderId}-${index}`} className="hover:bg-indigo-50/50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    
                    {/* Image Column */}
                    <td className="px-6 py-4">
                        <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-12 h-12 object-cover rounded-md shadow-sm"
                        />
                    </td>
                    
                    {/* Product Name Column */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {item.name}
                    </td>
                    
                    {/* Quantity Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold">
                      {item.quantity}
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.orderDate)}
                    </td>
                    
                    {/* Status Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getStatusBadge(item.orderStatus)}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;