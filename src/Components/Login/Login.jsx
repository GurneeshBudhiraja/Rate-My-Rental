import React from "react";
import { Input, SubmitButton } from "../components";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Appwrite/Services/services";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Vortex } from "react-loader-spinner";
import {setUser} from "../../Store/AuthSlice/AuthSlice"


function Login() {
  const { register, handleSubmit, setFocus} = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [loading, setLoader] = React.useState(false);
  const login = async (data) => {
    setError(null)
    setLoader(true);
    try{
      // login user
      await auth.login(data);
      // get user object
      const user = await auth.currentUser();
      // extracting the user name and email
      const {name:userName,email:userEmail} = user;
      // dispatching the user object to the store
      dispatch(setUser({userName,userEmail}));
      // redirecting to the home page
      navigate("/");

      navigate("/");
    } catch(error){
      // console.log(error);
      setError(error.message);
    } finally{
      setLoader(false);
    }
  };
  // autofocus on the email input field
  React.useEffect(()=>{
    setFocus("email")
  },[setFocus])

  return (
    <div>
      <div className="bg-[#0a0a0a] h-screen flex items-center justify-center px-2">
        <div className="px-2 py-4 rounded-md border-2 border-[#334f88] max-w-prose mx-auto -translate-y-10">
          <h1 className="text-center text-white font-bold text-2xl mb-2 tracking-widest">
            Welcome Back
          </h1>
          <h1 className="text-gray-300 text-center mb-3 text-sm">
            Enter your credentials to login
          </h1>
          {error && (
            <p className="text-rose-600 text-center font-semibold  my-3">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit(login)} className="px-5">
            <Input
              placeholder="Email Address"
              register={register}
              name="email"
              extraFormFeatures={{
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                maxLength: 50,
                autofocus: true,
              }}
              label="Email"
              labelClassname="text-white"
              className="outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              type="text"
            />
            <Input
              placeholder="Password"
              labelClassname="text-white"
              label="Password"
              className="outline-none border-[#0a0a0a] border-2 bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc] mb-2"
              type="password"
              name="password"
              register={register}
              extraFormFeatures={{
                required: true,
              }}
            />

            <SubmitButton loading={loading}/>
          </form>
          <p className="text-white text-center mt-4">
            Don't have an account?{" "}
            <span
              className="text-[#4d71cc] font-bold tracking-wide"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
