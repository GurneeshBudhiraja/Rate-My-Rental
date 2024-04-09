import React from "react";
import { Input,SubmitButton} from "../Components/components";
import { useForm } from "react-hook-form";
import { contact } from "../Appwrite/Services/services";
import { Vortex } from "react-loader-spinner";

function ContactUs() {
  // textarea state
  const [text, setText] = React.useState("");
  const { register, handleSubmit, setFocus, reset } = useForm();
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
      <div className="bg-[#0a0a0a] h-screen w-full flex items-center justify-center px-2">
        <div className="px-2 py-4 rounded-md border-2 border-[#334f88] max-w-prose mx-auto -translate-y-10">
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
                required: true,
                maxLength: 20,
                pattern: /^[a-zA-Z\s]{1,20}$/,
              }}
              className="outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              name="name"
            />
            <Input
              placeholder="Email address"
              label="Email"
              labelClassname="text-white"
              className="outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              type="email"
              name="email"
              register={register}
              extraFormFeatures={{
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                maxLength: 50,
              }}
            />
            <label htmlFor="comments" className="text-white">
              What's your question, comment, or issue?
            </label>
            <textarea
              name="comments"
              id="comments"
              className="outline-none font-normal border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
              cols="10"
              placeholder="Type here..."
              maxLength="250"
              rows="5"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <SubmitButton loading={loading}/>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
