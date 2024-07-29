import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movie_id }) => {
  useMovieTrailer(movie_id);

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  if (!trailerVideo) return null;

  return (
    <div className="relative w-screen h-screen">
      <iframe
        className="w-full h-full object-cover"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?vq=hd2160&autoplay=1&mute=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
