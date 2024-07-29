import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { options } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movie_id) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
      options
    );
    const response = await data.json();

    const filterData = response.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : response.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, [movie_id]); // Add movie_id as a dependency to refetch when it changes
};

export default useMovieTrailer;
