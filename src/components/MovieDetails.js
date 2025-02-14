import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MovieDetails = () => {
  const { id } = useParams();
  const movies = useSelector((store) => store.movies);
  const gptMovies = useSelector((store) => store.gpt.movieResult);
  
  const movie = (
    movies?.nowPlayingMovies.find(movie => movie.id === parseInt(id)) ||
    movies?.topRatedMovies.find(movie => movie.id === parseInt(id)) ||
    movies?.upcomingMovies.find(movie => movie.id === parseInt(id)) ||
    movies?.popularMovies.find(movie => movie.id === parseInt(id)) ||
    gptMovies?.flat().find(movie => movie.id === parseInt(id)) // Check GPT movies as well
  );

  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <VideoBackground movie_id={movie.id} />
      <VideoTitle title={movie.title} overview={movie.overview} />
    </div>
  );
};

export default MovieDetails;
