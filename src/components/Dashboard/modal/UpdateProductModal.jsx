import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";

const UpdateProductModal = ({
  product,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const imageField = watch("image");

useEffect(() => {
  if (imageField?.length > 0) {
    const file = imageField[0];
    const url = URL.createObjectURL(file);
    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  } else if (product) {
    // If no new file selected, keep old image
    setImagePreview(product.image);
  } else {
    setImagePreview(null);
  }
}, [imageField, product]);


useEffect(() => {
  if (product) {
    reset({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      brand: product.brand,
      discount: product.discount || 0,
      image: undefined // important: null removes preview, undefined keeps old
    });
  }
}, [product, reset]);


  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm
                 overflow-y-auto flex justify-center py-10"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl max-h-[90vh]
                   overflow-y-auto rounded-2xl p-6 md:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 border-b pb-3">
          ✏️ Update Product
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="label">Product Name</label>
            <input className="input" {...register("name", { required: true })} />
          </div>

          <div>
            <label className="label">Brand</label>
            <input className="input" {...register("brand", { required: true })} />
          </div>

          <div>
            <label className="label">Price</label>
            <input
              type="number"
              className="input"
              {...register("price", { required: true })}
            />
          </div>

          <div>
            <label className="label">Stock</label>
            <input
              type="number"
              className="input"
              {...register("stock", { required: true })}
            />
          </div>

          <div>
            <label className="label">Discount (%)</label>
            <input type="number" className="input" {...register("discount")} />
          </div>

          {/* IMAGE */}
          <div className="md:col-span-2">
            <label className="label">Image</label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border rounded-lg overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400 flex items-center justify-center h-full">
                    No Image
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="input"
                {...register("image")}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-black text-white rounded-lg"
            >
              {isLoading ? (
                <ImSpinner9 className="animate-spin m-auto" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          .label { font-size:14px; font-weight:500 }
          .input { width:100%; border:1px solid #d1d5db; padding:8px; border-radius:8px }
        `}
      </style>
    </div>
  );
};

export default UpdateProductModal;
