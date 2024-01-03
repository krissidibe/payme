import React, { useEffect, useState } from "react";
import SideBar from "../../components/Items/SideBar";
import { HiFolder, HiFolderAdd } from "react-icons/hi";
import { RxUpdate } from "react-icons/rx";
import { MdEmail, MdFolder, MdRestore } from "react-icons/md";
import { FaBuilding, FaUserCog, FaUserTie } from "react-icons/fa";
import { MdViewTimeline } from "react-icons/md";
import {
  BsFileEarmarkSpreadsheet,
  BsFillFileEarmarkTextFill,
  BsSortDownAlt,
  BsSortUp,
  BsSortUpAlt,
} from "react-icons/bs";
import {
  IoIosArrowBack,
  IoIosNotifications,
  IoIosPeople,
  IoMdBusiness,
  IoMdTrash,
} from "react-icons/io";
import InputComponent from "../../components/UI/InputComponent";
import FolderComponent from "../../components/UI/FolderComponent";
import PdfBuilder from "../../components/PdfDemo";
import { useRouter } from "next/router";
import { RiBankCardFill, RiFileEditLine } from "react-icons/ri";
import { IoListSharp, IoPersonSharp } from "react-icons/io5";
 
import { Menu } from "@headlessui/react";
import ButtonComponent from "../../components/UI/ButtonComponent";
import {
  deleteAllCustomerInTrash,
  deleteCustomerInTrash,
  fetchAllCustomerTrash,
  outTrashCustomer,
} from "../../services/customerModel";
import dayjs from "dayjs";
import { daysFr } from "../../utils/helpers";
 
