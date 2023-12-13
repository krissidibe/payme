import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import InputComponent from "../../../components/UI/InputComponent";
import ButtonComponent from "../../../components/UI/ButtonComponent";
import {   fetchAllTransactionInterval } from "../../../services/transactionService";
import { daysFr } from "../../../utils/helpers";
import InputDropdownSexeComponent from "../../../components/UI/InputDropdownSortComponent";
import InputDropdownSortComponent from "../../../components/UI/InputDropdownSortComponent";
import { PiPrinterFill } from "react-icons/pi";
import { saveAs } from "file-saver";
import { fetchEnterprise } from "../../../services/enterpriseService";
import { fetchUser } from "../../../services/userService";
function PaymentHistorylist(props) {
  async function fetchPdf(startAt,endAt,dataNew:Transaction[]) {

    const data:Enterprise = await fetchEnterprise();
 

     
  

    const request = await fetch(`${process.env.BASE_API_URL}/api/history?startAt=${startAt}&endAt=${endAt}`,
    {
      method: "POST",
      body: JSON.stringify({enterprise:data,dataTable:dataNew}),
    }
    );
    const dataBlob = await request.blob();

    const blob = new Blob([dataBlob], { type: "application/pdf" });
    console.log(blob);

    return blob;
  }

  const [isShow, setIsShow] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [dropValue, setDropValue] = useState(" Décroissant");
  
  const [data, setData] = useState<any>({
 
    startAt:  null,
    endAt:  null,
  });
  const handleChange = (e) => {
    setIsShow(x => x = false);
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const router = useRouter();
  const routerInfo = router.query;
  const [dataNew, setDataNew] = useState<any>(null);
  const [dataNewArray, setDataNewArray] = useState<any[]>([]);
useEffect(() => {

  (async ()=>{
    const dataUser = await fetchUser();
    setDataNew(x=> x = dataUser)
    setDataNewArray(x=> x = dataNew?.payments)
  
   })()
 

 
}, [])

  const handleFetch =async () => {
    setIsShow(x => x = true);
  const values =  await fetchAllTransactionInterval(data.startAt,data.endAt);
  setDataNew(x => x = values);
  
  }
  return (
    <div className="flex flex-col flex-1 h-full max-w-full mb-0 select-none ">
      {SearchElement()} 
    {/*   <div className="flex items-center justify-end w-full gap-4 px-24 pr-[120px] mt-5 mb-5 ">
        <p className="text-md text-white/40">Période du</p>
        <div>
          <InputComponent
            key={1}
            name="startAt"
            value={data.startAt == null ? null : new Date(data.startAt).toISOString().substr(0, 10)}

            type="date"
           onChange={handleChange}

           className={`${data.startAt == null ? "opacity-50" :"opacity-100"} dark:[color-scheme:dark] [color-scheme:dark] max-w-[150px] mb-0 h-[45px] rounded-xl text-[14px] font-light border-opacity-20   `}
           />
        </div>
        <p className="text-md text-white/40">au</p>
        <div>
          <InputComponent
            key={2}
            name="endAt"
            value={data.endAt == null ? null : new Date(data.endAt).toISOString().substr(0, 10)}

            type="date"
             onChange={handleChange}

            className={`${data.endAt == null ? "opacity-50" :"opacity-100"} dark:[color-scheme:dark] [color-scheme:dark] max-w-[150px] mb-0 h-[45px] rounded-xl text-[14px] font-light border-opacity-20   `}
          />
        </div>
        <ButtonComponent
          key={1}
          label={"Afficher"}
          handleClick={data.startAt !=null && data.endAt != null ? handleFetch : null}
          labelClassName="text-[15px]"
          className="from-[#3B3B3B] ml-2 to-[#212121]  bg-gradient-to-b opacity-100  border-none   w-[130px]   "
        />
      </div> */}
      <div className="flex-1 overflow-scroll mt-14 no-scrollbar ">
      {/*   <div className="p-4 mx-10 mt-5 rounded-xl"> */}
        <div className="flex flex-col h-full p-10 mx-10 bg-gradient-to-b      from-[#2b2b2b] via-[#2b2b2b9a] to-[#00000000] rounded-xl">
          <div className=" border-b-[1px]  border-white/10 p-5 mt-2 px-5 mx-5  flex items-center justify-between">
            <h3 className="text-2xl opacity-30">ABONNEMENT   </h3>
          {/*   <div className="flex gap-4">
            <InputDropdownSortComponent
              
              placeholder="---"
              inputDrop={true}
              readOnly={true}
              openDrop={openDrop}
              onClick={() => {
                setOpenDrop(true);
              }}
              handleClick={(item) => {
               
                setOpenDrop(false);
                setDropValue(item);
              
                
              }}
              value={dropValue}
              
              className="from-[#8f8f8f2c]   to-[#ffffff2c]         bg-gradient-to-t opacity-100  border-none max-h-[40px] w-[125px] "
            />
              <ButtonComponent
                key={2}
                Icon={PiPrinterFill}
                label={"Imprimer"}
                handleClick={async () => {
               if(dataNew.length>0){

                 const dd =  await  fetchPdf(data.startAt,data.endAt,dataNew)
                 saveAs(dd, "Historique des finances.pdf"); 
               }

                
       
                }}
               
                className={`from-[#9a9768]   to-[#9a9768]          bg-gradient-to-b opacity-100  border-none max-h-[40px] w-[130px]  ${dataNew.length>0 ? "opacity-100" : "cursor-default opacity-30"} `}
              />
            </div> */}
          </div>
          <div className={`flex p-2 mt-4 mb-2  text-[14px]   px-7 pl-14  ${isShow ? "opacity-100": "opacity-30"} `}>
                <p className="w-[80px] md:w-[100px] xl:w-[200px] 2xl:w-[300px]">Date</p>
                <p className="w-[120px] md:w-[180px] xl:w-[180px] 2xl:w-[280px]">Référence</p>
                <p className="w-[120px] md:w-[180px] xl:w-[220px] 2xl:w-[220px]">Moyen de paiement</p>
                <p className="w-[80px] md:w-[140px] xl:w-[180px] 2xl:w-[220px]">Plan d'abonnement</p>
                <p className="w-[90px] md:w-[90px] xl:w-[90px] 2xl:w-[90px]">Montant</p>
               {/*  <p className="w-[120px] md:w-[130px] xl:w-[200px] 2xl:w-[300px]">Type de versement</p> */}
                <p className="w-[140px] text-center  flex-1">Date d'expiration</p>
              </div>
        <div className="flex flex-col overflow-scroll no-scrollbar">
       
       { dataNew?.payments.map((item)=>(
         /*   */

 {...item,date: new Date(item.subscribe.startAt)}
    )).sort((a,b)=>  Number(b.date) - Number(a.date) ).map((itemData,index)=>(
      ItemRow(itemData,index)
          ))   }
      
     
    
          </div> 
        </div>
      </div>
    </div>
  );

  function ItemRow(item,index) {
    return (
      <div key={item.id} className={`flex p-2  min-h-[50px]   items-center pb-1 border-white/10 border-b   text-[14px]  ${index % 2 == 0 ? "bg-gray-50/5" :"bg-gray-100/10"}   pl-10  mx-4`}>
      <p className="w-[80px] md:w-[100px] xl:w-[200px] 2xl:w-[300px] line-clamp-1 opacity-50">{daysFr(`${item.subscribe?.startAt}`)}</p>
      <p className="w-[120px] md:w-[180px] xl:w-[180px] 2xl:w-[280px] line-clamp-1 opacity-50 pr-4">{item.reference}</p>
      <p className="w-[120px] md:w-[180px] xl:w-[220px] 2xl:w-[220px] line-clamp-1 opacity-50 pr-4">{item.type}</p>
      <p className={`w-[80px] md:w-[140px] xl:w-[180px] 2xl:w-[220px] line-clamp-1   ${item.month == 12 ? "text-primary" : "opacity-50"} `}>{item.month}  mois </p>
     
      <p className={`w-[90px] md:w-[90px] xl:w-[90px] 2xl:w-[90px]  relative `}> {item.amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") }  <span className="text-[10px] absolute  right-3 top-0" >{item.currency}</span>   </p>
      <p className="w-[140px] opacity-50 flex-1 text-center ">{daysFr(`${item.subscribe?.endAt}`)}</p>
    </div>
    )
  }
  function SearchElement() {
    const routerAAA = useRouter();
    return (
      <div className=" min-h-[155px] px-20 flex items-end mr-0 pb-6    relative    justify-start pr-10 border-b-[1px]  border-white/10 border-opacity-20">
        <IoIosArrowBack
          onClick={() => {
            routerAAA.back();
          }}
          className="absolute w-8 h-8 font-bold cursor-pointer bottom-[50px] left-8"
        />

        <div>
          <h3 className="text-4xl font-bold">Historique de facturation</h3>
          <h3 className="text-md text-white/40">
          Retracez l'histoire de la facturation au fil du temps
          </h3>
        </div>
      </div>
    );
  }
}

export default PaymentHistorylist;
