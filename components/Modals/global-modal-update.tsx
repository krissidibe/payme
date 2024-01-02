import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ButtonComponent from "../UI/ButtonComponent";
import { useGlobalUpdate } from "../../utils/use-global-update";
import { addNewPayment } from "../../services/paymentService";
import { useRouter } from "next/router";
import { IoInformationCircle } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";
import useMenuStore from "../../utils/MenuStore";
import { FiDownload } from "react-icons/fi";

interface modalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  style?: any;
  message?: string;
}

const GlobalUpdate: React.FC<modalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  style,
  message,
}) => {

  const router = useRouter()
  const modal = useGlobalUpdate()
  const menuIndex = useMenuStore();
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


  if (router.pathname.includes("/auth/register")) {
    return;
  } 
   if (!modal.isOpen) {
    return;
  }  
  return (
   
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
      
    <div className="xl:w-[1000px] bg leading-none   w-[80%] flex flex-col justify-center  items-center h-[680px] bg-gradient-to-b px-10 from-[#212121] rounded-xl to-[#050505] " style={style.style}>
    <FiDownload className="w-[140px] h-[140px] mb-[20px]" />
<p className=" text-[50px] xl:text-[55px] font-semibold" >Mise à jour indispensable</p>
<p className=" text-[20px] xl:text-[20px] font-light text-center  leading-6 opacity-50 mt-3" >Nous vous invitons à la télécharger pour profiter des dernières <br /> améliorations et fonctionnalités.</p>
 
<ButtonComponent
                  key={100}
                  label={"Télécharger la mise à jour"}
                  handleClick={async() => {
                   
                  }}
                  className="bg-[#484848]  border-none w-[250px] mt-[40px]"
                />
    </div>
    </div>
  );


 
};

export default GlobalUpdate;
