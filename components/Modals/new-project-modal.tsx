 
import React, { useState } from "react";
import { BsFillBuildingFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ButtonComponent from "../UI/ButtonComponent"; 
import { useRouter } from "next/router";
import { useNewProjectModal } from "../../utils/use-new-project-modal";
import InputComponent from "../UI/InputComponent";
import { addNewProject } from "../../services/projectService";
 
function NewProjectModal() {
 
  const modal = useNewProjectModal()
  const [inputValue, setInputValue] = useState("");
  const typeDatas = [
    {
      index: 0,
      name: "Une entreprise",
      icon: BsFillBuildingFill,
    },

    {
      index: 1,
      name: "Un particulier",
      icon: FaUserAlt,
    },
  ];

  
  if (!modal.isOpen) {
    return null
  }
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center pb-0 transition bg-black/40 ">
    <div onClick={()=>{
      modal.onClose()
      setInputValue("")
   
      
    }}  className="absolute inset-0 z-30 flex items-center justify-center transition ">
    
    

      </div>
      <div className="p-4 py-0 bg-[#323232] z-50 w-[434px] px-7 flex flex-col items-center justify-center text-white rounded-xl">
      <IoMdClose onClick={()=>{
            modal.onClose()
        }} className="w-[24px] h-[24px] opacity-60 mr-0 mt-5 cursor-pointer self-end" />
        
       
        <h2 className="font-bold text-[18px] mb-6 ">Ajouter un nouveau projet</h2>
        
 <div className="w-full px-2">

 <InputComponent
       value={inputValue}
       onChange={(e)=>{
        setInputValue(e.target.value)
       }}
       label="Nom du projet"
       labelClassName="text-white/40 text-[16px]"
       placeholder="Veuillez entrer le nom du projet"
        className="rounded-xl mb-0 h-[35px] text-[12px] font-light border-opacity-50"
       />
 </div>

      <div className="flex items-center justify-center w-full gap-4 mb-4">
      <ButtonComponent
        handleClick={()=>{
          setInputValue("")
          modal.onClose()
          
           
        }}
          label={"Annuler"}
          className=" min-w-[100px] mt-6 mb-4 shadow-xl shadow-black/20 bg-[#484848] border-none   "
        /> 
     {inputValue.trim().length >=2 &&  <ButtonComponent
        handleClick={async ()=>{
     const data = await addNewProject(modal.customerId,inputValue) 
     setInputValue("")     
     modal.onClose()
    

 
        }}
          label={"Ajouter"}
          className=" min-w-[100px] mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none   "
        /> }
      </div>
      </div>
    </div>
  );
}

export default NewProjectModal;
