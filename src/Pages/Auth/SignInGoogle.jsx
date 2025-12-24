import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../components/hooks/useAuth";
import { useNavigate } from "react-router";

const SignInGoogle = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate()

  const handleLoginGoogle = async () =>{
   await  signInWithGoogle()
    navigate('/')
  }

  return (
    <button
      onClick={handleLoginGoogle}
      className="
        w-2xs
        mx-auto
        cursor-pointer
        flex
        items-center
        justify-center
        gap-3
        px-4
        py-3
        border
        border-gray-300
        rounded-lg
        bg-white
        hover:bg-gray-50
        transition
        duration-200
        shadow-sm
      "
    >
      <FcGoogle size={22} />
      <span className="text-sm font-medium text-gray-700">
        Continue with Google
      </span>
    </button>
  );
};

export default SignInGoogle;
