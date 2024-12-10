import React, { useState } from 'react'
import { BsHeadset } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import { LuClock9 } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { PiSquaresFourBold } from "react-icons/pi";
import { RiPieChartLine } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { LuNetwork } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { Avatar } from "flowbite-react";
import { IoRocketSharp } from "react-icons/io5";

export default function NavBar({ email }) {
  const Login = localStorage.getItem("login");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [expandRealtimeSecurity, setExpandRealtimeSecurity] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu1 = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const extractNameFromEmail = (email) => {
    if (!email) return '';
    return email.split('@')[0];
  };
  const getFirstLetterFromEmail = (email) => {
    if (!email) return '';
    return email.charAt(0).toUpperCase();
  };
  
  // Usage in your component
  const firstLetter = getFirstLetterFromEmail(email);
  const name = extractNameFromEmail(email);
  function handleLogout(){
    localStorage.clear()
    window.location.href = '/'
  }
  return (
    <div className=" bg-[#1f2937] w-full px-4 py-[14px] shadow-lg flex justify-between items-center border-none">
      <h1 className="  text-xl font-semibold  flex gap-2 items-center bg-gradient-to-r from-pink-600 via-pink-600 to-violet-600 text-transparent bg-clip-text"><span><IoRocketSharp className='text-3xl text-pink-600' /></span><span><span className='text-2xl'>T</span>rack MyJob</span></h1>
      <div className="flex items-center gap-7  ">
      
        <button className="p-0 rounded-full " onClick={toggleMenu1}>
        {
          Login && (<Avatar rounded />)
        }
        </button>
        {isMenuOpen && (
          <div className="absolute z-50 right-12 mt-48 bg-[#F1F8FF] rounded-3xl drop-shadow-lg py-5 px-14 pt-8 flex flex-col justify-center items-center gap-4">
            <button onClick={()=>setIsMenuOpen(false)} className='a absolute top-2 right-3'>
            <IoClose className='text-black text-2xl' />
            </button>
            <h1 className="text-[#6A6A6A]">{email}</h1>

            <div className='flex flex-col items-center justify-center gap-3'>
              <div className="avatar placeholder">
                <div className="bg-[#2d5c8f] text-white w-16 rounded-full">
                  <span className='text-3xl'>{firstLetter}</span>
                </div>
              </div>
              <h1 className="text-[#6A6A6A]">Hi, {name}!</h1>
            </div>

            <button className='rounded-full px-7 py-2 border text-[#6A6A6A] border-[#6A6A6A] hover:bg-[#2d5c8f] hover:text-white' onClick={handleLogout}>Signout</button>
          </div>
        )}
      </div>
    </div>
  );
}
