import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { clearGptMovies, toogleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearGptMovies())
        if (showGptSearch) {
          dispatch(toogleGptSearchView());
        }
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    if (showGptSearch) {
      dispatch(clearGptMovies());
    }
    dispatch(toogleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen bg-gradient-to-t from-black z-10 flex flex-col md:flex-row justify-between">
      <img
        className="w-[110px] mx-auto md:mx-0"
        src={LOGO}
        alt="logo"
      />
      {user && (
        <div className="flex p-2 items-center justify-between w-full md:w-auto">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-gradient-to-r hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="hidden md:block w-12 h-12 m-2 rounded-lg"
            alt="usericon"
            src={user?.photoURL || USER_AVATAR}
          />
          
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white font-bold  py-2 px-4 mx-4 rounded hover:bg-red-700 transition duration-300"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
