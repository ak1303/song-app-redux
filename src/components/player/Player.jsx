import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useRef } from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import './player.css';

const playerInfoSelector= (state) =>{//get songTitle,movie dp, song address and player state from movies 
  const movies = state.movies;
  const likedSongs = state.likedSongs;
  const playerInfo = state.player;
  console.log(playerInfo.playlist);
  if(playerInfo.playlist==='movie'){
    console.log('movie player');
    for(let i=0; i<movies.length; i++){
      if(movies[i].id == playerInfo.movieId){
        const song = movies[i].songs.filter((s,index)=>index==playerInfo.index)[0];
        //next song
        const nextSong = playerInfo.index==movies[i].songs.length-1 ?
          movies[i].songs[0]
          :movies[i].songs.filter((s,index)=>index==playerInfo.index+1)[0];
          //prev song
        const prevSong = playerInfo.index==0 ? movies[i].songs[movies[i].songs.length-1]
          :movies[i].songs.filter((s,index)=>index==playerInfo.index-1)[0];
          //return
        return {
          ...playerInfo,
          nextSongId: nextSong.id,
          prevSongId: prevSong.id,
          songTitle : song.title,
          movieDp : movies[i].displayPicture,
          songAddress : song.fileAddress, 
          totalSongs: movies[i].songs.length,
        }
      }
    }
  }else if(playerInfo.playlist==='likedsongs'){
    console.log('likedSong player');
    for(let i=0;i<likedSongs.length;i++){
      if(playerInfo.index==i){
        const currentMovie = movies.filter(m=>m.id==likedSongs[i].movieId)[0];
        const currentSong = currentMovie.songs.filter(s=>s.id==likedSongs[i].songId)[0];
        const currentIndex = playerInfo.index;
        const nextSongId = currentIndex!==likedSongs.length-1 ?likedSongs[currentIndex+1].songId:likedSongs[0].songId;
        const prevSongId = currentIndex!==0 ?likedSongs[currentIndex-1].songId:likedSongs[likedSongs.length-1].songId;
        console.log(currentSong,currentMovie);
        return {
          ...playerInfo,
          nextSongId: nextSongId,
          prevSongId: prevSongId,
          songTitle : currentSong.title,
          movieDp : currentMovie.displayPicture,
          songAddress : currentSong.fileAddress, 
          totalSongs: likedSongs.length,
        }
      }
    }
  }
}
/* -------------------^^^ player info selector ^^^-------------------*/
const breakTime = (time) => {
  const minutes = parseInt(time/60);
  const seconds = parseInt(time%60);
  return `${minutes}:${seconds<10? '0'+seconds : seconds}`;
}

