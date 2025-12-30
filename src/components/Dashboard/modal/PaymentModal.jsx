import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { CartContext } from "../../../Provider/CartProvider";
import { useNavigate } from "react-router";

const PaymentModal = ({ total, closeModal }) => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1️⃣ get clientSecret from backend
      const { data } = await axiosCommon.post("/create-payment-intent", {
        amount: total,
      });
      //   console.log(data);

      const clientSecret = data.clientSecret;

      // 2️⃣ card element
      const card = elements.getElement(CardElement);

      // 3️⃣ confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      }

      if (result.paymentIntent.status === "succeeded") {
        const orderData = {
          email: user.email,
          products: cartItems,
          totalPrice: total,
          payment: {
            method: "stripe",
            transactionId: result.paymentIntent.id,
          },
        };
        await axiosSecure.post("/orders", orderData);

        clearCart();
        toast.success("Payment Successful 🎉");
        closeModal();
        navigate("/dashboard/my-orders");
      }
    } catch (err) {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Pay ${total}</h2>

        <div className="border p-3 rounded mb-4">
          <CardElement />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePayment}
            disabled={!stripe || loading}
            className="flex-1 bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

          <button
            onClick={closeModal}
            className="flex-1 bg-gray-300 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
