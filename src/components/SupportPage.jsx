import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaHeadset, FaEnvelope, FaPhoneAlt, FaStar } from 'react-icons/fa';

const SupportPage = () => {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-red-700 min-h-screen flex flex-col items-center text-white pb-24 p-3">
      <div className="w-full max-w-7xl mx-auto  rounded-lg shadow-lg p-2 border border-gray-700">
      <div className="text-center mb-8 w-full mb-8 p-6 rounded-lg  text-gray-300 shadow-md bg-black ">
      <h1 className="text-4xl font-bold text-white">Tuneify Support</h1>
  <p className="text-lg text-gray-400 mt-2">
    Need help? You're in the right place! Whether you have questions about your subscription, troubleshooting issues, 
    or need technical support, our dedicated team is available 24/7 to assist you.  
  </p>
  <p className="text-lg text-gray-400 mt-2">
    Explore our FAQs, get in touch with our support team, or browse through helpful articles to find the answers you need. 
    Your seamless music experience is our priority!
  </p>
</div>
{/* FAQ Section */}
<div className="w-full mb-8 p-6 rounded-lg  text-gray-300 shadow-md">
          <h3 className="text-2xl font-bold mb-6 text-white">FAQs</h3>
          {[
            { q: "How can I cancel my subscription?", a: "You can cancel it anytime from 'Account Settings'." },
            { q: "Can I use Music Player on multiple devices?", a: "Yes, you can stream on multiple devices." },
            { q: "How do I download music for offline listening?", a: "Click the 'Download' button next to a track." }
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-600 py-4">
              <button
                className="w-full flex justify-between items-center text-lg font-semibold hover:text-yellow-400"
                onClick={() => toggle(index)}
              >
                {faq.q}
                {open === index ? <FaChevronUp className="text-yellow-400" /> : <FaChevronDown className="text-yellow-400" />}
              </button>
              {open === index && <p className="mt-2 text-gray-400">{faq.a}</p>}
            </div>
          ))}
        </div>


        {/* Support Section */}
        <div className="w-full mb-8 p-6 rounded-lg  text-gray-300 shadow-md">
          <h3 className="text-3xl font-bold mb-6 text-white ">Support</h3>
          <p className="text-lg text-center mb-6 text-gray-400">
            Need help? Our support team is available 24/7 to assist you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
              icon: <FaEnvelope className="text-yellow-400 text-4xl" />, 
              title: "Email Support", 
              description: "Send us an email, and we'll get back to you within 24 hours.", 
              contact: "support@tuneify.com"
            }, {
              icon: <FaPhoneAlt className="text-yellow-400 text-4xl" />, 
              title: "Phone Support", 
              description: "Call us for immediate assistance.", 
              contact: "1800-123-456"
            }, {
              icon: <FaHeadset className="text-yellow-400 text-4xl" />, 
              title: "Live Chat", 
              description: "Chat with one of our experts in real-time.", 
              contact: "Start Live Chat"
            }].map((support, index) => (
              <div key={index} className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-gray-600 text-center hover:scale-105 transition-transform duration-300">
                {support.icon}
                <h4 className="text-xl font-semibold">{support.title}</h4>
                <p className="text-gray-400">{support.description}</p>
                <a href="#" className="mt-4 text-yellow-500 hover:underline">{support.contact}</a>
              </div>
            ))}
          </div>
        </div>

        

        
      </div>
    </div>
  );
};

export default SupportPage;