/* -------------------^^^ break time ^^^-------------------*/
const Player = () => {

  
  const[duration,setTotalDuration]=useState(0);
  const[seekTime, setSeekTime]=useState(0);
  const playerInfo = useSelector(playerInfoSelector);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const playerWidth = parseInt((seekTime/duration)*100) + '%'; // width of player green bar
  const updateTime = ()=>{
    setSeekTime(audioRef.current.currentTime);
  }
  const updateTimeOnDrag = (e) =>{
    audioRef.current.currentTime = e.target.value;
    setSeekTime(e.target.value);
  }
  const togglePlay = () =>{
    console.log('toggles play btn')
    dispatch({type:'set_play_status'})
  }
  const playNextSong = () =>{
    console.log('playing next song', playerInfo.songId);
    if(playerInfo.index >= playerInfo.totalSongs-1){
        dispatch({type:'change_song', payload:{index:0, songId:playerInfo.nextSongId}});
    }else{
      dispatch({type:'change_song', payload:{index:playerInfo.index+1, songId:playerInfo.nextSongId}});
    }
  }
  const playPrevSong = () =>{
    if(playerInfo.index <= 0){
      dispatch({type:'change_song', payload:{index:playerInfo.totalSongs-1, songId:playerInfo.prevSongId}});
    }else{
      dispatch({type:'change_song', payload:{index:playerInfo.index-1, songId:playerInfo.prevSongId}});
    }
  }
  useEffect(()=>{
    if(playerInfo?.isPlaying){
      audioRef.current?.play();
    }else{
      audioRef.current?.pause();
    }
  },[playerInfo?.isPlaying, playerInfo?.index])

  
  if(!playerInfo)
    return (
      <div className='bg-[#f6f6f6] grid grid-cols-1 items-center text-white'>
      <div className='audio  rounded-full flex flex-col items-center p-2 gap-3'>
        <div className='icons flex gap-3'>
          <SkipPreviousIcon className='text-[grey]'/>
          <PlayArrowIcon className='text-[grey]'/>
          <SkipNextIcon className='text-[grey]'/>
        </div>
         <div className='flex gap-2 w-full items-center'>
          <p className='text-[grey]'>{breakTime(seekTime)}</p>
          <div className={`sound-bar bg-[#272727] w-full h-[6px] rounded-full`}>
          <div className={`bg-[green] w-0 h-[6px] rounded-full`} ></div>
          </div>
          <p className='text-[grey]'>{breakTime(duration)}</p>
         </div>
      </div>
    </div>
    )
  return (
    <>
    {/* <div className={`bg-[green] h-[6px] rounded-full`} style={{width:playerWidth}}></div> */}
    <div>
      <div className='bg-[#2a2d36]'>
        <div className={`bg-[#2bc5b4] h-[6px] rounded-full`} style={{width:playerWidth}}></div>
      </div>
      <div className='bg-[#f6f6f6] grid grid-cols-3 items-center text-black'>
      <audio 
        ref={audioRef} 
        onCanPlayThrough={()=>setTotalDuration(audioRef.current.duration)}
        src={ "/"+ playerInfo.songAddress} controls 
        onTimeUpdate={updateTime}
        onEnded={playNextSong}
        className='hidden'
      />
      <div className='p-2 flex'>
        <div className='flex flex-col items-center'>
          <img src={playerInfo.movieDp} className='rounded-sm w-[50px] h-[50px] object-cover'/>
          <h1 >{playerInfo.songTitle}</h1>
        </div>
      </div>
      <div className='audio  rounded-full flex flex-col items-center p-2 gap-3'>
        <div className='icons flex gap-3'>
          <SkipPreviousIcon onClick={playPrevSong}/>
          {playerInfo.isPlaying ?
            <PauseIcon onClick={togglePlay} className='text-black'/>
            :<PlayArrowIcon onClick={togglePlay} className='text-black'/>
          }
          <SkipNextIcon onClick={playNextSong}/>
        </div>
         <div className='flex gap-2 w-full items-center'>
          <p className='text-[grey]'>{breakTime(seekTime)}</p>
          <div className={`w-full h-[7px] relative`}>
            <input type="range" value={seekTime} min={0} max={duration} onChange={updateTimeOnDrag}
            className='seekbar w-full absolute'/>
          </div>
          <p className='text-[grey]'>{breakTime(duration)}</p>
         </div>
      </div>
      <div className="justify-self-end me-5" >
        {playerInfo.playlist === 'likedsongs'?
            <div className='text-slate-400'>Playing Liked Song Playlist...</div>
          : <div className='text-slate-400'>Playing Movie Playlist...</div>
        }
      </div>
    </div>
    </div>
    
    </>
  )
}

export default Player;












// let currentSong = null;
//       for(let j=0;j<currentMovie.songs.length;j++){
//         if(currentMovie.songs[j].id == likedSongs[i].songId){
//           currentSong = currentMovie.songs[j];
//             break;
//         }
//       }

// let currentMovie = null;
//       for(let j=0;j<movies.length;j++){
//         if(movies[j].id == likedSongs[i].movieId){
//             currentMovie = movies[j];
//             break;
//         }
//       }


// const nextSong = findSong(nextSongId,movies);// next song can be from any movie
      // const prevSong = findSong(prevSongId,movies);