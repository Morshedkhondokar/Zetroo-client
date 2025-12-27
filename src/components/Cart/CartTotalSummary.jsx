// components/CartTotalSummary.jsx

const CartTotalSummary = ({ subtotal, shipping = 'Free', total }) => {
    

    return (
        <div className="p-6 rounded-md w-full lg:w-[350px] shadow-lg bg-white">
            <h2 className="text-xl font-bold mb-6">Cart Total</h2>
            
            {/* Subtotal */}
            <div className="flex justify-between items-center py-3 border-b border-gray-300">
                <span className="font-medium text-gray-700">Subtotal:</span>
                <span className="font-semibold text-gray-900">${subtotal}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between items-center py-3 border-b border-gray-300">
                <span className="font-medium text-gray-700">Shipping:</span>
                <span className="font-semibold text-gray-900">{shipping === 'Free' ? 'Free' : `$${shipping}`}</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-3">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold text-gray-900">${total}</span>
            </div>

            {/* Checkout Button */}
            <button className="w-full mt-4 px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors">
                Proccedes to Checkout
            </button>
        </div>
    );
};

export default CartTotalSummary;