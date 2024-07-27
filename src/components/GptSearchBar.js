import React from 'react';
import { useSelector } from 'react-redux';
import lang from '../utils/languageConstansts';

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang);
    return (
        <div className='pt-[8%] flex justify-center'>
            <form className='w-1/2 bg-black grid grid-cols-12'>
                <input
                    type="text"
                    className='p-4 m-4 col-span-9 rounded-lg'
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    className='col-span-3 m-3 py-2 px-4 bg-red-600 text-white rounded-lg'
                    type="submit"
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
}

export default GptSearchBar;
