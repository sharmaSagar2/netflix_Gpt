import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath,id }) => {
  const navigate= useNavigate();
  const handleClik = () => {
    navigate(`/movieDetails/${id}`);

  }
  if (!posterPath) return null;
  return (
    <div
     className="w-36 md:w-48 pr-4 cursor-pointer"
     onClick={handleClik}
     >
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;