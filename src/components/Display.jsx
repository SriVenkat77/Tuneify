import React, { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import ProfilePage from './ProfilePage';
import SubscriptionPage from './SubscriptionPage';
import AboutPage from './AboutPage';
import SupportPage from './SupportPage';
import AdminLogin from './AdminLogin';
import Payment from './Payment';
import EditProfile from './EditProfile';
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const Display = () => {
  const { albumsData } = useContext(PlayerContext);

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const bgColor = isAlbum ? albumsData.find((x) => x._id === albumId)?.bgColour : "#121212";

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  }, [isAlbum, bgColor]);

  return (
    <div ref={displayRef} className="w-full m-2 px-6 pt-4 rounded  text-white overflow-auto 
      sm:w-full sm:px-4 sm:pt-3 lg:w-[75%] lg:ml-0">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/premium" element={<SubscriptionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        
        {/* Uncomment this line if you want to show the album component */}
        {/* <Route path="/album/:id" element={<DisplayAlbum />} /> */}
      </Routes>
    </div>
  );
};

export default Display;
