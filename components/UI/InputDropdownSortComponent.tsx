import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function InputDropdownSortComponent({
  labelClassName = "",
  className = "",
  label = "", 
  value = "---",
  inputDrop = false,
  openDrop = false,
  handleClick=(item)=>{},
  ...props
}) {
 
  const sexeData = [
    "Décroissant",
    "Croissant",
     
  ];

 
    return (
      <div className="relative flex cursor-pointer">
       <div className="relative flex flex-col w-full cursor-pointer">
        <IoMdArrowDropdown className="absolute right-2  z-0  opacity-50 bottom-[9px] w-[20px] h-[20px] "/>
          
          <input
          data-dropdown-toggle="dropdown" 
          value={value}
          className={`bg-[#06060600] border h-[40px]    cursor-pointer z-10  pl-[13px]  text-sm placeholder:text-white placeholder:opacity-40 flex items-center justify-center text-white rounded-full p-3 px-3 border-white border-opacity-40   outline-none 
    
     
          ${className == "" ? "h-[40px]" : "" }  ${className} `   }
            {...props}
          />
        </div>
        <div  className={`absolute z-20 w-full top-0 bg-[#1f1f1f]  ${!openDrop ? "hidden": ""} `}>
          <ul
            className="py-2 text-sm text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >

            
            {sexeData.map((item) => (
              <div
              key={item}
              onClick={()=>handleClick(item)} className="block px-4  hover:bg-[#393939]  cursor-pointer py-2 dark:hover:text-white">
                {item}
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  

 
}

export default InputDropdownSortComponent;
