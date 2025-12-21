import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";

const FlashSaleProductCard = ({ product }) => {
  const { id, title, price, img, rating, review, discount } = product;

  // Calculate discounted price and round it to whole number
  const discountedPrice = Math.round(price - (price * discount) / 100);

  return (
    <Link to={`/productsDetails/${id}`}>
      <div className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full">
        {/* Image */}
        <div className="relative bg-gray-100 rounded-t-xl">
          <img
            src={img}
            alt={title}
            className="w-full h-36 sm:h-40 object-cover"
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3">
          <h2 className="text-sm md:text-xl font-semibold text-gray-800 leading-snug line-clamp-2">
            {title}
          </h2>

          {/* Price */}
          <div className="mt-1 flex items-center gap-2">
            <span className="text-red-500 font-bold text-sm">${discountedPrice}</span>
            {discount > 0 && (
              <span className="text-gray-400 text-sm line-through">
                ${Math.round(price)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="mt-1 flex items-center gap-1 text-sm">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-gray-400">({review})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FlashSaleProductCard;
