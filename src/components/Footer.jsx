import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Font Awesome icons

const Footer = () => {
  return (
    <footer className=" bg-black text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">About</li>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">Jobs</li>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">For the Record</li>
            </ul>
          </div>

          {/* Communities Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Communities</h3>
            <ul>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">For Artists</li>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">Developers</li>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">Advertising</li>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">Investors</li>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">Vendors</li>
            </ul>
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">Support</li>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">Free Mobile App</li>
            </ul>
          </div>

          {/* Tuneify Plans Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tuneify Plans</h3>
            <ul>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">Premium Individual</li>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">Premium Duo</li>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">Premium Family</li>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">Premium Student</li>
              <li className="hover:underline hover:text-gray-400 cursor-pointer">Tuneify Free</li>
            </ul>
          </div>
        </div>

        <div className=" border-t border-gray-700 mt-10 pt-5 flex justify-between items-center">
          {/* Social Icons */}
          <div className="flex space-x-4">
            <FaFacebook className="text-white hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="text-white hover:text-pink-600 cursor-pointer" />
            <FaTwitter className="text-white hover:text-blue-400 cursor-pointer" />
          </div>

          {/* Legal Links (hidden on small screens) */}
          <div className="hidden sm:block text-sm text-gray-400">
            <span className="hover:underline cursor-pointer">Legal</span> | 
            <span className="hover:underline cursor-pointer">Safety & Privacy Center</span> | 
            <span className="hover:underline cursor-pointer">Privacy Policy</span> | 
            <span className="hover:underline cursor-pointer">Cookies</span> | 
            <span className="hover:underline cursor-pointer">About Ads</span> | 
            <span className="hover:underline cursor-pointer">Accessibility</span>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">
            <span>© 2025 Tuneify AB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
