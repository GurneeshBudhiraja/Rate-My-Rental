import React, { useState } from "react";
import { Input, SubmitButton } from "../components";
import { useForm } from "react-hook-form";
import { auth } from "../../Appwrite/Services/services";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  async function signup(data) {
    setLoading(true);
    setError(null);
    try {
      const resp = await auth.signup(data);
      // console.log(resp);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  // autofocus on the name input field
  React.useEffect(() => {
    setFocus("name");
  }, [setFocus]);
  return (
    <div>
      <div className=" bg-[#0a0a0a] h-screen max-w-prose mx-auto flex items-center justify-center px-2">
        <div className="px-2 py-4 rounded-md border-2 border-[#334f88] w-full -translate-y-10">
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
              className="focus:ring-2 focus:ring-gray-200 outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              type="text"
              register={register}
              name="name"
              extraFormFeatures={{
                required: {
                  value: true,
                  message: "Full Name is required",
                },
                maxLength: {
                  value: 20,
                  message: "Full Name should not exceed 20 characters",
                },
                pattern: {
                  value: /^[a-zA-Z]+(?:[\s.'-][a-zA-Z]+)*$/,
                  message: "Invalid Full Name",
                },
              }}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className="text-red-500 text-sm">{message}</p>
              )}
            />
            <Input
              placeholder="Email Address"
              labelClassname="text-white"
              label="Email"
              className="focus:ring-2 focus:ring-gray-200 outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              type="email"
              register={register}
              name="email"
              extraFormFeatures={{
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid Email Address",
                },
                maxLength: {
                  value: 50,
                  message: "Email should not exceed 50 characters",
                },
              }}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="text-red-500 text-sm">{message}</p>
              )}
            />
            <Input
              placeholder="Password"
              label="Password"
              className="focus:ring-2 focus:ring-gray-200 outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              labelClassname="text-white"
              type="password"
              register={register}
              name="password"
              extraFormFeatures={{
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Password should be atleast 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password should not exceed 20 characters",
                },
              }}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className="text-red-500 text-sm">{message}</p>
              )}
            />
            <SubmitButton loading={loading} />
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
