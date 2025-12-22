// components/CartCouponActions.jsx

const CartCouponActions = ({ onReturnToShop, onUpdateCart }) => {
    return (
        <div className="flex flex-col gap-6 mt-8">
            
            
                <button 
                    onClick={onReturnToShop}
                    className="px-8 py-3 border border-gray-300 rounded-md text-gray-800 font-medium hover:bg-gray-50 transition-colors"
                >
                    Return To Shop
                </button>
              


            {/* Coupon Code Section */}
            <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Cart Actions</h3> 
                
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Coupon Input 1 */}
                    <input 
                        type="text" 
                        placeholder="Coupon Code" 
                        className="px-4 py-3 border border-gray-300 rounded-md flex-1 min-w-[200px] focus:ring-red-500 focus:border-red-500"
                    />
                    <button className="px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors">
                        Apply Coupon
                    </button>
                </div>
            </div>

        </div>
    );
};

export default CartCouponActions;