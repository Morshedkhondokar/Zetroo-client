import React from 'react';
import { FaHeadset } from 'react-icons/fa';
import { FiTarget, FiEye, FiZap, FiShoppingBag, FiCreditCard } from "react-icons/fi"; // Feather Icons

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      
      {/* --- 1. Hero Section: Introduction --- */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-20 lg:space-x-12">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          {/* Featured Label */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-5 h-10 bg-[#db4444] rounded-sm"></div>
            <p className="text-[#db4444] font-semibold text-xl">Our Story</p>
          </div>
          
          <h1 className="text-5xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Connecting You to Quality, Effortlessly.
          </h1>
          
          <p className="text-gray-600 text-lg mb-6">
            ZetRoo started with a simple vision: to bring high-quality, trendy products directly to your doorstep with unmatched convenience. We believe online shopping should be an inspiring and trustworthy experience, not a chore. From electronics to fashion, every item on ZetRoo is handpicked for quality and value.
          </p>
          
          <p className="text-gray-600 text-lg">
            Our commitment is to transparency, speed, and exceptional customer service. We are constantly evolving our platform and expanding our product catalog to meet the dynamic needs of our community. Join us in building the future of hassle-free e-commerce.
          </p>
        </div>
        
        {/* Placeholder Image (আপনি আপনার কোম্পানির বা গুদামের ছবি ব্যবহার করতে পারেন) */}
        <div className="lg:w-1/2 rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition duration-500">
          <img
            src="https://i.pinimg.com/1200x/97/28/81/972881834b60d9417ed7028c4b44d3d4.jpg"
            alt="E-commerce Warehouse/Office"
            className="w-full h-96 object-cover"
          />
        </div>
      </div>
      
      {/* --- 2. Mission, Vision, and Core Values --- */}
      <div className="pt-10 border-t border-gray-200">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Our Guiding Principles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Card 1: Our Mission */}
          <ValueCard 
            Icon={FiTarget}
            title="OUR MISSION"
            description="To simplify online shopping by curating the best products and delivering them fast, making quality accessible to everyone."
          />
          
          {/* Card 2: Our Vision */}
          <ValueCard 
            Icon={FiEye}
            title="OUR VISION"
            description="To be the most trusted and preferred e-commerce platform in the region, known for innovation and customer loyalty."
          />
          
          {/* Card 3: Core Value - Quality */}
          <ValueCard 
            Icon={FiShoppingBag}
            title="CORE VALUE: QUALITY"
            description="We rigorously test and select our products, ensuring that everything you buy from ZetRoo meets the highest standards."
          />
        </div>
      </div>

      {/* --- 3. Key Services / Trust Factors --- */}
      <div className="pt-16 mt-16 border-t border-gray-200">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose ZetRoo?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          <ServiceFeature 
            Icon={FiZap}
            title="BLAZING FAST SHIPPING"
            description="We prioritize speed, ensuring your order gets processed and shipped within hours, not days."
          />
          
          <ServiceFeature 
            Icon={FiCreditCard}
            title="SECURE PAYMENT GUARANTEE"
            description="All transactions are protected by industry-leading security protocols. Shop with complete peace of mind."
          />
          
          <ServiceFeature 
            Icon={FaHeadset}
            title="24/7 DEDICATED SUPPORT"
            description="Our friendly support team is available around the clock to assist you with any query or concern."
          />
        </div>
      </div>
      
    </div>
  );
};

// Helper Component for Mission/Vision Cards
const ValueCard = ({ Icon, title, description }) => (
  <div className="bg-gray-50 p-6 rounded-xl shadow-md border-t-4 border-[#db4444] hover:shadow-lg transition duration-300">
    <div className="w-12 h-12 rounded-full bg-[#db4444] flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-extrabold text-gray-900 mb-3 uppercase">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

// Helper Component for Service Features
const ServiceFeature = ({ Icon, title, description }) => (
  <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition duration-200">
    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
      <Icon className="w-6 h-6 text-[#db4444]" />
    </div>
    <div>
      <h4 className="text-lg font-bold text-gray-900 mb-1 uppercase">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);


export default AboutUs;