import React, { useEffect, useState } from "react";
import { HiFolder } from "react-icons/hi";
import {
  IoIosClose,
  IoIosDoneAll,
  IoIosNotifications,
  IoIosSearch,
  IoMdClose,
  IoMdRefresh,
  IoMdTrash,
} from "react-icons/io";

import InputComponent from "../../components/UI/InputComponent";
import FolderComponent from "../../components/UI/FolderComponent";
import { useNewClientModal } from "../../utils/use-new-client-modal";
import { useRouter } from "next/router";
import { fetchAllCustomer } from "../../services/customerModel";
import { fetchAllProject, finishProject, validateProforma } from "../../services/projectService";
import { daysFr } from "../../utils/helpers";
import { MdKeyboardArrowDown, MdRestore } from "react-icons/md";
import { Menu } from "@headlessui/react";
import { motion } from "framer-motion";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  archivePlanningItem,
  fetchAllWeekPlanningItem,
  fetchAllWeekPlanningItemDashboard,
  todayAllPlanningItem,
  todayDashboardAllPlanningItem,
  togglePlanningItem,
} from "../../services/planningItemService";
import DropdownComponent from "../../components/menu/DropdownComponent";
import { RiFileEditLine } from "react-icons/ri";
import DropdownDashboardProject from "../../components/menu/DropdownDashboardProject";
import { FiEdit } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import useMenuStore from "../../utils/MenuStore";
import { LiaFileAltSolid } from "react-icons/lia";
import DropdownProjectFilterItem from "../../components/menu/DropdownProjectFilterItem";
import { AiOutlineFileDone } from "react-icons/ai";
import { useGlobalModal } from "../../utils/use-global-modal";
import ButtonComponent from "../../components/UI/ButtonComponent";
import { BsCheck2Circle } from "react-icons/bs";
import { addNewTransation } from "../../services/transactionService";
import FolderComponentNew from "../../components/UI/FolderComponentNew";
import GlobalPayment from "../../components/Modals/global-modal-payment";
import { fetchUser } from "../../services/userService";
import { useGlobalPayment } from "../../utils/use-global-payment";

