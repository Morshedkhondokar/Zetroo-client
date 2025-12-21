import fakeData from "../../../../public/fakeData";
import FlashSaleProductCard from "./FlashSaleProductCard";

const FlashSaleProducts = () => {
  return (
    <div className="border-b border-gray-300 ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {fakeData.slice(0, 5).map((item) => (
          <FlashSaleProductCard
            key={item.id}
            product={item}
          />
        ))}
      </div>
      {/* view all flash sale products */}
      <div className="h-14 w-44 mx-auto text-center mt-5 mb-8">
        <button className="primary-btn">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default FlashSaleProducts;
