import React, { useState ,useEffect} from "react";
import { IoIosArrowForward, IoIosNotifications, IoIosPeople, IoIosRefresh } from "react-icons/io";
import ButtonComponent from "../../../components/UI/ButtonComponent";
import InputComponent from "../../../components/UI/InputComponent";
import { PiListBulletsFill } from "react-icons/pi";
import FolderComponent from "../../../components/UI/FolderComponent";
import { HiFolder } from "react-icons/hi";
import { RiDashboardFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import { useNewClientModal } from "../../../utils/use-new-client-modal";
import { fetchAllCustomer } from "../../../services/customerModel";
import { IoListSharp, IoPersonSharp, IoTimer } from "react-icons/io5";
import DropdownGlobalListComponent from "../../../components/menu/DropdownGlobalListComponent";
import { Menu } from "@headlessui/react";
import { FaBuilding } from "react-icons/fa";
import DropdownGlobalClientComponent from "../../../components/menu/DropdownGlobalClientComponent";

function Client(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [indexView, setIndexView] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const router = useRouter()
  const modal = useNewClientModal();
  const [customers, setCustomers] = useState<Customer[]>([])
  const [customersFiltered, setCustomersFiltered] = useState<Customer[]>([])
  useEffect(()  =>  {
    (async()=>{
    
     const datas =await fetchAllCustomer();
      setCustomers(datas);
      setCustomersFiltered(datas);
      setIsLoading(false)

    
      
    })()
      
        return () => {
         
        }
      }, [ ])
 
  useEffect(()  =>  {
     

 
 
    if (typeValue != "") {
      const datasFilterV = customers.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          item.type == typeValue
      );
      setCustomersFiltered(datasFilterV);
    } else {
      const datasFilter = customers.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
      setCustomersFiltered(datasFilter)
      
    }



    
      }, [searchValue,typeValue])
      
 
  return (
    <div className="flex w-full h-full overflow-x-hidden select-none">
      <div className="flex flex-col w-full h-full ">
       {SearchElement()}
        <div className="flex  w-auto min-h-[40px] mt-2 mr-24 space-x-8   overflow-x-scroll text-sm border-b border-white border-opacity-10 ml-[70px] no-scrollbar ">
          <div
            onClick={() => {
              setIndexView(0);
            }}
            className={`flex cursor-pointer items-center py-2 space-x-2 text-[18px] ${
              indexView == 0
                ? "border-b-2 border-[#9a9768] border-opacity-100"
                : "border-b-2 border-opacity-0 border-white  opacity-50"
            } `}
          >
            {" "}
            <RiDashboardFill className="w-6 h-6 mb-1" /> <span>Grandes icônes</span>
          </div>
          <div
            onClick={() => {
              setIndexView(1);
            }}
            className={`flex cursor-pointer items-center py-2 space-x-2 text-[18px] ${
              indexView == 1
                ? "border-b-2 border-[#9a9768] border-opacity-100"
                : "border-b-2 border-opacity-0 border-white opacity-50 "
            } `}
          >
            {" "}
            <IoListSharp className="w-[26px] h-[26px]" /> <span>Liste</span>
          </div>
        </div>
        {indexView == 1 ? (
          <div className="flex w-auto min-h-[40px] text-[15px] pb-1 mt-3   mr-[130px] items-end  text-[#ffffff6f]  border-b border-white border-opacity-10 ml-[103px] no-scrollbar ">
            <div className=" text-sm  lg:w-[360px] w-[150px]">CLIENT</div>
            <div className="  w-[350px]  text-sm ">SECTEUR</div>
            <div className="flex-1 text-sm ">ADRESSE</div>
          </div>
        ) : null}

        <div className={` ${indexView == 0 ? "flex flex-row  px-8 ml-10    justify-start overflow-scroll md:items-start  mt-4 " : "flex-col  px-8  mr-[115px] ml-16  overflow-x-scroll"} flex-wrap   w-auto no-scrollbar `}>
     
        {      !isLoading && customersFiltered!.length ==0 && 



<div className="flex flex-col items-center justify-center w-full m-auto  opacity-30 h-[570px] mr-[65px]">
  {customersFiltered.length == 0 && searchValue.length == 0  && <p className="mb-2 font-bold opacity-90 text-md" >Aucun contenu </p>}
{searchValue.length != 0  && <p className="mb-2 font-bold opacity-90 text-md" >Aucun {searchValue.length == 0 ? "résultat" : "résultat"} </p>}
{ searchValue.length == 0 && 
<>
 

<p className="text-sm opacity-70 font-light leading-[17px]">Ce fichier ne contient aucun client,</p>
   <p className="text-sm opacity-70 font-light leading-[17px]">veuillez cliquer sur le bouton "Ajouter"</p>
   <p className="text-sm opacity-70 font-light leading-[17px]">pour en créer un</p>
</>

}

</div>
 

}
        
         {customersFiltered.map(item=>(
          
 <ItemGestion key={item.id} handleClick={()=>{
const data:any = item;
 

  
  router.push({
    pathname:"/gestions/client/clientshow",
    query:data
  })
}}  indexType={indexView} item={item} />

        ))}
        
         
     
     
        </div>
      </div>
    </div>
  );

  function SearchElement() {
 
    return (
      <div className="w-full relative min-h-[130px] px-14   pr-24 flex items-end pb-[17px]  justify-between   border-b-[1px]  border-white border-opacity-10">
      <IoIosArrowBack
        onClick={() => {
          router.back();
        }}
        className="absolute w-8 h-8 font-bold cursor-pointer bottom-[25px] left-5"
      />
      <div className="flex items-center space-x-2">
        <h3 className="mb-1 ml-4 text-4xl font-bold">Clients</h3>
      </div>
      <div className="flex">

     <div className="relative">
     <svg
            className={`absolute z-20  top-2 left-3 `}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 19L15.1333 15.1333M17.2222 10.1111C17.2222 14.0385 14.0385 17.2222 10.1111 17.2222C6.18375 17.2222 3 14.0385 3 10.1111C3 6.18375 6.18375 3 10.1111 3C14.0385 3 17.2222 6.18375 17.2222 10.1111Z"
              stroke="#595959"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        <InputComponent
        key={"item1"}
        value={searchValue}
        onChange={(e)=>{
          setSearchValue(x => x = e.target.value)
        }}
          placeholder="Rechercher"
          className="rounded-full w-full pl-[42px] z-20 h-[40px]   font-light pr-8   border-[#5A5A5A]  "
        /> 
     </div>
          <DropdownGlobalClientComponent className="max-w-[100px] top-[80px]">
          <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    setTypeValue("");
                  }}
                  className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                    active
                      ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                      : " "
                  }`}
                >
                  <IoListSharp className="w-6 h-6 " />
                  Tout
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                   setTypeValue("ENTERPRISE");
                  }}
                  className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                    active
                      ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                      : " "
                  }`}
                >
                  <FaBuilding className="w-6 h-6 " />
                  Entreprise
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                   setTypeValue("PERSONAL");
                  }}
                  className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                    active
                      ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                      : " "
                  }`}
                >
                  <IoPersonSharp className="w-6 h-6 " />
                  Particulier
                </div>
              )}
            </Menu.Item>
           
             
          </DropdownGlobalClientComponent>
        <ButtonComponent
          label={"Ajouter"}
          labelClassName="font-bold text-[15px]"
          handleClick={() => {
            modal.onOpen();
          }}
          className="bg-[#9a9768]   ml-8"
        />
      </div>
    </div>
    );
  }
}
/*
 */
export default Client;

function ItemGestion({ item, indexType,handleClick=()=>{} }) {
  const primaries = [
    
    "bg-[#6DCDA7]", 
    "bg-[#E7726C]",
    "bg-[#DE76E2]",
    "bg-gray-300",
    "bg-yellow-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
/*     "bg-teal-500",
    "bg-gray-500", 
    "bg-green-500", 
    "bg-blue-500", 
   "bg-purple-500", */
   
   
    // The grey swatch is intentionally omitted because when picking a color
    // randomly from this list to colorize an application, picking grey suddenly
    // makes the app look disabled.
  ];


  return indexType == 0 ? (
   <div key={item.id} onClick={handleClick}  className={`min-w-[160px] h-[200px]  bg-  flex m-1 mx-4 cursor-pointer`}>
    
    <FolderComponent key={item.id} item={item} />
  </div> 
   
  ) : (
    <div onClick={handleClick} key={item.id}  className="flex hover:bg-[#ffffff0a] relative w-full cursor-pointer flex-1 ml-4 min-h-[40px] items-center  text-[15px] mt-2    py-2 text-[#ffffff6f]  border-b border-white border-opacity-10 x-40">
         <IoIosArrowForward className="absolute right-0 w-6 h-6 bottom-5" />
      <div className="lg:w-[352px] w-[150px] ">
        
        <div className="flex items-center space-x-2">  <HiFolder className={`min-w-[45px] h-[45px] text-white `} />
      <div className="flex flex-col leading-[1rem]">
        <p className="text-white text-[13.5px]  line-clamp-1">  {item.name.toUpperCase()}</p>
        <span className="text-[11px] line-clamp-1"> {item.email}</span>
         </div>
        </div>
        
        </div>
      <div className="flex  w-[350px]  mb-1 "> <div className={`w-auto p-3 text-white rounded-full items-center text-center ${primaries[Math.floor(Math.random()*primaries.length)]} flex justify-center text-opacity-100 py-[2px] text-[12px]`}>{item.activity}</div> </div>
      <div className="flex-1 mb-1 line-clamp-1">{item.address}</div>
    </div>
  );
}


/* 
<p
          className={`w-[175px] mr-10 text-white ${type.color} p-3 rounded-full items-center text-center flex justify-center text-opacity-100 py-[2px] text-[12px]`}
        >
          {type.label}
        </p>
*/