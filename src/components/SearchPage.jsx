import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';

const SearchPage = () => {
  const [filteredSongs, setFilteredSongs] = useState([]);
  const { songsData, playWithId } = useContext(PlayerContext);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (searchQuery) {
      const filtered = songsData.filter((song) =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs([]);
    }
  }, [searchQuery, songsData]);

  const SearchSongItem = ({ name, image, desc, id }) => (
    <div
      onClick={() => playWithId(id)}
      className="flex items-center p-4 bg-[#1f1f1f] rounded-lg cursor-pointer hover:bg-[#ffffff26] w-full mb-4"
    >
      <img
        className="rounded w-16 h-16 object-cover flex-shrink-0"
        src={image}
        alt={name}
      />
      <div className="ml-4">
        <p className="font-bold text-sm">{name}</p>
        <p className="text-slate-200 text-xs">{desc}</p>
      </div>
    </div>
  );
  

  return (
    <div className="w-full max-w-screen-lg mx-auto p-6 bg-gradient-to-r from-black via-gray-900 to-red-700 pb-24 text-white rounded-lg shadow-lg">
      <div className="flex gap-6 flex-wrap justify-start py-4">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <SearchSongItem
              key={song._id}
              name={song.name}
              desc={song.desc}
              id={song._id}
              image={song.image}
            />
          ))
        ) : (
          <p className="text-center text-white w-full">No songs found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
