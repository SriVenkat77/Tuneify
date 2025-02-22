import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState(null);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      const token = localStorage.getItem("token"); // Get stored token
      if (!token) return;

      try {
        const response = await fetch("https://tuneify-pbc9.onrender.com/api/user/check-premium", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setIsPremium(data.isPremium);
      } catch (error) {
        console.error("Error checking premium status:", error);
      }
    };

    checkPremiumStatus();
  }, []);

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-red-700 min-h-screen flex flex-col items-center text-white  pb-24 p-3">
      <div className="w-full max-w-7xl mx-auto bg-gradient-to-r from-black via-gray-900 to-red-700 rounded-lg shadow-lg p-6 flex flex-col items-center border-2 border-gray-600">
        
        {isPremium === null ? (
          <p>Loading...</p>
        ) : isPremium ? (
          <>
            {/* Premium Content */}
            {/* Premium Content */}
<h2 className="text-3xl font-bold mb-4">Welcome to Premium! </h2>
<p className="mb-4 text-lg">Enjoy an uninterrupted, high-quality listening experience with exclusive features tailored just for you.</p>

<div className="mt-6 w-full p-6 rounded-lg flex flex-col items-center border-2 border-gray-600">
  <h3 className="text-2xl font-bold mb-4">Premium Features</h3>
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
    {[
      "Ad-free music", 
      "Download songs", 
      "Play in any order", 
      "High-quality audio", 
      "Organize queue", 
      "Listening insights",
      "Exclusive early releases", 
      "Offline mode", 
      "Multi-device sync", 
      "Priority customer support"
    ].map((feature, idx) => (
      <div key={idx} className="flex items-center space-x-3 text-gray-400">
        <FaCheckCircle className="text-gray-600" />
        <p>{feature}</p>
      </div>
    ))}
  </div>
</div>

{/* Additional Benefits */}
<div className="mt-6 w-full p-6 rounded-lg flex flex-col items-center border-2 border-gray-600">
  <h3 className="text-2xl font-bold mb-4">More Perks for Premium Users</h3>
  <p className="text-gray-400 text-center">
    As a Premium subscriber, you also get access to <span className="text-white font-semibold">exclusive live sessions</span>, 
    <span className="text-white font-semibold"> artist interviews</span>, and <span className="text-white font-semibold">personalized playlists</span> curated just for you!
  </p>
</div>

{/* Terms and Conditions */}
<div className="mt-6 w-full bg-black p-6 rounded-lg flex flex-col items-center border-2 border-gray-600">
  <h3 className="text-2xl font-bold mb-4">Terms and Conditions</h3>
  <ul className="list-disc list-inside text-gray-400 space-y-2">
    <li> Your subscription auto-renews unless canceled at least 24 hours before renewal.</li>
       <li>This offer is available in select regions and subject to change.</li>
    <li> No refunds for partially used subscription periods.</li>
    <li> You can cancel anytime from your account settings.</li>
   <li> Premium features are for personal, non-commercial use only.</li>
  </ul>
</div>

          </>
        ) : (
          <>
            {/* Subscription Plan for Non-Premium Users */}
            <div className="mt-6 w-full p-6 rounded-lg bg-black text-gray-200">
              <h2 className="text-3xl font-bold mb-4">Try Premium for ₹119</h2>
              <p className="mb-4 text-lg">Listen without limits. Try 2 months of Premium for ₹119.</p>
              <p className="mb-4 text-sm">Only ₹119/month after. Cancel anytime. Offer only available if you haven't tried Premium before. T&C apply.</p>
              <button onClick={() => navigate("/payment")} className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition duration-300 w-full sm:w-auto mt-4">
                Join Now
              </button>
            </div>

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

             {/* Terms and Conditions Section */}
        <div className="mt-6 w-full bg-black p-6 rounded-lg flex flex-col items-center border-2 border-gray-600">
          <h3 className="text-2xl font-bold mb-4">Terms and Conditions</h3>
          <ul className="list-disc list-inside text-gray-400">
  <li><strong>Eligibility:</strong> Offer valid only for new Premium users who have not previously subscribed to the Premium plan.</li>
  <li><strong>Trial Period:</strong> Enjoy 2 months of Premium access for ₹119. After the trial period, the subscription will automatically renew at ₹119/month unless canceled before the end of the trial.</li>
   <li><strong>Auto-Renewal:</strong> By subscribing, you agree to automatic renewal of your Premium plan at the standard rate of ₹119/month after the trial period unless canceled.</li>
  <li><strong>Payment Method:</strong> A valid payment method is required to sign up for the trial. If you do not cancel before the end of the trial, you will be charged for the subsequent month.</li>
  <li><strong>Geographic Availability:</strong> This offer is only available to users in select regions. The availability and pricing of the offer may vary based on your location.</li>
  <li><strong>Account Restrictions:</strong> You must have an active account in good standing to be eligible for the offer. If your account is suspended or terminated, the trial offer will be void.</li>
   <li><strong>Content Availability:</strong> Content availability may vary by region, and certain features or content may be limited based on your location or device compatibility.</li>
  <li><strong>Changes to Terms:</strong> We reserve the right to modify, suspend, or discontinue the offer at any time, with or without notice. Please review the full terms regularly for any updates.</li>
  <li><strong>Refund Policy:</strong> No refunds will be provided for unused portions of the trial or subscription, except where required by law.</li>
  <li><strong>Liability:</strong> The company is not liable for any issues or problems related to third-party services, payments, or content access during the trial or subscription period.</li>
  <li><strong>Account Termination:</strong> We reserve the right to terminate or suspend your Premium subscription if fraudulent activity or violations of terms are detected.</li>
  <li><strong>Acceptance of Terms:</strong> By signing up for the Premium trial, you agree to abide by all terms and conditions outlined in this agreement, along with our privacy policy.</li>
</ul>

        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
