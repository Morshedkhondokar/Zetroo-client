import { useState } from "react"; // Import useState hook
import { FaHeart } from "react-icons/fa";

const ProductsDetails = () => {
  // State to track if the quantity selector should be visible
  const [isQuantitySelectorVisible, setIsQuantitySelectorVisible] = useState(false);
  // State to manage the product quantity
  const [quantity, setQuantity] = useState(1);

  // Function to handle Buy Now click
  const handleBuyNow = () => {
    // 1. Set the quantity to 1 (or add the product to cart)
    setQuantity(1);
    // 2. Show the quantity selector (hides the Buy Now button)
    setIsQuantitySelectorVisible(true);
    // Note: In a real app, this is where you'd add the item to the cart/state
  };

  // Function to increase quantity
  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Function to decrease quantity
  const handleDecreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : setIsQuantitySelectorVisible(false)));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-lg">
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <img
              className="w-full max-w-md rounded-xl object-cover"
              src="https://i.pinimg.com/736x/48/fd/b3/48fdb3578dc4a8d5c5b9544432eb0bc6.jpg"
              alt="iPhone 17 Pro Max"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">
              iPhone 17 Pro Max
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="text-gray-500">(150 Reviews)</span>
              <span className="text-green-600 font-medium">In Stock</span>
            </div>

            {/* Price */}
            <p className="text-3xl font-semibold text-red-600">$1,499</p>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              The iPhone 17 Pro Max display has rounded corners that follow a
              beautiful curved design. When measured as a standard rectangular
              shape, the screen is 6.86 inches diagonally (actual viewable area
              is less).
            </p>

            <hr />

            {/* Colors */}
            <div>
              <h3 className="font-semibold mb-3">Colors</h3>
              <div className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-black border cursor-pointer"></span>
                <span className="w-8 h-8 rounded-full bg-gray-400 border cursor-pointer"></span>
                <span className="w-8 h-8 rounded-full bg-blue-600 border cursor-pointer"></span>
                <span className="w-8 h-8 rounded-full bg-red-600 border cursor-pointer"></span>
              </div>
            </div>

            {/* Actions (Updated Section) */}
            <div className="flex flex-wrap items-center gap-4 mt-6">

              {/* Conditional Rendering based on isQuantitySelectorVisible */}
              {!isQuantitySelectorVisible ? (
                // --- Initial State: Buy Now and Wishlist ---
                <>
                  {/* Buy Now Button */}
                  <button
                    onClick={handleBuyNow} // Call the function to switch view
                    className="flex-1 min-w-[160px] px-8 py-4
                      bg-red-600 
                      text-white font-semibold rounded-xl
                      shadow-md hover:bg-red-700
                      transition-all duration-300 cursor-pointer"
                  >
                    Buy Now
                  </button>

                  {/* Wishlist Button */}
                  <button
                    className="w-14 h-14
                      border-2 border-gray-300 rounded-xl
                      flex items-center justify-center
                      text-gray-600 hover:text-red-600 hover:border-red-500 hover:bg-red-50
                      transition-all duration-300"
                  >
                    <FaHeart className="text-xl" />
                  </button>
                </>
              ) : (
                // --- Quantity Selector State (After Buy Now is clicked) ---
                <>
                  {/* Quantity Selector Group (Minus, Number, Plus) */}
                  <div className="flex border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                    {/* Minus Button */}
                    <button
                      onClick={handleDecreaseQuantity}
                      className="w-14 h-14 bg-white text-gray-700 font-semibold text-2xl
                        border-r border-gray-300 flex items-center justify-center
                        hover:bg-gray-100 disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      −
                    </button>

                    {/* Quantity Display */}
                    <span className="w-14 h-14 flex items-center justify-center text-lg font-semibold bg-white text-gray-900">
                      {quantity}
                    </span>

                    {/* Plus Button */}
                    <button
                      onClick={handleIncreaseQuantity}
                      className="w-14 h-14 bg-[#db4444] text-white font-semibold text-2xl
                        flex items-center justify-center
                        hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Buy Now Button (now smaller, next to quantity selector) */}
                  <button
                    className="flex-1 min-w-[160px] px-8 py-4 h-14
                      bg-[#db4444]
                      text-white font-semibold rounded-xl
                      shadow-md hover:bg-red-700
                      transition-all duration-300 cursor-pointer"
                  >
                    Buy Now
                  </button>
                  
                  {/* Wishlist Button (still present) */}
                   <button
                    className="w-14 h-14
                      border-2 border-gray-300 rounded-xl
                      flex items-center justify-center
                      text-gray-600 hover:text-red-600 hover:border-red-500 hover:bg-red-50
                      transition-all duration-300"
                  >
                    <FaHeart className="text-xl" />
                  </button>
                </>
              )}
              
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsDetails;