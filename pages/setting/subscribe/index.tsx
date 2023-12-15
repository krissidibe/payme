import React, { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import ButtonComponent from "../../../components/UI/ButtonComponent";
import { TiStarFullOutline } from "react-icons/ti";
import { BiArrowBack, BiArrowToRight, BiXCircle } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { fetchUser } from "../../../services/userService";
import { IoInformationCircle } from "react-icons/io5";
import { updateProformaDate } from "../../../services/projectService";
import { addNewPayment, updatePaymentEndDate, updatePaymentStartDate } from "../../../services/paymentService";

function Subscribe(props) {


  const [type, setType] = useState(0)
  const [fakeModal, setFakeModal] = useState(false)
  const router = useRouter()
  const [data, setData] = useState(null)

  useEffect(() => {
   (async ()=>{
    const dataUser = await fetchUser();
    setData(x=> x = dataUser)
  
   })()
    return () => {
       
    }
  }, [])

  const handleChange = async (e) => {
     
    await updatePaymentStartDate(data?.subscribe.id,e.target.value)
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

   
  };
   const handleChangeDate = async (e) => {
    
    await updatePaymentEndDate(data?.subscribe.id,e.target.value)
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

     
  };  
  
  return (
    <div className="flex flex-col items-center w-auto h-full px-24  pt-[65px]">
{fakeModal && <div className="absolute flex items-center justify-center px-4 border rounded-md bottom-20 gap-7">
 
      <input      
                type="date" 
                name="invoiceDate" 
               onChange={handleChange}
                className="rounded-[4px]    bg-transparent opacity-100     [color-scheme:dark] mb-0 h-[50px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
                />
      <input      
                type="date" 
                name="invoiceDate" 
             onChange={handleChangeDate}
                className="rounded-[4px]    bg-transparent opacity-100     [color-scheme:dark] mb-0 h-[50px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
                />
                <BiXCircle className="cursor-pointer" onClick={()=>{
                  setFakeModal(x=> x = false)
                }} />
</div> }

     <div
     onClick={()=>{
/*  */

router.push({
  pathname: "subscribe/paymentHistorylist",
  query:JSON.stringify( data?.payments) as any,
});
    
     }}
     
     className="relative flex items-center self-end justify-center pr-6 mt-4 mb-4 border rounded-full opacity-50 cursor-pointer">
     <ButtonComponent
                key={2}
                label={"Voir Historique"}
               
              
                className={`  bg-transparent text-black     border-none `}
              />
              <FaArrowRight  className="absolute right-3" />
     </div>
      <div className="flex flex-col items-center justify-center gap-1 tracking-wider xl:scale-75 xl:items-center">
       

        <h1 className="text-[42px]  xl:text-[68px] mt-8 xl:mt-0  leading-[40px] xl:leading-[80px]  font-semibold ">Des prix simples & transparents</h1>
        <h2 className="text-[24px] xl:text-[38px] opacity-50">
          Il y a forcément un plan pour vous. Commencez maintenant !
        </h2>
      </div>

      <div className="flex flex-1 flex-col items-center w-full h-full mt-8 rounded-tl-[30px]  justify-start pt-8 rounded-tr-[30px] overflow-scroll no-scrollbar  bg-gradient-to-b from-[#2b2b2b] via-[#00000000] to-[#00000000] ">
     {/*  <div className="flex h-[52px] min-w-[318px] items-center justify-center  font-bold bg-[#525252] rounded-full">
          <div onClick={()=> setType(0)} className={`${type == 0 ? "bg-white text-black" :"text-black"} flex items-center h-full text-[19px] px-6   rounded-full cursor-pointer`}>Mensuelle</div>
          <div onClick={()=> setType(1)} className={`${type == 1 ? "bg-white text-black" :"text-black"} flex items-center h-full text-[19px] px-6   rounded-full cursor-pointer`}>Abonnements</div>
        </div> */}
 
 <IoInformationCircle
 onClick={()=>{
  setFakeModal(x=> x = true)
 }}
 className="absolute w-5 h-5 opacity-50 bottom-10" />
      { type ==0 ? <div className="flex items-center max-[1350px]:scale-75  max-[980px]:flex-wrap  h-[332px] min-[1350px]:h-[332px] mt-14  max-[1350px]:mt-1 w-auto justify-center gap-6" >
               {/*   <ItemSubscribeCard key={1} number={1} price={10000}  /> */}
                 <ItemSubscribeCard active={data?.subscribe.payment.month == 3} style={"bg-transparent border-[2px] border-[#9a9768]"} key={1} svg={3}  price={9890} />
                 <ItemSubscribeCard active={data?.subscribe.payment.month == 6} style={"bg-gradient-to-b from-[#8F8F91] to-[#424244]  "} key={2} svg={6}  price={18950} />

                 <ItemSubscribeCard active={data?.subscribe.payment.month == 12}  style={"bg-gradient-to-b from-[#B7B781] to-[#999967] "} key={3} svg={12}  price={34950} />
        </div>
      
      :<div className="flex flex-col items-center xl:w-[800px] justify-center bg-gradient-to-b from-[#303030] to-[#00000000] mt-14 px-[80px] pt-10 pb-10 rounded-3xl">
      <CiCircleCheck className="w-[120px] h-[120px] xl:w-[200px] xl:h-[200px] mb-3"/>
      
        <p className="text-[22px] xl:text-[28px] xl:leading-[30px] font-light">Félicitaion ! vous avez déjà un abonnement</p>
        <p className="text-[22px] xl:text-[28px] font-light">en cours valable jusqu'au 31/12/2023</p>
      </div>
      }
        <div>
            
        </div>
      </div>
    </div>
  );

  function ItemSubscribeCard({svg,price,style,active}) {
    return <div
    onClick={ async ()=>{
      const dataPayment:Payment =  {
    
        type  :"Orange Money",
        month  :svg,
        amount  :price,
        currency  :"FCFA"
      }
      
       const newData = await  addNewPayment(dataPayment)
       if(newData.id){
        router.back()
      } 
    }}
    
    className={` ${active ? "scale-[110%]  mx-4  " :"" }        relative h-full min-w-[255px] max-w-[255px]  ${style}  cursor-pointer rounded-[16px]  justify-center       px-[60px]     flex flex-col     `}>
  
  {active && <div className="absolute flex items-center justify-center px-2 py-1 text-xs border rounded-full opacity-60 top-6 right-7">
    <TiStarFullOutline className="w-4 h-4 mb-[2px] mr-[2px]" />
  <p>Souscrit</p>
  </div>}
  
  <div className="flex flex-col items-start leading-none border-b-[1px]  border-white/30 pb-4 mt-1 ">
  
  <p className={`text-[128px] ${svg ==  12 && active ? "text-transparent" : ""} font-bold leading-[104px] mb-3`} >{svg}</p>
  
  {svg == 12 && active && <p className={`text-[120px] top-[39px] absolute left-[35px]  font-bold leading-[104px] mb-3`} >{svg}</p>}
  <p className="text-[33px] font-light tracking-wider  mt-[0px] mb-[4px]" >MOIS</p>
  <p className={`text-[15px] font-light ${svg == 3 ? "text-[#ffffff]/30" : "text-[#ffffff]/30"}`} >Offre spéciale</p>
  </div>
  <p className="text-[24px] mt-[2px] flex font-light items-start">{price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} <span className="pt-1 pl-2 text-[14px] " >FCFA</span> </p>
  
  <ButtonComponent
                  key={1}
                  label={"Souscrire"}
                  handleClick={() => {
                    
                  }}
                  labelClassName={`${svg == 12 ? "" : "text-black"}`}
                  className={`max-h-[35px] ${svg == 12 ? "bg-[#2b2b2b]" : "bg-[#f7f7f7]"}  text-black   mt-4  border-none `}
                />
  
    </div>;
  }
}

export default Subscribe;

function ItemSubscribeCard11({svg,price,style}) {
    return <div className={` relative h-full min-w-[215px]  ${style}  cursor-pointer rounded-[10px]  justify-center       px-8     flex flex-col    `}>

<div className="flex flex-col items-start leading-none border-b-[1px]  border-white/10 pb-2 ">
{svg}

<p className="text-[33px] mt-[18px] mb-[4px]" >MOIS</p>
<p className="text-[15px] text-[#ffffff]/40" >Offre spéciale</p>
</div>
<p className="text-[30px] flex items-start">{price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} <span className="pt-2 pl-2 text-base " >FCFA</span> </p>



    </div>;
}
function ItemSubscribeCardOld({number,price}) {
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

