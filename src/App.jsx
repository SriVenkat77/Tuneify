import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddSong from './pages/AddSong/AddSong';
import ListSong from './pages/ListSong/ListSong';
import AddAlbum from './pages/AddAlbum/AddAlbum';
import ListAlbum from './pages/ListAlbum/ListAlbum';
import ListUser from './pages/ListUser/ListUser';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';

export const url = 'https://tuneify-pbc9.onrender.com';

const App = () => {
  return (
    <div className='flex items-start min-h-screen'>
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
     
      <div className='flex-1 h-screen overflow-y-scroll bg-black'>
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/list-songs" element={<ListSong />} />
            <Route path="/add-album" element={<AddAlbum />} />
            <Route path="/list-albums" element={<ListAlbum />} />
            <Route path="/list-users" element={<ListUser />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
