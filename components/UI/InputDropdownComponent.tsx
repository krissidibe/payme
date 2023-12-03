import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function InputDropdownComponent({
  labelClassName = "",
  className = "",
  label = "",
  value = "---",
  inputDrop = false,
  openDrop = false,
  handleClick=(item)=>{},
  ...props
}) {
  const statutData = [
    "Entreprise individuelle (EI)",
    "Entreprise unipersonnelle à responsabilité limitée (EURL)",
    "Société à responsabilité limitée (SARL)",
    "Société anonyme (SA)",
    "Société par actions simplifiée (SAS)",
    "Société par actions simplifiée unipersonnelle (SASU)",
    "Société en nom collectif (SNC)",
    "Société coopérative de production (SCOP)",
    "Société en commandite par actions (SCA)",
    "Société en commandite simple (SCS)",
  ];
  const sexeData = [
    "Homme",
    "Femme",
     
  ];

 
    return (
     <>
    {openDrop && <div
       onClick={()=>handleClick(value)}
     className="absolute inset-0 ">

     </div>}
      <div className="relative flex ">
        
        <div className="flex flex-col w-full ">
        <IoMdArrowDropdown className={`absolute h-5 w-5 right-3 opacity-50 bottom-[10px] `} />
          {label != "" && (
            <p className={`mb-1 text-sm   ${labelClassName}`}>{label}</p>
          )}
          <input
          data-dropdown-toggle="dropdown" 
          value={value}
            className={` bg-[#06060600] border-[1px]  placeholder:text-white placeholder:opacity-40 text-white border-white border-opacity-10  px-4 outline-none w-full h-12 ${className}`}
            {...props}
          />
        </div>
       
        <div  className={`absolute z-20 w-full -top-0 bg-[#262626]  ${!openDrop ? "hidden": ""} `}>
          <ul
            className="py-2 text-sm text-gray-200 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >

            
            {statutData.map((item) => (
              <div
              key={item}
              onClick={()=>handleClick(item)} className="block px-4 text-[13px] hover:bg-[#393939]  cursor-pointer py-3 dark:hover:text-white">
                {item}
              </div>
            ))}
          </ul>
        </div>
      </div>
     </>
    );
  

 
}

export default InputDropdownComponent;
