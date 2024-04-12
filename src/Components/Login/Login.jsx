import React from "react";
import { Input, SubmitButton } from "../components";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Appwrite/Services/services";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { setUser } from "../../Store/AuthSlice/AuthSlice";

function Login() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [loading, setLoader] = React.useState(false);
  const login = async (data) => {
    setError(null);
    setLoader(true);
    try {
      // login user
      await auth.login(data);
      // get user object
      const user = await auth.currentUser();
      // extracting the user name and email
      const { name: userName, email: userEmail } = user;
      // dispatching the user object to the store
      dispatch(setUser({ userName, userEmail }));
      // redirecting to the home page
      navigate("/");

      navigate("/");
    } catch (error) {
      // console.log(error);
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };
  // autofocus on the email input field
  React.useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <div>
      <div className="bg-[#0a0a0a] h-screen max-w-prose mx-auto flex items-center justify-center px-2">
        <div className="px-2 py-4 rounded-md border-2 border-[#334f88] w-full  -translate-y-10">
          <h1 className="text-white text-center my-3 text-2xl font-bold tracking-wider">
            Welcome Back
          </h1>
          <h1 className="text-gray-300 text-center mb-3 text-sm ">
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
              className="focus:ring-2 focus:ring-gray-200 outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              extraFormFeatures={{
                required: {
                  value: true,
                  message: "Email is required",
                
                },
                pattern: {
                  value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:"Invalid email format"
                },
                maxLength: {
                  value: 50,
                  message: "Email must not exceed 50 characters",
                },
              }}
              label="Email"
              labelClassname="text-white"
              type="text"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <p className="text-red-500 text-sm mt-1 mb-2 ">{message}</p>}
            />

            <Input
              placeholder="Password"
              labelClassname="text-white"
              label="Password"
              className="focus:ring-2 focus:ring-gray-200 outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              type="password"
              name="password"
              register={register}
              extraFormFeatures={{
                required: {
                  value: true,
                  message: "Password is required",
                },
              }}
            />
                        <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <p className="text-red-500 text-sm mt-1 mb-2 ">{message}</p>}
            />

            <SubmitButton loading={loading} />
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