function Dashboard(props) {
  const [dataUser, setDataUser] = useState(null)
  const [modalView, setModalView] = useState(false);
  const [modalViewContent, setModalViewContent] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const menuIndex = useMenuStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingConfirmBtn, setIsLoadingConfirmBtn] = useState(false);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [modalPayment, setModalPayment] = useState(true);
  const [showWeeksPlanning, setShowWeeksPlanning] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const modal = useNewClientModal();
  const [search, setSearch] = useState("");
  const [take, setTake] = useState(15);
  const [skip, setSkip] = useState(0);
  const [pageNumber, SetPageNumber] = useState(1);
  const [statutSort, setStatutSort] = useState<"" | "INPROGRESS" | "ISVALIDATE" | "ISFINISH">("");
  const [searchProject, setSearchProject] = useState("");
  const router = useRouter();
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersFiltered, setCustomersFiltered] = useState<any[]>([]);
  const [projectsFiltered, setProjectsFiltered] = useState<any>();
  const [projects, setProjects] = useState<any>();

  const [todayDatas, setTodayDatas] = useState<any[]>([]);
  const [weeksDatas, setWeeksDatas] = useState<PlanningItem[]>([]);
  const [transactionModal, setTransactionModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>(null);
  const [typeTransaction, setTypeTransaction] = useState("");
  const [currentNotifId, setCurrentNotifId] = useState("");
  const modalGlobal = useGlobalModal()
  const globalPayment = useGlobalPayment();

    
  useEffect(() => {
    
    
    (async ()=>{
      const dataUser = await fetchUser();

     
      setDataUser(x=> x = dataUser)

 
if(dataUser?.error?.message.includes("authentification")){
  menuIndex.setMenuIndex(-1);
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("userId");
  router.replace({
    pathname: "/",
  });
 modal.onClose();
  return;
}
 


      const dateEdit = new Date(Date.now())
      dateEdit.setHours(24 *7,0,0)
      const compareDateIsGreat = new Date(dataUser?.subscribe?.endAt) > dateEdit;
      
      if(!compareDateIsGreat && !globalPayment.isOpen ){
  
  setTimeout(() => {
    setModalView(true);
    setModalViewContent("Prolongez votre expérience avec nous en renouvelant votre abonnement")
  }, 3000);
  setTimeout(() => {
    setModalView(x=> x = false)
  }, 7000);
}

    
      
    
     })()
  
   
     return () => {
       
     }
   }, [])
  useEffect(() => {
    (async () => {
      const datasToday = await todayDashboardAllPlanningItem();
      setTodayDatas((x) => (x = datasToday));
      const dataProjects = await fetchAllProject(searchProject,statutSort,take,skip);
      setProjects(data => data = dataProjects);
      setCustomers(await fetchAllCustomer("last"));
      setIsLoading(false);
      setIsLoadingProject(false);

      let date_today = new Date();

      let first_day_of_the_week = new Date(
        date_today.setDate(date_today.getDate() - date_today.getDay() + 1)
      );

      let last_day_of_the_week = new Date(
        date_today.setDate(date_today.getDate() - date_today.getDay() + 6 + 1)
      );
      const datasWeeks = await fetchAllWeekPlanningItemDashboard(
        first_day_of_the_week,
        last_day_of_the_week
      );

      setWeeksDatas(datasWeeks);
    })();

    return () => {};
  }, []);

  useEffect(() => {
    const datasFilter = customers.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setCustomersFiltered(datasFilter);

   (async()=>{
    const values = await fetchAllProject(search,"",100,0)
   setProjectsFiltered(values);
   

   
     
   })()
  }, [search]);


  const emptyRow = (
    <>
      <div className="flex h-[45px]  mb-3 duration-75 p-4  items-center text-white text-opacity-40 text-sm px-7 bg-[#2c2c2cb6] rounded-[20px]">
        
      <p className="w-[120px] xl:w-[170px] bg-[#FFFFFF11] p-[10px] rounded-full mr-8">
        
          {" "}
        </p>
        <div className="pr-10">
        <p className="w-[160px] 2xl:w-[240px] line-clamp-1  r-10  bg-[#FFFFFF11] p-[10px] rounded-full ">
          {" "}
        </p>
        </div>
        <p
          className={` w-[170px] 2xl:w-[175px]  ml-1   duration-200  bg-[#FFFFFF11]   mr-10 text-white bg-color-red-400 p-[10px] rounded-full items-center text-center flex justify-center text-opacity-100`}
        >
          {" "}
        </p>
        <p className="w-[200px] bg-[#FFFFFF11] p-[10px] rounded-full"></p>
      </div>
    </>
  );
  return (
    <div className="flex flex-col h-full select-none min-w-max">
        {modalView && InfoView()}
      {SearchElement()}
      
      {transactionModal && modalTransaction(currentProject)}
      <div className="absolute bottom-12 right-12  w-[315px]">
        {/* 
        <ItemNotif2 key={1} title={"Nouvelle mise à jour"} content=""/>
      <ItemNotif key={1} title={"Nouvelle mise à jour"} content=""/> 
      */}
      </div>
      <div className="flex-1 overflow-scroll no-scrollbar">
        <div className="flex flex-col flex-1 h-full px-12 pt-6">
          <h1 className="text-[44px] font-bold ml-10 mb-0">Clients récents </h1>

          <div className="flex lg:flex-row mb-3 ml-6 min-h-[200px]   no-scrollbar overflow-x-auto ">
            {isLoading ? (
              <>
                {" "}
                <FolderComponent key={1} isShimmer={true} />
                <FolderComponent key={2} isShimmer={true} />
                <FolderComponent key={3} isShimmer={true} />
                <FolderComponent key={4} isShimmer={true} />
                <FolderComponent key={5} isShimmer={true} />
              </>
            ) : (
              <>
                {customers.slice(0, 4).map((item) => (
                  <FolderComponent
                    key={item.id}
                    item={item}
                    handleClick={() => {
                      router.push({
                        pathname: "/gestions/client/clientshow",
                        query: item as any,
                      });
                    }}
                  />
                ))}
                {/*   {[1,2,3,4].slice(0,
                customers.length >= 4 ? 0 : customers.length == 3 ? 1 : customers.length == 2 ? 2 : customers.length == 1 ? 3 :  customers.length == 0 ? 4 : 4
                ).map(item=>(
                <FolderComponent key={item}   item={{name:""}}  className="cursor-default opacity-30" />

              ))} */}

                <FolderComponentNew
                  key={100}
                  handleClick={async() => {
                    setShowNotif((x) => (x = false));
                    setSearch("");
                    modal.onOpen();
                    setShowSearchInput((x) => (x = false));
                    setSearchProject("")
setStatutSort("");
                    setSkip(x=> x = 0)
                    SetPageNumber(x=> x = 1)
                    const dataProjects = await fetchAllProject("","",take,skip);
                    setProjects(data => data = dataProjects);
                     setIsLoadingProject(x=> x = false)
                  }}
                  item={{ name: "NOUVEAU" }}
                  add={true}
                  className="opacity-30"
                />
              </>
            )}
          </div>
          <div className="flex-1 flex flex-col  h-full p-8 pt-7 pb-4 bg-gradient-to-b overflow-scroll no-scrollbar from-[#1f1f1f]   to-[#111111] rounded-xl">
            <div className="flex flex-col flex-1 h-full overflow-hidden">
              <div className="flex justify-between mt-0 mb-2">
                <h3 className="w-auto pb-0 mx-4 mt-2 text-[22px] leading-0 font-semibold border-b-2 border-[#9a9768] ">
                  Projets récents
                </h3>
                <div className="flex items-center justify-center gap-4">
                  {/*  */}
                  {showSearchInput && (
                    <motion.div
                      initial={{
                        width: "70px",
                      }}
                      transition={{ duration: 0.5 }}
                      animate={{
                        width: showSearchInput ? "350px" : "40px",
                      }}
                      style={{}}
                    >
                      <div className="relative w-full mr-6 h-[40px] ">
                        <svg
                          className="absolute z-10 top-2 left-3"
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

                        <div className="relative ">
                          <InputComponent
                             value={searchProject}
                             onChange={async (e) => {
                             // setIsLoadingProject(xr=> xr = true)
                              setSearchProject(e.target.value)
                            
                            if (e.target.value.length >=3) {
                              setSkip(x=> x = 0)
                              SetPageNumber(x=> x = 1)
                              const dataProjects = await fetchAllProject(e.target.value,statutSort,take,skip);
                              setProjects(data => data = dataProjects);
                               setIsLoadingProject(x=> x = false)
                               
                               
                            }else{
                              setSkip(x=> x = 0)
                              SetPageNumber(x=> x = 1)
                              const dataProjects = await fetchAllProject("",statutSort,take,skip);
                              setProjects(data => data = dataProjects);
                               setIsLoadingProject(x=> x = false)
                            }
                         
                              
                             }
                            }
                            placeholder="Rechercher"
                            className={`rounded-full  pl-[42px]  z-0 h-[40px]   font-light pr-8 border-[1px] border-[#5A5A5A] opacity-50  `}
                          />
                        </div>
                        <IoIosClose
                          onClick={async() => {
                            setShowSearchInput((x) => (x = !x));
                            setSearchProject("")
setStatutSort("");
                            setSkip(x=> x = 0)
                            SetPageNumber(x=> x = 1)
                            const dataProjects = await fetchAllProject("","",take,skip);
                            setProjects(data => data = dataProjects);
                             setIsLoadingProject(x=> x = false)
                          }}
                          className="absolute z-0 w-8 h-8 opacity-50 cursor-pointer top-1 right-3"
                        />
                      </div>
                    </motion.div>
                  )}
                  {/*  */}

                  {!showSearchInput && (
                    <svg
                      onClick={() => {
                        setShowSearchInput((x) => (x = !x));
                      }}
                      className="cursor-pointer"
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_435_618)">
                        <path
                          d="M30 29L26.1333 25.1333M28.2222 20.1111C28.2222 24.0385 25.0385 27.2222 21.1111 27.2222C17.1838 27.2222 14 24.0385 14 20.1111C14 16.1838 17.1838 13 21.1111 13C25.0385 13 28.2222 16.1838 28.2222 20.1111Z"
                          stroke="#595959"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_435_618"
                          x="0"
                          y="0"
                          width="44"
                          height="44"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                         
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="1" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_435_618"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_435_618"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  )}

                  <div className="relative">
                    <DropdownProjectFilterItem
                      comp={
                        <svg
                          onClick={() => {}}
                          className="cursor-pointer"
                          width="139"
                          height="44"
                          viewBox="0 0 139 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="139"
                            height="44"
                            rx="22"
                            fill="#212121"
                          />
                          <path
                            d="M40 15C39.7348 15 39.4804 15.1054 39.2929 15.2929C39.1054 15.4804 39 15.7348 39 16C39 16.2652 39.1054 16.5196 39.2929 16.7071C39.4804 16.8947 39.7348 17 40 17C40.2652 17 40.5196 16.8947 40.7071 16.7071C40.8946 16.5196 41 16.2652 41 16C41 15.7348 40.8946 15.4804 40.7071 15.2929C40.5196 15.1054 40.2652 15 40 15ZM37.17 15C37.3766 14.4145 37.7597 13.9074 38.2666 13.5488C38.7735 13.1902 39.3791 12.9976 40 12.9976C40.6209 12.9976 41.2265 13.1902 41.7334 13.5488C42.2403 13.9074 42.6234 14.4145 42.83 15H50C50.2652 15 50.5196 15.1054 50.7071 15.2929C50.8946 15.4804 51 15.7348 51 16C51 16.2652 50.8946 16.5196 50.7071 16.7071C50.5196 16.8947 50.2652 17 50 17H42.83C42.6234 17.5855 42.2403 18.0926 41.7334 18.4512C41.2265 18.8099 40.6209 19.0025 40 19.0025C39.3791 19.0025 38.7735 18.8099 38.2666 18.4512C37.7597 18.0926 37.3766 17.5855 37.17 17H36C35.7348 17 35.4804 16.8947 35.2929 16.7071C35.1054 16.5196 35 16.2652 35 16C35 15.7348 35.1054 15.4804 35.2929 15.2929C35.4804 15.1054 35.7348 15 36 15H37.17ZM46 21C45.7348 21 45.4804 21.1054 45.2929 21.2929C45.1054 21.4804 45 21.7348 45 22C45 22.2652 45.1054 22.5196 45.2929 22.7071C45.4804 22.8947 45.7348 23 46 23C46.2652 23 46.5196 22.8947 46.7071 22.7071C46.8946 22.5196 47 22.2652 47 22C47 21.7348 46.8946 21.4804 46.7071 21.2929C46.5196 21.1054 46.2652 21 46 21ZM43.17 21C43.3766 20.4145 43.7597 19.9074 44.2666 19.5488C44.7735 19.1902 45.3791 18.9976 46 18.9976C46.6209 18.9976 47.2265 19.1902 47.7334 19.5488C48.2403 19.9074 48.6234 20.4145 48.83 21H50C50.2652 21 50.5196 21.1054 50.7071 21.2929C50.8946 21.4804 51 21.7348 51 22C51 22.2652 50.8946 22.5196 50.7071 22.7071C50.5196 22.8947 50.2652 23 50 23H48.83C48.6234 23.5855 48.2403 24.0926 47.7334 24.4512C47.2265 24.8099 46.6209 25.0025 46 25.0025C45.3791 25.0025 44.7735 24.8099 44.2666 24.4512C43.7597 24.0926 43.3766 23.5855 43.17 23H36C35.7348 23 35.4804 22.8947 35.2929 22.7071C35.1054 22.5196 35 22.2652 35 22C35 21.7348 35.1054 21.4804 35.2929 21.2929C35.4804 21.1054 35.7348 21 36 21H43.17ZM40 27C39.7348 27 39.4804 27.1054 39.2929 27.2929C39.1054 27.4804 39 27.7348 39 28C39 28.2652 39.1054 28.5196 39.2929 28.7071C39.4804 28.8947 39.7348 29 40 29C40.2652 29 40.5196 28.8947 40.7071 28.7071C40.8946 28.5196 41 28.2652 41 28C41 27.7348 40.8946 27.4804 40.7071 27.2929C40.5196 27.1054 40.2652 27 40 27ZM37.17 27C37.3766 26.4145 37.7597 25.9074 38.2666 25.5488C38.7735 25.1902 39.3791 24.9976 40 24.9976C40.6209 24.9976 41.2265 25.1902 41.7334 25.5488C42.2403 25.9074 42.6234 26.4145 42.83 27H50C50.2652 27 50.5196 27.1054 50.7071 27.2929C50.8946 27.4804 51 27.7348 51 28C51 28.2652 50.8946 28.5196 50.7071 28.7071C50.5196 28.8947 50.2652 29 50 29H42.83C42.6234 29.5855 42.2403 30.0926 41.7334 30.4512C41.2265 30.8099 40.6209 31.0025 40 31.0025C39.3791 31.0025 38.7735 30.8099 38.2666 30.4512C37.7597 30.0926 37.3766 29.5855 37.17 29H36C35.7348 29 35.4804 28.8947 35.2929 28.7071C35.1054 28.5196 35 28.2652 35 28C35 27.7348 35.1054 27.4804 35.2929 27.2929C35.4804 27.1054 35.7348 27 36 27H37.17Z"
                            fill="white"
                          />
                          <path
                            d="M66.075 27V16.101H73.0572V17.7561H68.0494V20.715H72.5782V22.3701H68.0494V27H66.075ZM74.3212 27V18.8258H76.2477V27H74.3212ZM75.2898 17.6656C74.9846 17.6656 74.7221 17.5645 74.5021 17.3623C74.2822 17.1565 74.1722 16.9099 74.1722 16.6225C74.1722 16.3316 74.2822 16.085 74.5021 15.8828C74.7221 15.677 74.9846 15.5741 75.2898 15.5741C75.5984 15.5741 75.861 15.677 76.0774 15.8828C76.2974 16.085 76.4073 16.3316 76.4073 16.6225C76.4073 16.9099 76.2974 17.1565 76.0774 17.3623C75.861 17.5645 75.5984 17.6656 75.2898 17.6656ZM79.7056 16.101V27H77.7791V16.101H79.7056ZM85.3189 18.8258V20.3158H80.6197V18.8258H85.3189ZM81.7799 16.8673H83.7064V24.5413C83.7064 24.8003 83.7454 24.999 83.8234 25.1374C83.905 25.2722 84.0115 25.3644 84.1428 25.4141C84.274 25.4638 84.4195 25.4886 84.5791 25.4886C84.6998 25.4886 84.8097 25.4797 84.9091 25.462C85.012 25.4443 85.09 25.4283 85.1432 25.4141L85.4679 26.9202C85.365 26.9557 85.2177 26.9947 85.0262 27.0373C84.8381 27.0798 84.6075 27.1047 84.3343 27.1118C83.8518 27.1259 83.4172 27.0532 83.0305 26.8936C82.6438 26.7304 82.3369 26.4785 82.1098 26.1379C81.8863 25.7973 81.7763 25.3715 81.7799 24.8606V16.8673ZM86.4804 27V18.8258H88.3484V20.1881H88.4335C88.5825 19.7163 88.838 19.3526 89.1999 19.0972C89.5653 18.8382 89.9822 18.7087 90.4505 18.7087C90.5569 18.7087 90.6758 18.714 90.8071 18.7246C90.9419 18.7317 91.0536 18.7442 91.1423 18.7619V20.534C91.0607 20.5057 90.9312 20.4808 90.7538 20.4595C90.58 20.4347 90.4115 20.4223 90.2483 20.4223C89.897 20.4223 89.5813 20.4986 89.301 20.6511C89.0243 20.8001 88.8061 21.0077 88.6464 21.2738C88.4868 21.5399 88.4069 21.8467 88.4069 22.1944V27H86.4804ZM95.2548 27.1597C94.4353 27.1597 93.7275 26.9894 93.1314 26.6488C92.539 26.3046 92.0831 25.8186 91.7637 25.1906C91.4444 24.5591 91.2848 23.8158 91.2848 22.9608C91.2848 22.1199 91.4444 21.382 91.7637 20.7469C92.0866 20.1083 92.5372 19.6116 93.1155 19.2568C93.6938 18.8985 94.3732 18.7193 95.1537 18.7193C95.6575 18.7193 96.1329 18.8009 96.58 18.9641C97.0305 19.1238 97.4279 19.3721 97.772 19.7092C98.1197 20.0462 98.3929 20.4755 98.5916 20.997C98.7903 21.515 98.8896 22.1323 98.8896 22.849V23.4397H92.1895V22.1412H97.0429C97.0394 21.7722 96.9596 21.4441 96.8035 21.1567C96.6474 20.8658 96.4292 20.6369 96.1489 20.4702C95.8722 20.3034 95.5493 20.2201 95.1803 20.2201C94.7865 20.2201 94.4406 20.3158 94.1426 20.5074C93.8446 20.6955 93.6122 20.9438 93.4454 21.2525C93.2822 21.5576 93.1989 21.8929 93.1953 22.2583V23.3918C93.1953 23.8672 93.2822 24.2753 93.4561 24.6158C93.6299 24.9529 93.8729 25.2119 94.1852 25.3928C94.4974 25.5702 94.8628 25.6589 95.2814 25.6589C95.5617 25.6589 95.8154 25.6199 96.0425 25.5418C96.2695 25.4602 96.4664 25.3414 96.6332 25.1853C96.7999 25.0292 96.9259 24.8358 97.011 24.6052L98.8098 24.8074C98.6962 25.2828 98.4798 25.6979 98.1605 26.0527C97.8448 26.404 97.4403 26.6771 96.9472 26.8723C96.454 27.0639 95.8899 27.1597 95.2548 27.1597ZM106.53 20.9864L104.774 21.178C104.725 21.0006 104.638 20.8338 104.514 20.6777C104.393 20.5216 104.23 20.3957 104.024 20.2999C103.818 20.2041 103.566 20.1562 103.268 20.1562C102.867 20.1562 102.53 20.2431 102.257 20.417C101.987 20.5908 101.854 20.8161 101.858 21.0928C101.854 21.3305 101.941 21.5239 102.119 21.6729C102.3 21.8219 102.598 21.9443 103.013 22.0401L104.407 22.3381C105.18 22.5049 105.755 22.7692 106.131 23.1311C106.511 23.4929 106.703 23.9666 106.706 24.552C106.703 25.0664 106.552 25.5205 106.254 25.9144C105.959 26.3046 105.549 26.6097 105.024 26.8297C104.499 27.0497 103.896 27.1597 103.215 27.1597C102.214 27.1597 101.409 26.9503 100.799 26.5317C100.189 26.1095 99.825 25.5223 99.7079 24.7702L101.587 24.5892C101.672 24.9582 101.853 25.2367 102.129 25.4248C102.406 25.6128 102.766 25.7068 103.21 25.7068C103.667 25.7068 104.035 25.6128 104.311 25.4248C104.592 25.2367 104.732 25.0043 104.732 24.7276C104.732 24.4934 104.641 24.3001 104.46 24.1475C104.283 23.995 104.006 23.8779 103.63 23.7963L102.236 23.5036C101.452 23.3404 100.872 23.0654 100.496 22.6787C100.119 22.2885 99.9332 21.7953 99.9368 21.1993C99.9332 20.6955 100.07 20.2591 100.347 19.8901C100.627 19.5176 101.015 19.2302 101.512 19.028C102.012 18.8222 102.589 18.7193 103.242 18.7193C104.2 18.7193 104.953 18.9233 105.503 19.3313C106.057 19.7393 106.399 20.291 106.53 20.9864Z"
                            fill="white"
                          />
                        </svg>
                      }
                    >
                      
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={async () => {
                              setStatutSort("")
                              setSkip(x=> x = 0)
                              SetPageNumber(x=> x = 1)
                              const dataProjects = await fetchAllProject(searchProject,"",15,0);
                              setProjects(data => data = dataProjects);
                            }}
                            className={`  ${statutSort == "" ? "opacity-100" :"opacity-25"}
                             px-2 hover:opacity-100  py-[2px] flex  justify-start pl-3  items-center gap-2   text-[15px] cursor-pointer mx-2 ${
                              active
                                ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                                : " "
                            }`}
                          >
                           Par défaut
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={async () => {
                              setStatutSort("INPROGRESS")
                              setSkip(x=> x = 0)
                              SetPageNumber(x=> x = 1)
                              const dataProjects = await fetchAllProject(searchProject,"INPROGRESS",15,0);
                              setProjects(data => data = dataProjects);
                            }}
                            className={`  ${statutSort == "INPROGRESS" ? "opacity-100" :"opacity-25"}
                             px-2 hover:opacity-100  py-[2px] flex  justify-start pl-3  items-center gap-2   text-[15px] cursor-pointer mx-2 ${
                              active
                                ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                                : " "
                            }`}
                          >
                            
                           Projets en cours
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={async () => {
                              setStatutSort("ISVALIDATE")
                              setSkip(x=> x = 0)
                              SetPageNumber(x=> x = 1)
                              const dataProjects = await fetchAllProject(searchProject,"ISVALIDATE",15,0);
                              setProjects(data => data = dataProjects);
                            }}
                            className={`  ${statutSort == "ISVALIDATE" ? "opacity-100" :"opacity-25"} relative    px-2 hover:opacity-100  py-[2px] flex  justify-start pl-3  items-center gap-2   text-[15px] cursor-pointer mx-2 ${
                              active
                                ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                                : " "
                            }`}
                          >
 
                    
                          Projets
                            validés
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={async () => {
                              setStatutSort("ISFINISH")
                              setSkip(x=> x = 0)
                              SetPageNumber(x=> x = 1)
                              const dataProjects = await fetchAllProject(searchProject,"ISFINISH",15,0);
                              setProjects(data => data = dataProjects);
                            }}
                            className={`  ${statutSort == "ISFINISH" ? "opacity-100" :"opacity-25"}  px-2 hover:opacity-100    py-[2px] flex  justify-start pl-3  items-center gap-2   text-[15px] cursor-pointer mx-2 ${
                              active
                                ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                                : " "
                            }`}
                          >
                             
                            Projets terminés
                          </div>
                        )}
                      </Menu.Item>
                    </DropdownProjectFilterItem>
                  </div>
                </div>

                {/*   <IoMdRefresh
                  
                  onClick={async ()=>{
                    setIsLoading(true);

                    setTimeout(async() => {
                      const dataProjects = await fetchAllProject(searchProject
                      setProjects(data => data = dataProjects);
                      setCustomers(await fetchAllCustomer("last"));
                      setIsLoading(false);
                    }, 2000);
                   
                  }}
                  className="min-w-[25px] cursor-pointer h-[25px] opacity-50 font-bold mr-6" /> */}
              </div>
              <div className="flex p-2 mt-4 overflow-scroll text-[14px] no-scrollbar px-7">
                <p className="w-[150px] xl:w-[200px]">Date</p>
                <p className="w-[200px] 2xl:w-[280px]">Projet</p>
                <p className="w-[220px]">Statut</p>
                <p className="">Client</p>
              </div>

              <div className="flex flex-col flex-1 overflow-scroll no-scrollbar">
                {isLoadingProject  ? (
                  <>
                    <ItemProject key={301} isShimmer={true} />
                    <ItemProject key={302} isShimmer={true} />
                    <ItemProject key={303} isShimmer={true} />
                    <ItemProject key={304} isShimmer={true} />
                    <ItemProject key={305} isShimmer={true} />
                    <ItemProject key={306} isShimmer={true} />
                    <ItemProject key={307} isShimmer={true} />
                    <ItemProject key={308} isShimmer={true} />
                    <ItemProject key={309} isShimmer={true} />
                  </>
                ) : (
                  <>
              {projects?.totalPages > 0 ? projects.datas.map((item) => (
                      <ItemProject
                        key={item.createdAt.toString()}
                        item={item}
                        handleClick={() => {
                          router.push({
                            pathname: "/gestions/client/clientshow/projet",
                            query: item as any,
                          });
                        }}
                      />
                    )  ) : 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                      .slice(
                        0,
                        projects.length >= 10
                          ? 0
                          : projects.length == 7
                          ? 2
                          : projects.length == 6
                          ? 2
                          : projects.length == 5
                          ? 3
                          : projects.length == 4
                          ? 4
                          : projects.length == 3
                          ? 4
                          : projects.length == 2
                          ? 6
                          : projects.length == 1
                          ? 8
                          : projects.length == 0
                          ? 10
                          : 10
                      ) 
                      .map((item) => emptyRow)
                  /*   <div className="flex items-center justify-center flex-1 opacity-30 ">
                    <p className="font-bold">Aucun résultat</p>
                    </div> */
                    
                    }  
                   
 
                   { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                      .slice(
                        0,
                        projects.datas.length >= 8
                          ? 0
                          : projects.datas.length == 7
                          ? 1
                          : projects.datas.length == 6
                          ? 2
                          : projects.datas.length == 5
                          ? 3
                          : projects.datas.length == 4
                          ? 4
                          : projects.datas.length == 3
                          ? 5
                          : projects.datas.length == 2
                          ? 6
                          : projects.datas.length == 1
                          ? 7
                          : projects.datas.length == 0
                          ? 8
                          : 9
                      ) 
                      .map((item) => emptyRow)}
                    
                  
                  </>
                )}
              </div>
            </div>
          </div>
          

          {projects?.totalPages > 0 &&

<div className=" h-[45px] w-full flex mb-2 justify-center items-center">

<div className="flex items-center justify-center gap-2">
 

<div

onClick={async()=>{

if(pageNumber>1){
  setSkip(x=> x = (pageNumber-2) * take)
  SetPageNumber(x=> x = x-1)
  const dataProjects = await fetchAllProject(searchProject,statutSort,take,(pageNumber - 2 ) * take);
  setProjects(data => data = dataProjects);
   
}
  
}}
className={`${pageNumber>1 ? "cursor-pointer" :"" } `}>
 
 
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.8208 28.0068C23.7127 28.1102 23.5842 28.1923 23.4428 28.2482C23.3015 28.3042 23.1499 28.333 22.9968 28.333C22.8437 28.333 22.6922 28.3042 22.5508 28.2482C22.4094 28.1923 22.281 28.1102 22.1729 28.0068L14.4363 20.626C14.35 20.5438 14.2815 20.4462 14.2348 20.3387C14.1881 20.2313 14.1641 20.1161 14.1641 19.9998C14.1641 19.8835 14.1881 19.7683 14.2348 19.6608C14.2815 19.5534 14.35 19.4558 14.4363 19.3736L22.1729 11.9927C22.6291 11.5575 23.3646 11.5575 23.8208 11.9927C24.2769 12.428 24.2769 13.1296 23.8208 13.5648L17.0804 20.0042L23.8301 26.4436C24.2769 26.8699 24.2769 27.5805 23.8208 28.0068Z" fill="#878787"/>
</svg>
 </div>

 <p>{pageNumber}</p>/
 <p>{ searchProject == "" && statutSort == ""  ?  projects?.totalPages +0 : projects?.totalPages}</p>
 
<div
onClick={async()=>{

if(pageNumber <  (searchProject == "" && statutSort == "" ?  projects?.totalPages+0 :  projects?.totalPages)){
setSkip(x=> x = (pageNumber+1) * take)
SetPageNumber(x=> x = x+1)
const dataProjects = await fetchAllProject(searchProject,statutSort,take,(pageNumber) * take);
setProjects(data => data = dataProjects);
}


}}

className={`${pageNumber < (searchProject == "" && statutSort == "" ?  projects?.totalPages+0 :  projects?.totalPages) ? "cursor-pointer" :"" } `}>
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.1792 11.9932C16.2873 11.8898 16.4158 11.8077 16.5572 11.7518C16.6985 11.6958 16.8501 11.667 17.0032 11.667C17.1563 11.667 17.3078 11.6958 17.4492 11.7518C17.5906 11.8077 17.719 11.8898 17.8271 11.9932L25.5637 19.374C25.65 19.4562 25.7185 19.5538 25.7652 19.6613C25.8119 19.7687 25.8359 19.8839 25.8359 20.0002C25.8359 20.1165 25.8119 20.2317 25.7652 20.3392C25.7185 20.4466 25.65 20.5442 25.5637 20.6264L17.8271 28.0073C17.3709 28.4425 16.6354 28.4425 16.1792 28.0073C15.7231 27.572 15.7231 26.8704 16.1792 26.4352L22.9196 19.9958L16.1699 13.5564C15.7231 13.1301 15.7231 12.4195 16.1792 11.9932Z" fill="#878787"/>
</svg>
</div>

</div>

</div>

          }
         
        </div>
      </div>
    </div>
  );


  function InfoView() {
    return (
      <div className="absolute bottom-0 right-0 z-30 flex items-center justify-center w-full pb-0 transition bg-black/0 ">
       
       
        <div
          onClick={() => {
            setModalView(false);
          
          }}
          className="absolute inset-0 z-50 flex items-center justify-center transition "
        ></div>
        <div className="p-4  bg-[#1E1E1E] bottom-10 right-10 absolute z-50 font-light  text-base pr-14 h-[70px] justify-center  flex flex-col  text-white rounded-xl">
        <IoMdClose
            onClick={() => {
              setModalView(false);
            }}
            className="w-[20px] absolute top-2 right-3 h-[20px] opacity-60 mr-0   cursor-pointer self-end"
          />  
  
 
<div className="flex items-start justify-start gap-3 ">
<div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1201_45)">
<path d="M21.8887 12.2222C21.8887 17.7462 17.4111 22.2222 11.8887 22.2222C6.36621 22.2222 1.88867 17.7462 1.88867 12.2222C1.88867 6.70132 6.36621 2.22217 11.8887 2.22217C17.4111 2.22217 21.8887 6.70132 21.8887 12.2222ZM11.8887 14.2383C10.8643 14.2383 10.0338 15.0687 10.0338 16.0931C10.0338 17.1175 10.8643 17.948 11.8887 17.948C12.9131 17.948 13.7435 17.1175 13.7435 16.0931C13.7435 15.0687 12.9131 14.2383 11.8887 14.2383ZM10.1277 7.57112L10.4268 13.055C10.4408 13.3116 10.6529 13.5125 10.9099 13.5125H12.8674C13.1244 13.5125 13.3366 13.3116 13.3506 13.055L13.6497 7.57112C13.6648 7.29394 13.4441 7.06088 13.1665 7.06088H10.6108C10.3332 7.06088 10.1125 7.29394 10.1277 7.57112Z" fill="#FFA300"/>
</g>
<defs>
<clipPath id="clip0_1201_45">
<rect width="20" height="20" fill="white" transform="translate(1.88867 2.22217)"/>
</clipPath>
</defs>
</svg>
      

      </div>
 
    <p className="max-w-[280px]" >{modalViewContent}</p>
</div>
 
  
         
        </div>
        
      </div>
    );
  }
  function SearchElement() {
    return (
      <div className=" min-h-[100px] cursor-pointer flex items-center   justify-center lg:justify-end   pr-24 border-b-[1px]  border-white border-opacity-20">
        {search.length >= 3 || showNotif ? (
          <div
            onClick={() => {
              setSearch("");
              setShowNotif(false);
            }}
            className={`absolute inset-0  bg-black ${
              showNotif ? "opacity-0 z-20" : "opacity-50 z-10"
            } `}
          ></div>
        ) : null}
        <div className="flex-1"></div>
        
        <div className="relative md:w-[360px] mr-6 h-[40px] ">
          
          <svg
            className={`absolute z-20  ${
              search.length > 2 ? "top-[20px] left-[20px]" : "top-2 left-3"
            }  `}
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

          {/*
         LiaFileAltSolid
         <IoIosSearch className="min-w-[23px] opacity-50 z-20 top-4 left-4 h-[23px] absolute" /> */}

          <div
            onClick={ async() => {
              setSearch("");
              setShowNotif(false);
              setShowSearchInput((x) => (x = false));
              setSearchProject("")
setStatutSort("");
              setSkip(x=> x = 0)
              SetPageNumber(x=> x = 1)
              const dataProjects = await fetchAllProject("","",15,0);
              setProjects(data => data = dataProjects);
               setIsLoadingProject(x=> x = false)
            }}
            className="relative "
          >
            <InputComponent
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher"
              className={`${
                search.length > 2
                  ? "border-b-[1px] border-t-[0px] border-r-[0px]   border-l-[0px] w-full pl-[55px] z-0 h-[60px]  border-opacity-10 focus:border-opacity-10  font-light pr-8    "
                  : "rounded-full pb-[2px] "
              } w-full pl-[42px] z-20 h-[40px]    font-light pr-8 border-[1px] border-[#5A5A5A]  `}
            />
            {search.length >= 3 ? (
              <div className="absolute top-0 rounded-full h-[50px]  z-50 w-full  ">
                
                 <InputComponent
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher"
              
              className={`${
                search.length > 2
                  ? "border-b-[1px] border-t-[0px] border-r-[0px]    border-l-[0px] w-full pl-[55px] z-50 h-[60px]  border-opacity-10 focus:white focus:border-opacity-100  font-light pr-8    "
                  : "rounded-full pb-[2px] "
              } w-full pl-[42px] z-20 h-[40px]   font-light pr-8 border-[1px] border-[#5A5A5A]  `}
            />
              </div>
            ) : null}
            <div
            onClick={(e)=>{
              e.stopPropagation()
            }}
              className={`${
                search.length <= 2 ? "hidden" : ""
              } absolute w-full h-[495px] pl-8 pb-4   pt-[70px] z-10 pr-8 rounded-3xl top-0 flex gap-[6px] flex-col overflow-scroll no-scrollbar   bg-gradient-to-b  from-[#434343] to-[#323232] `}
            >

              <div className="flex-1 h-[10px]  pb-10 overflow-scroll no-scrollbar">

              {(customersFiltered.length == 0 && projectsFiltered?.datas.length == 0) && (
                <div className="flex items-center justify-center flex-1 h-full pb-10 pr-2 font-light opacity-40">
                  Aucun résultat
                </div>
              )}

            { customersFiltered.length > 0 && <>
              <h3 className=" opacity-50 mb-1  text-[14px] mt-1 font-light   ">
                Résultats clients
              </h3>
              {customersFiltered.map((item) => (
                <div
                  onClick={() => {
                    router.push({
                      pathname: "/gestions/client/clientshow",
                      query: item as any,
                    });
                  }}
                  className="flex ml-2  mt-1 hover:bg-[#ffffff05] items-center justify-start cursor-pointer gap-2 border-b-[1px] pb-[6px] border-opacity-10 border-white "
                >
                  <HiFolder className={`min-w-[27px] h-[27px]`} />
                  <p className="text-[13px] mt-1 line-clamp-1">
                    {item.name.toUpperCase()}{" "}
                  </p>
                </div>
              ))}
              </>}

              {(projectsFiltered?.datas.length > 0 && customersFiltered.length > 0) && <div className="h-1 mt-2"></div>}
          
             {projectsFiltered?.datas.length > 0 && <>
              <h3 className=" opacity-50  mb-2 text-[14px] mt-1  font-light  ">
                Résultats projets
              </h3>
              
               {projectsFiltered?.datas.map((item) => (
                <div
                  onClick={() => {

                  

                    router.push({
                      pathname: "/gestions/client/clientshow/projet",
                      query: item as any,
                    });
                  }}
                  className="flex ml-2 mt-1 hover:bg-[#ffffff05]  items-center justify-start cursor-pointer gap-2 border-b-[1px] pb-[6px] border-opacity-10 border-white "
                >
                  <LiaFileAltSolid
                    className={`min-w-[25px] h-[25px] opacity-80`}
                  />
                  <p className="text-[13px] mt-1 line-clamp-1">
                    {item.name.toUpperCase()}{" "}
                  </p>
                </div>
              ))}  
              </>}
              </div>
             
            </div>
          </div>
        </div>

        <div
          onClick={async () => {
            if (isLoading) {
              return;
            }
            setShowNotif((x) => (x = !x));

            setShowSearchInput((x) => (x = false));
            setSearchProject("")
setStatutSort("");
            setSkip(x=> x = 0)
            SetPageNumber(x=> x = 1)
            const dataProjects = await fetchAllProject("","",take,skip);
            setProjects(data => data = dataProjects);
             setIsLoadingProject(x=> x = false)
          }}
          className="relative"
        >
          {!isLoading && (
            <div className="absolute bg-red-500 rounded-full flex justify-center items-center h-[24px] w-[24px] text-xs -right-[1px] -top-0   text-center">
              {todayDatas?.length}
            </div>
          )}
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_89_2267)">
              <path
                d="M32.85 34.13L32.51 33.83C31.5455 32.9706 30.7012 31.9851 30 30.9C29.2343 29.4026 28.7753 27.7673 28.65 26.09V21.15C28.6567 18.5156 27.7011 15.9695 25.9628 13.99C24.2245 12.0105 21.8232 10.7339 19.21 10.4V9.11002C19.21 8.75596 19.0694 8.4164 18.819 8.16604C18.5687 7.91568 18.2291 7.77502 17.875 7.77502C17.521 7.77502 17.1814 7.91568 16.9311 8.16604C16.6807 8.4164 16.54 8.75596 16.54 9.11002V10.42C13.9503 10.778 11.578 12.0623 9.86258 14.0351C8.14713 16.008 7.20478 18.5357 7.21005 21.15V26.09C7.0848 27.7673 6.62583 29.4026 5.86005 30.9C5.17093 31.9824 4.34024 32.9678 3.39005 33.83L3.05005 34.13V36.95H32.85V34.13Z"
                fill="white"
              />
              <path
                d="M15.3199 38C15.4076 38.6339 15.7217 39.2146 16.2042 39.635C16.6867 40.0553 17.305 40.2869 17.9449 40.2869C18.5849 40.2869 19.2032 40.0553 19.6857 39.635C20.1682 39.2146 20.4823 38.6339 20.5699 38H15.3199Z"
                fill="white"
              />
            </g>

            <defs>
              <clipPath id="clip0_89_2267">
                <rect
                  width="36"
                  height="36"
                  fill="white"
                  transform="translate(0 6)"
                />
              </clipPath>
            </defs>
          </svg>

          {/*      <IoIosNotifications onClick={ async()=>{
          if(isLoading){
            return
          }
          setShowNotif(x=>x = !x )
         
         
          
        }} className="min-w-[40px] cursor-pointer h-[40px]" /> */}
        </div>

        <div
          className={`${
            !showNotif ? "hidden" : ""
          } absolute w-[330px] h-[476px]  pt-6 z-20 pb-4  rounded-xl right-12 top-[70px] flex gap-3 flex-col overflow-scroll no-scrollbar   bg-gradient-to-b  from-[#434343] to-[#323232] `}
        >
          <div className="flex items-center justify-center pb-4 text-xl border-b border-white/10">
            Notifications
          </div>

          <div className="absolute bottom-0 z-20 w-full h-10 bg-[#323232bd] blur-md "></div>
          <div className="flex flex-col gap-0 px-4 pb-2 overflow-scroll no-scrollbar">
            {/*  <ItemNotif key={2} title={"Echéance de l'abonnement"} content="Natus corporis quaerat delectus, tenetur animi voluptas adipisci, illo tempora sapiente , joplui uppez illo tempora sapiente"/> */}

            <ItemNotifTodoSystem
              key={12}
              mb={true}
              item={{ id: "test" } as any}
            />

            {true && (
              <>
                {todayDatas?.map((item) => (
                  <ItemNotifTodo key={item.id} mb={true} item={item} />
                ))}
              </>
            )}

            {/*  <div className="flex justify-between opacity-50 cursor-pointer hover:opacity-80 ">   <h3 className="mb-2 ">Tâche de demain</h3>  
          
          <MdKeyboardArrowDown className="w-6 h-6"  />
          
          </div>
       
             <ItemNotifTodo date={"10-10-2023"} heure={"14:30"} key={5} title={"Reunion avec Bank"} content="Natus corporis quaerat delectus, tenetur animi voluptas adipisci, illo tempora sapiente , joplui uppez illo tempora sapiente"/> */}

            <div className="w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  function ItemProject({
    isShimmer = false,
    item = null,
    handleClick = () => {},
  }) {
    let type = {
      border: "",
      color: "",
      label: "",
    };
    switch (item?.type) {
      case "INPROGRESS":
        type = {
          border: "border-amber-600/50 ",
          color: "bg-amber-600/50 ",
          label: "En cours de validation",
        };
        break;
      case "ISVALIDATE":
        type = {
          border: "border-green-600/50 ",
          color: "bg-green-600/50 ",
          label: "Proforma validée",
        };
        break;
      case "ISFINISH":
        type = {
          border: "border-teal-600/50 ",
          color: "bg-teal-600/50 ",
          label: "Projet terminé",
        };
        break;

      default:
        break;
    }

    
    return isShimmer ? (
      <>
       <div className="flex h-[45px]   animate-pulse mb-3 duration-75 p-4  items-center text-white text-opacity-40 text-sm px-7 bg-[#2c2c2cb6] rounded-[20px]">
        
        <p className="w-[120px] xl:w-[170px] bg-[#FFFFFF11] p-[10px] rounded-full mr-8">
          
            {" "}
          </p>
          <div className="pr-10">
          <p className="w-[160px] 2xl:w-[240px] line-clamp-1  r-10  bg-[#FFFFFF11] p-[10px] rounded-full ">
            {" "}
          </p>
          </div>
          <p
            className={` w-[170px] 2xl:w-[175px]  ml-1   duration-200  bg-[#FFFFFF11]   mr-10 text-white bg-color-red-400 p-[10px] rounded-full items-center text-center flex justify-center text-opacity-100`}
          >
            {" "}
          </p>
          <p className="w-[200px] bg-[#FFFFFF11] p-[10px] rounded-full"></p>
        </div>
      </>
    ) : (
      <>
        <div
          onClick={handleClick}
          className="flex h-[49px] mb-3 relative  hover:bg-[#373737ab]  p-4 items-center cursor-pointer text-white text-opacity-40 text-sm px-7 pr-0 bg-[#2c2c2ce1] rounded-3xl"
        >
          <p className="w-[120px] xl:w-[170px] mr-8">
            {daysFr(`${item.createdAt}`)}{" "}
          </p>
          <p className="w-[200px] 2xl:w-[280px] line-clamp-1  pr-3 ">{item.name}</p>
          <p
            className={`w-[175px] mr-10 2xl:h-[29px] h-[25px] text-white ${type.color} p-3 rounded-full items-center text-center flex justify-center text-opacity-100 py-[2px] text-[12px]`}
          >
            {type.label}
          </p>
          <p className="max-w-[180px] 2xl:w-[230px] line-clamp-1 ">{item.customer.name}</p>

          <div
            className="absolute right-0 cursor-pointer w-[300px] z-10 top-2 "
            onClick={(e) => {
              if(item.type != "ISFINISH"){
                e.stopPropagation();

              }
            }}
          >
        {item.type != "ISFINISH"   ?   <DropdownDashboardProject className="absolute z-0 items-center justify-between w-6 h-6 gap-2 py-2 mb-1 text-sm font-medium cursor-pointer right-10 top-1 bottom-1 group-hover:block hover:block">
             {item.table != null && <Menu.Item>
                {({ active }) => (
                  <p
                    onClick={() => {
 

                   if(item.type == "INPROGRESS"){
                    modalGlobal.onSubmit = (
                      <ButtonComponent
                        handleClick={async () => {
                          
                          const data = await validateProforma(item!.id)
        
                          if (data) {
                            const dataProjects = await fetchAllProject(searchProject,statutSort,take,skip);
                            setProjects(data => data = dataProjects);
                            //setCustomers(await fetchAllCustomer("last"));
                            //setIsLoading(false);
                           //await fetch()
                           modalGlobal.onClose();
                          }
                        }}
                        label={"Oui"}
                        className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none  "
                      />
                    );
                    modalGlobal.onOpen();
                modalGlobal.setTitle("Êtes-vous sûr ?");
                modalGlobal.setMessage("Voulez-vous vraiment valider la proforma ?");

                   }else{
                    setTransactionModal(x=> x= true);
                    setCurrentProject(item);
                   
                   }

                    }}
                    className={`  px-2  py-1 flex  justify-start pl-3  items-center gap-2   text-[15px] cursor-pointer mx-2 ${
                      active
                        ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                        : " "
                    }`}
                  >
                 <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="13" height="13" rx="6.5" stroke="#DADADA"/>
<path d="M6.12313 9.33334L4.08325 7.12128L4.59322 6.56827L6.12313 8.22731L9.40662 4.66667L9.91659 5.21969L6.12313 9.33334Z" fill="#DADADA"/>
</svg>


                    {item.type == "INPROGRESS" ? "Valider" : "Terminer"}
                  </p>
                )}
              </Menu.Item>}
              <Menu.Item>
                {({ active }) => (
                  <p
                    onClick={() => {
                      menuIndex.setMenuIndex(2);
                      router.push({
                        pathname:
                          "/gestions/client/clientshow/factureCalculator",
                        query: item as any,
                      });
                    }}
                    className={`  px-2  py-1 flex  justify-start pl-3  items-center gap-2   text-[15px] cursor-pointer mx-2 ${
                      active
                        ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                        : " "
                    }`}
                  >
                      <RiFileEditLine className="w-[20px] h-[20px] " /> 
                    Modifier
                  </p>
                )}
              </Menu.Item>
            </DropdownDashboardProject> : <div className="absolute bg-teal-500 rounded-full right-[46px] top-2 bottom-1">
            <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="13" height="13" rx="6.5" stroke="#DADADA"/>
<path d="M6.12313 9.33334L4.08325 7.12128L4.59322 6.56827L6.12313 8.22731L9.40662 4.66667L9.91659 5.21969L6.12313 9.33334Z" fill="#DADADA"/>
</svg>
              </div>}
            {/*           <svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="2" cy="2.5" r="2" fill="#A2A2A2"/>
  <circle cx="8" cy="2.5" r="2" fill="#A2A2A2"/>
  <circle cx="14" cy="2.5" r="2" fill="#A2A2A2"/>
  </svg> */}
          </div>
        </div>
      </>
    );
  }

  function ItemNotifTodo({
    item,
    mb = true,
  }: {
    item: PlanningItem;
    mb: boolean;
  }) {
    const router = useRouter();
    return (
      <div className="flex gap-2">
        <div
          onClick={() => {
            if (currentNotifId == item.id) {
              setCurrentNotifId("");
            } else {
              setCurrentNotifId(item.id);
            }

            return;
            router.push({
              pathname: "/gestions/planning",
              query: item as any,
            });
          }}
          className={`flex flex-col p-4 pl-5 py-3 ${
            mb ? "mb-2" : ""
          }  pt-[10px] min-w-[270px] max-w-[270px]  bg-gradient-to-b from-[#5b5b5b]   to-[#444444]   cursor-pointer rounded-md  hover:opacity-100 border-white/10`}
        >
          <h3
            className={`text-primary text-[14px] font-bold mt-1    line-clamp-1 leading-[15px] `}
          >
            {item.name}
          </h3>
          <div className="flex flex-col mt-2">
            <p
              className={`text-[12px] leading-[15px]  font-light    ${
                currentNotifId == item.id
                  ? "opacity-100 "
                  : "w-[250px] pr-4 line-clamp-2 opacity-80"
              } `}
            >
              {item.content}
            </p>
            <p className="mt-2 text-[11px] font-light text-teal-400 opacity-90">
              {daysFr(item.date)}{" "}
              <span className="ml-1">{item.date.toString().substr(11, 5)}</span>
            </p>
            <div></div>
          </div>
        </div>

        {currentNotifId == item.id ? (
          <div className={`flex flex-col gap-[6px] mt-2`}>
            <svg

onClick={async ()=>{
   
  if(currentNotifId){

    setTodayDatas((current) =>
    current.filter((itemData) => itemData.id != currentNotifId)
  );

 await togglePlanningItem(item.id,true)

 
  }
}}
              className="cursor-pointer"
              width="22"
              height="22"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.0400391"
                width="24"
                height="24"
                rx="12"
                fill="#99976D"
              />
              <path
                d="M10.537 16L7.04004 12.2079L7.91427 11.2599L10.537 14.104L16.1658 8L17.04 8.94803L10.537 16Z"
                fill="#414141"
              />
            </svg>

            <svg

onClick={async()=>{
   
  if(currentNotifId){

    setTodayDatas((current) =>
    current.filter((itemData) => itemData.id != currentNotifId)
  );

  await archivePlanningItem(item.id,true)
 
  }
}}

              className="cursor-pointer"
              width="22"
              height="22"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.0400391"
                width="24"
                height="24"
                rx="12"
                fill="#686666"
              />
              <path
                d="M16.1333 17L12.0433 12.9062L7.95322 17L7.04004 16.0874L11.1365 12L7.04004 7.9126L7.95322 7L12.0433 11.0938L16.1333 7.00643L17.04 7.9126L12.95 12L17.04 16.0874L16.1333 17Z"
                fill="#414141"
              />
            </svg>
          </div>
        ) : (
          <div className="w-[100px] flex justify-center  pt-10">
            <svg
              width="7"
              height="6"
              viewBox="0 0 7 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="3.6132" cy="3" rx="3.38676" ry="3" fill="#99976D" />
            </svg>
          </div>
        )}
      </div>
    );
  }

  function ItemNotifTodoSystem({
    item,
    mb = true,
  }: {
    item: PlanningItem;
    mb: boolean;
  }) {
    const router = useRouter();
    return (
      <div className="flex gap-2">
        <div
          onClick={() => {
            if (currentNotifId == item.id) {
              setCurrentNotifId("");
            } else {
              setCurrentNotifId(item.id);
            }

            return;
            router.push({
              pathname: "/gestions/planning",
              query: item as any,
            });
          }}
          className={`flex flex-col p-4 pl-5 py-3 ${
            mb ? "mb-2" : ""
          }  pt-[10px] min-w-[270px] max-w-[270px]  bg-gradient-to-b from-[#5da89b]   to-[#448176]   cursor-pointer rounded-md  hover:opacity-100 border-white/10`}
        >
          <div className="flex items-center justify-between ">
            {" "}
            <h3
              className={`text-white text-[13px]    w-[140px]    line-clamp-1 leading-[15px] `}
            >
              Nouveau {/* {item.name} */}
            </h3>
            <p className=" text-[11px] font-light opacity-70  ">
              11/11/2023 <span className="ml-1">20:20</span>
            </p>
          </div>
          <div className="flex flex-col mt-1">
            <p
              className={`text-[12px] leading-[15px]  font-light    ${
                currentNotifId == item.id
                  ? "opacity-100 "
                  : "w-[250px] pr-4 line-clamp-2 opacity-80"
              } `}
            >
              {/*  {item.content} */}Bénéficiez de 20% de réduction pour votre
              abonnement dès aujourd'hui  
            </p>
            <p className="mt-0 text-[11px] font-light text-teal-400 opacity-90">
              {/* {daysFr(item.date)}{" "}
            <span className="ml-1">{item.date.toString().substr(11, 5)}</span> */}
            </p>
            <div></div>
          </div>
        </div>

        {currentNotifId == item.id ? (
          <div
            className={`flex flex-col gap-[6px]  justify-center items-center`}
          >
            <svg
              className="cursor-pointer"
              width="22"
              height="22"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.0400391"
                width="24"
                height="24"
                rx="12"
                fill="#686666"
              />
              <path
                d="M16.1333 17L12.0433 12.9062L7.95322 17L7.04004 16.0874L11.1365 12L7.04004 7.9126L7.95322 7L12.0433 11.0938L16.1333 7.00643L17.04 7.9126L12.95 12L17.04 16.0874L16.1333 17Z"
                fill="#414141"
              />
            </svg>
          </div>
        ) : (
          <div className="w-[100px] flex justify-center  pt-10">
            <svg
              width="7"
              height="6"
              viewBox="0 0 7 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="3.6132" cy="3" rx="3.38676" ry="3" fill="#5da89b" />
            </svg>
          </div>
        )}
      </div>
    );
  }

  function TransactionItemBtn({label,index,handleClick}:{label:string,index:string,handleClick?: () => void}) {
    return <div onClick={handleClick} className={`w-full relative px-6 py-3 ${index == typeTransaction ? "text-white/100  primary " :"text-white/30  bg-[#4B4B4B] "} hover:brightness-110 rounded-[10px] cursor-pointer   text-md`}>
    {label} 
     {index == typeTransaction && <BsCheck2Circle className="absolute right-5 top-4 h-[20px] w-[20px]" />}
    </div>;
  }


  function modalTransaction(project) {
    return  (
      <div className="absolute inset-0 z-10 flex items-center justify-center min-w-screen bg-black/50">
    <div 
  onClick={(e)=>{
  //  e.stopPropagation()
  setTransactionModal(false)
  setTypeTransaction("")
  setIsLoadingConfirmBtn(x=> x = false);
  }}

className="absolute inset-0 z-30 flex items-center justify-center min-w-screen ">
  
</div>
    
      <div className="p-4 bg-[#323232] z-50 w-[370px]  px-8 flex flex-col items-center justify-center text-white rounded-md">
        <div className="font-bold text-[16px] flex justify-center items-center pb-2  pt-5  border-white/10 w-full self-start mb-2">
          <div className="text-[19px] ">{"Choisir le type de versement"}</div>
          
        </div>

        <div className="text-[16px] px-0 w-full gap-[10px] flex flex-col">
          {/* typeTransaction */}
       <TransactionItemBtn index={"0"} label="Virement bancaire"   handleClick={()=> {
        if(typeTransaction.length !=0 && isLoadingConfirmBtn){
          return;
        }
        setTypeTransaction(x => x="0")
        
          setIsLoadingConfirmBtn(x=> x = false);
        }} />
       <TransactionItemBtn index={"1"} label="Paiement en espèce"   handleClick={()=> {
        if(typeTransaction.length !=0 && isLoadingConfirmBtn){
          return;
        }
        setTypeTransaction(x => x="1")
        
          setIsLoadingConfirmBtn(x=> x = false);
        }} />
       <TransactionItemBtn index={"2"} label="Paiement par chèque"   handleClick={()=> {
        if(typeTransaction.length !=0 && isLoadingConfirmBtn){
          return;
        }
        setTypeTransaction(x => x="2")
        
          setIsLoadingConfirmBtn(x=> x = false);
        }} />
          </div>

        <div className="flex items-center justify-center w-full gap-4 mt-0">
          
        <ButtonComponent
            handleClick={ () => {
             setTransactionModal(false)
             setTypeTransaction("")
             setIsLoadingConfirmBtn(x=> x = false);
             
            }}
            label={"Annuler"}
            className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#484848] border-none  "
          />
 

          
          {(typeTransaction.length !=0 ) && <ButtonComponent
            handleClick={async() => {
              
              if(isLoadingConfirmBtn){
                return;
              }
setIsLoadingConfirmBtn(x=> x = true);
           
       
              const dataProject = await finishProject(project!.id)
              const dataTransValue:Transaction = {
                client:project!.customer.name,
                projectName:project!.name,
                amountTotal:project!.amountTotal,
                taxe:(project!.tva.toString() != "0" && project!.tva.toString() != "") ? "TTC" : "HT",
                type:typeTransaction,
              }
              const dataTransaction = await addNewTransation(project!.id,dataTransValue)
              if(dataProject && dataTransaction ){
             //   await fetch()
                setTransactionModal(false)
                setTypeTransaction("")
                setIsLoadingConfirmBtn(x=> x = false);
setCurrentProject(null)
                const dataProjects = await fetchAllProject(searchProject,statutSort,take,skip);
                setProjects(data => data = dataProjects);
                setCustomers(await fetchAllCustomer("last"));
                setIsLoading(false);
              }
            }}
            label={"Confirmer"}
            className={`${isLoadingConfirmBtn ? "opacity-30 cursor-default hover:brightness-100" : "opacity-100 cursor-pointer "}  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none `}
          />}
          
        </div>
      </div>
    </div>
    )
  }

}

