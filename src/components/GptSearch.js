// import React from 'react'
// import GptSearchBar from './GptSearchBar'
// import GptMovieSuggestions from './GptMovieSuggestions'

// const GptSearch = () => {
//   return (
//     <div className='pt-[20%]'>
//          <div className=' fixed -z-20'>
     
//      <img 
//      className='w-full h-full object-cover'
//      src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_small.jpg" 
//      alg="logo"
//      />
//      </div>
//       <GptSearchBar/>
//       <GptMovieSuggestions/>
//     </div>
//   )
// }

// export default GptSearch

import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <>
      <div className="fixed -z-20">
        <img className="w-full h-screen md:h-full object-cover" src={BG_URL} alt="logo" />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};
export default GPTSearch;
