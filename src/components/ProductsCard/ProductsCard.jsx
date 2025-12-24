// import {products} from "../../../public/fakeData";
import toast from "react-hot-toast";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Loading from "../Loading/Loading";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";

const ProductsCard = ({ onlyDiscount }) => {
  const axiosCommon = useAxiosCommon();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosCommon.get("/products");
      return res.data;
    },
  });

  console.log(products)

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return toast.error(error.message);
  }


  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {products.map((product) => (
        <Card
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductsCard;
