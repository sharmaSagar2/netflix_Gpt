import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import { toogleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch);
 // console.log(user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      
    }).catch((error) => {
      navigate("/error");
    });
  }
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({
          uid:uid,
          email:email,
          displayName:displayName,
          photoURL:photoURL
        }))
       navigate("/browse")

      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
//unsubscribe when componet unmounts
    return ()=>unsubscribe();

  },[])

  const handleGptSearchClik = () => {
    dispatch(toogleGptSearchView())
  }
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))

  }

  return (
    <div className='absolute w-screen bg-gradient-to-t from-black z-10 flex justify-between'>
      <img 
        className='w-[110px]'
        src="https://imgs.search.brave.com/vq4rM2jnG_LzMeZHGVj-BEoZt4Dh_sgI32r0Q2xK5bw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1Mjku/cG5n" 
        alt="logo"
      />
      {user &&(
         <div className='flex p-2 items-center'>
          {showGptSearch && (
  <select
    className='p-2 m-2 bg-gray-900 text-white'
    onChange={handleLanguageChange}
  >
    {SUPPORTED_LANGUAGES.map(lang => (
      <option key={lang.identifier} value={lang.identifier}>
        {lang.name}
      </option>
    ))}
  </select>
)}

        <button 
        className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-gradient-to-r hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
        onClick={handleGptSearchClik}
        >
  {showGptSearch ? "Homepage" : "Gpt Search"}
</button>

         <img 
           className='w-12 h-12 m-2 rounded-lg'
          src={user?.photoURL }
          
           alt="icon"
         />
         <button 
           onClick={handleSignOut} 
           className='bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300'
         >
           Sign Out
         </button>
       </div>

      )}
     
    </div>
  );
}

export default Header;
