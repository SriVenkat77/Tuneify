import React from 'react';
import {    FaStar, FaMusic, FaWifi, FaHeadphones, FaDownload } from 'react-icons/fa';
import  { useState } from 'react';
const AboutPage = () => {
    const [open, setOpen] = useState(null);
  
    const toggle = (index) => {
      setOpen(open === index ? null : index);
    };
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-red-700 min-h-screen flex flex-col items-center text-white p-3">
      <div className="w-full max-w-7xl mx-auto bg-gradient-to-r from-black via-gray-900 to-red-700 rounded-lg shadow-lg p-2 flex flex-col items-center border-2 border-gray-600">
        {/* About Section */}
        <div className="mt-6 w-full p-6 rounded-lg bg-black text-gray-200">
  <h2 className="text-3xl font-bold mb-4 flex items-center">
    About Us
  </h2>
  <p className="mb-4 text-lg flex items-start">
    <FaMusic className="text-yellow-400 text-2xl mr-3 mt-1" />
    Welcome to Tuneify ! We are a premier music streaming service dedicated to providing the highest quality audio experience. With millions of songs from various genres, we offer unlimited access to music, curated playlists, and a personalized experience.
  </p>
  <p className="mb-4 text-lg flex items-start">
    <FaWifi className="text-yellow-400 text-2xl mr-3 mt-1" />
    Our mission is to bring you closer to the music you love, without any interruptions. Whether you're at home, on the go, or at the gym,  delivers your favorite tunes with ease, speed, and quality.
  </p>
  <p className="mb-4 text-lg flex items-start">
    <FaHeadphones className="text-yellow-400 text-2xl mr-3 mt-1" />
    Enjoy personalized recommendations, high-fidelity sound, and an intuitive interface designed for seamless music discovery. No ads, no limits—just pure music.
  </p>
  <p className="mb-4 text-lg flex items-start">
    <FaDownload className="text-yellow-400 text-2xl mr-3 mt-1" />
    Our premium service allows you to enjoy music ad-free, download tracks for offline listening, and access exclusive content. Join millions of users who trust  to take their music experience to the next level.
  </p>
</div>

        
 
{/* Reviews Section */}
<div className="mt-6 w-full p-6 rounded-lg  text-gray-200">
          <h3 className="text-2xl font-bold mb-4">What Our Users Say</h3>
          <div className="w-full flex flex-col space-y-6">
            {[{
              name: "John Doe",
              review: "Best music streaming service! I love the high-quality audio and the unlimited skips!",
              rating: 5
            }, {
              name: "Jane Smith",
              review: "Tuneify has completely changed the way I listen to music. Highly recommend!",
              rating: 4
            }, {
              name: "Emily Johnson",
              review: "Great features and easy to use, but the playlist recommendations could improve.",
              rating: 3
            }, {
              name: "Chris Lee",
              review: "Excellent for offline listening, but I wish there were more genres available.",
              rating: 4
            }, {
              name: "Michael Brown",
              review: "Love the interface and sound quality, it's the best streaming service out there!",
              rating: 5
            }].map((review, idx) => (
              <div key={idx} className="flex flex-col items-start text-gray-400">
                <div className="flex items-center mb-2">   
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-yellow-400 ${i < review.rating ? 'fill-current' : 'text-gray-500'}`} />
                  ))} 
                </div>
                <p className="mb-2">"{review.review}"</p>
                <span className="text-sm">- {review.name}</span>
                <hr className="my-4 border-gray-600 w-full" />
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};
export default AboutPage;