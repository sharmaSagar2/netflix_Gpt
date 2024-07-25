import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      navigate("/error");
    });
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
         <img 
           className='w-12 h-12 m-2 rounded-lg'
          src={user?.photoURL}
          //src="https://imgs.search.brave.com/7Zonynlaa1_jNrC1ilT9G_GSJYdeZ_6fZsURl7OWs-0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9i/ZWF1dGlmdWwtYW5p/bWUtY2hhcmFjdGVy/LWNhcnRvb24tc2Nl/bmVfMjMtMjE1MTAz/NTE1NS5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw"
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
