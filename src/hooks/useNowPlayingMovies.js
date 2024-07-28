
import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies } from '../utils/moviesSlice'
import { options } from '../utils/constants'
import { useEffect } from 'react'
const useNowPlayingMovies = () => {
    const  nowPlayingMovies = useSelector((store)=>store.nowPlayingMovies)
    const dispatch = useDispatch()
    const getNowPlayingMovies = async()=>{
    const data = await fetch( 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',options)
    const json = await data.json();
    console.log(json.results);
    dispatch(addNowPlayingMovies(json.results))
  }
  useEffect(()=>{

   !nowPlayingMovies && getNowPlayingMovies()
  },[]);
}

export default useNowPlayingMovies
