import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay SDK Loaded");
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("https://tuneify-pbc9.onrender.com/api/user/razorpay/order", {
        amount: 199,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: 199 * 100,
        currency: "INR",
        name: "Music Player Premium",
        description: "Enjoy ad-free music",
        order_id: data.id,
        handler: async function (response) {
          try {
            await axios.post("https://tuneify-pbc9.onrender.com/api/user/razorpay/verify", {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              email,
            });

            toast.success("Premium activated!");
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          email,
        },
        theme: { color: "#000000" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container  text-white text-center p-8 rounded-xl shadow-lg max-w-md pb-24  mx-auto">
      <h2 className="text-2xl font-extrabold mb-3 animate-fadeIn">🎵 Upgrade to Premium</h2>
      <p className="mb-4 text-lg opacity-90">Enjoy unlimited, ad-free music for just <span className="font-bold">₹199</span></p>
      
      {/* Features of Premium */}
      <div className="mt-6 w-full p-6 rounded-lg flex flex-col items-center border-2 border-gray-600">
        <h3 className="text-2xl font-bold mb-4">What you'll get</h3>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {["Ad-free music", "Download songs", "Play in any order", "High-quality audio", "Organize queue", "Listening insights"].map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-3 text-gray-400">
              <FaCheckCircle className="text-gray-600" />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full mt-6">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gradient-to-r from-black via-gray-900 to-red-700  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
        />
        <span className="absolute left-3 top-3 text-gray-500">📧</span>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-yellow-200 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4 "
      >
        {loading ? "Processing..." : " Join Premium"}
      </button>

      
      
      {/* Terms & Conditions */}
      <p className="text-xs opacity-70 mt-6">
        By purchasing, you agree to our <a href="#" className="underline">Terms & Conditions</a> and <a href="#" className="underline">Privacy Policy</a>.
      </p>

      <ToastContainer />
    </div>
  );
}