import {
  deletProjectInTrash,
  deleteAllProjectInTrash,
  fetchAllProjectTrash,
  outTrashProject,
} from "../../services/projectService";
import { LiaFileAltSolid } from "react-icons/lia";
import DropdownTrashItem from "../../components/menu/DropdownTrashItem";
import { useGlobalModal } from "../../utils/use-global-modal";
import DropdownGlobalTrash from "../../components/menu/DropdownGlobalTrash";
function Trash(props) {
  /* people
business
handyman
bookmarks
assignment_turned_in_rounded 
 
*/
const modal = useGlobalModal()
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState(0);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [projets, setProjets] = useState<Project[]>([]);
  const [datas, setDatas] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [datasFiltered, setDatasFiltered] = useState<any[]>([]);
  useEffect(() => {
    const datasFilter = datas.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    setDatasFiltered(datasFilter);
  }, [searchValue,isLoading]);
  useEffect(() => {
    (async () => { 
      //const dataProjects = await fetchAllProject();
      //setProjects(dataProjects);
      setCustomers(await fetchAllCustomerTrash());
      setProjets(await fetchAllProjectTrash());
      customers.forEach((i) =>{
        setDatas((current) => [...current, i])
        setDatasFiltered((current) => [...current, i])
      });
      projets.forEach((it) => {
        setDatas((current) => [...current, it])
        setDatasFiltered((current) => [...current, it])
      });

    
      setIsLoading(false);
    })();

    return () => {};
  }, [isLoading]);

  return (
    <div className="flex flex-col w-full h-full no-scrollbar">
      {SearchElement()}

 
      <div className="flex-1 overflow-scroll no-scrollbar">
        <div className="flex flex-col flex-1 h-full ml-4 mr-8 space-y-4 p-12 pt-[22px] ">
          <div className="flex p-2 mt-0 mb-2 pb-2  text-[14px]   px-1 2xl:ml-14 ml-10  mr-20 border-b border-white/10 ">
          
          
           {isLoading && <div className="w-[120px] md:w-[380px] xl:w-[500px] opacity-40   2xl:w-[620px] ">
           <h2 className="text-[#9a9768] text-[18px] font-bold   rounded-md h-[15px] w-[140px]  animate-pulse duration-100    bg-[#ffffff1f] "></h2>
            
            </div>}
           {!isLoading && <p className="w-[120px] md:w-[380px] xl:w-[500px] opacity-40   2xl:w-[620px]">
              Nom
            </p>}
            {isLoading && <p className="w-[120px] md:w-[300px] xl:w-[250px] opacity-40   2xl:w-[480px]">
            <h2 className="text-[#9a9768] text-[18px] font-bold   rounded-md h-[15px] w-[140px]  animate-pulse duration-100    bg-[#ffffff1f] "></h2>
            
            </p>}
            {!isLoading && <p className="w-[120px] md:w-[300px] xl:w-[250px] opacity-40   2xl:w-[480px]">
              Emplacement
            </p>}
           {isLoading && <p className="w-[120px] md:w-[350px] xl:w-[250px] opacity-40   2xl:w-[250px]">
           <h2 className="text-[#9a9768] text-[18px] font-bold   rounded-md h-[15px] w-[140px]  animate-pulse duration-100    bg-[#ffffff1f] "></h2>
            
            </p>}
           {!isLoading && <p className="w-[120px] md:w-[350px] xl:w-[250px] opacity-40   2xl:w-[250px]">
              Date de suppression
            </p>}
          </div>
          <div className="flex-1 overflow-y-scroll no-scrollbar">
         
             
           {isLoading && [1,2,3,4,5,6,7].map((item) => (
              <ItemTrashShimmer key={item} item={item} />
            ))}   
         {/*      {!isLoading && datasFiltered.map((item) => (
              <ItemTrash key={item.id} item={item} />
            ))}    */}
          

{(!isLoading && sortType == 0) && datasFiltered.map((item)=>(
     

 {...item,date: new Date(item.deletedAt)}
    )).sort((a,b)=>  Number(b.date) - Number(a.date) ).map((itemData,index)=>(
      <ItemTrash key={itemData.id} item={itemData} />
          ))   }
{(!isLoading && sortType == 1) && datasFiltered.map((item)=>(
     

 {...item,date: new Date(item.deletedAt)}
    )).sort((a,b)=>  Number(b.date) - Number(a.date) ).map((itemData,index)=>(
      <ItemTrash key={itemData.id} item={itemData} />
          )).reverse()   }


              <h3 className="flex w-full pr-10 text-[14px] pb-2 pt-4 pl-12 text-white/20">
            Les éléments placés dans la corbeille sont définitivement supprimés
            au bout de 30 jours.
          </h3>  
          </div>
        
        </div>
      </div>
    </div>
  );

  function SearchElement() {
    const router = useRouter();
    return (
      <div className=" min-h-[125px] px-16 flex items-end mr-0 pb-6 pr-24    relative    justify-between  border-b-[1px]  border-white/10 border-opacity-20">
      
       
        <div>
          <h3 className="text-4xl font-bold">Corbeille</h3>
         
        </div>
        {isLoading &&   <div className="absolute flex gap-4 right-[135px] bottom-[30px]">
     <div className="min-w-[200px] h-8 rounded-full  animate-pulse duration-100    bg-[#ffffff1f] ">  </div>
    
     </div>}
       {!isLoading && <div className="flex">
        

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
        
        key={"item12"}
        value={searchValue}
      onChange={(e) => {
        setSearchValue(x => x = e.target.value)
      }}
          placeholder="Rechercher"
          className="rounded-full w-full pl-[42px] z-20 h-[40px]   font-light pr-8   border-[#5A5A5A]  "
        /> 
     </div>
          
          <DropdownGlobalTrash className="max-w-[100px]">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    // setTypeValue("ENTERPRISE");
                    setSortType(x=>x=0)
                  }}
                  className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                    active
                      ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                      : " "
                  }`}
                >
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.59998 8L8.24066 8.64959L10.9593 11.406L11.6 12.0556L10.3186 13.3548L9.67791 12.7052L8.50618 11.5172V24H6.69377V11.5172L5.52204 12.7052L4.88135 13.3548L3.59998 12.0556L4.24066 11.406L6.95929 8.64959L7.59998 8Z" fill="#DADADA"/>
<path d="M15.6 22.3999L28.4 22.3999M15.6 15.9999L25.2 15.9999M15.6 9.5999L22 9.5999" stroke="#DADADA" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  Croissant
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    setSortType(x=>x=1)
                  }}
                  className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                    active
                      ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                      : " "
                  }`}
                >
                 <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.59998 24L8.24066 23.3504L10.9593 20.594L11.6 19.9444L10.3186 18.6452L9.67791 19.2948L8.50618 20.4828V8H6.69377V20.4828L5.52204 19.2948L4.88135 18.6452L3.59998 19.9444L4.24066 20.594L6.95929 23.3504L7.59998 24Z" fill="#DADADA"/>
