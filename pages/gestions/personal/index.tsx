import React, { useState, useEffect } from "react";
import {
  IoIosArrowForward,
  IoIosNotifications,
  IoIosPeople,
  IoIosRefresh,
  IoMdClose,
} from "react-icons/io";
import ButtonComponent from "../../../components/UI/ButtonComponent";
import InputComponent from "../../../components/UI/InputComponent";
import { PiListBulletsFill } from "react-icons/pi";
import FolderComponent from "../../../components/UI/FolderComponent";
import { HiFolder } from "react-icons/hi";
import { BiSolidDashboard, BiSortDown } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import { useNewClientModal } from "../../../utils/use-new-client-modal";
import { fetchAllCustomer } from "../../../services/customerModel";
import { useNewProjectModal } from "../../../utils/use-new-project-modal";
import { addNewFolder, fetchAllFolder } from "../../../services/folderService";
import { daysFr } from "../../../utils/helpers";
import { FiMoreHorizontal } from "react-icons/fi";
import DropdownGlobalListComponent from "../../../components/menu/DropdownGlobalListComponent";
import { Menu } from "@headlessui/react";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { MdFolder } from "react-icons/md";

function Personal(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [indexView, setIndexView] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const [modalView, setModalView] = useState(false);
  const [customers, setCustomers] = useState<Folder[]>([]);
  const [customersFiltered, setCustomersFiltered] = useState<Folder[]>([]);
  const fetch = async () => {
    const datas = await fetchAllFolder("PERSONAL");
    setCustomers(datas);
    setCustomersFiltered(datas);
    setIsLoading(false);
  };
  useEffect(() => {
    /*  (async () => {
  
    })(); */
    fetch();

    return () => {};
  }, []);

  useEffect(() => {
    const datasFilter = customers.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCustomersFiltered(datasFilter);
  }, [searchValue]);

  return (
    <>
      {!isLoading && (
        <div className="flex w-full h-full overflow-x-hidden select-none">
          {modalView && AddNewFolder()}
          <div className="flex flex-col w-full h-full ">
            {SearchElement()}
            <div className="flex  w-auto min-h-[40px] mt-4 mr-24 space-x-8   overflow-x-scroll text-sm border-b-2 border-white border-opacity-10 ml-[70px] no-scrollbar ">
              <div
                onClick={() => {
                  setIndexView(0);
                }}
                className={`flex cursor-pointer items-center py-2 space-x-2 text-[17px] ${
                  indexView == 0
                    ? "border-b-2 border-[#9a9768] border-opacity-100"
                    : "border-b-2 border-opacity-0 border-white "
                } `}
              >
                {" "}
                <BiSolidDashboard className="w-6 h-6" />{" "}
                <span>Grandes icônes</span>
              </div>
              <div
                onClick={() => {
                  setIndexView(1);
                }}
                className={`flex cursor-pointer items-center py-2 space-x-2 text-[17px] ${
                  indexView == 1
                    ? "border-b-2 border-[#9a9768] border-opacity-100"
                    : "border-b-2 border-opacity-0 border-white "
                } `}
              >
                {" "}
                <PiListBulletsFill className="w-6 h-6" /> <span>Liste</span>
              </div>
            </div>
            {indexView == 1 ? (
              <div className="flex w-auto min-h-[40px] text-[15px] mt-4   mr-40 items-end  text-[#ffffff6f]  border-b-2 border-white border-opacity-10 ml-24 no-scrollbar ">
                <div className=" lg:w-[350px] w-[150px]">CLIENT</div>
                <div className="flex-1 w-auto">PROFILE</div>
                <div className=" w-[330px]">DATE DE CREATION</div>
              </div>
            ) : null}

            <div
              className={` ${
                indexView == 0
                  ? "flex flex-row  px-6 ml-12    justify-start overflow-scroll md:items-start   "
                  : "flex-col  px-8 pr-0  mr-40 ml-16  overflow-x-scroll"
              } flex-wrap  w-auto no-scrollbar `}
            >

{      !isLoading && customersFiltered!.length ==0 && 


 
<div className="flex flex-col items-center justify-center w-full m-auto  opacity-30 h-[570px] mr-[65px]">
<p className="mb-2 font-bold opacity-90 text-md" >Aucun {searchValue.length == 0 ? "résultat" : "résultat"} </p>

{ searchValue.length == 0 && 
<>
 

<p className="text-sm opacity-70 font-light leading-[17px]">Ce fichier ne contient aucun dossier,</p>
   <p className="text-sm opacity-70 font-light leading-[17px]">veuillez cliquer sur le bouton "Ajouter"</p>
   <p className="text-sm opacity-70 font-light leading-[17px]">pour en créer un.</p>
</>

}

</div>
 

}

{isLoading ? (
              <>
                {" "}

                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32].map(i=>(   <ItemGestionShimmer key={i}   />))}
               
                
              </>
            ) : 
            customersFiltered.map((item) => (
              <ItemGestion
                key={item.id}
                handleClick={() => {
                  const data: any = item;

                  router.push({
                    pathname: "/gestions/provider/foldershow",
                    query: data,
                  });
                }}
                indexType={indexView}
                item={item}
              />
            ))
            }


             
            </div>
          </div>
        </div>
      )}
    </>
  );

  function AddNewFolder() {
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center pb-0 transition bg-black/40 ">
        <div
          onClick={() => {
            setModalView(false);
            setInputValue("");
          }}
          className="absolute inset-0 z-30 flex items-center justify-center transition "
        ></div>
        <div className="p-4 py-0 bg-[#323232] z-50 w-[434px] px-7 flex flex-col items-center justify-center text-white rounded-xl">
          <IoMdClose
            onClick={() => {
              setModalView(false);
            }}
            className="w-[24px] h-[24px] opacity-60 mr-0 mt-5 cursor-pointer self-end"
          />

          <h2 className="font-bold text-[18px] mb-6 ">
            Ajouter un nouveau dossier
          </h2>

          <div className="w-full px-2">
            <InputComponent
              key={1}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              label="Nom du dossier"
              labelClassName="text-white/40 text-[16px]"
              placeholder="Veuillez entrer le nom du dossier"
              className="rounded-xl mb-0 h-[35px] text-[12px] font-light border-opacity-50"
            />
          </div>

          <div className="flex items-center justify-center w-full gap-4 mb-4">
            <ButtonComponent
              key={2}
              handleClick={() => {
                setInputValue("");
                setModalView(false);
              }}
              label={"Annuler"}
              className="  mt-6 mb-4 shadow-xl  bg-[#484848] border-none  "
            />
            {inputValue.trim().length >= 2 && (
              <ButtonComponent
                key={3}
                handleClick={async () => {
                  const dataNew: Folder = {
                    name: inputValue,
                    type: "PERSONAL",
                  };
                  const data = await addNewFolder(dataNew);
                  setInputValue("");
                  setModalView(false);
                  setIsLoading(true);
                  fetch();
                }}
                label={"Ajouter"}
                className="  mt-6 mb-4 shadow-xl  bg-[#9a9768] border-none  "
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  function SearchElement() {
    return (
      <div className="w-full relative min-h-[130px] px-14   pr-24 flex items-end pb-[17px]  justify-between   border-b-[1px]  border-white border-opacity-10">
        <IoIosArrowBack
          onClick={() => {
            router.back();
          }}
          className="absolute w-8 h-8 font-bold cursor-pointer bottom-[22px] left-3"
        />
        <div className="flex items-center space-x-2">
          <h3 className="ml-4 text-4xl font-bold">Personnels</h3>
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
            onChange={(e) => {
              setSearchValue((x) => (x = e.target.value));
            }}
          placeholder="Rechercher"
          className="rounded-full w-full pl-[42px] z-20 h-[40px]   font-light pr-8   border-[#5A5A5A]  "
        /> 
     </div>
        
          
          <ButtonComponent
            key={5}
            label={"Ajouter"}
            handleClick={() => {
              setModalView(true);
            }}
            className="bg-[#9a9768] border-none min-h-[35px] min-w-[110px] font-semibold ml-10"
          />
        </div>
      </div>
    );
  }
}
/*
 */
export default Personal;

function ItemGestion({ item, indexType, handleClick = () => {} }) {
  return indexType == 0 ? (
    <div
      onClick={handleClick}
      className={`min-w-[160px] h-[200px]   flex m-1 mx-4 cursor-pointer`}
    >
      <FolderComponent key={item} item={item} />
    </div>
  ) : (
    <div
      onClick={handleClick}
      className="flex w-full relative flex-1 cursor-pointer min-h-[40px] items-center  text-[15px] mt-2    py-2 text-[#ffffff6f]  border-b-2 border-white border-opacity-10 x-40"
    >
       <IoIosArrowForward className="absolute right-0 w-6 h-6" />
      <div className="lg:w-[350px] w-[150px] ">
        <div className="flex items-center space-x-2">
          {" "}
          <HiFolder className={`min-w-[45px] h-[45px] text-white `} />
          <div className="flex flex-col leading-[1rem]">
            <p className="text-white text-[13.5px]  line-clamp-1">
              {" "}
              {item.name.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex flex-row flex-1 w-auto opacity-40 ">
        <div className="bg-[#929292] h-7  border-black border-2  w-7 flex justify-center items-center rounded-full">
          <img className="h-4 " src="/images/HommePM.png" />
        </div>
        <div className="bg-[#929292] h-7  absolute z-20 left-5 border-black border-2  w-7 flex justify-center items-center rounded-full">
          <img className="h-4 " src="/images/Femme.jpg" />
        </div>
        <div className="bg-[#929292] h-7  z-30 border-black border-2 left-10 absolute  w-7 flex justify-center items-center rounded-full">
          <img className="h-4 " src="/images/HommePM.png" />
        </div>
        <div className="bg-[#929292] h-7  z-30 border-black border-2 left-14 absolute  w-7 flex justify-center items-center rounded-full">
        <FiMoreHorizontal className="w-4 h-4 " />
        </div>
        
      </div>
       
      <div className=" w-[295px] line-clamp-1 mr-8">{daysFr(item.createdAt)}</div>
    </div>
  );
}





function ItemGestionShimmer() { 
  return(
    <div
      
      className={`min-w-[160px] h-[200px]  mt-2  flex m-1 ml-[20px]  mx-4 cursor-pointer`}
    >
       <div className={`relative  flex flex-col select-none items-center  animate-pulse  min-h-full mr-1 cursor-pointer overflow-ellipsis`} >
            <MdFolder className={`min-w-[150px] h-[150px]  text-[#ffffff1f] `} />
            <p className="w-[120px] absolute top-[140px] animate-pulse duration-100 xl:w-[110px] mr-[15px] bg-[#ffffff1f] p-2 rounded-full ">
          {" "}
        </p>
        </div>
    </div>
  )
}