// pages/Cart.jsx (Parent Component)

import { useState, useMemo } from 'react';

import CartCouponActions from '../../components/Cart/CartCouponActions';
import CartTotalSummary from '../../components/Cart/CartTotalSummary';
import CartTable from '../../components/Cart/CartTable'; // CartTable component

const initialCartItems = [
    { id: 1, name: "LCD Monitor", price: 650, initialQuantity: 1, imageUrl: "https://i.pinimg.com/736x/26/9a/8d/269a8daef42297664dbdd4ddfc26197d.jpg" },
    { id: 2, name: "HI Gamepad", price: 550, initialQuantity: 2, imageUrl: "https://i.pinimg.com/1200x/d9/e0/ca/d9e0caee3aec5e43c4a8fe6657d63a8e.jpg" },
];

const Cart = () => {
    // STATE: ডেটা এখানে আছে
    const [cartItems, setCartItems] = useState(initialCartItems);
    
    // --- Logic Functions ---

    // Handle item removal (Logics are here)
    const handleRemoveItem = (idToRemove) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
    };

    // Handle quantity update (Logics are here)
    const handleQuantityChange = (idToUpdate, newQuantity) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === idToUpdate ? { ...item, initialQuantity: newQuantity } : item
            )
        );
    };
    
    // Calculate Subtotal and Total dynamically using useMemo
    const { subtotal, total } = useMemo(() => {
        const calculatedSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.initialQuantity), 0);
        const shippingCost = 0; 
        const calculatedTotal = calculatedSubtotal + shippingCost;
        return { subtotal: calculatedSubtotal, total: calculatedTotal };
    }, [cartItems]);
    
    // Placeholder actions for buttons
    const handleReturnToShop = () => console.log("Navigating to shop...");
    const handleUpdateCart = () => console.log("Cart updated!");

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 text-gray-900">Shopping Cart</h1>

                {/* --- 1. Cart Table Section (Child Component Update) --- */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
                    <CartTable
                        // PROP হিসেবে ডেটা এবং ফাংশন পাস করা হলো
                        items={cartItems} 
                        onRemove={handleRemoveItem}
                        onQuantityChange={handleQuantityChange}
                    />
                </div>

                {/* --- 2. Action/Summary Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Side: Coupons and Actions */}
                    <div className="lg:col-span-2">
                        <CartCouponActions 
                            onReturnToShop={handleReturnToShop}
                            onUpdateCart={handleUpdateCart}
                        />
                    </div>
                    
                    {/* Right Side: Cart Total Summary */}
                    <div className="lg:col-span-1 flex justify-end">
                        <CartTotalSummary 
                            subtotal={subtotal} 
                            total={total}
                            shipping="Free"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;