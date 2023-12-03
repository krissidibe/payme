import React from "react";
import { RiDashboardFill } from "react-icons/ri";
import { BsFillCreditCardFill, BsPersonFill } from "react-icons/bs";
import { PiListBulletsFill } from "react-icons/pi";
import { BsPerson, BsTrash3Fill } from "react-icons/bs";
import useMenuStore from "../../utils/MenuStore";
import { useRouter } from "next/router";



 



function SideBar() { 



  
  const menuIndex = useMenuStore()
  const router = useRouter()
  const showSmallMenu = (router.pathname.toString().split('/').length >=3) || (menuIndex.index == 4) ? true : false
  //const increasePopulation = useMenuStore((state) => state.setMenuIndex)
  return (
    <div className={`h-screen ${showSmallMenu ? "min-w-[100px]" : "xl:min-w-[285px] min-w-[100px]"} select-none flex flex-col bg-[#060606] transition-transform duration-500  border-r-[1px] border-r-[#9a9768]  border-opacity-40 `}>
      <div className="min-h-[100px] flex items-center justify-start space-x-4 border-b-[1px]  text-xl font-bold  border-white border-opacity-20">
      
    <div className={`${!showSmallMenu ? "hidden":"block"}`}>
       
         <img className="h-[30px] ml-[37px]  mt-2    " src="/images/logo-payme.png" />
      
      </div>  
    <div className={`${showSmallMenu ? "hidden":"block"}`}>
      
      <img className="h-[30px] ml-[32px] mt-2 hidden xl:block  " src="/images/logo-payme-complet.png" />
      <img className="h-[30px] ml-[21px] mt-2   xl:hidden  " src="/images/logo-payme.png" />
       
      </div>  
      
      </div>

      <div className="flex flex-col flex-1 mt-4 space-y-1 overflow-y-scroll no-scrollbar ">
        <MenuItem
        isSmallMenu={showSmallMenu}
        index={menuIndex.index}
        indexDefault={0}
        handleClick={()=> {
          menuIndex.setMenuIndex(0)
          router.push("/dashboard")
        }}
        
          icon={
            <RiDashboardFill className={`${showSmallMenu ? "absolute    left-[30px] w-10 h-10 mr-6  " :"absolute   left-[30px] w-10 h-10 mr-6 xl:static"}`} />
          }
          name={"Accueil"}
        />
        <MenuItem
        isSmallMenu={showSmallMenu}
        index={menuIndex.index}
        indexDefault={1}
        handleClick={ ()=>{
          menuIndex.setMenuIndex(1)
          router.push("/finances")
        }}
          icon={
            <BsFillCreditCardFill className={`${showSmallMenu ? "absolute  left-[30px] w-9 h-9 mr-6  " :"absolute  left-[30px] w-9 h-9 mr-6 xl:static"}`} />
          }
          name={"Finances"}
        />
        <MenuItem
        isSmallMenu={showSmallMenu}
        index={menuIndex.index}
        indexDefault={2}
        handleClick={()=> {
          menuIndex.setMenuIndex(2)
          router.push("/gestions")
        }}
          icon={
            <PiListBulletsFill className={`${showSmallMenu ? "absolute  left-[30px] w-9 h-9 mr-6  " :"absolute  left-[30px] w-9 h-9 mr-6 xl:static"}`} />
          }
          name={"Gestions"}
        />
        <MenuItem
        isSmallMenu={showSmallMenu}
        index={menuIndex.index}
        indexDefault={3}
        handleClick={()=> {
          menuIndex.setMenuIndex(3)
          router.push("/setting")
        }}
          icon={<BsPersonFill className={`${showSmallMenu ? "absolute  left-[30px] w-9 h-9 mr-6  " :"absolute  left-[30px] w-9 h-9 mr-6 xl:static"}`} />}
          name={"Compte"}
        />
        <div className="flex-1"></div>
        <MenuItem
        isSmallMenu={showSmallMenu}
        index={menuIndex.index}
        indexDefault={4}
        handleClick={()=> {
          menuIndex.setMenuIndex(4)
          router.push("/trash")
        }}
        icon={<svg className={`${showSmallMenu ? "absolute  left-[30px] w-9 h-9 mr-6  " :"absolute  left-[26px] w-9 h-9 mr-6 xl:static"}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0345 6.26684C14.2351 6.26684 16.4358 6.26684 18.6364 6.26684C19.2966 6.26684 19.4947 6.48324 19.4433 7.13427C19.1408 11.0196 18.8394 14.9044 18.5392 18.7886C18.4475 19.9595 18.3852 21.1323 18.3054 22.3032C18.2856 22.7663 18.0849 23.2031 17.7464 23.5198C17.408 23.8365 16.9588 24.0078 16.4954 23.9968C13.5282 24.0011 10.5606 24.0011 7.59281 23.9968C6.53833 23.9968 5.80478 23.3384 5.71951 22.2748C5.60214 20.8031 5.52603 19.3277 5.41508 17.8551C5.15406 14.3653 4.88753 10.8757 4.61551 7.38642C4.60634 7.27731 4.599 7.16819 4.59075 7.05908C4.55132 6.49333 4.76405 6.26134 5.34448 6.26042C7.0561 6.26042 8.76497 6.26042 10.4711 6.26042H12.0299L12.0345 6.26684ZM12.3884 15.1006C12.3884 13.5143 12.3884 11.928 12.3884 10.3408C12.3884 10.1006 12.3242 9.93002 12.0647 9.91718C11.8052 9.90434 11.6704 10.0676 11.6558 10.3234C11.6494 10.4463 11.6558 10.5691 11.6558 10.6902C11.6558 12.6182 11.6558 14.5465 11.6558 16.4751C11.6558 17.6103 11.6475 18.7455 11.6668 19.8806C11.6883 20.0457 11.7731 20.196 11.9033 20.2997C11.9666 20.351 12.1995 20.2997 12.2582 20.2263C12.3439 20.0922 12.387 19.9352 12.382 19.7761C12.3902 18.2192 12.3875 16.6604 12.3884 15.1006ZM15.9993 10.5159C16.025 10.2473 16.0433 9.95844 15.6811 9.92268C15.3831 9.89425 15.296 10.1125 15.2759 10.3747C15.0313 13.5088 14.7868 16.6429 14.5423 19.777C14.5203 20.0466 14.5423 20.3052 14.8651 20.3318C15.1878 20.3584 15.252 20.1053 15.2722 19.8366C15.5118 16.7319 15.7542 13.6259 15.9993 10.5187V10.5159ZM8.04853 10.6012C8.22336 12.863 8.39911 15.1248 8.57577 17.3866C8.63996 18.2045 8.71423 19.0215 8.77383 19.8394C8.79309 20.1145 8.8481 20.352 9.18187 20.3254C9.51564 20.2988 9.53214 20.0393 9.50372 19.7752C9.50372 19.7349 9.50372 19.6936 9.49638 19.6523C9.30688 17.2408 9.11738 14.8289 8.92788 12.4168C8.87653 11.763 8.82335 11.1083 8.772 10.4545C8.75091 10.1794 8.71515 9.89609 8.35571 9.92268C8.02194 9.94652 8.01277 10.2161 8.03845 10.4728C8.04486 10.5224 8.04578 10.5627 8.04853 10.604V10.6012Z" fill="#9F9F9F"/>
        <path d="M15.2787 2.81731H19.2032C19.8542 2.81731 19.911 2.87416 19.9101 3.51235C19.9101 4.04601 19.9028 4.57875 19.9101 5.11149C19.9156 5.43792 19.768 5.59472 19.4461 5.59747C19.3544 5.59747 19.2554 5.59747 19.1601 5.59747H4.81087C4.1901 5.59747 4.13325 5.5397 4.1305 4.91618C4.1305 4.42471 4.125 3.93322 4.1305 3.44175C4.1305 2.89708 4.21486 2.81731 4.74393 2.81731C5.93595 2.81731 7.11972 2.80539 8.30716 2.82465C8.65468 2.83106 8.80964 2.75404 8.77296 2.37534C8.74321 2.08958 8.75588 1.80098 8.81056 1.51892C8.8986 1.0932 9.13051 0.710773 9.46732 0.435915C9.80413 0.161057 10.2253 0.0105313 10.66 0.00964012C11.5623 -0.0022801 12.4646 -0.00411398 13.3659 0.00964012C14.4589 0.0252281 15.2649 0.851391 15.2796 1.94989C15.2823 2.2213 15.2787 2.4918 15.2787 2.81731ZM10.0154 2.78613H14.0454C14.0454 2.51105 14.0518 2.25339 14.0454 1.99756C14.0307 1.49508 13.7905 1.25576 13.2806 1.24934C12.6388 1.24017 11.9969 1.26493 11.3551 1.23834C10.0209 1.18149 9.9173 1.47674 10.0154 2.78613Z" fill="#9F9F9F"/>
        </svg>
        }
        /*   icon={<BsTrash3Fill className={`${showSmallMenu ? "absolute  left-[30px] w-9 h-9 mr-6  " :"absolute  left-[26px] w-9 h-9 mr-6 xl:static"}`} />} */
          name={"Corbeille"}
        />
        
      </div>
      <div className="mb-14"></div>
    </div>
  );
}

export default SideBar;

function MenuItem({ name, icon,handleClick,indexDefault,index,isSmallMenu=false,className="", }) {
  return (
    <div onClick={handleClick} className={`min-h-[65px] relative ${indexDefault == index ? 'text-primary bg-[#ffffff15] bg-opacity-100' : 'text-[#9e9e9e] bg-gray-400 bg-opacity-10'} flex items-center font-semibold    hover:bg-opacity-10 cursor-pointer bg-opacity-5  text-[19px] px-10 ${className}`}>
      {icon} <p className={`${isSmallMenu ? "hidden" : "hidden xl:block"} `}>{name}</p>
      
    </div>
  );
}


//hover:text-primary