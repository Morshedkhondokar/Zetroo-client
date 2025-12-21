import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";

const FlashSaleProducts = () => {
  return (
    <div className="p-4">
      {/* Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Card */}
        <Link to={'/productsDetails'}>
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition flex flex-col">
            {/* Image Section */}
            <div className="relative bg-gray-100 rounded-t-xl">
              <img
                src="https://i.pinimg.com/1200x/ab/76/d9/ab76d9b527d8c71f7eae7dcfe769c7d1.jpg"
                alt="ASUS Laptop"
                className="w-full h-36 sm:h-40 object-contain"
              />

              {/* Heart Icon */}
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:text-red-500 transition">
                <FaHeart size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-3">
              {/* Title */}
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 leading-snug">
                ASUS FHD Gaming Laptop
              </h2>

              {/* Price & Rating */}
              <div className="mt-1 flex flex-col justify-center gap-2">
                <span className="text-red-500 font-bold text-sm sm:text-base">
                  $700
                </span>
                <p className="text-yellow-400 text-sm">
                  ★★★★★
                  <span className="text-gray-400 ml-1.5">(325)</span>
                </p>
              </div>

              {/* Spacer pushes button to bottom */}
              <div className="flex-grow"></div>

              {/* Add to Cart Button */}
              <button className="mt-3 bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FlashSaleProducts;
