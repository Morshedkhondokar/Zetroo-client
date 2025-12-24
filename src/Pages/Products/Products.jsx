import { useState } from "react";
import ProductSidebar from "../../components/products/ProductSidebar";

const Products = () => {
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
  });

  const handleFilterChange = (type, value) => {
    setFilters((previousFilters) => {
      // Get the previous array (categories or brands)
      const oldArray = previousFilters[type];

      // Check if the value already exists in the array
      const isAlreadyAdded = oldArray.includes(value);

      let newArray;

      if (isAlreadyAdded) {
        // If it exists, remove the value
        newArray = oldArray.filter((item) => item !== value);
      } else {
        // If it does not exist, add the value
        newArray = [...oldArray, value];
      }

      // Return the updated filters state
      return {
        ...previousFilters,
        [type]: newArray,
      };
    });
  };

  console.log(filters);

  return (
    <div className="flex gap-3 ">
      {/* Left */}
      <ProductSidebar onFilterChange={handleFilterChange} />

      {/* Right */}
      <div className="flex-1 rounded-lg p-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <p className="text-gray-500 mt-2">Products will show here...</p>
      </div>
    </div>
  );
};

export default Products;
