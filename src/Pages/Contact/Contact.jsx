import { FiPhone, FiMail } from "react-icons/fi";

const Contact = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 shadow-lg rounded-2xl overflow-hidden bg-gray-50">
          
          {/* Left Side - Contact Info */}
          <div className="bg-white p-8 md:p-12 flex flex-col justify-center space-y-10">
            
            {/* Call To Us */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <FiPhone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call To Us</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="text-gray-800 font-medium mt-3">
                  Phone: +8801611112222
                </p>
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Write To Us */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <FiMail className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Write To Us</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="text-gray-800 font-medium mt-3">
                  Emails: customer@exclusive.com
                </p>
                <p className="text-gray-800 font-medium">
                  Emails: support@exclusive.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gray-50 p-8 md:p-4 flex flex-col justify-center">
            <form className="space-y-6">
              {/* Name, Email, Phone - Row on medium+ */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  className="w-full px-5 py-4 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 text-gray-800"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  required
                  className="w-full px-5 py-4 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 text-gray-800"
                />
                <input
                  type="tel"
                  placeholder="Your Phone *"
                  required
                  className="w-full px-5 py-4 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 text-gray-800"
                />
              </div>

              {/* Message */}
              <textarea
                placeholder="Your Message"
                rows="6"
                className="w-full px-5 py-4 bg-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 text-gray-800"
              ></textarea>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-10 py-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;