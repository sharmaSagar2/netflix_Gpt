import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:'gpt',
    initialState:{
        showGptSearch:false,
        gptMovies:null,
        movieNames:null,
        movieResult:null

    },
    reducers:{
        toogleGptSearchView:(state,action)=>{
            state.showGptSearch=!state.showGptSearch
        },
        addGptMoviesResult:(state,action)=>{
            const {movieNames,movieResult} = action.payload
            state.movieNames=movieNames;
            state.movieResult=movieResult
        },
        clearGptMovies:(state,action)=>{
            state.gptMovies = null;
            state.movieNames = null;
            state.movieResult = null;
        }

    }
})
export const {toogleGptSearchView,addGptMoviesResult,clearGptMovies} = gptSlice.actions

export default gptSlice.reducer;