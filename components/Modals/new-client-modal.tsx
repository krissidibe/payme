import React, { useState } from "react";
import { FaBuilding } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import ButtonComponent from "../UI/ButtonComponent";
import { useNewClientModal } from "../../utils/use-new-client-modal";
import { useRouter } from "next/router";
import { MdClose } from "react-icons/md";

function NewClientModal({style}) {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const modal = useNewClientModal()
  const typeDatas = [
    {
      index: 0,
      name: "Une entreprise",
      icon: FaBuilding,
    },

    {
      index: 1,
      name: "Un particulier",
      icon: IoPersonSharp,
    },
  ];

  if (!modal.isOpen) {
    return null
  }
  return (
    <div 
    onClick={()=>{
      modal.onClose()
    }}
    className="absolute inset-0 z-30 flex items-center justify-center pb-[82px]  transition-all transition bg-black/40 ">
      <div
      onClick={(e)=>{
        e.stopPropagation()
      }}
      className="p-4 bg-[#363636] z-50 w-[464px] min-h-[370px] max-h-[370px] mt-8 flex flex-col items-center justify-center text-white rounded-xl"
      style={style.style}
      >
      <MdClose onClick={()=>{
            modal.onClose()
        }} className="w-[26px] h-[26px]   text-[#787878] mr-2 mt-1 cursor-pointer self-end" />
        
       
        <h2 className="font-bold text-[22px] mt-0 leading-7 ">Nouveau client   </h2>
        <p className="text-[17px] opacity-50">
          Quel type de client souhaitez-vous ajouter ?
        </p>

        <div className="flex justify-between w-full space-x-5 mt-9 px-14 ">
          {typeDatas.map((item) => (
            <div
            key={item.index}
              onClick={() => setIndex(item.index)}
              className={`flex flex-col items-center cursor-pointer  justify-center w-full space-y-2 text-sm ${
                index == item.index ? "opacity-100 font-bold text-[15px]" : "opacity-30 text-[15px]"
              }`}
            >
              <div className={`flex p-8 w-full items-center justify-center border-[1px] h-[105px]  border-white/80 rounded-xl`}>
                <item.icon className="w-[52px] h-[52px]" />
              </div>
              <p className="">{item.name}</p>
            </div>
          ))}
        </div>
        <ButtonComponent
          label={"Suivant"}
        
          handleClick={()=>{
            modal.onClose()
            router.push({
              pathname:index == 0 ?  "/gestions/client/addnewclient" : "/gestions/client/addpersonalclient"    ,
              query:{type:index == 0 ? "ENTERPRISE" :"PERSONAL"}
            })
            setIndex(x=> x =0)
          }}
          className="bg-[#9a9768]       mt-6 mb-4 shadow-xl shadow-black/20    "
        />
      {/*   <ButtonComponent
        handleClick={()=>{
          modal.onClose()
          router.push({
            pathname:index == 0 ?  "/gestions/client/addnewclient" : "/gestions/client/addpersonalclient"    ,
            query:{type:index == 0 ? "ENTERPRISE" :"PERSONAL"}
          })
        }}
        labelClassName="font-semibold"
          label={"Suivant"}
          className="max-h-[32px] mt-6 mb-4 shadow-xl min-w-[110px] shadow-black/20 bg-[#9a9768] border-none  rounded-md"
        />  */}
      </div>
    </div>
  );
}

export default NewClientModal;
