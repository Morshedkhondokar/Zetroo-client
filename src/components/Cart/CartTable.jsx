import { IoChevronUp, IoChevronDown, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router";

const CartTable = ({ items, onRemove, onQuantityChange }) => {
  const shortenName = (name) => {
    if (!name) return "";
    return name.length > 7 ? name.slice(0, 7) + "..." : name;
  };

  return (
    <div className="bg-white rounded-lg overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-sm font-semibold">
            <th className="text-left p-4">Product</th>
            <th className="text-left p-4">Color</th>
            <th className="text-center p-4">Price</th>
            <th className="text-center p-4">Quantity</th>
            <th className="text-right p-4">Subtotal</th>
            <th className="text-center p-4"></th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => {
            const rowSubtotal = item.price * item.quantity;

            const handleIncrement = () =>
              onQuantityChange(item.id, item.color, item.quantity + 1);
            const handleDecrement = () =>
              onQuantityChange(item.id, item.color, item.quantity - 1);

            return (
              <tr
                key={`${item.id}-${item.color}-${index}`}
                className="border-b hover:bg-gray-50"
              >
                {/* Product */}
                <td className="p-4">
                  <Link to={`/productsDetails/${item.id}`}>
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-contain"
                      />
                      <span className="font-medium">
                        {shortenName(item.name)}
                      </span>
                    </div>
                  </Link>
                </td>

                {/* Color */}
                <td className="p-4">{item.color}</td>

                {/* Price */}
                <td className="p-4 text-center">${item.price}</td>

                {/* Quantity */}
                <td className="p-4 text-center">
                  <div className="inline-flex items-center border rounded">
                    <button
                      onClick={handleDecrement}
                      className="px-2 cursor-pointer"
                      disabled={item.quantity <= 1}
                    >
                      <IoChevronDown />
                    </button>

                    <span className="px-3 font-semibold">
                      {item.quantity.toString().padStart(2, "0")}
                    </span>

                    <button
                      onClick={handleIncrement}
                      className="px-2 cursor-pointer"
                    >
                      <IoChevronUp />
                    </button>
                  </div>
                </td>

                {/* Subtotal */}
                <td className="p-4 text-right font-semibold">${rowSubtotal}</td>

                {/* Delete */}
                <td className="p-4 text-center">
                  <button
                    onClick={() => onRemove(item.id, item.color)}
                    className="text-red-500"
                  >
                    <IoTrashOutline />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
