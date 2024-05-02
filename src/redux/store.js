import {combineReducers, legacy_createStore as createStore} from 'redux'
import likedSongsReducer from './reducers/likedSongsReducer';
import movieReducer from './reducers/movieReducer';
import playerReducer from './reducers/playerReducer';

const rootReducer = combineReducers({
    movies:movieReducer,
    likedSongs:likedSongsReducer,
    player:playerReducer
});
const store = createStore(rootReducer);
export default store;