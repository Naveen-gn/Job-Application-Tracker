import React, { useState } from 'react'
import { IoMdSave } from "react-icons/io";
import { FaLightbulb } from "react-icons/fa";
import { TbBrandSpeedtest } from "react-icons/tb";
import { Button,Label,TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'


export default function Signin() {
  const [loading, setLoading] = useState(false)
  return (
    <div className='bg-[#10172a] w-full flex flex-col md:flex-row flex-wrap min-h-screen justify-start md:justify-center items-start md:pt-32 pt-10 '>

    <div className='flex w-full md:w-1/2 flex-col gap-3 px-2'>
    <h1 className='bg-gradient-to-r from-pink-600 via-pink-600 to-violet-600 text-transparent bg-clip-text text-center text-xl font-medium '>Job application tracker</h1>
    <h1 className='text-3xl  sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center' >Track & Organize <br /> Your Job Search</h1>

      <h1 className='text-center  text-slate-200 font-semibold sm:text-lg'>The leading tool for organizing, tracking, and <br /> managing all of your job applications in one place.</h1>
      <Link to="/signin" className='w-48 mx-auto'>
      
          </Link> 
    </div>

    <div className='w-full md:w-1/2 flex flex-col gap-5 justify-start items-center mt-7 px-2'>
       
    <form className='flex flex-col gap-5 w-[90%] sm:w-[70%]'  >

<div className=" flex flex-col gap-5">
<div className='flex flex-col gap-2'>
<Label value='Your Email' className='text-white'/>
  <TextInput type='email' placeholder='name@company.com' id='email'  />
</div>
  
<div className='flex flex-col gap-2'>
<Label value='Your Password' className='text-white'/>
<TextInput type='password' placeholder='**********' id='password'  />
</div>
  
</div>
<Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
{
  loading ? (<>
    <Spinner size='sm' />
    <span className='ml-2'>Loading...</span>
  </>
  ) : 'Sign In'
}
</Button> 
{/* <OAuth /> */}
</form>
<div className="flex gap-2 text-sm mt-2 ">
            <span className='text-white'>Don't Have an account!</span>
            <Link to='/signup' className='text-purple-500'> Sign Up</Link>
          </div>
      </div>
    
  </div>
  )
}
