import Lottie from "lottie-react";
import { Link } from "react-router";
import error from "../../../public/errorPage.json";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      
      {/* Animation */}
      <div className="w-72 md:w-96">
        <Lottie animationData={error} loop />
      </div>

      {/* Text */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
        Oops! Page Not Found
      </h1>

      <p className="text-gray-500 text-center max-w-md mt-2">
        The page you are looking for doesn’t exist or an unexpected error
        occurred.
      </p>

      {/* Button */}
      <Link to="/">
        <button className="mt-6 px-6 py-3 bg-[#db4444] text-white rounded-lg font-medium cursor-pointer hover:bg-[#be4141] transition">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default Error;
