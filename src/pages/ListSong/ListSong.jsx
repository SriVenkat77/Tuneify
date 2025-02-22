import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../App';
import { toast } from 'react-toastify';
import { FaTrash, FaPlus, FaFilter, FaSearch } from 'react-icons/fa';

const ListSong = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);  
  const [songFilter, setSongFilter] = useState('');  
  const [albumFilter, setAlbumFilter] = useState('all'); 
  const [albums, setAlbums] = useState([]); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const navigate = useNavigate();

  // Fetch songs from API
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
        setFilteredData(response.data.songs);  
        extractAlbums(response.data.songs);  
      }
    } catch (error) {
      toast.error("Error occurred while fetching songs");
    }
  };

  // Extract unique albums from data
  const extractAlbums = (songs) => {
    const albumList = [...new Set(songs.map(song => song.album))];  
    setAlbums(albumList);
  };

  // Filter songs
  const filterSongs = () => {
    let filtered = data.filter((item) =>
      item.name.toLowerCase().includes(songFilter.toLowerCase()) &&
      (albumFilter === 'all' || item.album === albumFilter)
    );
    setFilteredData(filtered);
  };

  const removeSong = async () => {
    if (!selectedSong) return;
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id: selectedSong._id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Error occurred while removing song");
    }
    setShowConfirm(false);
  };

  const handleDeleteClick = (song) => {
    setSelectedSong(song);
    setShowConfirm(true);
  };

  const handleCreateSong = () => {
    navigate('/add-song');
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    filterSongs();
  }, [songFilter, albumFilter]);

  return (
    <div className="p-3 pt-12 max-w-6xl mx-auto">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">All Songs</h2>
        <button
          className="bg-[#1db954] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#18a349] transition"
          onClick={handleCreateSong}
        >
          <FaPlus /> Add Song
        </button>
      </div>

      {/* Filter Options */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
          <div className="relative w-full sm:w-auto">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by song..."
                    className="pl-10 pr-4 py-2 border rounded-md text-black w-full sm:w-64"
                    value={songFilter}
                    onChange={(e) => setSongFilter(e.target.value)}
                  />
                </div>

        {/* Album Filter Dropdown */}
        <div className="relative w-full sm:w-auto">
          <FaFilter className="absolute left-3 top-3 text-gray-400" />
          <select
            className="pl-10 pr-4 py-2 border rounded-md text-black w-full sm:w-48"
            value={albumFilter}
            onChange={(e) => setAlbumFilter(e.target.value)}
          >
            <option value="all">All Albums</option>
            {albums.map((album, index) => (
              <option key={index} value={album}>{album}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_1fr_0.5fr_0.5fr] items-center gap-3 p-3 border border-gray-600 text-sm bg-white text-black rounded-md my-2">
        <b>Image</b>
        <b>Song</b>
        <b className="hidden sm:block truncate">Album</b>
        <b className="hidden sm:block truncate">Duration</b>
        <b className="hidden sm:block truncate">Action</b>
      </div>

      {/* Song List */}
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_1fr_0.5fr_0.5fr] items-center gap-3 p-3 border border-gray-600 text-sm bg-gray-800 text-white rounded-md my-2"
          >
            {/* Image */}
            <img className="w-12 h-12 object-cover rounded-md" src={item.image} alt={item.name} />

            {/* Name */}
            <p className="font-medium">{item.name}</p>

            {/* Album */}
            <p className="hidden sm:block">{item.album}</p>

            {/* Duration */}
            <p className="hidden sm:block">{item.duration}</p>

            {/* Delete Button */}
            <button
              className="text-red-500 hover:text-red-700 transition text-lg flex"
              onClick={() => handleDeleteClick(item)}
            >
              <FaTrash />
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center mt-6">No songs found.</p>
      )}

      {/* Confirmation Popup */}
      {showConfirm && selectedSong && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-lg border-2 border-white shadow-lg text-white w-80 text-center">
            <h3 className="text-lg font-bold mb-2">Confirm Delete</h3>
            <p>Are you sure you want to delete <span className="text-red-500 font-semibold">{selectedSong.name}</span>Song ?</p>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button 
                className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700 transition w-full"
                onClick={removeSong}
              >
                Delete
              </button>
              <button 
                className="bg-gray-600 px-4 py-2 rounded-md text-white hover:bg-gray-700 transition w-full"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div> 
        </div>
      )}
    </div>
  );
};

export default ListSong;
