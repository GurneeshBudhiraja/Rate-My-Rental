import React from 'react'

function Button({children,classProps="",onClick=null,...props}) {
  
  return (
    <div
    className={`${classProps}`}
    onClick={onClick}
    {...props}
    >
    {children}</div>
  )
}

export default Button