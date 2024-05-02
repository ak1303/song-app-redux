import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const likedSongs = useSelector(state=>state.likedSongs);
  const totalLikedSongs = likedSongs.length;
  return (
    <div className='bg-[#003135] text-[#afaaa0] flex justify-between items-center px-5 border-b'>
      <Link to="/">
        <header className="italic font-bold text-xl text-green-400 " ><span className='text-red-500'>Songs</span>.com</header>
      </Link>
      <div className='flex gap-4'>
        <Link to="/">
            <div className='text-white cursor-pointer hover:text-[aqua]'>Movies</div>
          </Link>
        <Link to="/likedsongs">
          <Badge badgeContent={totalLikedSongs} max={99} color='secondary' >
            <FavoriteIcon className='text-white hover:text-red-600'/>
          </Badge>
        </Link>
      </div>
    </div>
  )
}

export default Header