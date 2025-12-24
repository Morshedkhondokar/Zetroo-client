import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Card from "../../ProductsCard/Card";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import Loading from "../../Loading/Loading";

const FlashSaleProducts = () => {
  const axiosCommon = useAxiosCommon();

  const {
    data: flashSaleProducts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["flashSaleProducts"],
    queryFn: async () => {
      const res = await axiosCommon.get("/products?discount=true");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError) {
    toast.error(error.message);
    return null;
  }

  return (
    <div className="border-b border-gray-300">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {flashSaleProducts.slice(0, 5).map((item) => (
          <Card
            key={item._id}
            product={item}
          />
        ))}
      </div>

      {/* view all flash sale products */}
      <div className="h-14 w-44 mx-auto text-center mt-5 mb-8">
        <button className="primary-btn">View All Flash Sale</button>
      </div>
    </div>
  );
};

export default FlashSaleProducts;
