import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Added icons
import UpdateProductModal from "../../../components/Dashboard/modal/UpdateProductModal";
import { imageUpload } from "../../../components/api/uploadImg";

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedProduct, setSelectedProduct] = useState(null);

  /* =======================
      GET PRODUCTS
  ======================== */
  const { 
    data: products = [], 
    isLoading: isProductsLoading, 
    isError: isProductsError 
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  /* =======================
      DELETE PRODUCT
  ======================== */
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/products/${id}`);
    },
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => toast.error(`Failed to delete product: ${error.message}`),
  });

  /* =======================
      UPDATE PRODUCT
  ======================== */
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      return axiosSecure.put(
        `/products/${selectedProduct._id}`,
        updatedData
      );
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setSelectedProduct(null); 
    },
    onError: (error) => toast.error(`Failed to update product: ${error.message}`),
  });

  /* =======================
      HANDLERS
  ======================== */
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete product: ${name}?`)) {
      deleteMutation.mutate(id);
    }
  };
  // modal open 
  const handleUpdate = (product) => {
    setSelectedProduct(product);
  };

  const handleUpdateSubmit = async (data) => {
  const updatedData = { ...data };
  if (data.image && data.image.length > 0) {
    // upload new image
    const imageUrl = await imageUpload(data.image[0]);
    updatedData.image = imageUrl;
  } else {
    // keep old image
    updatedData.image = selectedProduct.image;
  }

  updateMutation.mutate(updatedData);
};


  /* =======================
      HELPER FUNCTIONS
  ======================== */
  const getStockBadge = (stock) => {
    if (stock > 50) {
      return <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">In Stock</span>;
    } else if (stock > 0) {
      return <span className="px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">Low Stock ({stock})</span>;
    } else {
      return <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">Out of Stock</span>;
    }
  };
  
  // Check if a specific product is currently being deleted
  const isDeleting = (productId) => 
    deleteMutation.isPending && deleteMutation.variables === productId;


  /* =======================
      LOADING / ERROR / EMPTY STATES
  ======================== */
  if (isProductsLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-white rounded-xl shadow-lg m-4">
        <ImSpinner9 className="animate-spin text-4xl text-blue-600" />
        <p className="mt-4 text-gray-600 font-medium">Loading Products...</p>
      </div>
    );
  }

  if (isProductsError) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-red-50 rounded-xl shadow-lg m-4 border-l-4 border-red-500 p-6">
        <p className="text-xl font-bold text-red-800">Error Fetching Data</p>
        <p className="text-red-600 mt-2">Could not load products. Please try again.</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-white rounded-xl shadow-lg m-4 border-l-4 border-yellow-500 p-6">
        <p className="text-xl font-bold text-gray-700">No Products Found</p>
        <p className="text-gray-500 mt-2">Start by adding new products to your inventory.</p>
      </div>
    );
  }

  /* =======================
      UI: MAIN TABLE
  ======================== */
  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">📦 Product Inventory Management</h2>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status / Stock</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  {/* Image Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img 
                      src={product.image || "https://via.placeholder.com/50x50?text=No+Image"} 
                      alt={product.name} 
                      className="h-10 w-10 rounded-full object-cover" 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span className="font-mono">${product.price.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStockBadge(product.stock)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <div className="flex justify-center items-center gap-3">
                        {/* Update Button */}
                        <button
                            onClick={() => handleUpdate(product)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition duration-150"
                            title="Edit Product"
                        >
                            <FaEdit className="w-5 h-5" />
                        </button>

                        {/* Delete Button with Loading State */}
                        <button
                            onClick={() => handleDelete(product._id, product.name)}
                            disabled={isDeleting(product._id)}
                            className={`p-2 rounded-full transition duration-150 ${
                                isDeleting(product._id)
                                ? "bg-red-300 cursor-not-allowed"
                                : "text-red-600 hover:text-white hover:bg-red-600"
                            }`}
                            title="Delete Product"
                        >
                            {isDeleting(product._id) ? (
                                <ImSpinner9 className="animate-spin w-5 h-5" />
                            ) : (
                                <FaTrashAlt className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table >
        </div>
      </div>

      {/* =======================
          UPDATE MODAL (Assumes the improved modal from prior request)
      ======================== */}
      <UpdateProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSubmit={handleUpdateSubmit}
        isLoading={updateMutation.isPending}
      />
    </div>
  );
};

export default ManageProducts;