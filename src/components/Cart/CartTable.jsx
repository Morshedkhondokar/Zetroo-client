// components/Cart/CartTable.jsx (Child Component)

import {
  IoChevronUp,
  IoChevronDown,
  IoTrashOutline,
} from "react-icons/io5";

// Component now receives props: items (cart data), onRemove, onQuantityChange
const CartTable = ({ items, onRemove, onQuantityChange }) => {
  // Helper function to format currency
  const formatCurrency = (amount) =>
    amount
      .toLocaleString("en-US", { style: "currency", currency: "USD" })
      .slice(1); 
      

  // Note: Local state (cartItems, handleQuantityChange, handleRemoveItem, useMemo)
  // and initialCartItems are REMOVED from this component.

  return (
    <div className="bg-white rounded-lg  overflow-x-auto">
      {/* Using standard HTML table tags */}
      <table className="w-full border-collapse">
        {/* Table Header (<thead>) */}
        <thead className="table-header-group">
          <tr className="bg-white border-b border-gray-200 text-gray-700 text-sm font-semibold">
            <th className="text-left p-4 w-1/3 min-w-[300px]">Product</th>
            <th className="text-center p-4 w-24">Price</th>
            <th className="text-center p-4 w-28">Quantity</th>
            <th className="text-right p-4 w-28">Subtotal</th>
            <th className="text-center p-4 w-12"></th>
          </tr>
        </thead>

        {/* Table Body (<tbody>) - Dynamic Rows */}
        <tbody>
          {/* items prop ব্যবহার করা হলো */}
          {items.map((item) => {
            const rowSubtotal = item.price * item.initialQuantity;

            // Handlers for quantity change (এখন prop থেকে আসা ফাংশন কল করবে)
            const handleIncrement = () =>
              onQuantityChange(item.id, item.initialQuantity + 1);
            const handleDecrement = () => {
              if (item.initialQuantity > 1) {
                onQuantityChange(item.id, item.initialQuantity - 1);
              }
            };

            return (
              <tr
                key={item.id}
                className="border-b border-gray-100 transition-shadow hover:bg-gray-50"
              >
                {/* 1. Product (td) */}
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-4 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 object-contain rounded"
                    />
                    <span className="text-gray-900 font-medium">
                      {item.name}
                    </span>
                  </div>
                </td>

                {/* 2. Price (td) */}
                <td className="p-4 align-middle text-center font-medium table-cell">
                  ${item.price.toLocaleString()}
                </td>

                {/* 3. Quantity (td) */}
                <td className="p-4 align-middle">
                  <div className="w-full flex justify-center">
                    <div className="relative w-20 border border-gray-300 rounded overflow-hidden">
                      <input
                        type="text"
                        value={item.initialQuantity.toString().padStart(2, "0")}
                        readOnly
                        className="w-full h-9 text-center text-sm font-semibold text-gray-800 focus:outline-none"
                      />
                      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between">
                        <button
                          onClick={handleIncrement} // Prop ফাংশন ব্যবহার
                          className="w-5 h-4 text-xs text-gray-600 border-b border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                          <IoChevronUp className="mx-auto" />
                        </button>
                        <button
                          onClick={handleDecrement} // Prop ফাংশন ব্যবহার
                          disabled={item.initialQuantity <= 1}
                          className="w-5 h-4 text-xs text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                          <IoChevronDown className="mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                </td>

                {/* 4. Subtotal (td) */}
                <td className="p-4 align-middle text-right font-semibold  table-cell">
                  ${formatCurrency(rowSubtotal)}
                </td>

                {/* 5. Delete Button (td) */}
                <td className="p-4 align-middle text-center">
                  <button
                    // onRemove prop থেকে আসা ফাংশন কল করা হলো
                    onClick={() => onRemove(item.id)}
                    className="text-gray-400 text-xl hover:text-red-600 transition-colors"
                  >
                    <IoTrashOutline />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Cart Subtotal footer is optional here, as CartTotalSummary handles the totals */}
      <div className="p-4 text-right font-bold text-lg border-t border-gray-200 hidden">
        {/* Cart Subtotal: ${formatCurrency(subtotal)} */}
      </div>
    </div>
  );
};

export default CartTable;
