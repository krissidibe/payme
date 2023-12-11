import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ButtonComponent from "../UI/ButtonComponent";
import { useGlobalPayment } from "../../utils/use-global-payment";
import { addNewPayment } from "../../services/paymentService";
import { useRouter } from "next/router";
import { IoInformationCircle } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";
import useMenuStore from "../../utils/MenuStore";

interface modalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  message?: string;
}

const GlobalPayment: React.FC<modalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  message,
}) => {

  const router = useRouter()
  const modal = useGlobalPayment()
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


  if (!modal.isOpen) {
    return;
  } 
  return (
   
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
      
    <div className="xl:w-[1000px] leading-none pt-[84px] w-[80%] flex flex-col justify-start items-center h-[680px] bg-gradient-to-b px-10 from-[#212121] rounded-xl to-[#050505] ">
<p className=" text-[50px] xl:text-[60px]" >Des prix simple & transparents</p>
<p className=" text-[20px] xl:text-[26px] font-light  opacity-50 mt-3" >Il y a forcément un plan pour vous. Commencez maintenant !</p>
<div className="h-[280px] flex items-center max-[1200px]:scale-95 max-[1200px]:flex-wrap    mt-[70px]    w-auto justify-center gap-5">

<ItemSubscribeCard style={"bg-transparent border border-[#9a9768]"} key={1} svg={3}  price={9890} />
               <ItemSubscribeCard style={"bg-gradient-to-b from-[#8F8F91] to-[#424244]  "} key={2} svg={6
}  price={18950} />

               <ItemSubscribeCard  style={"bg-gradient-to-b from-[#B7B781] to-[#999967] "} key={3} svg={12
}  price={34950} />


</div>
<div className="flex flex-col justify-end flex-1">
<div
onClick={()=>{
  menuIndex.setMenuIndex(-1);
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("userId");
  router.replace({
    pathname: "/",
  });
}}
className="flex items-center justify-center gap-2 p-2 text-sm opacity-50 cursor-pointer">
  Quitter
<LiaSignOutAltSolid
 
 className="w-4 h-4 opacity-100 bottom-10" />
</div>
</div>
    </div>
    </div>
  );


  function ItemSubscribeCard({svg,price,style}) {
    
    return <div
    onClick={ async ()=>{
     // 
const dataPayment:Payment =  {
  
  type  :"Orange Money",
  month  :svg,
  amount  :price,
  currency  :"FCFA"
}

 const newData = await  addNewPayment(dataPayment)
if(newData.id){
  modal.onClose()
} 
     
    }}
    className={` relative h-full min-w-[215px] max-w-[215px]  ${style}  cursor-pointer rounded-[16px]  justify-center       px-9     flex flex-col   pb-2  `}>

<div className="flex flex-col items-start leading-none border-b-[1px]  border-white/10 pb-4 ">

<p className="text-[110px] font-bold leading-[104px]" >{svg}</p>

<p className="text-[33px]  mt-[0px] mb-[4px]" >MOIS</p>
<p className={`text-[15px] ${svg == 3 ? "text-[#ffffff]/30" : "text-[#ffffff]/60"}`} >Offre spéciale</p>
</div>
<p className="text-[25px] mt-2 flex items-start">{price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} <span className="pt-0 pl-2 text-base " >FCFA</span> </p>



    </div>;
}
};

export default GlobalPayment;
