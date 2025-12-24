const ProductSidebar = ({ onFilterChange }) => {

  // Fake categories and brands
  const categories = ["Mobile", "Laptop", "Tablet", "Smart Watch"];
  const brands = ["Apple", "Samsung", "Xiaomi", "HP"];

  return (
    <div className="w-64 shadow-md p-4">
        
      {/* Category */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-3">Category</h2>

        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => onFilterChange("categories", category)}
            />
            <span>{category}</span>
          </label>
        ))}

      </div>

      {/* Brand */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Brand</h2>

        {brands.map((brand) => (
          <label key={brand} className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => onFilterChange("brands", brand)}
            />
            <span>{brand}</span>
          </label>
        ))}

      </div>

    </div>
  );
};

export default ProductSidebar;
