import { Link } from "react-router";
import { getFinalPrice } from "../api/price";

const Card = ({ product }) => {
  const { _id, name, price, image, ratings, discount} = product;



   const finalPrice = getFinalPrice(price, discount);
  const hasDiscount = discount > 0;

  return (
    <Link to={`/productsDetails/${_id}`}>
      <div className="relative bg-white rounded-xl overflow-hidden 
      shadow-sm hover:shadow-md transition flex flex-col h-full">

        {/* Image */}
        <div className="relative bg-gray-100 rounded-t-xl">
          <img
            src={image}
            alt={name}
            className="w-full h-36 sm:h-40 object-cover"
          />

          {/* Discount Badge (only if discount exists) */}
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs 
            font-bold px-2 py-1 rounded">
              -{discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3">
          <h2 className="text-sm md:text-xl font-semibold text-gray-800 line-clamp-2">
            {name}
          </h2>

          {/* Price Section */}
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`font-bold text-sm  text-red-500`}
            >
              ${finalPrice}
            </span>

            {hasDiscount && (
              <span className="text-gray-400 text-sm line-through">
                ${Math.round(price)}
              </span>
            )}
          </div>

          {/* Ratings */}
          <div className="mt-1 flex items-center gap-1 text-sm">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-gray-400">({ratings})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
