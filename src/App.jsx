import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/body/Home';
import MoviesList from './components/body/MoviesList.jsx';
import MovieSongs from './components/body/MovieSongs.jsx';
import LikedSongs from './components/body/LikedSongs.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" Component={Home}>
              <Route path="/" Component={MoviesList}/>
              <Route path="/movie/:movieId" Component={MovieSongs}/>
              <Route path="/likedsongs" Component={LikedSongs}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
