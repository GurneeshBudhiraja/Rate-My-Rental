import React, { useState } from "react";
import { Input } from "../components";
import { useForm } from "react-hook-form";
import { auth } from "../../Appwrite/Services/services";
import { useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";


function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { register, handleSubmit, setFocus} = useForm();

  async function signup(data){
    setLoading(true);
    setError(null);
    try{      
      const resp = await auth.signup(data);
      // console.log(resp);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }finally{
      setLoading(false);
    } 
    
  };
  // autofocus on the name input field
  React.useEffect(()=>{setFocus("name")},[setFocus])
  return (
    <div>
      <div className=" bg-[#0a0a0a] h-screen flex items-center justify-center px-2">
        <div className="px-2 py-4 rounded-md border-2 border-[#334f88] max-w-prose mx-auto -translate-y-10">
          <h1 className="text-center text-white font-bold text-2xl mb-2 tracking-widest">
            Sign Up
          </h1>
          <h1 className="text-gray-300 text-center mb-3 text-sm">
            Create your account
          </h1>
          {error && (
            <p className="text-rose-600 text-center font-semibold  my-3">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit(signup)} className="px-5">
            <Input
              placeholder="Enter Full Name"
              label="Full Name"
              labelClassname="text-white"
              className="outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              type="text"
              register={register}
              name="name"
              extraFormFeatures={{
                required: true,
                maxLength: 20,
                pattern: /^[a-zA-Z\s]{1,20}$/,
              }}
            />
            <Input
              placeholder="Email Address"
              labelClassname="text-white"
              label="Email"
              className="outline-none border-[#0a0a0a] border-2 bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              type="email"
              register={register}
              name="email"
              extraFormFeatures={{
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                maxLength: 50,
              }}
            />
            <Input
              placeholder="Password"
              label="Password"
              className="outline-none border-[#0a0a0a] border-2 bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              labelClassname="text-white"
              type="password"
              register={register}
              name="password"
              extraFormFeatures={{
                required: true,
                minLength: 8,
                maxLength: 20,
              }}
            />
            {loading ? (
              <div className="bg-[#2a6dff] text-white w-full p-0 rounded-md mt-2 flex justify-center">
                <Vortex visible={loading} height="40" width="40" colors={[]} />
              </div>
            ) : (
              <Input
                type="submit"
                className="bg-[#2a6dff] text-white w-full p-2 rounded-md mt-2"
              />
            )}
          </form>
          <p className="text-white text-center my-2 ">
            Already have an account?
            <span
              className="tracking-wide text-[#4d71cc] font-bold ml-1"
              onClick={() => navigate("/login")}
            >
              LogIn
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
