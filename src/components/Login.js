import React, { useState,useRef } from 'react'
import Header from './Header'
import { validataFormData } from '../utils/validateFormData';
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase"

import { useDispatch } from 'react-redux';
import {addUser} from "../utils/userSlice";
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage]=useState(null);
   

    const email = useRef(null);
    const password=useRef(null);
    const name=useRef(null);
    const dispatch=useDispatch();
   

    const handleButtonClick= () => {
      const message=validataFormData(email.current.value,password.current.value);
      setErrorMessage(message);
      if(message) return ;
      //sign Up and sing In
      if(!isSignInForm) {
        //sign up
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => { 
         const user = userCredential.user; 
         updateProfile(user, {
          displayName:name.current.value,
          photoURL: USER_AVATAR,
    
        }).then(() => {
          const {uid,email,displayName,photoURL} = auth.currentUser;
          dispatch(addUser({
            uid:uid,
            email:email,
            displayName:displayName,
            photoURL:photoURL
          }))
          console.log("in update",photoURL);
        }).catch((error) => {
           setErrorMessage(error.message);
        });
      
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
         });
      }else{

        signInWithEmailAndPassword(auth,
           email.current.value,
            password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;   
        console.log("in sing in",user)
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });
      }


      
    }
    const toogleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
  return (
    <div className='relative min-h-screen' >
     <Header/>
    <div className='absolute  w-full h-full'>
     
        <img 
        className='w-full h-full object-cover'
        src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_small.jpg" 
        alg="logo"
        />
        </div>
        <form onSubmit={(e)=>(e.preventDefault())} className={`w-[400px] ${!isSignInForm ? 'h-[510px]' : 'h-auto'}  absolute p-12 bg-black bg-opacity-70  mx-auto my-20 right-0 left-0 text-white rounded-xl`}>

        <h1 className='font-bold text-3xl mx-1 py-4'>
            {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
                 <input ref={name} type='text' placeholder='Name' className='p-4 my-4 w-full bg-slate-800 rounded-lg'/>
            )}
            <input ref={email} type='text' placeholder='Email' className='p-4 my-4 w-full bg-slate-800 rounded-lg'/>
            <input ref={password} type='password' placeholder='Password' className='p-4 my-2 w-full bg-slate-800 rounded-lg'/>
            <p className='text-red-700 font-bold'>{errorMessage}</p>
            <button className=" p-4 my-4 bg-red-700 w-full rounded-lg" onClick={handleButtonClick} >
              {isSignInForm ? "Sign In" : "Sign Up"}
              </button>
            <p className="cursor-pointer" onClick={toogleSignInForm}>
              {isSignInForm ? " New to Netflix? Sign Up Now" : "Already have an account? Sign In"}
             </p>
        </form>
    </div>
   
  )
}

export default Login










