import { useState, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { CartContext } from "../../Provider/CartProvider";
import { WishlistContext } from "../../Provider/WishlistProvider";

const ProductsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosCommon.get(`/productDetails/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return toast.error(error.message);

  const { name, color, description, image, price, ratings } = product;

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  // buynow
  const handleBuyNow = () => {
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    const newItem = {
      id,
      name,
      price,
      image,
      color: selectedColor,
      quantity,
    };

    addToCart(newItem);

    navigate("/cart");
  };

  //  wishlist
  const handleWishlist = () => {
    if (!selectedColor) {
      toast.error("Please select a color first");
      return;
    }

    const wishlistItem = {
      id,
      name,
      price,
      image,
      color: selectedColor,
    };

    if (isInWishlist(id, selectedColor)) {
      removeFromWishlist(id, selectedColor);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(wishlistItem);
      toast.success("Added to wishlist");
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-lg">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={image}
              alt={name}
              className="w-full max-w-md rounded-xl"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">{name}</h1>
            <div className="flex gap-3 text-sm">
              <span className="text-yellow-400">★★★★★</span>
              <span>({ratings})</span>
            </div>
            <p className="text-3xl text-red-600 font-semibold">${price}</p>
            <p className="text-gray-600">{description}</p>

            {/* Colors */}
            <div>
              <h3 className="font-semibold mb-2">Colors</h3>
              <div className="flex gap-3">
                {color?.map((clr, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedColor(clr)}
                    style={{ backgroundColor: clr }}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2
                      ${
                        selectedColor === clr
                          ? "border-red-500 scale-110"
                          : "border-gray-300"
                      }`}
                  ></span>
                ))}
              </div>
            </div>

            {/* Quantity + Buy */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex border rounded-xl overflow-hidden">
                <button
                  onClick={decreaseQty}
                  disabled={quantity === 1}
                  className="w-14 h-14 bg-red-600 text-white text-2xl disabled:opacity-50"
                >
                  −
                </button>
                <span className="w-14 h-14 flex items-center justify-center font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={increaseQty}
                  className="w-14 h-14 bg-red-600 text-white text-2xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="flex-1 h-14 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700"
              >
                Buy Now
              </button>

              <button
                onClick={handleWishlist}
                className={`w-14 h-14 border rounded-xl flex items-center justify-center
               ${isInWishlist(id, selectedColor) ? "text-red-500" : "text-gray-600"}
               `}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsDetails;
