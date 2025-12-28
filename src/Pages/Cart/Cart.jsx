import { useContext, useMemo, useState } from "react";

import CartTable from "../../components/Cart/CartTable";
import CartCouponActions from "../../components/Cart/CartCouponActions";
import CartTotalSummary from "../../components/Cart/CartTotalSummary";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router";
import { CartContext } from "../../Provider/CartProvider";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const navigate = useNavigate();

  const coupons = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME5: 5,
  };

  const handleApplyCoupon = () => {
    const discount = coupons[couponCode.toUpperCase()];
    if (!discount) {
      toast.error("Invalid coupon code");
      setCouponDiscount(0);
      return;
    }
    setCouponDiscount(discount);
    toast.success(`Coupon applied! You got ${discount}% off`);
  };

  // Total calculation
  const { subtotal, total } = useMemo(() => {
    const sub = cartItems.reduce(
      (acc, item) => acc + Math.round(item.price) * item.quantity,
      0
    );

    const totalAmount = sub - (sub * couponDiscount) / 100;

    return { subtotal: sub, total: totalAmount };
  }, [cartItems, couponDiscount]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 rounded shadow text-center flex flex-col items-center gap-4 animate-fadeIn">
            <FiShoppingCart className="text-red-500 w-16 h-16" />
            <h2 className="text-2xl font-bold text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-gray-500">
              Looks like you haven’t added anything to your cart yet.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded shadow mb-10">
              <CartTable
                items={cartItems}
                onRemove={removeFromCart}
                onQuantityChange={updateQuantity}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CartCouponActions
                  couponCode={couponCode}
                  setCouponCode={setCouponCode}
                  handleApplyCoupon={handleApplyCoupon}
                />
              </div>
              <div>
                <CartTotalSummary
                  subtotal={subtotal}
                  total={total}
                  shipping="Free"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
