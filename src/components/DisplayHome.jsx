import React, { useRef, useContext } from 'react';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';
import Footer from './Footer';

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  const albumContainerRef = useRef(null);
  const songContainerRef = useRef(null);

  const scroll = (containerRef, direction) => {
    const container = containerRef.current;
    const cardWidth = container.firstChild ? container.firstChild.offsetWidth : 0;
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-red-700 min-h-screen pb-20">
      {/* Featured Charts */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll(albumContainerRef, 'left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          >
            &lt;
          </button>

          {/* Album List */}
          <div className="flex overflow-hidden scroll-smooth" ref={albumContainerRef}>
            {albumsData.map((item, index) => (
              <AlbumItem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
                className="w-full sm:w-1/5 flex-shrink-0"
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll(albumContainerRef, 'right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Today's Biggest Hits */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits</h1>
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll(songContainerRef, 'left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          >
            &lt;
          </button>

          {/* Songs List */}
          <div className="flex overflow-hidden scroll-smooth" ref={songContainerRef}>
            {songsData.map((item, index) => (
              <SongItem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
                className="w-full sm:w-1/5 flex-shrink-0"
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll(songContainerRef, 'right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          >
            &gt;
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DisplayHome;
