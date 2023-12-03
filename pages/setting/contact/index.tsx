import React from "react";
import InputComponent from "../../../components/UI/InputComponent";
import ButtonComponent from "../../../components/UI/ButtonComponent";
import { useRouter } from "next/router";
function Contact(props) {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center w-auto h-full px-24 min-[1500px]:pt-[170px] pt-[105px]">
      <div className="flex max-[1500px]:scale-75 max-[1500px]:items-center flex-col items-center justify-center gap-1 tracking-wider">
        <h1 className="text-[72px] min-[1500px]:text-[70px]  leading-[60px] max-[1500px]:leading-[80px]  font-semibold ">Laissez-nous un message</h1>
        <h2 className="text-[31px] min-[1500px]:text-[28px] min-[1500px]:mt-2 min-[1500px]:mb-6   opacity-50">
        Une question ou une remarque ? Ecrivez-nous simplement un message !
        </h2>
      </div>

      <div className="flex flex-1 flex-col items-center w-full h-full mt-8 rounded-tl-[30px]  justify-start pt-10 rounded-tr-[30px] overflow-scroll no-scrollbar  bg-gradient-to-b from-[#252525] to-[#00000079] ">
    
     
       
        <div className="flex flex-col w-full max-w-[800px]   gap-[20px] mt-[65px] px-28  ">

      <div className="flex flex-col ">
    
      <InputComponent
                key={2}
                name="name"
                /*   value={data.name}
              onChange={handleChange} */
                placeholder="Objet *"
                labelClassName="text-white/40 text-[14px]"
                className="rounded-[10px] mb-0 h-[40px] min-[1500px]:h-[64px] text-[14px] font-light border-opacity-10 focus:border-opacity-100 "
              />
     
            
      </div>
      
      <textarea name="" id="" placeholder="Message *"    className="w-full p-4 font-light h-[200px] border-opacity-10 text-sm border-[1px] rounded-[10px]  placeholder:text-white/70 placeholder:opacity-40 bg-transparent  border-white   outline-none  "></textarea>
       
       
      <div className="flex items-end justify-start w-full gap-6 mt-6 ">
              <ButtonComponent
                key={1}
                label={"Annuler"}
                handleClick={() => {
                   router.back();
                }}
                className="bg-[#212121]  border-none    "
              />
              <ButtonComponent
                key={2}
                handleClick={async () => {
                 
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

