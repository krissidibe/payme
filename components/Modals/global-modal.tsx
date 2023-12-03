import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ButtonComponent from "../UI/ButtonComponent";
import { useGlobalModal } from "../../utils/use-global-modal";

interface modalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  message?: string;
}

const GlobalModal: React.FC<modalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  message,
}) => {

  const modal = useGlobalModal()
 
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(isOpen);
   
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
     // onClose();
     modal.onClose()
     modal.setTitle("")
     modal.setMessage("")
    }, 0);
  }, [onClose]);
  const handleSubmit = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
        modal.onClose()
        modal.setTitle("")
        modal.setMessage("")
    }, 0);
  }, [onSubmit]);


  if (!modal.isOpen) {
    return;
  }
  return (
    <div onClick={handleClose} className="absolute inset-0 z-[80] flex items-center justify-center w-screen bg-black/50">
      <div 
      onClick={(e)=>{
        e.stopPropagation();
      }}
      className="p-4 bg-[#323232] z-[100] w-[370px]  px-8 flex flex-col items-center justify-center text-white rounded-md">
        <div className="font-bold text-[16px] mt-2 flex justify-between items-center pb-2 border-b border-white/10 w-full self-start mb-6">
          <div>{modal.title ?? "Êtes-vous sûr ?"}</div>
          <AiOutlineInfoCircle
            onClick={() => {}}
            className="w-[20px] h-[20px] opacity-60 mr-2 mt-1 "
          />
        </div>

        <div className="text-[15px] px-6">{modal.message}</div>

        <div className="flex items-center justify-center w-full gap-4 mt-0">
         {modal.title != "Attention !" && <ButtonComponent
            handleClick={() => {
              handleClose();
             
            }}
            label={"Annuler"}
            className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#484848] border-none   "
          />}

          {  modal.onSubmit}
          
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
