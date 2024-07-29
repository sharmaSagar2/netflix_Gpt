import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if (!movies) return null;

    const mainMovie = movies[0];
    const { overview, title, id } = mainMovie;
    return (
        <div className="relative w-screen h-screen">
            <VideoBackground movie_id={id} />
            <VideoTitle overview={overview} title={title} />
        </div>
    );
};

export default MainContainer;