export default Dashboard;

function ItemNotifTodoCollapse({ item, handleClick }) {
  return (
    <div onClick={handleClick} className="min-h-[140px]  relative">
      <div className="absolute left-0 z-50 w-full ">
        <ItemNotifTodoLast
          mb={false}
          date={daysFr(item?.date)}
          heure={item?.date.toString().substr(11, 5)}
          key={3}
          title={item?.name}
          content={item?.content}
        />
      </div>

      <div className="z-40 w-[285px] left-[7px] absolute top-[10px]  bg-gradient-to-b from-[#666666]  to-[#545454]  min-h-[103px] rounded-md"></div>
      {/*  <div className="z-30 w-[280px] left-[9px] absolute top-[12px] bg-[#424242]  min-h-[103px] rounded-md"></div> */}
      <div className="z-20 w-[272px]   shadow-md shadow-[#323232]   left-[13px] absolute top-[14px] bg-gradient-to-r from-[#666666]    to-[#666666]   min-h-[103px] rounded-md"></div>
    </div>
  );
}
function ItemNotifTodoLast({ title, content, date, heure, mb = true }) {
  return (
    <div
      className={`flex flex-col p-4 py-3 ${
        mb ? "mb-2" : ""
      }  pt-[10px] h-[108px]  bg-gradient-to-b from-[#5b5b5b] to-[#4a4a4a]   cursor-pointer rounded-md opacity-100 hover:opacity-100 border-white/10`}
    >
      <h3
        className={`${
          title == "Mise à jour de l'application"
            ? "text-teal-500"
            : " text-primary  "
        } text-[13px]`}
      >
        {title}
      </h3>
      <div className="flex flex-col flex-1 ">
        <p className="text-[12px] leading-[15px] flex-1 line-clamp-3  font-light opacity-90">
          {content}
        </p>
        <p className="mt-1 text-[11px] font-light text-teal-400 opacity-90">
          {date} <span className="ml-1">{heure}</span>
        </p>
        <div></div>
      </div>
    </div>
  );
}

