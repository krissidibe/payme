import React from "react";

function ButtonComponent({
  label,
  handleClick = () => {},
  Icon = null,
  className = "",
  labelClassName = "",
  iconClassName = "",
  ...props
}) {
  return (
    <button
      onClick={handleClick}
      className={`bg-[#06060600] border h-[40px] hover:brightness-110     ease-in-out duration-100   font-normal  min-w-[130px] border-none     text-sm placeholder:text-white placeholder:opacity-40 flex items-center justify-center text-white rounded-full p-3 px-3 border-white border-opacity-40   outline-none 
    
     
    ${className == "" ? "h-[40px]" : "" }  ${className} `   }
      {...props}
    >
      <div className="flex items-center justify-center">
        {Icon && <Icon className={`${iconClassName} ${iconClassName == "" ? "w-[27px] h-[27px] mr-1" : "" }`} />}
        <p className={labelClassName}>{label}</p>
      </div>
    </button>
  );
}

export default ButtonComponent;
