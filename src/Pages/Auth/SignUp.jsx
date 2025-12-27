import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import signUpLottie from "../../../public/signUp.json";
import { Link, useNavigate } from "react-router";
import useAuth from "../../components/hooks/useAuth";
import { useEffect, useState } from "react";
import { imageUpload } from "../../components/api/uploadImg";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import SignInGoogle from "./SignInGoogle";


const SignUp = () => {
  const { createUser, updateUserProfile, loading, setLoading } = useAuth();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  // Watch the profileImage field
  const profileImageField = watch("profileImage");

  // generate image URL
  useEffect(() => {
    // Check if the field has a file list and the first item exists
    if (
      profileImageField &&
      profileImageField.length > 0 &&
      profileImageField[0] instanceof File
    ) {
      const file = profileImageField[0];
      // Create a local URL for the file to be used in the <img> tag
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
      // Clean up the object URL when the component unmounts or the file changes
      return () => {
        URL.revokeObjectURL(url);
        setImagePreviewUrl(null); // Clear the state on cleanup
      };
    } else {
      // Clear the preview if no file is selected or field is empty
      setImagePreviewUrl(null);
    }
  }, [profileImageField]);

  const onSubmit = async (data) => {
    console.log("SignUp Data:", data);
    const name = data.name
    const email = data.email
    const password = data.password
    setLoading(true)

    try {
      // Upload image and get image url
      const imageFile = data.profileImage[0]; 
      const photoURL = await imageUpload(imageFile);
      console.log("Uploaded Image URL:", photoURL);

      // User signUp user
      const result = await createUser(email,password)
      console.log(result)

      // save user name  and photo in firebase
      await updateUserProfile(name, photoURL)
      navigate('/')
      toast.success('SignUp Successfully')
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Container */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Form Section */}
        <div className="p-6 sm:p-10 flex-col items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account 👋
            </h2>
            <p className="text-sm text-gray-500 mb-6">Sign up to get started</p>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-black"
                }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-black"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Profile Image Upload */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image
              </label>

              <div className="flex items-center gap-4">
                {/* Image Preview */}
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400 text-center px-2">
                      No Image
                    </span>
                  )}
                </div>

                {/* File Input */}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    className={`w-full text-sm border rounded-lg px-3 py-2 cursor-pointer
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-medium
          file:bg-black file:text-white
          hover:file:bg-gray-800
          focus:outline-none focus:ring-2
          ${
            errors.profileImage
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-black"
          }`}
                    {...register("profileImage", {
                      required: "Profile image is required",
                      validate: {
                        isImage: (files) =>
                          files[0]?.type.startsWith("image/") ||
                          "Only image files are allowed",
                      },
                    })}
                  />

                  {errors.profileImage && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.profileImage.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-black"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full mt-4 bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition font-medium cursor-pointer"
            >
              {loading ? (<ImSpinner9 className="animate-spin m-auto" />): " Sign Up"}
             
            </button>

            <p className="text-sm text-center my-5 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium underline"
              >
                Login
              </Link>
            </p>
          </form>
           {/* Login with google */}
            <SignInGoogle />
        </div>

        {/* Lottie Section */}
        <div className="hidden md:flex items-center justify-center bg-gray-50 p-6">
          <Lottie
            animationData={signUpLottie}
            className="w-full max-w-md"
            loop={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
