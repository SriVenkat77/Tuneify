import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { assets } from '../../assets/assets';
import { url } from '../../App';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddSong = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [album, setAlbum] = useState('none');
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);
  
  const navigate = useNavigate(); // Initialize navigate

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('audio', song);
      formData.append('album', album);

      const response = await axios.post(`${url}/api/song/add`, formData);

      if (response.data.success) {
        toast.success('Song Added to Album!');
        
        // Reset form fields
        setName('');
        setDesc('');
        setAlbum('none');
        setImage(false);
        setSong(false);

        // Wait for the toast to be visible before redirecting
        setTimeout(() => {
          navigate('/list-songs'); // Redirect to the song list page
          window.location.reload(); // Refresh the page
        }, 2000); // Delay of 2 seconds
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumData(response.data.albums);
    } catch (error) {
      console.error('Error loading album data', error);
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
    </div>
  ) : (
    <div className='flex justify-center min-h-screen items-center'>
      <form
        onSubmit={onSubmitHandler}
        className='bg-gray-800 p-8 rounded-lg shadow-lg w-full sm:w-[50vw] space-y-6'
      >
        <h2 className='text-2xl font-semibold text-center text-white'>Add a New Song</h2>
        <p className="text-lg text-center text-red-600">* Make Sure to add Songs to the Right Album</p>

        {/* Input Fields */}
        <div className='flex flex-col gap-2.5 text-white'>
          <label>Song Name</label>
          <input
            className='bg-black outline-green-600 border-2 rounded-lg border-gray-400 p-2.5'
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            placeholder='Enter song name'
            required
          />
        </div>

        <div className='flex flex-col gap-2.5 text-white'>
          <label>Song Description</label>
          <input
            className='bg-black outline-green-600 border-2 rounded-lg border-gray-400 p-2.5'
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            type='text'
            placeholder='Enter song description'
            required
          />
        </div>

        <div className='flex flex-col gap-2.5 text-white'>
          <label>Album</label>
          <select
            className='bg-black outline-green-600 border-2 rounded-lg border-gray-400 p-2.5'
            onChange={(e) => setAlbum(e.target.value)}
            value={album}
          >
            <option value='none'>None</option>
            {albumData.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Inputs */}
        <div className='flex flex-wrap gap-8 justify-center'>
          <div className='flex flex-col gap-4 text-white'>
            <label>Upload Song</label>
            <input
              onChange={(e) => setSong(e.target.files[0])}
              type='file'
              accept='audio/*'
              hidden
              id='song'
            />
            <label htmlFor='song'>
              <img
                className='w-32 cursor-pointer rounded-lg'
                src={song ? assets.upload_added : assets.upload_song}
                alt='Upload Song'
              />
            </label>
          </div>

          <div className='flex flex-col gap-4 text-white'>
            <label>Upload Image</label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type='file'
              accept='image/*'
              hidden
              id='image'
            />
            <label htmlFor='image'>
              <img
                className='w-32 h-32 cursor-pointer rounded-lg'
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt='Upload Image'
              />
            </label>
          </div>
        </div>

        <button
          className='w-full py-3 bg-red-600 text-black font-semibold rounded-lg mt-4 hover:bg-white transition duration-300'
          type='submit'
        >
          Add the Song
        </button>
      </form>
    </div>
  );
};

export default AddSong;
