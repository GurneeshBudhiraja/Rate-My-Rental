import React, {useId} from 'react'

const Input = ({
  placeholder = null,
  label = null,
  labelClassname = "",
  type,
  className = "",
  register = undefined,
  name,
  extraFormFeatures = undefined,
  ...props
}) => {
  const id = useId();
  const inputProps = {
    placeholder,
    id,
    label,
    type,
    className: `${className}`,
    ...(register ? register(name, extraFormFeatures ? extraFormFeatures : null) : {}),
    ...props,
  };

  return (
    <div className="w-full box-border my-2 font-semibold ">
      {label && <label htmlFor={id} className={labelClassname}>{label}</label>}
      <input {...inputProps} />
    </div>
  );
};

export default Input;