function ItemNotif2({ title, content }) {
  return (
    <div className="  flex flex-col p-4 py-3  mb-2  font-bold  pt-[10px]  bg-gradient-to-b from-[#ffffff] text-black   to-[#ffffffc0]   cursor-pointer rounded-md opacity-80 hover:opacity-100 border-white/10">
      <div className="flex justify-between">
        <h3 className={` " text-black text-sm`}>Échéance de l'abonnement </h3>
        <IoMdClose
          onClick={() => {}}
          className="w-[20px] h-[20px] opacity-100 mr-0  absolute right-3   cursor-pointer "
        />
      </div>

      <div className="flex">
        <p
          className="text-xs font-light opacity-100
    text-[12px] leading-[15px]  
    
    "
        >
          Votre abonnement pour arrive bientôt à échéance. Renouvelez-le à temps
          pour ne pas interrompre votre utilisation.
        </p>
        <div></div>
      </div>
    </div>
  );
}
function ItemNotif({ title, content }) {
  return (
    <div className="  flex flex-col p-4 py-3  mb-2  font-bold  pt-[10px]  bg-gradient-to-b from-[#6F6F6F] text-white   to-[#575454]   cursor-pointer rounded-md opacity-80 hover:opacity-100 border-white/10">
      <div className="flex justify-between">
        <h3 className={` " text-white text-[13px] pl-2`}>{title} </h3>
        <IoMdClose
          onClick={() => {}}
          className="w-[20px] h-[20px] opacity-100 mr-0  absolute right-3   cursor-pointer "
        />
      </div>

      <div className="flex">
        <p
          className="text-xs pl-2 font-light opacity-100
    text-[12px] leading-[15px]  
    
    "
        >
          Mise à jour 1.1 : Profitez des améliorations <br /> et des nouvelles
          fonctionnalités en la téléchargeant maintenant.
        </p>
        <div></div>
      </div>
    </div>
  );
}
