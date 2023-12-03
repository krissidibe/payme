import React, { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";

function Subscribe() {
  const [type, setType] = useState(0)
  return (
    <div className="flex flex-col items-center w-auto h-full px-24  max-[1400px]:pt-[160px] pt-[125px]">
      <div className="flex min-[1400px]:scale-75 min-[1400px]:items-center flex-col items-center justify-center gap-1 tracking-wider">
        <h1 className="text-[52px] min-[1400px]:text-[78px]  leading-[60px] min-[1400px]:leading-[80px]  font-semibold ">Des prix simples & transparents</h1>
        <h2 className="text-[22px] min-[1400px]:text-[38px] opacity-50">
          Il y a forcément un plan pour vous. Commencez maintenant !
        </h2>
      </div>

      <div className="flex flex-1 flex-col items-center w-full h-full mt-14 rounded-tl-[30px]  justify-start pt-10 rounded-tr-[30px] overflow-scroll no-scrollbar  bg-gradient-to-b from-[#2b2b2b] via-[#00000000] to-[#00000000] ">
      <div className="flex h-[52px] min-w-[318px] items-center justify-center  font-bold bg-[#525252] rounded-full">
          <div onClick={()=> setType(0)} className={`${type == 0 ? "bg-white text-black" :"text-black"} flex items-center h-full text-[19px] px-6   rounded-full cursor-pointer`}>Mensuelle</div>
          <div onClick={()=> setType(1)} className={`${type == 1 ? "bg-white text-black" :"text-black"} flex items-center h-full text-[19px] px-6   rounded-full cursor-pointer`}>Abonnements</div>
        </div>

      { type ==0 ? <div className="flex items-center max-[1400px]:scale-75 max-[1400px]:flex-wrap  h-[300px] min-[1500px]:h-[370px] mt-14  max-[1400px]:mt-1 w-auto justify-center gap-5" >
               {/*   <ItemSubscribeCard key={1} number={1} price={10000}  /> */}
                 <ItemSubscribeCard key={2} number={3}  price={9890} />
                 <ItemSubscribeCard key={3} number={6}  price={19750} />
                 <ItemSubscribeCard2 number={12}  price={39500} />
        </div>
      
      :<div className="flex flex-col items-center min-[1400px]:w-[800px] justify-center bg-gradient-to-b from-[#303030] to-[#00000000] mt-14 px-[80px] pt-10 pb-10 rounded-3xl">
      <CiCircleCheck className="w-[120px] h-[120px] min-[1400px]:w-[200px] min-[1400px]:h-[200px] mb-3"/>
      
        <p className="text-[22px] min-[1400px]:text-[28px] min-[1400px]:leading-[30px] font-light">Félicitaion ! vous avez déjà un abonnement</p>
        <p className="text-[22px] min-[1400px]:text-[28px] font-light">en cours valable jusqu'au 31/12/2023</p>
      </div>
      }
        <div>
            
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
function ItemSubscribeCard({number,price}) {
    return <div className={` relative h-full min-w-[215px] min-[1500px]:min-w-[275px] cursor-pointer rounded-[10px]   bg-gradient-to-bl from-[#929292] leading-[100px] px-8 pb-11  to-[#626262] flex flex-col justify-end ${number == 12 ? "from-[#e0da91] to-[#aaa670]  " : "" } `}>
<p className="text-[90px] min-[1500px]:text-[120px] min-[1500px]:mb-6 font-bold tracking-wider ">{number}</p>
<p className="mb-8 text-2xl tracking-wider min-[1500px]:mb-10 ">MOIS</p>
<p className="absolute text-[14px] opacity-50 bottom-[65px] min-[1500px]:bottom-[70px]">Offre spéciale</p>
<p className="flex gap-1 pt-2 text-3xl border-t-[1px] " > <span className="text-[24px] min-[1500px]:text-[30px] " >{price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</span>  <span className="text-sm">FCFA</span></p>
    </div>;
}

function ItemSubscribeCard2({number,price}) {
    return <div className={`relative h-full min-w-[215px] min-[1500px]:min-w-[275px] cursor-pointer rounded-[10px]   bg-gradient-to-bl from-[#929292] leading-[100px] px-8 pb-11  to-[#ffc7676f] flex flex-col justify-end ${number == 12 ? "from-[#e0da91] to-[#aaa670]  " : "" } `}>
<p className="text-[90px] min-[1500px]:text-[120px] min-[1500px]:mb-6 font-bold tracking-wider ">{number}</p>
<p className="mb-8 text-2xl tracking-wider min-[1500px]:mb-10 ">MOIS</p>
<p className="absolute text-[14px] opacity-50 bottom-[65px] min-[1500px]:bottom-[70px]">Offre spéciale</p>
<p className="flex gap-1 pt-2 text-3xl border-t-[1px] " > <span className="text-[24px] min-[1500px]:text-[30px] " >{price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</span>  <span className="text-sm">FCFA</span></p>
    </div>;
}

