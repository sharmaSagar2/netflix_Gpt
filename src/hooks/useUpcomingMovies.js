
import { useDispatch, useSelector } from 'react-redux'
import {addUpcomingMovies}  from '../utils/moviesSlice'
import { options } from '../utils/constants'
import { useEffect } from 'react'
const useUpcomingMovies = () => {
   const upcomingMovies=useSelector(store=>store.upcomingMovies)
    const dispatch = useDispatch()
    const getUpcomingMovies = async()=>{
    const data = await fetch( 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',options)
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results))
  }
  useEffect(()=>{
   !upcomingMovies && getUpcomingMovies()
  },[]);
}

export default useUpcomingMovies ;