import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
  const { track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong } = useContext(PlayerContext);

  return track ? (
    <div className='h-[25%] bg-black flex justify-between items-center text-white px-3 flex-wrap'>
      {/* Left Section: Song Details (Now Visible on Small Screens) */}
      <div className='flex items-center gap-4'>
        <img className='w-8 h-8 sm:w-16 sm:h-16 rounded-lg ' src={track.image} alt="" />
        <div>
          <p className='text-sm sm:text-base'>{track.name}</p>
          <p className='text-xs sm:text-sm'>{track.desc.slice(0, 12)}</p>
        </div>
      </div>

      {/* Center Section: Player Controls */}
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
          <img className='w-3 h-3 sm:w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
          <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />
          {playStatus ? (
            <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="" />
          ) : (
            <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" />
          )}
          <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
          <img className='w-3 h-3 sm:w-4 cursor-pointer' src={assets.loop_icon} alt="" />
        </div>

        {/* Time & Seek Bar */}
        <div className='flex items-center gap-2 w-full justify-center'>
          <p className='text-xs sm:text-sm'>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div ref={seekBg} onClick={seekSong} className='w-[50vw] sm:w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
            <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'/>
          </div>
          <p className='text-xs sm:text-sm'>{track.duration}</p>
        </div>
      </div>

      {/* Right Section: Extra Controls (Still Hidden on Small Screens) */}
      <div className='hidden sm:flex items-center gap-2 opacity-75'>
        <img className='w-4' src={assets.plays_icon} alt="" />
        <img className='w-4' src={assets.mic_icon} alt="" />
        <img className='w-4' src={assets.queue_icon} alt="" />
        <img className='w-4' src={assets.speaker_icon} alt="" />
        <img className='w-4' src={assets.volume_icon} alt="" />
        <img className='w-4' src={assets.mini_player_icon} alt="" />
        <img className='w-4' src={assets.zoom_icon} alt="" />
      </div>
    </div>
  ) : null;
};

export default Player;
