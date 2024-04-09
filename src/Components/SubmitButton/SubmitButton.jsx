import React from 'react'
import { Input } from "../components";
import { Vortex } from "react-loader-spinner";
function SubmitButton({loading}) {
  return (
    <div>{loading ? (
      <div className="bg-[#2a6dff] text-white w-full rounded-md flex justify-center ">
        <Vortex visible={loading} height="40" width="40" colors={[]} />
      </div>
    ) : (
      <Input
        type={"submit"}
        className="bg-[#2a6dff] text-white w-full p-2 rounded-md "
      />
    )}</div>
  )
}

export default SubmitButton