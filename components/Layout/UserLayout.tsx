import React, { useEffect, useState } from "react";
import SideBar from "../Items/SideBar";
import { IoIosNotifications, IoIosSearch } from "react-icons/io";
import InputComponent from "../UI/InputComponent";
import GlobalModal from "../Modals/global-modal";
import { ModalProvider } from "../Items/modal-provider";
import { useWindowSize } from "usehooks-ts";
 
function UserLayout({ children }) {
  const windowSize = useWindowSize();
  const [zoomValue, setZoomValue] = useState(100)
 
  let pourcentage = (windowSize.width/1920) * 100;



  useEffect(() => {
     
    if (windowSize.width > 1440) {
     setZoomValue(x=> x = 100)     }
   else  if (windowSize.width < 1440 && windowSize.width > 1390) {
     setZoomValue(x=> x = 85)     }
   else if (windowSize.width < 1390) {
     setZoomValue(x=> x = 75)     }
   
   
 
   return () => {
     
   }
 }, [windowSize.width])
 
 
  

  return (

    <>
      {/* <p className="text-xs">{windowSize.width}
        - {JSON.stringify(zoomValue)}   </p>   
  <ModalProvider style={{"zoom":`${zoomValue}%`}} /> */}
     <div className="flex w-screen h-screen overflow-scroll no-scrollbar " >
      <SideBar  />  

      <div className="flex flex-col w-full" style={{"zoom":`${zoomValue}%`}}>

{/* 
        <main className="flex-1 overflow-scroll no-scrollbar">  {children}  </main> */}
         <main className="flex-1 h-full overflow-scroll no-scrollbar ">  {children}  </main>
      </div>
    
    </div>
    </>
   
  );
}

export default UserLayout;
function SearchElement() {
  return (
    <div className="w-full min-h-[100px]  flex items-center   justify-center lg:justify-end pr-10 border-b-[1px]  border-white border-opacity-20">
      <div className="flex-1"></div>
      <div className="relative md:w-[300px] mr-10 h-[40px] ">
        <IoIosSearch className="min-w-[25px] top-3 left-4 h-[25px] absolute" />
        <InputComponent
          placeholder="Rechercher"
          className="w-full pl-12 rounded-full"
        />
      </div>
      <div className="flex-1 lg:hidden"></div>
      <IoIosNotifications className="min-w-[40px] cursor-pointer h-[40px]" />
    </div>
  );
}
