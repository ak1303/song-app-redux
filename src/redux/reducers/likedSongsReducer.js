const initialState =[]

/*
 songid,                

 movieId,
*/
const likedSongsReducer = (state = initialState,action) =>{
    switch(action.type){
        case "ADD_SONG":
            return [...state,action.payload];
        case "REMOVE_SONG":
            return state.filter(song => song.songId!== action.payload.songId);
        default:
            return state;
    }
}
export default likedSongsReducer;

// case 'change_song': return {...state,songId:action.payload.songId, index: action.payload.index, isPlaying:true}

// likedSongs = [
//     {
//      songId, movieId
//     {
//       songId, movieId
//     },
//     ---------
// ]