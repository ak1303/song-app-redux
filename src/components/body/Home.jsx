import React from 'react'
import Header from '../header/Header';
import Player from '../player/Player';
import MoviesList from './MoviesList';
import { Outlet } from 'react-router-dom';


const Home = () => {

  const style = {
    home:{
      display:'grid',
      gridTemplateRows: '2fr 15fr 3fr',
      height: '100vh',
    },
  }
  return (
    <div style={style.home}>
      <Header/>
      <div className="overflow-auto" >
        <Outlet/>
      </div>
      <Player/>
    </div>
  )
}

export default Home;