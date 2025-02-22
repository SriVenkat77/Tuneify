import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
  const { id } = useParams(); // Get the album ID from the URL
  const { albumsData, songsData, playWithId } = useContext(PlayerContext);
  const [albumData, setAlbumData] = useState(null);

  useEffect(() => {
    // Find the album from the albumsData based on the id
    const album = albumsData.find((item) => item._id === id);
    if (album) {
      setAlbumData(album);
    }
  }, [id, albumsData]);

  if (!albumData) return null; // Ensure albumData is loaded

  return (
    <div className="h-screen overflow-y-auto p-4 pb-24"> 
      {/* Album Content */}
      <div className="mt-20 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt={albumData.name} />
        <div className="flex flex-col">
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4>{albumData.desc}</h4>
        </div>
      </div>

      {/* Song list header */}
      <div className="sticky top-0 bg-black p-2 mt-10 rounded-lg text-gray-400 z-10">
        <div className="grid grid-cols-3 sm:grid-cols-4 pl-2">
          <p>Cover</p>
          <p>Title</p>
          <p className="hidden sm:block">Album</p>
          <img className="m-auto w-4 text-gray-700" src={assets.clock_icon} alt="Clock Icon" />
        </div>
       
      </div>

      {/* Scrollable Songs List */}
      <div className="max-h-[60vh] overflow-y-auto mt-2">
        {songsData.filter((item) => item.album === albumData.name).map((item) => (
          <div
            onClick={() => playWithId(item._id)}
            key={item._id}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] rounded-lg bg-black bg-opacity-20 hover:bg-[#ffffff2b] cursor-pointer"
          >
            {/* Cover Image */}
            <img className="w-12 h-12 border border-white rounded" src={item.image} alt={item.name} />

            {/* Title */}
            <p className="text-white">{item.name}</p>

            {/* Hide "Album" column on small screens */}
            <p className="text-[15px] text-white hidden sm:block">{albumData.name}</p>

            {/* Song Duration */}
            <p className="text-[15px] text-white text-center">{item.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayAlbum;
