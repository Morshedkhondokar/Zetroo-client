import { FaHeadset } from "react-icons/fa";
import { FiShield, FiTruck } from "react-icons/fi";


const ServiceCards = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          
          {/* Card 1 - Free & Fast Delivery */}
          <div className="flex flex-col items-center text-center group">
            
            {/* Icon Circle Container (Outer Gray Ring) */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 flex items-center justify-center mb-6 
                            p-1.5 transition-all duration-300 transform group-hover:scale-105">
              {/* Inner Icon Circle (Black) */}
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center 
                              transition-all duration-300 group-hover:bg-black shadow-inner">
                <FiTruck className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 mt-2 uppercase">
              FREE AND FAST DELIVERY
            </h3>
            
            {/* Description */}
            <p className="text-sm md:text-base text-gray-600">
              Free delivery for all orders over $140
            </p>
          </div>

          {/* Card 2 - 24/7 Customer Service */}
          <div className="flex flex-col items-center text-center group">
            
            {/* Icon Circle Container (Outer Gray Ring) */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 flex items-center justify-center mb-6 
                            p-1.5 transition-all duration-300 transform group-hover:scale-105">
              {/* Inner Icon Circle (Black) */}
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center 
                              transition-all duration-300 group-hover:bg-black shadow-inner">
                <FaHeadset className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 mt-2 uppercase">
              24/7 CUSTOMER SERVICE
            </h3>
            
            {/* Description */}
            <p className="text-sm md:text-base text-gray-600">
              Friendly 24/7 customer support
            </p>
          </div>

          {/* Card 3 - Money Back Guarantee */}
          <div className="flex flex-col items-center text-center group">
            
            {/* Icon Circle Container (Outer Gray Ring) */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 flex items-center justify-center mb-6 
                            p-1.5 transition-all duration-300 transform group-hover:scale-105">
              {/* Inner Icon Circle (Black) */}
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center 
                              transition-all duration-300 group-hover:bg-black shadow-inner">
                <FiShield className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 mt-2 uppercase">
              MONEY BACK GUARANTEE
            </h3>
            
            {/* Description */}
            <p className="text-sm md:text-base text-gray-600">
              We return money within 30 days
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceCards;