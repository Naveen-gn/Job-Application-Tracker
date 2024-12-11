import React, { useEffect } from 'react'
import { IoMdSave } from "react-icons/io";
import { FaLightbulb } from "react-icons/fa";
import { TbBrandSpeedtest } from "react-icons/tb";
import { Button } from 'flowbite-react'
import { Link,useNavigate  } from 'react-router-dom'

export default function Home() {
  const navigate=useNavigate();
  const Login = localStorage.getItem("Login");
  useEffect(() => {
    if (Login) {
      navigate('/dashboard')
    }
  }, [])
  return (
    <div className='bg-[#10172a] w-full flex flex-col md:flex-row flex-wrap min-h-screen justify-start items-start pt-5 md:pt-32 '>

      <div className='flex w-full md:w-1/2 flex-col gap-3 px-2'>
      <h1 className='bg-gradient-to-r from-pink-600 via-pink-600 to-violet-600 text-transparent bg-clip-text text-center text-xl font-medium '>Job application tracker</h1>
      <h1 className='text-3xl  sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center' >Track & Organize <br /> Your Job Search</h1>

        <h1 className='text-center  text-slate-200 font-semibold sm:text-lg'>The leading tool for organizing, tracking, and <br /> managing all of your job applications in one place.</h1>
        <Link to="/signin" className='w-48 mx-auto'>
        <Button gradientDuoTone='purpleToPink' className='w-full'>
        Get started
            </Button>
            </Link> 
      </div>

      <div className='w-full md:w-1/2 flex flex-col gap-5 justify-start items-center mt-7 px-2'>
          <div className='flex items-center gap-3 max-w-[400px] sm:w-[400px] border rounded-lg h-24 px-9 sm:px-3'>
                <div><IoMdSave className='text-green-500 text-3xl' /></div>
                <div className='flex flex-col gap-1'>
                  <p className='text-white dark:text-white text-wrap'>Save jobs throughout your search</p>
                  <p className='text-slate-500 dark:text-slate-200 text-wrap'>A fast, convenient way to bookmark jobs</p>
                </div>
          </div>
          <div className='flex items-center gap-3 max-w-[400px] sm:w-[400px] border rounded-lg h-24 px-3'>
                <div><FaLightbulb className='text-yellow-600 text-3xl' /></div>
                <div className='flex flex-col gap-1'>
                  <p className='text-white dark:text-white text-wrap'>Track & organize job opportunities by stage</p>
                  <p className='text-slate-500 dark:text-slate-200 text-wrap'>Keep a high level view of your job search pipeline</p>
                </div>
          </div>
          <div className='flex items-center gap-3 max-w-[400px] sm:w-[400px] border rounded-lg h-24 px-5 sm:px-3'>
                <div><TbBrandSpeedtest className='text-red-600 text-3xl' /></div>
                <div className='flex flex-col gap-1'>
                  <p className='text-white dark:text-white text-wrap'>Get job description insights</p>
                  <p className='text-slate-500 dark:text-slate-200 text-wrap'>View rich keyword & skill insights for every job</p>
                </div>
          </div>


        </div>
      
    </div>
  )
}
