import React from 'react'

function InputComponent({labelClassName="", className="",label="",error="",onFocus=false, ...props}) {



  
  return (
    <div className='flex flex-col w-full '>
{label != "" && <p className={`mb-[5px]    ${labelClassName}`}>{label} </p>}

<div className="relative ">
<input 
autoComplete="off"
 
 autoCorrect='false'
    className={` [appearance:textfield] 
  
    
    [&::-webkit-datetime-edit-year-field:focus]:bg-white
    [&::-webkit-datetime-edit-month-field:focus]:bg-white
    [&::-webkit-datetime-edit-day-field:focus]:bg-white 
    [&::-webkit-outer-spin-button]:appearance-none 
    [&::-webkit-inner-spin-button]:appearance-none  bg-[#06060600] border-[1px] placeholder:text-white/70 placeholder:opacity-40  text-white ${error ? "border-[#F2AAA5]" : "border-white"}  border-opacity-10  px-4 outline-none w-full h-12 
    
    ${className}`}
    {...props}
    />
   {error != "" && <span className='absolute left-0 text-xs font-light text-[#F2AAA5]  -bottom-5'>{error} </span>}
</div>

    </div>
  )
}

export default InputComponent