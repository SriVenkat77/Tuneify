import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { url } from '../../App';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [colour, setColour] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColour", colour);

      const response = await axios.post(`${url}/api/album/add`, formData);

      if (response.data.success) {
        toast.success("Album Created");
        
    
        setName("");
        setDesc("");
        setImage(false);
        setColour("");

       
        setTimeout(() => {
          navigate('/list-albums');
         
        }, 1500);
      } else {
        toast.error("Something went wrong");
      }

      setLoading(false);
    } catch (error) {
      toast.error("Error occurred");
      setLoading(false);
    }
  };

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="flex justify-center min-h-screen items-center ">
      <form onSubmit={onSubmitHandler} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full sm:w-[50vw] space-y-6">
        <h2 className="text-2xl font-semibold text-center text-white">Create a New Album</h2>
        <p className="text-lg text-center text-red-600">* Make Sure adding Songs to the Album</p>
        
        <div className="flex flex-col gap-2.5">
          <p className="text-white">Album Name</p>
          <input 
            className='bg-black text-white outline-none border-2 rounded-lg border-gray-400 p-2.5 w-full' 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            type="text" 
            placeholder='Type here' 
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-white">Album Description</p>
          <input 
            className='bg-black text-white outline-none border-2 rounded-lg border-gray-400 p-2.5 w-full' 
            onChange={(e) => setDesc(e.target.value)} 
            value={desc} 
            type="text" 
            placeholder='Type here' 
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-white">Upload Image</p>
          <div className="flex justify-center items-center">
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
            <label htmlFor="image">
              <img className='w-32 cursor-pointer rounded-lg ' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Area" />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-white">Background Colour</p>
          <input 
            onChange={(e) => setColour(e.target.value)} 
            value={colour} 
            type="color" 
            className="w-full border-1 border-gray-400 rounded-lg" 
          />
        </div>

        <button 
          className='w-full py-3 bg-red-600 text-black font-semibold rounded-lg mt-4 hover:bg-white transition duration-300' 
          type='submit'>
            Add the Album
        </button>
      </form>
    </div>
  );
}

export default AddAlbum;
