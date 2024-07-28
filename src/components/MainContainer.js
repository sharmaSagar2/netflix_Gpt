import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'

const MainContainer = () => {
    const movies = useSelector(store=>store.movies?.nowPlayingMovies);
    console.log(movies);
    if(!movies) return; 
    
    const mainMovie=movies[0];
    const {overview,title,id} = mainMovie;
  return (
    <div>
        <VideoTitle  overview={overview} title={title}/>
        <VideoBackground movie_id={id}/>
     
    </div>
  )
}

export default MainContainer
