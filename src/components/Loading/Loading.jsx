import Lottie from "lottie-react";

import loadingAnimation from "../../../public/Loading.json";

const Loading = () => {
  return (
   <div className="w-full h-screen border  flex justify-center items-center">
     <div className="bg-white p-6 rounded-lg  flex flex-col items-center justify-center">
      {/* Rendering the Lottie Animation */}
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        className="w-96 h-72 "
        aria-label="Content Loading"
      />

      
    </div>
   </div>
  );
};

export default Loading;
