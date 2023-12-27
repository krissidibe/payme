import React, { useEffect, useState } from "react";
import {
  IoIosNotifications,
  IoIosPeople,
  IoIosRefresh,
  IoMdTrash,
} from "react-icons/io";
import ButtonComponent from "../../../../components/UI/ButtonComponent";
import InputComponent from "../../../../components/UI/InputComponent";
import { GrInProgress, GrProjects } from "react-icons/gr";
import { LiaFileInvoiceDollarSolid, LiaFileInvoiceSolid } from "react-icons/lia";
import FolderComponent from "../../../../components/UI/FolderComponent";
import { HiFolder } from "react-icons/hi";
import { BiSolidRightArrow, BiSortDown } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import { useNewProjectModal } from "../../../../utils/use-new-project-modal";
import { fetchAllCustomerProject } from "../../../../services/projectService";
import { daysFr } from "../../../../utils/helpers";
import { IoCalendarNumberSharp, IoListSharp, IoTimer } from "react-icons/io5";
import DropdownGlobalListComponent from "../../../../components/menu/DropdownGlobalListComponent";
import { Menu } from "@headlessui/react";
import { RiFileEditLine } from "react-icons/ri";
import { FcApproval } from "react-icons/fc";
import { FaFileContract, FaFileInvoice, FaRegCalendarCheck, FaRegFileAlt } from "react-icons/fa";
import { PiCalendarCheckDuotone, PiCalendarCheckFill, PiCalendarDuotone } from "react-icons/pi";

