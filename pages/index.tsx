import React from "react";
import Head from "next/head";
import Link from "next/link";
import ReactCrop, { type Crop } from "react-image-crop";
import { useState, useEffect , useRef} from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import InputComponent from "../components/UI/InputComponent";
import ButtonComponent from "../components/UI/ButtonComponent";
import { useRouter } from "next/router";
import useMenuStore from "../utils/MenuStore";
import PdfBuilder from "../components/PdfDemo";

import { jwtDecode } from "jwt-decode";
import { saveAs } from "file-saver";
import { useGlobalModal } from "../utils/use-global-modal";
import { IoMdClose } from "react-icons/io";
import { GoogleLogin, useGoogleLogin, googleLogout } from "@react-oauth/google";
import { BiXCircle } from "react-icons/bi";

function Home(props) {
  async function fetchFacture() {
   
  
    const request = await fetch("paymefinance.com/api/pupe?email=Abouba");
    const dataBlob = await request.blob();

    const blob = new Blob([dataBlob], { type: "application/pdf" });
    console.log(blob);

    return blob;
  }

  /*   const [posts, setPosts] = useState([])
 
  async function fetchPosts() {
      const request = await fetch("https://jsonplaceholder.typicode.com/posts")
      const data = await request.json()
      setPosts(data)
  }

useEffect(()=>{
  fetchPosts()
}, []) 

*/

const [accessToken, setAccessToken] = useState("")
useEffect(()=>{
  

  setAccessToken(window.localStorage.getItem("accessToken"))
}, []) 

/* const googleLogin = useGoogleOneTapLogin({
  onSuccess: credentialResponse => {
    console.log(credentialResponse);
  },
  onError: () => {
    console.log('Login Failed');
  },
}); */

const login = useGoogleLogin({
  onSuccess: codeResponse => console.log(codeResponse),
  flow: 'auth-code',
});

const googleSigninRef = useRef(null);
const [loadingSimulation, setLoadingSimulation] = useState(false);
const [showLoginPannel, setShowLoginPannel] = useState(true);
const [showLoginGoole, setShowLoginGoole] = useState(false);
  const router = useRouter();
  const menuIndex = useMenuStore();
  const [modalView, setModalView] = useState(false);
  const [modalViewContent, setModalViewContent] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState<User>({
    email: "",
    image: "",
    name: "",
    address: "",
    country: "",
    countryPhoneCode: "",
    lockCode: false,
    code: "",
    number: "",
    password: "",
    normalSignUp: true,

    emailVerified: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitAuth = async (data) => {
   
    setLoadingSimulation(x => x= true)
    setShowLoginPannel(x => x= false)
    
     


    if(isLogin){
     
      const request = await fetch(`${process.env.BASE_API_URL}/api/loginAuth`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await request.json();

    if(request.status ==200){

    
 


setTimeout(() => {
  router.replace("/user")
  googleLogout();
  window.localStorage.setItem("accessToken",result.accessToken)
  window.localStorage.setItem("userId",result.id)

  menuIndex.setMenuIndex(0)
}, 2000);
        

    }
      


    if(request.status ==401){
      
      setModalView(x=> x=true);
      setModalViewContent(x=> x = result.message);
      setLoadingSimulation(x => x= false)
      setShowLoginPannel(x => x= true)
          }
      return;
    } 

    


    const request = await fetch(`${process.env.BASE_API_URL}/api/userfreeAuth?email=${data.email}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "GET",
      
    });
    const result = await request.json();

    if (request.status == 200) {
    
      menuIndex.setMenuIndex(-10);
      router.push({
        pathname: "/auth/register",
        query: data as any,
      },"/auth/register");
    }else{
      setModalView(x=> x=true);
      setModalViewContent(x=> x = result.message);
      setLoadingSimulation(x => x= false)
      setShowLoginPannel(x => x= true)
 
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSimulation(x => x= true)
    setShowLoginPannel(x => x= false)
    
    if (data.email.trim().length <= 5 && data.password.trim().length <= 5) {
      alert("Error ");
      return;
    }



    if(isLogin){
     
      const request = await fetch(`${process.env.BASE_API_URL}/api/login`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await request.json();

    if(request.status ==200){

    
 


setTimeout(() => {
  router.replace("/user")
  window.localStorage.setItem("accessToken",result.accessToken)
  window.localStorage.setItem("userId",result.id)

  menuIndex.setMenuIndex(0)
}, 2000);
        

    }
      


    if(request.status ==401){
      
      setModalView(x=> x=true);
      setModalViewContent(x=> x = result.message);
      setLoadingSimulation(x => x= false)
      setShowLoginPannel(x => x= true)
          }
      return;
    }else{
     // setShowLoginPannel(x => x= true)
     // setLoadingSimulation(x => x= false)
    }

    /* 
    
    const request = await fetch(`${process.env.BASE_API_URL}/api/userfree`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await request.json();
    
    */


    const request = await fetch(`${process.env.BASE_API_URL}/api/userfree?email=${data.email}&password=${data.password}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "GET",
      
    });
    const result = await request.json();

    if (request.status == 200) {
    
      menuIndex.setMenuIndex(-10);
      router.push({
        pathname: "/auth/register",
        query: data as any,
      },"/auth/register");
    }else{
      setModalView(x=> x=true);
      setModalViewContent(x=> x = result.message);

 
    }
  };

  function InfoView() {
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center pb-0 transition bg-black/0 ">
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
  
 
<div className="flex items-center justify-start gap-3 ">
<div>
     {!modalViewContent.includes("passe") && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1201_45)">
<path d="M21.8887 12.2222C21.8887 17.7462 17.4111 22.2222 11.8887 22.2222C6.36621 22.2222 1.88867 17.7462 1.88867 12.2222C1.88867 6.70132 6.36621 2.22217 11.8887 2.22217C17.4111 2.22217 21.8887 6.70132 21.8887 12.2222ZM11.8887 14.2383C10.8643 14.2383 10.0338 15.0687 10.0338 16.0931C10.0338 17.1175 10.8643 17.948 11.8887 17.948C12.9131 17.948 13.7435 17.1175 13.7435 16.0931C13.7435 15.0687 12.9131 14.2383 11.8887 14.2383ZM10.1277 7.57112L10.4268 13.055C10.4408 13.3116 10.6529 13.5125 10.9099 13.5125H12.8674C13.1244 13.5125 13.3366 13.3116 13.3506 13.055L13.6497 7.57112C13.6648 7.29394 13.4441 7.06088 13.1665 7.06088H10.6108C10.3332 7.06088 10.1125 7.29394 10.1277 7.57112Z" fill="#FFA300"/>
</g>
<defs>
<clipPath id="clip0_1201_45">
<rect width="20" height="20" fill="white" transform="translate(1.88867 2.22217)"/>
</clipPath>
</defs>
</svg>}
     {modalViewContent.includes("passe") && 
     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M20 10C20 15.5241 15.5225 20 10 20C4.47754 20 0 15.5241 0 10C0 4.47915 4.47754 0 10 0C15.5225 0 20 4.47915 20 10ZM10 12.0161C8.97561 12.0161 8.14516 12.8466 8.14516 13.871C8.14516 14.8954 8.97561 15.7258 10 15.7258C11.0244 15.7258 11.8548 14.8954 11.8548 13.871C11.8548 12.8466 11.0244 12.0161 10 12.0161ZM8.23899 5.34895L8.5381 10.8328C8.5521 11.0894 8.76427 11.2903 9.02125 11.2903H10.9788C11.2357 11.2903 11.4479 11.0894 11.4619 10.8328L11.761 5.34895C11.7761 5.07177 11.5554 4.83871 11.2779 4.83871H8.7221C8.44452 4.83871 8.22387 5.07177 8.23899 5.34895Z" fill="#D65745"/>
     </svg>
     
     }

      </div>
 
    <p>  {modalViewContent}</p>
</div>
 
  
         
        </div>
        
      </div>
    );
  }
  
  return (
    <>
    <React.Fragment>
       { (loadingSimulation && !showLoginPannel) && <div className="absolute z-50 flex items-center justify-center w-screen h-screen bg-[#060606]/30 ">

 
<svg aria-hidden="true" className="w-[60px] h-[60px]  opacity-30  animate-spin dark:text-gray-600 fill-yellow-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
   
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill=""/>
    </svg>
</div>  }


       {modalView && InfoView()}
     {(!loadingSimulation && showLoginPannel  ) && <div className="h-screen bg-gradient-to-b p-10 pt-14 from-[#2e2e2ee3] flex justify-center items-center flex-col   to-[#060606]">
       <div className="flex items-center justify-center">
       <img className="h-[70px]  mb-10  " src="/images/logo-payme-complet.png" />
    
       </div>
        <form
          onSubmit={handleSubmit}
          className="w-[590px]  transition-all duration-500 flex flex-col p-8 px-16 items-center bg-gradient-to-b from-[#515151] to-[#2a2a2a] rounded-[50px]"
        >
       
          <p className="mb-6 text-2xl font-light opacity-40">Identifiez-vous</p>
          { !isLogin &&    <InputComponent
            name="name"
            value={data.name}
            onChange={handleChange}
            className="p-7  pl-[28px] mb-4  mt-0 font-normal  rounded-xl border-2 border-opacity-30"
            placeholder="Nom & prenom *"
            type="text"
          />}
          <InputComponent
            name="email"
            value={data.email}
            onChange={handleChange}
            className="p-7  pl-[28px] my-0 font-normal mb-4  rounded-xl border-2 border-opacity-30"
            placeholder={`${isLogin ? "Votre identifiant *" : "Votre email *"} `}
          />

    
          <InputComponent
            name="password"
            value={data.password}
            onChange={handleChange}
            className="p-7  pl-[28px] mb-4  font-normal  rounded-xl border-2 border-opacity-30"
            placeholder="Votre mot de passe *"
            type="password"
          />
          

          <p className="self-end mb-8 mr-4 text-[13px]  font-light opacity-60">
            Mot de passe perdu ?
          </p>
          <div className="flex items-center justify-center w-full space-x-2 ">
            <div className="border rounded-full border-white/40">
            <ButtonComponent
              /*   handleClick={()=>{
              menuIndex.setMenuIndex(0)
              router.push("/user")
             
            }} */
              type="submit"
              labelClassName="text-[16px] "
              label={isLogin ? "Se connecter" : "S'inscrire"}
              className="flex-1 hover:bg-[#0606062E] h-[46px] border-1 border-opacity-100 border-white "
            />
            </div>
            <p className="text-sm opacity-50"> ou </p>
   
          <div className="relative">
          <ButtonComponent
              handleClick={() => {
             setShowLoginGoole(x=> x = !x)
               // login();
                //menuIndex.setMenuIndex(-10);
               // router.push("/auth/register");
              }}
              Icon={FcGoogle}
              type="button"
              label="Google"
              labelClassName="text-[16px] "
              className="bg-[#515151] border-none w-[130px] h-[46px]  "
            />
        {showLoginGoole &&  <div className="absolute flex items-center justify-center gap-2 -left-20 -top-12">
          <GoogleLogin
          shape="pill"
          theme="filled_black"
  onSuccess={credentialResponse => {
    const credent = jwtDecode(credentialResponse.credential);
   
    const data = credent as any;
    console.log(data);
   handleSubmitAuth(data)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
  <BiXCircle
  onClick={()=>{   setShowLoginGoole(x=> x = false)}}
  className="w-5 h-5 cursor-pointer" />
          </div>}
          </div>
          
            <ButtonComponent
              handleClick={() => {
                menuIndex.setMenuIndex(0);
                router.push("/factureCalculator");
              }}
              Icon={AiFillApple}
              label="Apple ID"
              labelClassName="text-[16px] "
              className="bg-[#515151] border-none w-[130px] h-[46px] "
            />
          </div>
        </form>
        <div className="flex my-8 text-xl">
          <p className="font-light opacity-40">Vous êtes nouveau ici ?</p>
          <span
            onClick={() => {
            
              setIsLogin((x) => (x = !x));
              /*   const dd =  await  fetchFacture()
       
        saveAs(dd, "my super facture.pdf"); */
            }}
            className="ml-2 text-white cursor-pointer"
          >
            {isLogin ? "Créez un compte" : "Se connecter"}
          </span>
        </div>
        <p className="mt-4 text-[12px] font-light opacity-40">
          En cliquant sur les boutons de connexion ci-dessus, vous reconnaissez
          avoir lu, compris et accepté les <span className="underline">Conditions générales</span> et la <span className="underline">Politique
          de confidentialité </span> de Payme.
        </p>
      </div>}
    </React.Fragment>
    </>
  );
}

export default Home;
