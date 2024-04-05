import React from "react";
import { Rating, ReviewDiv as Div } from "../Components/components";
import { Vortex } from "react-loader-spinner";


function AddReview() {
  const [loading, setLoading] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [rent, setRent] = React.useState("");
  const [text, setText] = React.useState("");
  return (
    <div className="flex flex-col h-full text-white mx-auto max-w-prose mt-4 gap-3 p-4">
      <h1 className="text-center font-bold text-2xl ">Add Review</h1>
      <label htmlFor="address" className="">
        Address
      </label>
      <input
        id="address"
        placeholder="Address"
        name="email"
        autoFocus
        required
        className=" text-black caret-[#396dfc]  outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <label htmlFor="rent">Monthly Rent (optional)</label>
      <input
        id="rent"
        placeholder="Monthly Rent"
        name="rent"
        className=" text-black caret-[#396dfc]  outline-none border-2 border-[#0a0a0a] bg-gray-100 w-full p-2 rounded-md focus:border-[#396dfc]"
        type="number"
        min="0"
        value={rent}
        onChange={(e) => setRent(e.target.value)}
      />
      <Div labelName="Neighbourhood" />
      <Div labelName="Amenities" />
      <Div labelName="Owner" />
      {/* <div className="border-2 bg-[#0a0a0a] w-full p-2 rounded-md border-theme" > */}
        <label htmlFor="comments">Anything else?</label>
        <textarea
          name="comments"
          id="comments"
          className="text-black outline-none font-normal border-2 w-full p-2 rounded-md border-theme"
          cols="10"
          maxLength="300"
          rows="2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          ></textarea>
      {/* </div> */}
      {
        loading ?(<div className="bg-[#2a6dff] text-white w-full p-0 rounded-md mt-2 flex justify-center">
        <Vortex visible={loading} height="40" width="40" colors={[]} />
      </div>):
        (<button className="bg-[#2a6dff] text-white w-full p-2 rounded-md ">Submit</button>)
      }
    </div>
  );
}

export default AddReview;
