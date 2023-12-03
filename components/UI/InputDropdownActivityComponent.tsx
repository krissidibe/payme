import React, { useEffect, useState } from "react";
 
import InputComponent from "./InputComponent";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { secteurDatas } from "../../utils/secteur";


function InputDropdownActivityComponent({
  iconClassName = "",
  labelClassName = "",
  className = "",
  label = "",
  value = "---",
  isBig = false,
  inputDrop = false,
  openDrop = false,
  placeholderOn = false,
  handleClick = (item) => {},
  handleClickClose = (item) => {},
  ...props
}) {
  const statutData = secteurDatas;
  const sexeData = ["Homme", "Femme"];
  const [searchValue, setSearchValue] = useState("");
  const [customersFiltered, setCustomersFiltered] = useState<any[]>([]);
  useEffect(() => {
    const datasFilter = secteurDatas.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
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
            className={`absolute h-5 w-5 right-3 opacity-50 bottom-[10px] ${iconClassName}`}
          />}


          {label != "" && (
            <p className={`mb-[5px]   ${labelClassName}`}>{label}</p>
          )}

<input
            data-dropdown-toggle="dropdown"
            value={searchValue ?? value}
            className={` ${openDrop ? "opacity-0" : ""}  bg-[#06060600] border-[1px]  placeholder:text-white ${placeholderOn ? "placeholder:opacity-100" : "placeholder:opacity-40"}   text-white border-white border-opacity-10  px-4 outline-none w-full h-12 ${className}`}
            {...props}
          />
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
              className={`mb-1 ${isBig ? "mt-[3px]" :""} rounded-[14px] bg-transparent h-[40px] text-[14px] focus:border-[#ffffff]  ${className}`}
            />
          <div
            className={`h-[200px]      bg-[#262626] px-0 py-2 overflow-y-scroll text-sm text-gray-200 no-scrollbar`}
            aria-labelledby="dropdownDefaultButton"
          >
            {customersFiltered.map((item) => (
              <div
                key={item}
                onClick={() => {
                  handleClick(item)
                
                  setSearchValue(item)
                }
                }
             
                className="block px-4 text-[13px] hover:bg-[#393939]  cursor-pointer py-3 dark:hover:text-white"
             >
               {/*  <span className="mr-1">
                  +{" ("} {item.Phone} {")"}
                </span>{" "} */}
                 <span className="">{item}</span>
              </div>
            ))}  
          </div>
        </div>
      </div>
    </>
  );
}

export default InputDropdownActivityComponent;
