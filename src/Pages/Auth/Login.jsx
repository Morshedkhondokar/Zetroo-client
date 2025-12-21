import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import loginLottie from "../../../public/Login.json";
import { Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* Container */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl grid grid-cols-1 md:grid-cols-2  overflow-hidden">
        {/* Lottie Section */}
        <div className="hidden md:flex items-center justify-center bg-gray-50 p-6">
          <Lottie
            animationData={loginLottie}
            className="w-full max-w-md"
            loop={true}
          />
        </div>
        {/* Form Section */}
        <div className="p-6 sm:p-10 flex items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Please login to your account
            </p>

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

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Login
            </button>
            <p className="text-sm text-center mt-5 text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signUp"
                className="font-medium underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
