import React, { useEffect, useState } from "react";
import { country } from "../../utils/country";
import InputComponent from "./InputComponent";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
function InputDropdownCountryComponent2({
  iconClassName = "",
  labelClassName = "",
  className = "",
  label = "",
  value = "---",
  inputDrop = false,
  openDrop = false,
  handleClick = (item) => {},
  handleClickClose = (item) => {},
  ...props
}) {
  const statutData = country;
  const sexeData = ["Homme", "Femme"];
  const [searchValue, setSearchValue] = useState("");
  const [customersFiltered, setCustomersFiltered] = useState<any[]>([]);
  useEffect(() => {
    const datasFilter = country.filter((item) =>
      item.Name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCustomersFiltered(datasFilter);

    /*  const filtered = customers.find(obj => {
    return obj.name.toLowerCase().includes("z");
  });
  console.log(filtered); */
  }, [searchValue]);

  return (
    <>
      {openDrop && (
        <div
          onClick={() => handleClick(value)}
          className="absolute inset-0 z-20 "
        ></div>
      )}
      <div className="relative flex ">
        <div className="relative flex flex-col w-full">
         {!openDrop && <IoMdArrowDropdown
            className={`absolute h-5 w-5 right-3 opacity-50 bottom-[9px] ${iconClassName}`}
          />}
          {label != "" && (
            <p className={`mb-[5px]   ${labelClassName}`}>{label}</p>
          )}
{   !openDrop &&       <input
            data-dropdown-toggle="dropdown"
            value={searchValue ?? value}
            className={` bg-[#06060600] border-[1px]  placeholder:text-white placeholder:opacity-40 text-white border-white border-opacity-10  px-4 outline-none w-full h-12 ${className}`}
            {...props}
          />}
        </div>
        <div
          className={` ${
            !openDrop ? "hidden" : ""
          }  absolute inset-0 bg-black/0 `}
        ></div>
        {/* country */}
        <div
          className={`absolute z-20 overflow-y-hidden   w-full   top-[26px]  py-0    ${
            !openDrop ? "hidden" : ""
          } `}
        >
         
 
          <InputComponent

onMouseEnter={ event => event.currentTarget.focus() }
              value={searchValue}
              
              onChange={(e) => {
                setSearchValue((x) => (x = e.target.value));
              }}
              className=" mb-1 rounded-[14px] bg-[#tran] h-[40px] text-[14px] focus:border-[#ffffff]"
            />
          <div
            className="h-[200px]     bg-[#262626] px-0 py-2 overflow-y-scroll text-sm text-gray-200 no-scrollbar"
            aria-labelledby="dropdownDefaultButton"
          >
            {customersFiltered.map((item) => (
              <div
                key={item.Name}
                onClick={() => {
                  handleClick(item)
                
                  setSearchValue(item.Name)
                }
                }
             
                className="block px-4 text-[13px] hover:bg-[#393939]  cursor-pointer py-3 dark:hover:text-white"
             >
               {/*  <span className="mr-1">
                  +{" ("} {item.Phone} {")"}
                </span>{" "} */}
                 <span className="">{item.Name}</span>
              </div>
            ))}  
          </div>
        </div>
      </div>
    </>
  );
}

export default InputDropdownCountryComponent2;
