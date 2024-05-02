import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import Favorite from '@mui/icons-material/Favorite';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BarChartIcon from '@mui/icons-material/BarChart';

const MovieSongs = () => {
  const {movieId} = useParams();
  const {isPlaying, songId} = useSelector(state=>state.player);// data of player
  console.log(isPlaying,songId);

  const movieList  = useSelector(state=>state.movies);
  const likedSongList = useSelector(state=>state.likedSongs);
  console.log(likedSongList);
  const selectedMovie =  movieList.filter(movie=>movie.id == movieId)[0];
  const songList = selectedMovie.songs;
  console.log(songList);

  const dispatch = useDispatch();
  const togglePlay = (event, songId, index) => {
    if(event==='pause')dispatch({type:'set_play_status'});
    else {
      dispatch({type:'set_song', payload:{songId, movieId, index, playlist:'movie'}})
    }
  }
  const addToLikedSong = (songId) => {
    dispatch({type:'ADD_SONG', payload:{songId,movieId}})
  }
  const removeLikedSong = (songId) => {
    dispatch({type:'REMOVE_SONG', payload:{songId}})
  }
  
  return (
    <div className='flex h-full'>
    <div className='bg-[#121212] text-white h-full flex flex-col justify-around p-2 gap-2 w-3/4'>
      {songList.map((song,index)=>{
        const likedSongId = likedSongList.filter((likedSong)=>likedSong.songId == song.id);
        const isLiked = likedSongId.length == 1 ? true : false;
        return (
          <div key={song.id} className="flex justify-between items-center p-2 rounded-full border-b border-[grey] shadow-lg">
            <div className='ms-8 flex items-center'>
              <div>{song.title}</div>
              <div className='ms-5'>{song.id==songId ? <BarChartIcon className='text-white'/>:""}</div>
            </div>
              
            <div className='flex gap-12 items-center me-8'>
              {isLiked ? 
                <Favorite className='text-red-500' onClick={()=>{removeLikedSong(song.id)}}/>
                :<Favorite className='text-white' onClick={()=>{addToLikedSong(song.id)}}/>
              }
              {isPlaying && song.id == songId ?
                <PauseIcon className='text-black bg-white rounded-full' onClick={()=>togglePlay('pause')}/>
                :<PlayArrowIcon className='text-black bg-white rounded-full' onClick={()=>togglePlay('play',song.id,index)}/>
              }
            </div>
          </div>
        )})}
    </div>
      <div className='flex w-1/4 text-black h-full p-5 bg-[#121212]'>
        <div className='rounded-xl p-2 -[grey] w-full h-full flex flex-col items-center justify-around'>
          <div className='text-xl text-white'>{selectedMovie.name}</div>
          <img src={selectedMovie.displayPicture} alt={selectedMovie.name}  className='rounded-lg'/>
        </div>
      </div>
    </div>
  )
}

export default MovieSongs
