import React from "react";
import { Input,SubmitButton} from "../Components/components";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { contact } from "../Appwrite/Services/services";

function ContactUs() {
  // textarea state
  const [text, setText] = React.useState("");
  const { register, handleSubmit, setFocus, reset, formState: { errors }} = useForm();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setFocus("name");
  }, [setFocus]);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const contactForm = async (data) => {
    setError(null);
    setLoading(true);
    setSuccess(null);
    try {
      const formData = JSON.stringify({ ...data, comment: text });
      
      const resp = await contact.submitContact(formData);
      if (JSON.stringify(resp) === "{}") {
        setError("An error occurred. Please try again later.");
      } else {
        setSuccess(
          "Your message has been received. We'll get back to you soon."
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      reset();
      setText("");
    }
  };

  return (
    <div>
      <div className="bg-[#0a0a0a] h-screen max-w-prose mx-auto flex items-center justify-center px-2">
        <div className="px-2 py-4 rounded-md border-2 border-[#334f88] w-full -translate-y-10">
          <p className="text-white text-center my-3 text-2xl font-bold tracking-wider">
            Contact Us
          </p>
          {error && (
            <p className="text-rose-600 text-center font-semibold  my-3">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-400 text-center font-semibold  my-3">
              {success}
            </p>
          )}
          <form onSubmit={handleSubmit(contactForm)} className="px-5">
            <Input
              placeholder="Full Name"
              label="Name"
              type="text"
              labelClassname="text-white"
              register={register}
              extraFormFeatures={{
                required: {
                  value: true,
                  message: "Name is required",
                },
                maxLength: {
                  value: 20,
                  message: "Name must not exceed 20 characters",
                },
                minLength: {
                  value: 3,
                  message: "Minimum of 3 characters required",
                },
                pattern: {
                  value:/^[a-zA-Z]+(?:[\s.'-][a-zA-Z]+)*$/,
                  message:"Invalid name format"
                },
                
              }}
              className="focus:ring-2 focus:ring-gray-200 outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              name="name"
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => {
                return (
                  <p className="text-red-500 text-sm ">{message}</p>
                );
              }}
              />
            <Input
              placeholder="Email address"
              label="Email"
              labelClassname="text-white"
              className="focus:ring-2 focus:ring-gray-200 outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              type="email"
              name="email"
              register={register}
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
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => {
                return (
                  <p className="text-red-500 text-sm ">{message}</p>
                );
              }}
              />
            <label htmlFor="commentArea" className="text-white">
              What's your question, comment, or issue?
            </label>
            <textarea
              className="outline-none w-full tracking-wide rounded-md font-semibold border-2 text-[#0a0a0a] bg-gray-300 px-2 py-2 border-theme focus:ring-gray-100 focus:ring-2"
              name="comment"
              id="comment"
              {...register("comment", {
                required: false,
                maxLength: {
                  value: 300,
                  message: "Comment must not exceed 300 characters",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="comment"
              render={({ message }) => {
                return (
                  <p className="text-red-500 text-sm ">{message}</p>
                );
              }}
              />
             
            <SubmitButton loading={loading}/>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
