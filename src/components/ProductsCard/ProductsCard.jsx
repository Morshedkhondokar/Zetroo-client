import {products} from "../../../public/fakeData";
import Card from "./Card";

const ProductsCard = ({ onlyDiscount }) => {
  let filteredProducts = products;

  if (onlyDiscount === true) {
    // শুধু discount products
    filteredProducts = products.filter(
      (p) => p.discount && p.discount > 0
    );
  } 
  else if (onlyDiscount === false) {
    // শুধু without discount products
    filteredProducts = products.filter(
      (p) => !p.discount || p.discount === 0
    );
  }
  // যদি prop না পাঠাও → সব products দেখাবে

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {filteredProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsCard;
