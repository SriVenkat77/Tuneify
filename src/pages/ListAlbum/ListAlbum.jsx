import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../App';
import { toast } from 'react-toastify';
import { FaTrash, FaPlus } from 'react-icons/fa';

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const navigate = useNavigate();

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error) {
      toast.error("Error occurred while fetching albums");
    }
  };

  const handleDeleteClick = (album) => {
    setSelectedAlbum(album);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedAlbum) return;
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id: selectedAlbum._id });
      if (response.data.success) {
        toast.success(response.data.message);
        setShowConfirm(false);
        await fetchAlbums();
      }
    } catch (error) {
      toast.error("Error occurred while removing album");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="p-3 pt-12 max-w-6xl mx-auto">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">All Albums</h2>
        <button 
          className="bg-[#1db954] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#18a349] transition"
          onClick={() => navigate('/add-album')}
        >
          <FaPlus /> Add Album
        </button>
      </div>

    {/* Table Header - Always Visible */}
<div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_0.5fr] items-center gap-3 p-3 border border-gray-600 text-sm bg-white text-black rounded-md my-2"
          >
  <b>Image</b>
  <b>Name</b>
  <b className="hidden sm:block truncate" >Description</b>
  <b className="hidden sm:block truncate" >Action</b>
</div>


      {/* Album List */}
      {data.length > 0 ? (
        data.map((item, index) => (
          <div 
            key={index} 
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_0.5fr] items-center gap-3 p-3 border border-gray-600 text-sm bg-gray-800 text-white rounded-md my-2"
          >
            {/* Image */}
            <img className="w-12 h-12 object-cover rounded-md" src={item.image} alt={item.name} />

            {/* Name */}
            <p className="font-medium">{item.name}</p>

            {/* Description */}
            <p className="hidden sm:block truncate">{item.desc}</p>

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
        <p className="text-gray-400 text-center mt-6">No albums found.</p>
      )}

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-lg border-2 border-white shadow-lg text-white w-80 text-center">
            <h3 className="text-lg font-bold mb-2">Confirm Delete</h3>
            <p>Are you sure you want to delete <span className="text-red-500 font-semibold">{selectedAlbum?.name}</span> Album ?</p>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
  <button 
    className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700 transition w-full"
    onClick={confirmDelete}
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

export default ListAlbum;
