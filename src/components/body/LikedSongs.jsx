import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Favorite from '@mui/icons-material/Favorite';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BarChartIcon from '@mui/icons-material/BarChart';
import { createSelector } from 'reselect';

const likedStateSelector = createSelector(
  state => state.likedSongs,
  state => state.movies,
  (likedSongs, movies) => {
    const songs = [];
    for(let i=0; i<likedSongs.length; i++){
      const songId = likedSongs[i].songId;
      const movieId = likedSongs[i].movieId;
      const selectedMovie = movies.filter(m => m.id == movieId)[0];
      const likedSong = selectedMovie.songs.filter(s => s.id == songId)[0];
      songs.push({likedSong,selectedMovie});
    }
    return songs;
  }
);
/** liked State Slector ^^ */
const LikedSongs = () => {

  const dispatch = useDispatch();
  const likedSongInfo = useSelector(likedStateSelector);
  const {isPlaying, songId} = useSelector(state=>state.player);

  const togglePlay = (event, songId, index, movieId) => {
    console.log(event, songId, index, movieId);
    if(event==='pause')dispatch({type:'set_play_status'});
    else {
      dispatch({type:'set_song', payload:{songId, movieId, index, playlist:'likedsongs'}})
    }
  }
  const addToLikedSong = () => {
    dispatch({type:'ADD_SONG', payload:{songId,movieId}})
  }
  const removeLikedSong = () => {
    dispatch({type:'REMOVE_SONG', payload:selectedMovie.id})
  }
  
  return (
    <div className='flex h-full'>
    <div className='bg-[#2a2d36] text-white h-full flex flex-col justify-around p-2 gap-2 w-3/4'>
      <h1 className='text-xl px-2 text-[aqua] text-center'>Liked Songs</h1>
      {likedSongInfo.map((song,index)=>{
        return (
          <div key={song.likedSong.id} className="flex justify-between items-center p-2 rounded-full border-b border-[grey] shadow-lg">
            <div className='ms-8 flex items-center'>
              <div>{song.likedSong.title}</div>
              <div className='ms-5'>{song.likedSong.id==songId ? <BarChartIcon className='text-white'/>:""}</div>
            </div>
              
            <div className='flex gap-12 items-center me-8'>
              {isPlaying && song.likedSong.id == songId ?
                <PauseIcon className='text-black bg-white rounded-full' onClick={()=>togglePlay('pause')}/>
                :<PlayArrowIcon className='text-black bg-white rounded-full' onClick={()=>togglePlay('play',song.likedSong.id,index,song.selectedMovie.id)}/>
              }
            </div>
          </div>
        )})}
    </div>
      <div className='flex w-1/4 text-black h-full p-5 bg-[#2a2d36]'>
        <div className='rounded-xl p-2 -[grey] w-full h-full flex flex-col items-center justify-around'>
          <div className='text-xl text-white'>{likedSongInfo.selectedMovie?.name}</div>
          <img src='/likedSong.jpeg' alt="hello" className='rounded-lg'/>
        </div>
      </div>
    </div>
  )
}

export default LikedSongs;