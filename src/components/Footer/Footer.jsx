import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-14">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

        {/* Exclusive */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">ZETROO</h3>
          <p className="mb-3">Subscribe</p>
          <p className="text-sm mb-4">Get 10% off your first order</p>

          <div className="flex border border-gray-500 rounded">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-3 py-2 text-sm outline-none w-full"
            />
            <button className="px-3 text-white">➤</button>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
          <p className="text-sm mb-2">111 Bijoy sarani, Dhaka,</p>
          <p className="text-sm mb-2">DH 1515, Bangladesh.</p>
          <p className="text-sm mb-2">exclusive@gmail.com</p>
          <p className="text-sm">+88015-88888-9999</p>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Account</h3>
          <ul className="space-y-2 text-sm">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Quick Link */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Link</h3>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Download App</h3>
          <p className="text-sm mb-3">Save $3 with App New User Only</p>

          <div className="flex gap-3 mb-4">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=example"
              alt="QR"
              className="bg-white p-1"
            />
            <div className="flex flex-col gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-8"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-8"
              />
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-lg text-white">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-12 py-4 text-center text-sm text-gray-500">
        © Copyright ZETROO 2025. All right reserved
      </div>
    </footer>
  );
};

export default Footer;
