import { products } from "../../../../public/fakeData";
import ProductsCard from "../../ProductsCard/ProductsCard";
const HomeProductSection = () => {
  return (
    <div className="p-4 mt-7">
      {/* header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-4  ">
          <span className="w-2 h-6 bg-red-500 rounded "></span>
          <p className="text-red-500 font-medium text-sm">Our Products</p>
        </div>
        <h1 className="text-2xl md:text-3xl font-brand font-extrabold">
          Explore Our Products
        </h1>
      </div>
      {/* products section */}
      <div>
        <ProductsCard />
       <div className="h-14 w-44 mx-auto text-center mt-7 mb-8">
        <button className="primary-btn">
            View All products
        </button>
      </div>
      </div>
    </div>
  );
};

export default HomeProductSection;