function ClientShow(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [sortType, setSortType] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [datasFiltered, setDatasFiltered] = useState<Project[]>([]);
  const modal = useNewProjectModal();
  const router = useRouter();
  const customerInfo = router.query;

  const fetch = async () => {
    const datas: Project[] = await fetchAllCustomerProject(
      customerInfo!.id.toString()
    );

    if (datas) {
      //setIsLoading(false);
      setIsLoading(false);
      setDatasFiltered(datas);
      setProjects(datas);
    }
  };

  useEffect(() => {
    console.log("ici");
    fetch();
  }, [modal.isOpen]);

  /* 
   setTypeValue("INPROGRESS")
                   
                    setTypeValue("ISVALIDATE")
                    setTypeValue("ISFINISH") */

  useEffect(() => {
    if (sortType == "date") {
      
      const datasFilterV = projects.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())  
      );
    const dd =  datasFilterV.sort((a, b) => new Date(b!.createdAt).getTime() - new Date(a!.createdAt).getTime())
      setDatasFiltered(dd);
    } 
 
    else {
      const datasFilterV = projects.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setDatasFiltered(datasFilterV);
    }

    /*  const filtered = customers.find(obj => {
      return obj.name.toLowerCase().includes("z");
    });
    console.log(filtered); */
  }, [searchValue, typeValue]);

  return (
    <div className="flex w-full h-full overflow-x-hidden select-none no-scrollbar">
      <div className="flex flex-col w-full h-full ">
        
        {SearchElement()}

        <div
          className={`  "flex-col  pr-8 pl-8  mr-40 ml-2 pt-2    w-full  overflow-x-scroll flex-wrap flex-1    no-scrollbar `}
        >
          {(!isLoading && datasFiltered.length == 0 && searchValue !="-" ) && (
            <div className="flex items-center justify-center w-full h-full pb-20">
              <div className="flex flex-col items-center justify-center leading-[8px]">
                <p className="mb-4 font-bold opacity-30 text-md">
                  Aucun  {searchValue.length < 1 ? "contenu": "résultat"}
                </p>
             {searchValue.length < 1  &&<>
              <p className="text-sm opacity-30 font-light leading-[17px]">
                  Ce fichier client ne contient aucun projet,
                </p>
                <p className="text-sm opacity-30 font-light leading-[17px]">
                  Veuillez cliquez sur le bouton "Ajouter"
                </p>
                <p className="text-sm opacity-30 font-light leading-[17px]">
                  afin d'en créer un.
                </p>
              </>}
              </div>
            </div>
          )}

{sortType == "type" && datasFiltered.map((item) => (
  
            <div className={`${item.type != "INPROGRESS" ? "hidden":""}`}>
              <ItemGestion
              key={item.id}
             
              handleClick={() => {
                router.push({
                  pathname: "/gestions/client/clientshow/projet",
                  query: item as any,
                });
              }}
              indexType={1}
              item={item}
            />
            </div>
          ))}
          {sortType == "type" && datasFiltered.map((item) => (
  
            <div className={`${item.type != "ISVALIDATE" ? "hidden":""}`}>
              <ItemGestion
              key={item.id}
             
              handleClick={() => {
                router.push({
                  pathname: "/gestions/client/clientshow/projet",
                  query: item as any,
                });
              }}
              indexType={1}
              item={item}
            />
            </div>
          ))}
          {sortType == "type" && datasFiltered.map((item) => (
  
            <div className={`${item.type != "ISFINISH" ? "hidden":""}`}>
              <ItemGestion
              key={item.id}
             
              handleClick={() => {
                router.push({
                  pathname: "/gestions/client/clientshow/projet",
                  query: item as any,
                });
              }}
              indexType={1}
              item={item}
            />
            </div>
          ))}
 

          {
          isLoading ?
          <>
          {" "}
        
          {[1,2,3,4,5,6,7,8].map(i=>(  <ItemGestionShimmer key={i}/>))}
         
          
        </> 
          :
          
          sortType != "type" && datasFiltered.map((item) => (
            <ItemGestion
              key={item.id}
              handleClick={() => {
                router.push({
                  pathname: "/gestions/client/clientshow/projet",
                  query: item as any,
                });
              }}
              indexType={1}
              item={item}
            />
          ))} 
        </div>
      </div>

      <div className="min-w-[370px] max-w-[370px]  h-full  border-l-[1px] text-white/50   via-[#6462462c]  bg-gradient-to-b from-black to-[#64624691]  border-l-[#9a9768]  text-[#ffffff66] text-sm border-opacity-40">
        <div className="w-full relative min-h-[130px] px-12    pr-24 flex items-end pb-6  justify-between   border-b-[1px]  border-white border-opacity-10">
          <div className="flex items-center justify-center space-x-2 ">
            <div className="flex items-center justify-center p-2 text-[25px] font-bold text-white bg-teal-600 rounded-xl w-11 h-11">
              i
            </div>
            <h1 className="text-3xl font-bold text-white">Infos</h1>
          </div>
        </div>

        {isLoading &&  <div className="w-full flex-col relative min-h-[130px] px-12   pr-4 flex items-start pt-10       border-b-[1px]  border-white border-opacity-10">
          
          <h2 className="text-[#9a9768] text-[18px] font-bold mb-4  rounded-md h-[15px] w-[100px]  animate-pulse duration-100    bg-[#ffffff1f] "></h2>
            
          <p className="text-[12px] leading-4 mt-2 rounded-md h-[10px] w-[180px]  animate-pulse duration-100    bg-[#ffffff1f] " ></p>
           
          <p className="text-[12px] leading-4 mt-2 rounded-md h-[10px] w-[140px]  animate-pulse duration-100    bg-[#ffffff1f] " ></p>
          <p className="text-[12px] leading-4 mt-2 mb-4 rounded-md h-[10px] w-[200px]  animate-pulse duration-100    bg-[#ffffff1f] " ></p>
           
         
        </div>}

        {isLoading &&    <div className="w-full flex-col relative min-h-[110px] px-12    pr-4 flex items-start pt-4      border-b-[1px]  border-white border-opacity-10">
        <h2 className="text-[#9a9768] text-[18px] font-bold mb-4 mt-2  rounded-md h-[15px] w-[100px]  animate-pulse duration-100    bg-[#ffffff1f] "></h2>
            

        <h2 className="text-[#9a9768] text-[18px] font-bold mb-4 mt-2  rounded-md h-[15px] w-[140px]  animate-pulse duration-100    bg-[#ffffff1f] "></h2>
            
            <p className="text-[12px] leading-4 mt-2 rounded-md h-[10px] w-[180px]  animate-pulse duration-100    bg-[#ffffff1f] " ></p>
             
            <p className="text-[12px] leading-4 mt-2 rounded-md h-[10px] w-[140px]  animate-pulse duration-100    bg-[#ffffff1f] " ></p>
            <p className="text-[12px] leading-4 mt-2 mb-4 rounded-md h-[10px] w-[200px]  animate-pulse duration-100    bg-[#ffffff1f] " ></p>
             
        </div>}

        {!isLoading &&  <div className="w-full flex-col relative min-h-[130px] px-12   pr-4 flex items-start pt-10       border-b-[1px]  border-white border-opacity-10">
          <h2 className="font-bold text-[21px] h-6 text-[#9a9768] line-clamp-2 mb-4">
            {customerInfo.name} 
          </h2>
          <span>Adresse :</span>
          <span className="line-clamp-2 "> {customerInfo.address}</span>
          <span className="mt-1 mb-2">Secteur : {customerInfo.activity}</span>
        </div>}
      
     {!isLoading &&    <div className="w-full flex-col relative min-h-[110px] px-12    pr-4 flex items-start pt-4      border-b-[1px]  border-white border-opacity-10">
          <h2 className="font-bold text-[21px] text-[#9a9768] mb-4">
            Contact interne
          </h2>

          <span className="mt-1 text-xl font-bold">
            {" "}
            {customerInfo.externalName}
          </span>
          <span className="mt-1">Poste : {customerInfo.poste}</span>
          <span className="mt-1">Tél : {customerInfo.externalContact}</span>
          <span className="mb-4 ">Email : {customerInfo.email}</span>
        </div>}
        <div className="flex items-center justify-center w-auto mt-[80px] px-14">
         {isLoading &&    <ButtonComponent
        key={800}
            label={""}
           
            className={` border-none font-bold   h-[60px] text-[15px] w-full    animate-pulse duration-100    bg-[#ffffff1f]  cursor-default `} 
            labelClassName={` text-[16px]   `}
          />}
         {!isLoading && <ButtonComponent
            handleClick={() => {
              // pathname: "/gestions/client/addnewclient",
              router.replace({
                pathname:
                  customerInfo.type == "ENTERPRISE"
                    ? "/gestions/client/addnewclient"
                    : "/gestions/client/addpersonalclient",
                query: customerInfo,
              });
            }}
            labelClassName="text-[16px]"
            label={"Modifier"}
            className="border-none h-[58px] font-bold  w-full bg-[#ffffff20]"
          />}
        </div>
      </div>
    </div>
  );
  function SearchElement() {
    return (
      <div className="w-full relative min-h-[130px] px-14   pr-10 flex items-end pb-[17px]  justify-between   border-b-[1px]  border-white border-opacity-10">
        <IoIosArrowBack
          onClick={() => {
            router.back();
          }}
          className="absolute w-8 h-8 font-bold cursor-pointer bottom-[25px]  left-5"
        />
        <div className="flex items-center space-x-2 ">
          <h3 className="mb-1 ml-4 text-4xl font-bold">Clients</h3>
        </div>
        {isLoading &&   <div className="absolute flex gap-4 right-10">
     <div className="min-w-[200px] h-8 rounded-full  animate-pulse duration-100    bg-[#ffffff1f] ">  </div>
    
     </div>}
        {!isLoading && <div className="flex ">

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
            onChange={(e) => {
              setSearchValue((x) => (x = e.target.value));
            }}
          placeholder="Rechercher"
          className="rounded-full w-full pl-[42px] z-20 h-[40px]   font-light pr-8   border-[#5A5A5A]  "
        /> 
     </div>
           
          <DropdownGlobalListComponent itemsClassName="max-w-[140px]  right-[160px] top-[80px] "  >
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    setSortType("name");
                    setSearchValue( x=> x ="-")
                    setTimeout(() => {
                      setSearchValue( x=> x ="")
                      
                    }, 10);
                  }}
                  className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                    active
                      ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                      : " "
                  }`}
                >
                  <BiSortDown className="w-6 h-6 " />
                  Nom
                </div>
              )}
            </Menu.Item>
           
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    
                    setSortType("type");
                    setSearchValue( x=> x ="-")
                    setTimeout(() => {
                      setSearchValue( x=> x ="")
                      
                    }, 10);
                  }}
                  className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                    active
                      ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                      : " "
                  }`}
                >
                  <LiaFileInvoiceSolid className="w-6 h-6 " />
                  Type
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    setSortType("date");
                    setSearchValue( x=> x ="-")
                    setTimeout(() => {
                      setSearchValue( x=> x ="")
                      
                    }, 10);
                  }}
                  className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                    active
                      ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                      : " "
                  }`}
                >
                  <IoCalendarNumberSharp className="w-6 h-6 mb-1 " />
                  Date
                </div>
              )}
            </Menu.Item>
          </DropdownGlobalListComponent>
          <ButtonComponent
            handleClick={() => {
              modal.customerId = customerInfo.id.toString();
              modal.onOpen();
            }}
            label={"Ajouter"}
            labelClassName="text-[17px]  "
            className="bg-[#ffffff56]   ml-4"
          />
        </div>}
      </div>
    );
  }
}
/*
 */
export default ClientShow;

function ItemGestion({ item, indexType, handleClick = () => {} }) {
  /*   INPROGRESS,
  ISVALIDATE,
  ISFINISH */
  let type = {
    border: "",
    color: "",
    label: "",
  };
  switch (item.type) {
    case "INPROGRESS":
      type = {
        border: "border-amber-500 ",
        color: "text-amber-500 ",
        label: "En cours de validation de la proforma",
      };
      break;
    case "ISVALIDATE":
      type = {
        border: "border-green-500 ",
        color: "text-green-500 ",
        label: "Proforma validée",
      };
      break;
    case "ISFINISH":
      type = {
        border: "border-teal-500 ",
        color: "text-teal-500 ",
        label: "Projet terminé",
      };
      break;

    default:
      break;
  }
  return indexType == 0 ? (
    <div className={`min-w-[160px] h-[200px] flex m-1 mx-4`}>Loading</div>
  ) : (
    <div
      onClick={handleClick}
      className="flex cursor-pointer w-full hover:bg-[#ffffff0a]  flex-1 min-h-[40px] items-center  text-[15px] mt-2    pb-[9px]  text-[#ffffff82]  border-b-[1px] border-white border-opacity-10  "
    >
      <div className="flex-1 pt-2 ">
        <div
          className={`flex flex-col border-l-[4px]  ${type.border} pl-3   leading-[1rem]`}
        >
          <p className="text-white text-[14.5px] font-bold mt-2  line-clamp-1">
            {" "}
            {item.name}
          </p>
          <span className="text-[14px] mt-[7px] mb-[1px] line-clamp-1">
            {daysFr(`${item.createdAt}`)}
          </span>
          <span className={`text-[12px] ${type.color} mb-1  line-clamp-1`}>
            {" "}
            {type.label}
          </span>
        </div>
      </div>

      <div className=" w-[25px] line-clamp-1">
        {" "}
        <BiSolidRightArrow className="w-[10px] h-[10px] font-bold text-white cursor-pointer " />
      </div>
    </div>
  );
}













function ItemGestionShimmer() {
 
  return (
    <div
   
    className="flex cursor-pointer w-full  rounded-md  bg-gradient-to-r    from-[#ffffff11]   to-[#ffffff08]     flex-1 min-h-[40px] items-center  text-[15px] mt-3    pb-[9px]  text-[#ffffff82]   "
  >
    <div className="flex-1 pt-2 ">
      <div
        className={`flex flex-col     pl-4   leading-[1rem]`}
      >
        <p className=" p-[6px] max-w-[160px]  rounded-md animate-pulse duration-100    bg-[#ffffff1f]  text-[14.5px] font-bold mt-2  line-clamp-1">
          {" "}
         
        </p>
        <span className="text-[14px] p-1 max-w-[340px] rounded-md  animate-pulse duration-100    bg-[#ffffff1f]  mt-[7px] mb-[1px] line-clamp-1">
        
        </span>
        <span className={`text-[12px]  mt-2  mb-1 p-1 max-w-[400px] rounded-md  animate-pulse duration-100    bg-[#ffffff1f]  line-clamp-1`}>
          {" "}
     
        </span>
      </div>
    </div>

    
  </div>
  )
}
