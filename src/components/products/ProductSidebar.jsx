const ProductSidebar = ({ onFilterChange, currentFilters }) => {
  // Fake categories and brands
  const categories = ["mobile", "laptop", "tablet", "smart Watch"];
  const brands = ["apple", "samsung", "xiaomi", "hP"];

  return (
    <div className="w-64  p-4">
     
      {/* Discount */}
      <div className="border-b border-gray-300 py-2">
        <h2 className="font-semibold text-lg">Flash sale</h2>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            onChange={() => onFilterChange("discount", "true")}
            checked={currentFilters.discount === "true"}
          />
          <span>Flash sale</span>
        </label>
      </div>
     {/* Category */}
      <div className="mb-3">
        <h2 className="font-semibold text-lg">Category</h2>

        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              onChange={() => onFilterChange("categories", category)}
              checked={currentFilters.categories.includes(category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      {/* Brand */}
      <div className="border-t border-gray-300">
        <h2 className="font-semibold text-lg mt-2">Brand</h2>

        {brands.map((brand) => (
          <label
            key={brand}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              onChange={() => onFilterChange("brands", brand)}
              checked={currentFilters.brands.includes(brand)}
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProductSidebar;
