import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lang from '../utils/languageConstansts';
import { useRef } from 'react';
import fetch from 'node-fetch';
import { OPENAI_KEY1, options } from '../utils/constants';
import { addGptMoviesResult} from '../utils/gptSlice';

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang);
    const searchTxt = useRef();
    const dispatch = useDispatch()

    const searchMovieTmdb = async(movie)=>{
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      options
      )
      const json = await data.json();

      return json.results;
    }

    const handleGptSearchClick = async () => {
        const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchTxt.current.value +
        ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

        try {
            const response = await fetch("https://api.ai21.com/studio/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENAI_KEY1}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "model": "jamba-instruct-preview",
                    "messages": [{ "role": "user", "content": gptQuery }],
                    "n": 1,
                    "max_tokens": 1024,
                    "temperature": 0.7,
                    "top_p": 1,
                    "stop": [],
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            const gptMovies=data.choices[0].message.content.split(",");
            const promiseArray= gptMovies.map(movie=>searchMovieTmdb(movie))
            const tmdbResult= await Promise.all(promiseArray);
            dispatch(addGptMoviesResult({ movieNames:gptMovies, movieResult:tmdbResult}));

        } catch (error) {
            console.error('Error:');
        }
    };

    return (
        <div className=' pt-[30%] md:pt-[8%] flex justify-center'>
            <form
                className='w-full md:w-1/2 bg-black grid grid-cols-12'
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    ref={searchTxt}
                    type="text"
                    className='p-4 m-4 col-span-9 rounded-lg'
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    className='col-span-3 m-3 py-2 px-4 bg-red-600 text-white rounded-lg'
                    onClick={handleGptSearchClick}
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
}

export default GptSearchBar;
