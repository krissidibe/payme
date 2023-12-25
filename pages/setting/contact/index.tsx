import React, { useRef, useState } from "react";
import InputComponent from "../../../components/UI/InputComponent";
import ButtonComponent from "../../../components/UI/ButtonComponent";
import { useRouter } from "next/router";
function Contact(props) {
    const router = useRouter();
    const [object, setObject] = useState("")
    const [message, setMessage] = useState("") 
    const email = useRef(null)
  return (
    <div className="flex flex-col items-center w-auto h-full px-24 min-[1500px]:pt-[170px] pt-[105px]">
      <div className="flex flex-col items-center justify-center gap-1 tracking-wider xl:scale-75 xl:items-center">
        <h1 className="text-[52px]  xl:text-[68px] mt-8 xl:mt-0  leading-[40px] xl:leading-[80px]  font-semibold ">Laissez-nous un message</h1>
        <h2 className="text-[20px] xl:text-[32px] opacity-50">
        Une question ou une remarque ? Ecrivez-nous simplement un message !
        </h2>
      </div>

      <div className="flex flex-1 flex-col items-center w-full h-full mt-8 rounded-tl-[30px]  justify-start pt-10 rounded-tr-[30px] overflow-scroll no-scrollbar  bg-gradient-to-b from-[#252525] to-[#00000079] ">
    
     
       
        <div className="flex flex-col w-full max-w-[800px]   gap-[20px] mt-[65px] px-28  ">

      <div className="flex flex-col ">
    
      <InputComponent
                key={2}
                name="object"
                 value={object}
              onChange={(e)=>{
                setObject(e.target.value)
              }}
                placeholder="Objet *"
                labelClassName="text-white/40 text-[14px]"
                className="rounded-[10px] mb-0 h-[50px] no-scrollbar overflow-y-scroll  min-[1500px]:h-[64px] text-[14px] font-light border-opacity-10 focus:border-opacity-100 "
              />
     
            
      </div>
      
      <textarea
      
      name="message"
      value={message}
   onChange={(e)=>{
     setMessage(e.target.value)
   }}
      
      
      id="" placeholder="Message *"    className="w-full p-4 font-light h-[200px] border-opacity-10 text-sm border-[1px] rounded-[10px]  placeholder:text-white/70 placeholder:opacity-40 bg-transparent  border-white   outline-none  "></textarea>
       
       
      <div className="flex items-end justify-start w-full gap-6 mt-6 ">
              <ButtonComponent
                key={1}
                label={"Annuler"}
                handleClick={() => {
                   router.back();
                }}
                className="bg-[#212121]  border-none    "
              />

<a className="hidden" ref={email} href={`mailto:contact@paymefinance.com?subject=${object}&body=${message}`}></a>

              <ButtonComponent
                key={2}
                handleClick={async () => {
                 email.current.click()
                }}
                label={"Envoyer"}
                className="bg-[#9a9768]  border-none    "
              />
            </div>
        </div>
     
      </div>
    </div>
  );
}

export default Contact;
function ItemSubscribeCard({number,price}) {
    return <div className={`h-full min-w-[260px] cursor-pointer rounded-xl   bg-gradient-to-bl from-[#929292] leading-[100px] px-8 pb-12 to-[#7d7d7d] flex flex-col justify-end ${number == 12 ? "from-[#cec98b] to-[#aaa670]  " : "" } `}>
<p className="text-[90px] font-black tracking-wider ">{number}</p>
<p className="text-2xl tracking-wider ">MOIS</p>
<p className="mb-4 text-sm opacity-50">Offre spéciale</p>
<p className="flex gap-1 pt-2 text-3xl border-t-[1px]" > <span>{price}</span>  <span className="text-sm">FCFA</span></p>
    </div>;
}

