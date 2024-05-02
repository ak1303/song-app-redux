import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MoviesList = () => {

  const movies = useSelector(state => state.movies);
  return (
    <div className='bg-[#182628] text-white grid grid-cols-4 gap-2 h-full p-5 justify-items-center items-center' >
      {
        movies.map(movie => {
          return (
              <Link key={movie.id} className='p-4 hover: bg-[#272727] rounded-lg' to={`movie/${movie.id}`}>
                <img src={movie.displayPicture} alt={movie.title} className='w-[250px] h-[250px] rounded-lg' />
                <h3 className='p-2' >{movie.name}</h3>
              </Link>
          )
        })
      }
    </div>
  )
}

export default MoviesList