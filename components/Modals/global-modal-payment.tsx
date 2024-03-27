import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ButtonComponent from "../UI/ButtonComponent";
import { useGlobalPayment } from "../../utils/use-global-payment";
import { addNewPayment, addNewPaymentIntouch } from "../../services/paymentService";
import { useRouter } from "next/router";
import { IoCloseSharp, IoInformationCircle } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";
import useMenuStore from "../../utils/MenuStore";
import { GrMoney } from "react-icons/gr";
import { GiTakeMyMoney, GiWallet } from "react-icons/gi";
import { BiXCircle } from "react-icons/bi";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

interface modalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  style?: any;
  message?: string;
}

const GlobalPayment: React.FC<modalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  style,
  message,
}) => {
  const router = useRouter();
  const modal = useGlobalPayment();
  const menuIndex = useMenuStore();
  const [showModal, setShowModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      // onClose();
      modal.onClose();
      modal.setTitle("");
      modal.setMessage("");
    }, 0);
  }, [onClose]);
  const handleSubmit = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      modal.onClose();
      modal.setTitle("");
      modal.setMessage("");
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
      {showCheckoutModal &&  CheckOutModal()}

      <div
        className="xl:w-[1000px] leading-none pt-[84px] w-[80%] flex flex-col justify-start items-center h-[680px] bg-gradient-to-b px-10 from-[#212121] rounded-xl to-[#050505] "
        style={style.style}
      >
        <p className=" text-[50px] xl:text-[60px]">
          Des prix simple & transparents
        </p>
        <p className=" text-[20px] xl:text-[26px] font-light  opacity-50 mt-3">
          Il y a forcément un plan pour vous. Commencez maintenant !
        </p>
        <div className="h-[280px] flex items-center max-[1200px]:scale-95 max-[1200px]:flex-wrap    mt-[70px]    w-auto justify-center gap-5">
          <ItemSubscribeCard
            style={"bg-transparent border border-[#9a9768]"}
            key={1}
            svg={3}
            price={9890}
          />
          <ItemSubscribeCard
            style={"bg-gradient-to-b from-[#8F8F91] to-[#424244]  "}
            key={2}
            svg={6}
            price={18950}
          />

          <ItemSubscribeCard
            style={"bg-gradient-to-b from-[#B7B781] to-[#999967] "}
            key={3}
            svg={12}
            price={34950}
          />
        </div>
        <div className="flex flex-col justify-end flex-1">
          <div
            onClick={() => {
              modal.onClose();
              menuIndex.setMenuIndex(-1);
              window.localStorage.removeItem("accessToken");
              window.localStorage.removeItem("userId");
              router.replace({
                pathname: "/",
              });
            }}
            className="flex items-center justify-center gap-2 p-2 pb-[60px] text-sm  text-[#772824] cursor-pointer"
          >
            Quitter
            <LiaSignOutAltSolid className="w-4 h-4 opacity-100 bottom-10" />
          </div>
        </div>
      </div>
    </div>
  );

  function ItemSubscribeCard({ svg, price, style }) {
    return (
      <div
        onClick={async () => {
          //
          const dataPayment: Payment = {
            method: "mobile",
           
            country: "",
            type: "",
            month: svg,
            amount: price,
            currency: "FCFA",
          };

          setCurrentData(dataPayment);
          setShowCheckoutModal(true);

        /*   const newData = await addNewPayment(dataPayment);
          if (newData.id) {
            modal.onClose();
          } */
        }}
        className={` relative h-full min-w-[215px] max-w-[215px]  ${style}  cursor-pointer rounded-[16px]  justify-center       px-9     flex flex-col   pb-2  `}
      >
        <div className="flex flex-col items-start leading-none border-b-[1px]  border-white/10 pb-4 ">
          <p className="text-[110px] font-bold leading-[104px]">{svg}</p>

          <p className="text-[33px]  mt-[0px] mb-[4px]">MOIS</p>
          <p
            className={`text-[15px] ${
              svg == 3 ? "text-[#ffffff]/30" : "text-[#ffffff]/60"
            }`}
          >
            Offre spéciale
          </p>
        </div>
        <p className="text-[25px] mt-2 flex items-start">
          {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}{" "}
          <span className="pt-0 pl-2 text-base ">FCFA</span>{" "}
        </p>
      </div>
    );
  }



  function CheckOutModal() {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="xl:w-[1000px] leading-none   w-[80%] flex  justify-start  flex-row  h-[680px] bg-gradient-to-b  from-[#212121] rounded-xl to-[#212121] ">
          {/* Left */}
          <div className="w-1/2 pr-8 border-r p-14 border-white/10 ">
            <p className="text-2xl font-bold leading-6 ">
              Sélectionner un moyen <br /> de paiement
            </p>
  
            <div className="flex flex-col gap-4 mt-8">
              <div className="border border-white/10  items-center justify-between p-6 flex  bg-white/5 opacity-50  h-[50px] rounded-xl">
                <div className="flex flex-row items-center gap-2">
                  <GiWallet className="w-6 h-6 text-white/20" />
  
                  <p className="font-light opacity-20 ">
                    Carte de credit (Prochainement)
                  </p>
                </div>
                <div className="w-4 h-4 border-2 border-white rounded-full opacity-20 "></div>
              </div>
              <div className="border border-white/10 cursor-pointer  items-center justify-between p-6 flex  bg-white/10    h-[50px] rounded-xl">
                <div className="flex flex-row items-center gap-2">
                  <GiTakeMyMoney className="w-6 h-6 text-white" />
                  <p className="font-light ">Paiement mobile</p>
                </div>
                <div className="w-4 h-4 border-2 rounded-full bg-white/40 border-white/50 "></div>
              </div>
            </div>
  
            <div className="flex items-center flex-col  h-[340px] p-6 px-9 mt-10 border border-white/10 bg-white/10 rounded-xl">
              <p className="w-full pb-4 text-xl font-semibold border-b border-white/30 ">
                Plan de souscription
              </p>
              <div className="flex flex-col self-start w-full ">
                <p className="text-[170px] font-bold self-start  leading-[120px]  mt-6">
                  {currentData.month}
                </p>
                <div className="flex flex-row justify-between">
                  <p className="self-start text-[45px]  tracking-widest pt-6 ml-2 ">
                    MOIS
                  </p>
                  <div className="flex flex-col justify-start">
                    <p className="text-sm leading-[14px] opacity-25 mb-2 ">
                      Offre spéciale <br /> à seulement
                    </p>
                    <p className="text-2xl leading-[14px] mt-2  relative gap">
                    {currentData.amount}{" "}
                      <span className="absolute ml-2 text-xs -top-1">{currentData.currency}</span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="flex flex-col w-1/2 pr-8 p-14 pt-9 ">
            <IoCloseSharp className="self-end w-8 h-8 cursor-pointer" />
            <p className="mb-3 text-lg">Sélectionnez votre pays</p>
            <div className="flex flex-col gap-4">
              <div className="border border-white/10 cursor-pointer  items-center justify-between p-6 pr-4 flex      h-[50px] rounded-xl">
                <div className="flex items-center gap-4">
                  <img
                    alt=""
                    className="object-cover h-[20px] w-[30px] "
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg"
                    }
                    srcSet=""
                  />
                  <p className="text-lg font-light ">Mali</p>
                </div>
                <ArrowDropDownIcon />
              </div>
              <div className="border border-white/10 cursor-pointer py-1  items-center justify-between p-6 flex      h-[50px] rounded-xl">
                <div className="pr-3 border-r ">+ 223</div>
                <div className="items-center justify-center flex-1 px-2 ">
                  
                  <input value={currentData.number} onChange={(e)=>setCurrentData({...currentData,number:e.target.value})}  className="w-full bg-transparent outline-none  [&::-webkit-outer-spin-button]:appearance-none 
      [&::-webkit-inner-spin-button]:appearance-none " type="number" />
                </div>
              </div>
            </div>
            <div className="max-w-[300px] mt-6">
            
            </div>
            <div className="grid h-[260px] mb-[100px] pt-12 grid-cols-3 gap-4 p-4 ">
  
  
  <div className="bg-white w-[110px] h-[110px]  rounded-full ">
  <img
                    alt=""
                    className="object-cover w-[110px] h-[110px]  rounded-full "
                    src={
                      "https://dimelo-answers-production.s3.eu-west-1.amazonaws.com/268/61e53ebb71b51d1c/om_logo_original.png?1965155"
                    }
                    srcSet=""
                  />
  </div>
  <div className="bg-white w-[110px] h-[110px]  rounded-full ">
  <img
                    alt=""
                    className="object-cover w-[110px] h-[110px]  rounded-full "
                    src={
                      "https://dimelo-answers-production.s3.eu-west-1.amazonaws.com/268/61e53ebb71b51d1c/om_logo_original.png?1965155"
                    }
                    srcSet=""
                  />
  </div>
  <div className="bg-white w-[110px] h-[110px]  rounded-full">
  <img
                    alt=""
                    className="object-cover w-[110px] h-[110px]  rounded-full "
                    src={
                      "https://dimelo-answers-production.s3.eu-west-1.amazonaws.com/268/61e53ebb71b51d1c/om_logo_original.png?1965155"
                    }
                    srcSet=""
                  />
  </div>
  <div className="bg-white w-[110px] h-[110px]  rounded-full">
  <img
                    alt=""
                    className="object-cover w-[110px] h-[110px]  rounded-full "
                    src={
                      "https://dimelo-answers-production.s3.eu-west-1.amazonaws.com/268/61e53ebb71b51d1c/om_logo_original.png?1965155"
                    }
                    srcSet=""
                  />
  </div>
  
            </div>
  
            <div className="flex justify-end gap-4 mt-2">
              <ButtonComponent
                key={1}
                label={"Annuler"}
                handleClick={() => {
                  setShowCheckoutModal(false);
                }}
                className="bg-[#3f3f3f]  border-none    "
              />
  
              <ButtonComponent
                key={2}
                handleClick={async () => {
                const data =  await addNewPaymentIntouch(currentData);

                console.log(data);
                
                  /*    if(isLoading){
                    
                      return;
                    }
   */
                }}
                label={"Payer"}
                className={`bg-[#9a9768]  border-none  ${
                  false
                    ? "opacity-30 cursor-default hover:brightness-100"
                    : "opacity-100 cursor-pointer "
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default GlobalPayment;


