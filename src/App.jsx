
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import DisplayHome from './components/DisplayHome';
import Search from './components/SearchPage';
import Navbar from './components/Navbar';
import { PlayerContext } from './context/PlayerContext';
import DisplayAlbum from './components/DisplayAlbum';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ProfilePage from './components/ProfilePage';
import SubscriptionPage from './components/SubscriptionPage';
import AboutPage from './components/AboutPage';
import SupportPage from './components/SupportPage';
import AdminLogin from './components/AdminLogin';
import Payment from './components/Payment';
import EditProfile from './components/EditProfile';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export const url = 'https://tuneify-pbc9.onrender.com';
const App = () => {
  const { audioRef, track, songsData, albumsData } = useContext(PlayerContext);
  const [bgColor, setBgColor] = useState('transparent');
  const [user, setUser] = useState(null);
  const [showAd, setShowAd] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [wasPlayingBeforeAd, setWasPlayingBeforeAd] = useState(false);
  const adIntervalRef = useRef(null);
  const adVideoRef = useRef(null);
  const [adContent, setAdContent] = useState("");
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const [adStartTime, setAdStartTime] = useState(0);
  const [skipTimeLeft, setSkipTimeLeft] = useState(20);



  useEffect(() => {
    if (isAlbum && albumsData) {
      const album = albumsData.find((x) => x._id === albumId);
      if (album) {
        setBgColor(album.bgColour);
      }
    } else {
      setBgColor('transparent'); 
    }
  }, [isAlbum, albumId, albumsData]);
  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = bgColor;
    }
  }, [bgColor]);


  useEffect(() => {
    let adInterval;
    const fetchAdContent = async () => {
      try {
        const response = await fetch("/api/get-ad");
        const adData = await response.json();
        return adData;
      } catch (error) {
        console.error("Failed to fetch ad:", error);
        return { message: "Default Ad Content" };
      }
    };
  
    const checkForAd = async () => {
      if (user && !user.isPremium && audioRef.current) {
        if (!audioRef.current.paused) { 
          setWasPlayingBeforeAd(true);
          setShowAd(true);
          audioRef.current.pause();
  
        
          const adData = await fetchAdContent();
          setAdContent(adData.message);
  
         
          setTimeout(() => setShowCloseButton(true), 3000);
  
        
          setTimeout(() => {
            setShowAd(false);
            setShowCloseButton(false);
            if (wasPlayingBeforeAd && audioRef.current) {
              audioRef.current.play().catch((err) => console.error("Playback failed:", err));
            }
          }, 20000);
        }
      }
    };
  
    adInterval = setInterval(checkForAd, 600000); 
  
    return () => {
      clearInterval(adInterval); 
    };
  }, [user, audioRef, wasPlayingBeforeAd]);

  useEffect(() => {
    if (showAd) {
      setSkipTimeLeft(20); 
  
      const interval = setInterval(() => {
        setSkipTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowAd(false); 
            if (wasPlayingBeforeAd && audioRef.current) {
              audioRef.current.play();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [showAd]);
  
  

  useEffect(() => {
    if (!showAd && wasPlayingBeforeAd && audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Playback failed:", err));
      setWasPlayingBeforeAd(false);
    }
  }, [showAd]);
  
  
  return (
    <div className={`min-h-screen w-full bg-gradient-to-r from-black via-gray-900 to-red-700 overflow-hidden  relative ${showAd ? 'pointer-events-none' : ''}`}>
      {user ? (
        <>
          <div className="fixed top-0 left-0 w-full z-50">
        <Navbar user={user} setUser={setUser} />
      </div>
      <div className="h-[80%] flex h-full flex-row">
        {/* Sidebar - Fixed Position */}
        <div className="fixed top-0 left-0 h-full w-[15%]">
          <Sidebar />
        </div>

        {/* Main Content - Adjust Width */}
        <div ref={displayRef} className="w-full  px-1 pt-16 h-full rounded text-white overflow-auto lg:w-[85%] lg:ml-[15%]">
          {!showAd && (
            <Routes>
              <Route path="/" element={<DisplayHome />} />
              <Route path="/album/:id" element={<DisplayAlbum />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/premium" element={<SubscriptionPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
          )}
        </div>
      </div>
           {/* Fixed Player at the Bottom */}
          <div className="fixed bottom-0 left-0 w-full  bg-black z-50">
            <Player />
          </div>
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-red-700 text-white">
          {!showAd && (
            <Routes>
              <Route path="/" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          )}
        </div>
      )}
     
      {/* Ad Component */}
      {showAd && (
  <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-80 text-white z-50">
    <div className="relative p-4 rounded-lg shadow-lg">
      <video
        ref={adVideoRef}
        src="/Tuneify.mp4"
        autoPlay
        className="w-[150px] h-[100px] sm:w-[300px] sm:h-[250px]  object-cover rounded"
        controls
        onEnded={() => {
          setShowAd(false);
          if (wasPlayingBeforeAd && audioRef.current) {
            audioRef.current.play();
          }
        }}
      />
      
      {/* Countdown timer for 20 seconds */}
      <div className="absolute bottom-1 right-1 bg-black text-white px-3 py-1 rounded-lg text-sm">
        Ad closes in {skipTimeLeft}s
      </div>
    </div>
  </div>
)}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)"
        }}
      />
      <audio ref={audioRef} src={track ? track.file : ""} preload="auto"></audio>
    </div>
  );
};
export default App;