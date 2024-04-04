import React, {useId} from 'react'

const Input = ({placeholder,label,labelClassname="",type,className="",register=undefined,name,extraFormFeatures=undefined,...props}) => {
  const id= useId();
  const inputProps={
    placeholder,
    id,
    label,
    type,
    className:`${className}`,
    ...(register?register(name,extraFormFeatures):{}),
    ...props
  }
  return (
    <>
    {
    label 
    && 
    <label htmlFor={id} className={labelClassname}>{label}</label>
    }
    <input
    {...inputProps}
    />
    </>

  )
}

export default Input