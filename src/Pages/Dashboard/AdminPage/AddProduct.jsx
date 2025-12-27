import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { imageUpload } from "../../../components/api/uploadImg";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const productImageField = watch("image");

  // 🔹 Image preview logic
  useEffect(() => {
    if (
      productImageField &&
      productImageField.length > 0 &&
      productImageField[0] instanceof File
    ) {
      const file = productImageField[0];
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreviewUrl(null);
    }
  }, [productImageField]);

  //  Submit handler
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Upload image
      const imageFile = data.image[0];
      const imageUrl = await imageUpload(imageFile);

      const productData = {
        name: data.name,
        description: data.description,
        category: data.category,
        brand: data.brand,
        price: Number(data.price),
        discount: data.discount ? Number(data.discount) : 0,
        image: imageUrl,
        stock: Number(data.stock),
        ratings: Number(data.ratings),
        color: data.color.split(",").map((c) => c.trim()),
        createdAt: new Date(),
      };

      console.log("Product Data:", productData);
       
      //  sava data in db 
      await axiosSecure.post("/products", productData)


      toast.success("Product added successfully.");
      // reset();
      // setImagePreviewUrl(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl overflow-hidden">
        <div className="p-6 sm:p-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2 md:col-span-2">
              Add New Product 🛒
            </h2>
            <p className="text-sm text-gray-500 mb-6 md:col-span-2">
              Fill in product details below
            </p>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                placeholder="Name"
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.name ? "border-red-500" : ""
                }`}
                {...register("name", { required: "Product name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Product Description</label>
              <input
                type="text"
                placeholder="Description....."
                className={`w-full border rounded-lg px-3 py-2 ${
                  errors.description ? "border-red-500" : ""
                }`}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select category</option>
                <option value="mobile">Mobile</option>
                <option value="laptop">Laptop</option>
                <option value="watch">Smart Watch</option>
                <option value="tablet">Tablet</option>
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <input
                type="text"
                placeholder="Brand name"
                className="w-full border rounded-lg px-3 py-2"
                {...register("brand", { required: "Brand is required" })}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Product Price</label>
              <input
                type="number"
                placeholder="Price"
                className="w-full border rounded-lg px-3 py-2"
                {...register("price", { required: "Price is required" })}
              />
            </div>

            {/* Discount (Optional, max 100) */}
            <div>
              <label className="block text-sm font-medium mb-1">Product Discount Optional</label>
              <input
                type="number"
                placeholder="Discount"
                className="w-full border rounded-lg px-3 py-2"
                {...register("discount", {
                  min: { value: 0, message: "Minimum 0%" },
                  max: { value: 100, message: "Maximum 100%" },
                })}
              />
              {errors.discount && (
                <p className="text-red-500 text-xs mt-1">{errors.discount.message}</p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                type="number"
                placeholder="Stock"
                className="w-full border rounded-lg px-3 py-2"
                {...register("stock", { required: "Stock is required" })}
              />
            </div>

            {/* Ratings */}
            <div>
              <label className="block text-sm font-medium mb-1">Ratings</label>
              <input
                type="number"
                placeholder="4.5"
                step="0.1"
                min="0"
                max="5"
                className="w-full border rounded-lg px-3 py-2"
                {...register("ratings", { required: "Ratings are required" })}
              />
            </div>

            {/* Colors */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Colors (comma separated)
              </label>
              <input
                type="text"
                placeholder="red, black, blue"
                className="w-full border rounded-lg px-3 py-2"
                {...register("color", { required: "At least one color required" })}
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Product Image</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden">
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No Image</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm border rounded-lg px-3 py-2"
                  {...register("image", { required: "Image is required" })}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                {loading ? <ImSpinner9 className="animate-spin m-auto" /> : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
