import { useContext } from "react";
import { FaHeartBroken, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import { WishlistContext } from "../../../Provider/WishlistProvider";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  // Empty wishlist
  if (wishlist.length === 0) {
    return (
      <section className="py-20 text-center">
        <FaHeartBroken className="text-6xl mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">
          Browse products and add your favorite items ❤️
        </p>
        <Link
          to="/products"
          className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Explore Products
        </Link>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">
          My Wishlist ({wishlist.length})
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {wishlist.map((item) => (
            <div
              key={`${item.id}-${item.color}`}
              className="bg-white rounded-lg border hover:shadow transition"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-contain p-2"
              />

              {/* Info */}
              <div className="px-3 pb-3 space-y-1">
                <h3 className="text-sm font-semibold truncate">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-500">
                  Color: {item.color}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-red-600 font-bold text-sm">
                    ${item.price}
                  </p>

                  <button
                    onClick={() =>
                      removeFromWishlist(item.id, item.color)
                    }
                    className="text-gray-400 hover:text-red-600"
                    title="Remove from wishlist"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
