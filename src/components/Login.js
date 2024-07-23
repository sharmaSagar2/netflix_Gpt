import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInForm,setIsSignInForm] = useState(true);
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
        <form className={`w-3/12 ${!isSignInForm ? 'h-[510px]' : 'h-auto'}  absolute p-12 bg-black bg-opacity-70  mx-auto my-20 right-0 left-0 text-white rounded-xl`}>

        <h1 className='font-bold text-3xl mx-1 py-4'>
            {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
                 <input type='text' placeholder='Name' className='p-4 my-4 w-full bg-slate-800 rounded-lg'/>
            )}
            <input type='text' placeholder='Email' className='p-4 my-4 w-full bg-slate-800 rounded-lg'/>
            <input type='password' placeholder='Password' className='p-4 my-2 w-full bg-slate-800 rounded-lg'/>
            <button className=" p-4 my-4 bg-red-700 w-full rounded-lg">Sign In</button>
            <p className="cursor-pointer" onClick={toogleSignInForm}>
              {isSignInForm ? " New to Netflix? Sign Up Now" : "Already have an account? Sign In"}
             </p>
        </form>
    </div>
   
  )
}

export default Login
