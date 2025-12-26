import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ProductSidebar from "../../components/products/ProductSidebar";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import Card from "../../components/ProductsCard/Card";
import { useSearchParams } from "react-router";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const axiosCommon = useAxiosCommon();

  // ✅ Filters state (categories, brands, discount)
  const [filters, setFilters] = useState({
    categories: searchParams.get("categories")?.split(",") || [],
    brands: searchParams.get("brands")?.split(",") || [],
    discount: searchParams.get("discount") || "",
  });

  useEffect(() => {
    const params = {};
    if (filters.categories.length)
      params.categories = filters.categories.join(",");
    if (filters.brands.length) params.brands = filters.brands.join(",");
    if (filters.discount) params.discount = filters.discount;

    setSearchParams(params);
  }, [filters]);

  //  Handle filter checkbox change (categories/brands/discount)
  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      //  Discount special case
      if (type === "discount") {
        return {
          ...prev,
          discount: prev.discount === value ? "" : value,
        };
      }

      const oldArray = prev[type];
      const exists = oldArray.includes(value);

      // Add or remove value from array
      const newArray = exists
        ? oldArray.filter((item) => item !== value)
        : [...oldArray, value];

      const updatedFilters = { ...prev, [type]: newArray };

      return updatedFilters;
    });
  };

  // Fetch products from backend using React Query
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", filters], // Depend on filters
    queryFn: async () => {
      const params = {
        categories: filters.categories.join(","),
        brands: filters.brands.join(","),
        discount: filters.discount,
      };
      const res = await axiosCommon.get("/products/filter", { params });
      return res.data;
    },
  });


  //  Loading state
  if (isLoading) return <Loading />;

  //  Error state
  if (isError) {
    toast.error(error.message);
    return (
      <div className="text-center text-red-500 mt-4">
        Something went wrong! Please try again.
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {/* Left Sidebar for filters */}
      <ProductSidebar
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      {/* Right Products Area */}
      {products.length > 0 ? (
        <div className="flex-1 p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Map through products and render Card for each */}
          {products.map((product) => (
            <Card
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <FiSearch className="text-gray-400 w-16 h-16 mb-4" />
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2 text-center">
            No Products Found
          </h2>
          <p className="text-gray-500 text-center max-w-xs">
            Sorry! No matches found. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
