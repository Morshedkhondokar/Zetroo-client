import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import signUpLottie from "../../../public/signUp.json";
import { Link } from "react-router";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("SignUp Data:", data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Container */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Form Section */}
        <div className="p-6 sm:p-10 flex items-center">
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

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-black"
                }`}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Sign Up
            </button>

            <p className="text-sm text-center mt-5 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium underline"
              >
                Login
              </Link>
            </p>
          </form>
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