<path d="M15.6 22.3999L28.4 22.3999M15.6 15.9999L25.2 15.9999M15.6 9.5999L22 9.5999" stroke="#DADADA" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  Décroissant
                </div>
              )}
            </Menu.Item>
            
          </DropdownGlobalTrash>
          <ButtonComponent
            label={"Vider la corbeille"}
            labelClassName="  text-[15px]"
            handleClick={() => {


            modal.onSubmit = (
              <ButtonComponent
                handleClick={async () => {
                 

                  setIsLoading((x) => (x = false));
                  const presentValue = searchValue;
                  setSearchValue(x => x = "")
                  setDatas([]);
                  setCustomers([]);
                  setProjets([]);
                  await deleteAllProjectInTrash();
                  await deleteAllCustomerInTrash();
                  
                  setSearchValue(x => x = presentValue)
                  setIsLoading((x) => (x = true));
                

                  if (true) {
                   
                    
                   modal.onClose();
                  }
                }}
                label={"Vider"}
                className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none   "
              />
            );
            modal.onOpen();
        modal.setTitle("Êtes-vous sûr ?");
        modal.setMessage("Êtes-vous vraiment sûr de vouloir vider la corbeille ?");
            }}
            className="bg-[#9a9768] border-none  min-w-[160px]    ml-8 mr-10"
          />
        </div>}
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
  function ItemTrashShimmer({ item }) {
    return (
      <div className="flex p-2 rounded-md  bg-gradient-to-r    from-[#ffffff11]   to-[#ffffff08]   relative mt-0 mb-2 pb-4  text-[14px] select-none cursor-pointer  mr-20  px-1 2xl:ml-14 ml-10  border-white/10 ">
         
       
       
        <div className="w-[120px] pl-5 mt-2 flex flex-col md:w-[380px] xl:w-[500px] opacity-40    uppercase 2xl:w-[620px]   gap-2 items-start">
        <p className=" p-[6px] min-w-[120px]  rounded-md animate-pulse duration-100    bg-[#ffffff1f]  text-[14.5px] font-bold   line-clamp-1">
        
         
        </p>
        <p className=" p-[4px] min-w-[240px]  rounded-md animate-pulse duration-100    bg-[#ffffff1f]  text-[14.5px] font-bold mt-0  line-clamp-1">
        
         
        </p>
        
        </div>
        <p className="w-[120px] md:w-[300px] xl:w-[250px] opacity-40 flex items-center uppercase 2xl:w-[480px]">
        <p className=" p-[6px] min-w-[120px]  rounded-md animate-pulse duration-100    bg-[#ffffff1f]  text-[14.5px] font-bold   line-clamp-1">
        
         
        </p>
        </p>
        <p className="w-[120px] md:w-[350px] xl:w-[140px] pl-[2px] 2xl:pl-[5px] opacity-40 flex items-center  uppercase 2xl:w-[250px]">
        <p className=" p-[6px] min-w-[120px]  rounded-md animate-pulse duration-100    bg-[#ffffff1f]  text-[14.5px] font-bold   line-clamp-1">
        
         
        </p>
        </p>
       
      </div>
    );
  }
  function ItemTrash({ item }) {
    return (
      <div className="flex p-2  relative mt-0 mb-2 pb-4   text-[14px] select-none cursor-pointer  mr-20  px-1 2xl:ml-14 ml-10  border-b border-white/10 ">
        <div className="absolute -right-[140px] z-20 flex w-[200px]  opacity-100  items-center">
          <DropdownTrashItem className="">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={async () => {
                    const presentValue = searchValue;
                    //setSearchValue(x => x = "")
                    //setIsLoading((x) => (x = false));
                    //setDatas([]);
                   // setCustomers([]);
                    
                    setDatasFiltered((current) =>
                    current.filter((itemData) => itemData.id != item.id))
                    setDatas((current) =>
                    current.filter((itemData) => itemData.id != item.id))
 

                
                   // setSearchValue(x => x = presentValue)
                   // setIsLoading((x) => (x = true));
                    if (item.customer?.name) {
                      await outTrashProject(item.id);
                    } else {
                      await outTrashCustomer(item.id);
                    }

                   
                  }}
                  className={`  px-2  py-2 flex  justify-start pl-3 pr-0  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                    active
                      ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                      : " "
                  }`}
                >
                  <MdRestore className="w-5 h-5 " />
                  Restaurer
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={async() => {
                    //setIsLoading((x) => (x = false));
                    //const presentValue = searchValue;
                    //setSearchValue(x => x = "")
                    //setDatas([]);
                    //setCustomers([]);
                    //setProjets([]);
                    setDatasFiltered((current) =>
                    current.filter((itemData) => itemData.id != item.id))
                    setDatas((current) =>
                    current.filter((itemData) => itemData.id != item.id))
                    if (item.customer?.name) {
                      await deletProjectInTrash(item.id);
                    } else {
                      await deleteCustomerInTrash(item.id);
                    }
                   // setSearchValue(x => x = presentValue)
                   // setIsLoading((x) => (x = true));
                  }}
                  className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                    active
                      ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                      : " "
                  }`}
                >
                 {/* icontrash */}
<svg width="16" height="18" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.03423 6.26667C10.2349 6.26667 12.4355 6.26667 14.6362 6.26667C15.2964 6.26667 15.4944 6.48307 15.4431 7.1341C15.1405 11.0195 14.8391 14.9042 14.539 18.7884C14.4473 19.9593 14.3849 21.1321 14.3052 22.303C14.2854 22.7661 14.0847 23.203 13.7462 23.5197C13.4077 23.8364 12.9585 24.0076 12.4951 23.9966C9.52792 24.0009 6.5604 24.0009 3.59257 23.9966C2.53809 23.9966 1.80454 23.3383 1.71926 22.2746C1.60189 20.8029 1.52579 19.3276 1.41484 17.855C1.15381 14.3651 0.887291 10.8755 0.615265 7.38626C0.606096 7.27714 0.59876 7.16803 0.590508 7.05891C0.551079 6.49316 0.763809 6.26117 1.34423 6.26025C3.05585 6.26025 4.76472 6.26025 6.47084 6.26025H8.02964L8.03423 6.26667ZM8.38816 15.1005C8.38816 13.5142 8.38816 11.9279 8.38816 10.3406C8.38816 10.1004 8.32398 9.92985 8.06449 9.91701C7.80499 9.90417 7.6702 10.0674 7.65553 10.3232C7.64911 10.4461 7.65553 10.569 7.65553 10.69C7.65553 12.618 7.65553 14.5463 7.65553 16.475C7.65553 17.6101 7.64728 18.7453 7.66653 19.8805C7.68807 20.0456 7.77289 20.1958 7.9031 20.2995C7.96637 20.3509 8.19928 20.2995 8.25796 20.2262C8.34362 20.092 8.38676 19.9351 8.38175 19.7759C8.39 18.219 8.38725 16.6602 8.38816 15.1005ZM11.9991 10.5158C12.0247 10.2471 12.0431 9.95827 11.6809 9.92251C11.3829 9.89409 11.2958 10.1123 11.2756 10.3746C11.0311 13.5087 10.7866 16.6428 10.5421 19.7769C10.5201 20.0464 10.5421 20.305 10.8648 20.3316C11.1876 20.3582 11.2518 20.1051 11.2719 19.8365C11.5116 16.7317 11.7539 13.6257 11.9991 10.5185V10.5158ZM4.04829 10.601C4.22312 12.8628 4.39886 15.1246 4.57553 17.3864C4.63971 18.2043 4.71399 19.0213 4.77359 19.8392C4.79284 20.1143 4.84786 20.3518 5.18163 20.3252C5.51539 20.2986 5.5319 20.0391 5.50347 19.775C5.50347 19.7347 5.50347 19.6934 5.49614 19.6522C5.30663 17.2406 5.11713 14.8288 4.92763 12.4166C4.87628 11.7628 4.8231 11.1081 4.77175 10.4543C4.75066 10.1793 4.7149 9.89592 4.35546 9.92251C4.0217 9.94635 4.01253 10.2159 4.0382 10.4727C4.04462 10.5222 4.04554 10.5625 4.04829 10.6038V10.601Z" fill="#EBEBEB"/>
<path d="M11.2756 2.81731H15.2001C15.8511 2.81731 15.908 2.87416 15.9071 3.51235C15.9071 4.04601 15.8997 4.57875 15.9071 5.11149C15.9126 5.43792 15.7649 5.59472 15.4431 5.59747C15.3514 5.59747 15.2524 5.59747 15.157 5.59747H0.807814C0.187046 5.59747 0.130196 5.5397 0.127445 4.91618C0.127445 4.42471 0.121944 3.93322 0.127445 3.44175C0.127445 2.89708 0.211804 2.81731 0.740878 2.81731C1.9329 2.81731 3.11667 2.80539 4.30411 2.82465C4.65163 2.83106 4.80659 2.75404 4.76991 2.37534C4.74015 2.08958 4.75282 1.80098 4.80751 1.51892C4.89555 1.0932 5.12746 0.710773 5.46427 0.435915C5.80108 0.161057 6.22225 0.0105313 6.65697 0.00964012C7.55924 -0.0022801 8.46151 -0.00411398 9.36286 0.00964012C10.4559 0.0252281 11.2618 0.851391 11.2765 1.94989C11.2793 2.2213 11.2756 2.4918 11.2756 2.81731ZM6.01236 2.78613H10.0423C10.0423 2.51105 10.0487 2.25339 10.0423 1.99756C10.0276 1.49508 9.78741 1.25576 9.27759 1.24934C8.63573 1.24017 7.99387 1.26493 7.35201 1.23834C6.01787 1.18149 5.91425 1.47674 6.01236 2.78613Z" fill="#EBEBEB"/>
</svg>
                  Supprimer
                </div>
              )}
            </Menu.Item>
          </DropdownTrashItem>
        </div>
       
       
        <div className="w-[120px] md:w-[380px] xl:w-[500px] opacity-40  uppercase 2xl:w-[620px] flex  gap-2 items-center">
          {item.customer?.name ? (
            <LiaFileAltSolid className="w-[30px] h-[30px] mb-0 " />
          ) : (
            <MdFolder className="w-[30px] h-[30px] mb-0 " />
          )}
          <p>{item.name}</p>{" "}
        </div>
        <p className="w-[120px] md:w-[300px] xl:w-[250px] opacity-40 flex items-center uppercase 2xl:w-[480px]">
          {item.customer?.name ?? "Client"}
        </p>
        <p className="w-[120px] md:w-[350px] xl:w-[140px] pl-[2px] 2xl:pl-[5px] opacity-40 flex items-center  uppercase 2xl:w-[250px]">
          {daysFr(item.deletedAt)}
        </p>
       
      </div>
    );
  }
}

export default Trash;
