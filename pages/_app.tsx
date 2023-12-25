import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import ReactPlayer from 'react-player'
import "../styles/globals.css";
import UserLayout from "../components/Layout/UserLayout";
import useMenuStore from "../utils/MenuStore";
import Head from "next/head";
import { ModalProvider } from "../components/Items/modal-provider";
import ButtonComponent from "../components/UI/ButtonComponent";
//const { webFrame } = require("electron");
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from "next/router";
import { useWindowSize } from "usehooks-ts";

function MyApp({ Component, pageProps }) {
  /*   useEffect(() => {
    if (window.innerWidth < 1440) {
      webFrame.setZoomFactor(0.9);
    }
    else if (window.innerWidth < 1370) {
      webFrame.setZoomFactor(0.8);
    }
    else {
      webFrame.setZoomFactor(1);
    }
  }, []);   */


  const windowSize = useWindowSize();
  const [zoomValue, setZoomValue] = useState(100)
 

  useEffect(() => {
     
    if (windowSize.width < 1440 && windowSize.width > 1370) {
      setZoomValue(x=> x = 80)     }
    else if (windowSize.width < 1370) {
      setZoomValue(x=> x = 70)     }
    else {
      setZoomValue(x=> x = 100) 
    }
  
    return () => {
      
    }
  }, [windowSize.width])
  

  const [firstView, setFirstView] = useState("")
  const [accessToken, setAccessToken] = useState("null")
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    setIsLoading(x=> x = true)
   
    setFirstView(window.localStorage.getItem("firstView"))



    if(window.localStorage.getItem("accessToken")){
    
      setAccessToken(x=> x =window.localStorage.getItem("accessToken"))
              
  
    }else{
    setTimeout(()=>{
      setAccessToken("yes")
    },2300)
    }
  }, []) 
 
  const router = useRouter()
 
  const menuIndex = useMenuStore();

/* 

if( firstView != "false" && menuIndex.index == 0){
return(
  <>
  <div className="absolute z-50 flex flex-col items-center justify-center w-full h-screen no-scrollbar bg-[#121212]/90 ">
    
    <p className="font-bold text-center lg:leading-[70px] leading-[60px] text-[50px] lg:text-[70px]">Bienvenue sur <br /> 
Payme.</p>
<div className="flex flex-col text-[14px] leading-[20px] lg:text-[15px] px-10 text-center opacity-50 mt-8 justify-center items-center">
<p>Nous sommes heureux de vous accueillir pour votre première utilisation.</p>
<p>Profitez-en au maximum et n'hésitez pas à nous faire part de vos commentaires pour que nous puissions</p>
<p>continuer à améliorer les fonctionnalités</p>
</div>
 
<div 
onClick={()=>{
window.localStorage.setItem("firstView","false")
setFirstView(x=> x ="false")
menuIndex.setMenuIndex(0)
}}
className=" bg-gradient-to-r from-[#757576] to-[#4F4F51] cursor-pointer   w-[150px]   mt-8 justify-center flex  border-none  h-[45px]   font-light text-[14px]  items-center rounded-full">
Commencer
</div>


            
   </div>
   <div className="absolute z-30 flex flex-col items-center justify-center w-full h-screen no-scrollbar bg-black/20 blur-md ">
    
 <div className="opacity-100">
 <UserLayout>
     
     <Component {...pageProps} />
   </UserLayout>
 </div>

            
   </div> 
   </>
)
} */



  if (menuIndex.index >= 0) {
    return (
      <GoogleOAuthProvider clientId="112591883885-brb0s76c5e2tj09fsj929he940e7q780.apps.googleusercontent.com">

     
      <div className="relative overflow-hidden">
    
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <UserLayout>
         
        {router.asPath != "/"  &&
      <Component {...pageProps} />
      
      }
        </UserLayout>
      </div>
      </GoogleOAuthProvider>
    );
  } else {
    
    return (
      <>
     
    
       <GoogleOAuthProvider clientId="112591883885-brb0s76c5e2tj09fsj929he940e7q780.apps.googleusercontent.com">

       <div className="relative overflow-hidden bg-gradient-to-b from-[#2e2e2ee3] to-[#060606]">
 
{/*  
    { (  accessToken == "null" ) && <div className="absolute z-50 flex items-center justify-center w-screen h-screen no-scrollbar bg-[#2C2B2C] ">
<div className="flex items-center justify-center " >
   
{isLoading && <ReactPlayer 
height={1000}
width={1000}
  
url='/videos/Animation.webm' playing={true} muted  />}
    
       </div>
</div>  }
 */}


      
   
         <div className="flex items-center justify-center w-screen h-screen overflow-scroll no-scrollbar " >
         
          <div className="flex flex-col w-full" style={{"zoom":`${zoomValue}%`}}>
    
    {/* 
            <main className="flex-1 overflow-scroll no-scrollbar">  {children}  </main> */}
             <main className="flex-1 h-full overflow-scroll no-scrollbar ">  
             
             <Component {...pageProps}   />  
             
              </main>
          </div>
        
        </div>
        
 
 


      
 
 
      
     
    </div>
    </GoogleOAuthProvider>
    </>
    )
  }
}

export default MyApp;
