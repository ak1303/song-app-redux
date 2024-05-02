const initialState ={

}
/* 
    songId,
    movieId,
    index,
    isPlaying,
    playlist: movie/likedsong   is player playing song of a movie or likedSong playlist
*/
const playerReducer = (state = initialState,action) =>{
    switch (action.type){
        case 'set_song': return {...action.payload, isPlaying: true}
        case 'set_play_status': return {...state, isPlaying:!state.isPlaying }
        case 'change_song': return {...state,songId:action.payload.songId, index: action.payload.index, isPlaying:true}
        default : return state;
    }
}
export default playerReducer;