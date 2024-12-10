import React, { useState } from "react";
import { Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });     
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill all the fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res=await fetch('http://localhost:5000/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json()
      console.log(data);
      if (res.status === 400) {
        setErrorMessage(data.message)
        setLoading(false);
      }
      if (data.success===false) {
        setLoading(false);
       return setErrorMessage("Username or Email already exists! Please try again.");
       
      }
      if (res.ok) {
        navigate('/signin')
      }
    } 
    catch (error) {
      setErrorMessage(error.message || "Something went wrong! Please try again.");
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#10172a] w-full flex flex-col md:flex-row flex-wrap min-h-screen justify-start md:justify-center items-start md:pt-32 pt-10 ">
      <div className="flex w-full md:w-1/2 flex-col gap-3 px-2">
        <h1 className="bg-gradient-to-r from-pink-600 via-pink-600 to-violet-600 text-transparent bg-clip-text text-center text-xl font-medium ">
          Job application tracker
        </h1>
        <h1 className="text-3xl  sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center">
          Track & Organize <br /> Your Job Search
        </h1>

        <h1 className="text-center  text-slate-200 font-semibold sm:text-lg">
          The leading tool for organizing, tracking, and <br /> managing all of
          your job applications in one place.
        </h1>
        <Link to="/signin" className="w-48 mx-auto"></Link>
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-5 justify-start items-center mt-7 px-2">
        <form className="flex flex-col gap-5 w-[90%] sm:w-[70%]" onSubmit={handleSubmit}>
          <div className=" flex flex-col gap-5">
            <div className="flex flex-col gap-2">
            <Label value='Username' className="text-white" />
            <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-2">
              <Label value="Email" className="text-white" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label value="Password" className="text-white" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>
          </div>
          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="ml-2">Please wait...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          {/* <OAuth /> */}
        </form>
        <div className="flex gap-2 text-sm mt-2 ">
          <span className="text-white">Don't Have an account!</span>
          <Link to="/signin" className="text-purple-500">
            {" "}
            Sign In
          </Link>
        </div>
        {
            errorMessage && <Alert className='mt-5 ' color="failure">
              {errorMessage}
            </Alert>
          }
      </div>
    </div>
  );
}
