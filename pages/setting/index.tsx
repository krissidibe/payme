import React from "react";
import SideBar from "../../components/Items/SideBar";
import { HiFolder, HiFolderAdd } from "react-icons/hi";
import { RxUpdate } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import { FaUserCog, FaUserTie } from "react-icons/fa";
import { MdViewTimeline } from "react-icons/md";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { IoIosNotifications, IoIosPeople, IoMdBusiness } from "react-icons/io";
import InputComponent from "../../components/UI/InputComponent";
import FolderComponent from "../../components/UI/FolderComponent";
import PdfBuilder from "../../components/PdfDemo";
import { useRouter } from "next/router";
import { RiBankCardFill } from "react-icons/ri";

function Setting(props) {
  /* people
business
handyman
bookmarks
assignment_turned_in_rounded 
 
*/

  return (
    <div className="flex flex-col w-full h-full ">
      <SearchElement />

      <div className="flex-1 overflow-scroll no-scrollbar">
        <div className="flex flex-col flex-1 h-full ml-4 space-y-4 p-14 pt-[52px] ">
          <div className="flex space-x-4 ">
            <ItemGestion
            key={1}
              link="profile"
              Icon={FaUserCog}
              label="Mon"
              subLabel="Compte"
            />
            <ItemGestion1
              link="factures"
              Icon={BsFillFileEarmarkTextFill}
              label="Modèles de"
              subLabel="Facture"
            />
            <ItemGestion
            key={2}
              link="subscribe"
              Icon={RiBankCardFill}
              label="Plans"
              subLabel="Abonnement"
            />
          </div>
          <div className="flex space-x-4 ">
            <ItemGestion3
              link="contact"
              Icon={MdEmail}
              label="Contactez"
              subLabel="nous"
            />
            <ItemGestion
              link="subscribe"
              Icon={RxUpdate}
              label="Mise à jour"
              subLabel="Application
"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;


function ItemGestion1({ label, subLabel, Icon, link }) {
  const router = useRouter()
  return (
    <div
    onClick={()=>{
      router.push(`setting/${link}`)
    }}
    className="flex cursor-pointer select-none  p-6  text-white text-xl font-bold  bg-gradient-to-b from-[#9a9768] to-[#656242] w-[270px] h-[145px] rounded-xl">
  <div className="flex items-end self-end space-x-2">
  <Icon className="w-[35px] h-[35px] ml-4 mb-2" /> 
  <div className="relative text-[18px] flex flex-col tracking-wider">
          <p className="mb-5"> {label} </p>
          <p className="absolute bottom-0"> {subLabel} </p>
        </div>
  </div>
    </div>
  );
}
function ItemGestion3({ label, subLabel, Icon, link }) {
  const router = useRouter()
  return (
    <div
    onClick={()=>{
      router.push(`setting/${link}`)
    }}
    className="flex cursor-pointer select-none  p-6  text-white text-xl font-bold  bg-gradient-to-b from-[#9a9768] to-[#656242] w-[270px] h-[145px] rounded-xl">
  <div className="flex items-end self-end space-x-2">
  <Icon className="w-[38px] h-[38px] ml-4 mb-[4px]" /> 
  <div className="relative text-[18px] flex flex-col tracking-wider">
          <p className="mb-5"> {label} </p>
          <p className="absolute bottom-0"> {subLabel} </p>
        </div>
  </div>
    </div>
  );
}
function ItemGestion({ label, subLabel, Icon, link }) {
  const router = useRouter()
  return (
    <div
    onClick={()=>{
      router.push(`setting/${link}`)
    }}
    className="flex cursor-pointer select-none  p-6  text-white text-xl font-bold  bg-gradient-to-b from-[#9a9768] to-[#656242] w-[270px] h-[145px] rounded-xl">
  <div className="flex items-end self-end space-x-2">
  <Icon className="w-[38px] h-[38px] ml-4 mb-1" /> 
  <div className="relative text-[18px] flex flex-col tracking-wider">
          <p className="mb-5"> {label} </p>
          <p className="absolute bottom-0"> {subLabel} </p>
        </div>
  </div>
    </div>
  );
}

function ItemGestion2({ label, subLabel, Icon, link }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`setting/${link}`);
      }}
      className="flex cursor-pointer select-none  p-6  text-white text-xl font-bold  bg-gradient-to-b from-[#9a9768] to-[#656242] w-[270px] h-[145px] rounded-xl"
    >
      <div className="flex items-end self-end space-x-4">
        <Icon className="w-10 h-10" />{" "}
        <div className="relative text-[18px] flex flex-col tracking-wider">
          <p className="mb-5"> {label} </p>
          <p className="absolute bottom-0"> {subLabel} </p>
        </div>
      </div>
    </div>
  );
}

function SearchElement() {
  return (
    <div className="w-full min-h-[100px] px-14 flex items-center   justify-start pr-10 border-b-[1px]  border-white border-opacity-20">
      <h3 className="text-[32px] ml-4 font-bold">Paramètres</h3>
    </div>
  );
}
