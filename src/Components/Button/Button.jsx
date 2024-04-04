import React from 'react'

function Button({children,className="",onClick=null,...props}) {
  
  return (
    <div
    className={`${className}`}
    onClick={onClick}
    {...props}
    >
    {children}</div>
  )
}

export default Button