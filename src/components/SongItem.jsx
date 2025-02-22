import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItem = ({name,image,desc,id}) => {

    const {playWithId} = useContext(PlayerContext)

  return (
    <div onClick={()=>playWithId(id)} className='min-w-[130px] sm:min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-red-700'>
      <img className='w-full min-h-[140px] sm:min-h-[200px] max-h-[145px] sm:max-h-[205px] rounded object-cover' src={image} alt="" />
      <p className='font-bold mt-2 mb-1'>{name}</p>
      <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default SongItem
