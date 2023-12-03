import React from "react";
import SideBar from "../../components/Items/SideBar";
import { HiFolder, HiFolderAdd } from "react-icons/hi";
import { IoIosNotifications, IoMdPeople, IoMdBusiness,  } from "react-icons/io";
import { MdBookmarks, MdHandyman} from "react-icons/md";
import { IoBookmarks, IoCalendar, IoCalendarNumber} from "react-icons/io5";
import { BsClipboard2CheckFill, BsClipboardCheckFill} from "react-icons/bs";
import InputComponent from "../../components/UI/InputComponent";
import FolderComponent from "../../components/UI/FolderComponent";
import PdfBuilder from "../../components/PdfDemo";
import { useRouter } from "next/router";
import { PiCalendarCheckFill } from "react-icons/pi";

function Gestions(props) {

  return (
    <div className="flex flex-col w-full h-full ">
      <SearchElement />

      <div className="flex-1 overflow-scroll no-scrollbar">
        <div className="flex flex-col flex-1 h-full ml-4 space-y-4 p-14 pt-[52px] ">
          <div className="flex space-x-4 ">
            <ItemGestion1 Icon={IoMdPeople} link="personal" label="Personnels" />
            <ItemGestion2 Icon={IoMdBusiness} link="client" label="Clients" />
            <ItemGestion3 Icon={MdHandyman} link="provider" label="Prestataires" />
          </div>
          <div className="flex space-x-4 ">
            <ItemGestion4 Icon={MdBookmarks} link="supplier" label="Fournisseurs" />
            <ItemGestion Icon={PiCalendarCheckFill}  link="planning" label="Planning" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gestions;

function ItemGestion1({label,link, Icon}) {
  const router = useRouter()
  return (
    <div
    onClick={()=>{
      router.push(`gestions/${link}`)
    }}
    className="flex cursor-pointer select-none  p-6  text-white text-xl font-bold  bg-gradient-to-b from-[#e0e0e0e1] to-[#888888e1] w-[270px] h-[145px] rounded-xl">
  <div className="flex items-end self-end space-x-2">
  <Icon className="w-[46px] h-[46px] ml-4" />   <p  className="text-[23px] mb-1"> {label} </p>
  </div>
    </div>
  );
}

function ItemGestion2({label,link, Icon}) {
  const router = useRouter()
  return (
    <div
    onClick={()=>{
      router.push(`gestions/${link}`)
    }}
    className="flex cursor-pointer select-none  p-6  text-white text-xl font-bold  bg-gradient-to-b from-[#e0e0e0e1] to-[#888888e1] w-[270px] h-[145px] rounded-xl">
  <div className="flex items-end self-end space-x-2">
  <Icon className="w-[44px] h-[44px] ml-4 mb-1" />   <p  className="text-[23px] mb-1"> {label} </p>
  </div>
    </div>
  );
}
function ItemGestion3({label,link, Icon}) {
  const router = useRouter()
  return (
    <div
    onClick={()=>{
      router.push(`gestions/${link}`)
    }}
    className="flex cursor-pointer select-none  p-6  text-white text-xl font-bold  bg-gradient-to-b from-[#e0e0e0e1] to-[#888888e1] w-[270px] h-[145px] rounded-xl">
  <div className="flex items-end self-end space-x-2">
  <Icon className="w-[44px] h-[44px] ml-4" />   <p  className="text-[23px] mb-1"> {label} </p>
  </div>
    </div>
  );
}
function ItemGestion4({label,link, Icon}) {
  const router = useRouter()
  return (
    <div
    onClick={()=>{
      router.push(`gestions/${link}`)
    }}
    className="flex cursor-pointer select-none  p-6  text-white text-xl font-bold  bg-gradient-to-b from-[#e0e0e0e1] to-[#888888e1] w-[270px] h-[145px] rounded-xl">
  <div className="flex items-end self-end space-x-2">
  <Icon className="w-[42px] h-[42px] ml-4" />   <p  className="text-[23px]   mb-1"> {label} </p>
  </div>
    </div>
  );
}
function ItemGestion({label,link, Icon}) {
  const router = useRouter()
  return (
    <div
    onClick={()=>{
      router.push(`gestions/${link}`)
    }}
    className="flex cursor-pointer select-none  p-6  text-white text-xl font-bold  bg-gradient-to-b from-[#e0e0e0e1] to-[#888888e1] w-[270px] h-[145px] rounded-xl">
  <div className="flex items-end self-end space-x-2">
  <Icon className="w-[44px] h-[44px] ml-4" />   <p  className="text-[23px] mb-1"> {label} </p>
  </div>
    </div>
  );
}

function SearchElement() {
  return (
    <div className="w-full min-h-[100px] px-14 flex items-center   justify-start pr-10 border-b-[1px]  border-white border-opacity-20">
      <h3 className="text-[32px] ml-4 font-bold">Gestions</h3>
    </div>
  );
}
