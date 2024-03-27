import React, { useEffect, useRef, useState } from "react";
import { HiFolder, HiFolderAdd } from "react-icons/hi";
import { IoIosArrowBack, IoIosNotifications, IoIosPeople, IoMdBusiness } from "react-icons/io";

import { useRouter } from "next/router";
import ButtonComponent from "../../../components/UI/ButtonComponent";
import { HuePicker,AlphaPicker } from "react-color";
import PdfBuilder from "../../../components/PdfDemo";
import { LiaFileAltSolid } from "react-icons/lia";
import useMenuStore from "../../../utils/MenuStore";
import { fetchAllCategories, fetchAllCategoriesFree, fetchAllInvoices, fetchAllInvoicesFree, updateInvoice } from "../../../services/invoiceService";
import { BiCheck } from "react-icons/bi";
import { useGlobalModal } from "../../../utils/use-global-modal";


function FacturesFirst({userData,onConfirm,onExit}) {
  const [currentBlob, setCurrentBlob] = useState<any>(null);

  const modal = useGlobalModal();
  async function fetchPdf(invoiceFileName,enterprise,project,invoiceType,signed,primaryColor,secondaryColor,primaryTextColor,secondaryTextColor) {
   
    
 
    userData.id =  userData.email!
    
    const request = await fetch(`${process.env.BASE_API_URL}/api/factureimg`,{
      
      method:"POST",
      body:JSON.stringify({invoiceFileName:invoiceFileName,enterprise:enterprise,project:project,invoiceType:invoiceType,signed:signed,primaryColor,secondaryColor,primaryTextColor,secondaryTextColor})
  
  });
    const dataBlob = await request.blob();
  
    const blob = new Blob([dataBlob], { type: "image/png" });
    
    return URL.createObjectURL(blob);
    return blob;
  }


  
  const updateInvoiceViewer = async (type?) => {
    let dd =  await  fetchPdf(currentInvoice.invoiceFileName,enterpriseFakeTest,projetFake, type ?? 1,false,primaryColor,secondaryColor,primaryTextColor,secondaryTextColor)
 
    setCurrentInvoice(x=>  x = {...currentInvoice,["primaryColor"]: primaryColor,["secondaryColor"]: secondaryColor})
   
setCurrentBlob(x => x = dd)
  } 

  const router = useRouter()
  const menuIndex = useMenuStore()
  const paramInfo:any = router.query 
   
  function convertAlphaToHex(alphaDecimal) {
    // Convert alphaDecimal to a value between 0 and 1
    const alpha = alphaDecimal / 100;
  
    // Calculate the equivalent alpha value in the range of 0 to 255
    const alphaInt = Math.round(alpha * 255);
  
    // Convert alphaInt to hexadecimal string
    const alphaHex = alphaInt.toString(16).toUpperCase();
  
    // Pad the hexadecimal value with leading zero if needed
    const paddedAlphaHex = alphaHex.padStart(2, '0');
  
    return paddedAlphaHex;
  }

  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(null);
  const [modalViewInvoice, setModalViewInvoice] = useState(false);
  const [firstView, setFirstView] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalViewContent, setModalViewContent] = useState("");
  useEffect(() => {
    if(modalView){
     setTimeout(() => {
       setModalView(x=> x = false)
     }, 4000);
    }
   
       return () => {};
     }, [modalView]);
     const enterpriseFake = user?.enterprise
  const enterpriseFakeTest ={
    "id":user?.id,
    "email": "test@test.com",
    "activity": "Lorem ipsum dolor sit ame",
    "address": "Curabitur est sapien, sollicitudin eget condimentum",
    "numbers": "[{\"id\":\"b34ea58c-f34c-4d9b-82b4-3950c8d261d2\",\"indicatif\":\"223\",\"number\":\"90909090\"},{\"id\":\"53c30284-7246-4cc1-9eaf-d6f5408360f1\",\"indicatif\":\"223\",\"number\":\"39393933\"}]",
    "currency": "223",
    "name": "Devenir pro",
    "nif": "[{\"id\":\"48ef830a-4049-4368-9a73-ce790372992d\",\"content\":\"NIF:121291290112\"}]",
    "statut": "Société à responsabilité limitée (SARL)",
    "bankNumber": "1212921921212MALI",
    "website": "www.test.com",
    "factureNumber": 25,
    "codeFinance": null,
    "lockFinance": null,
    "userId": user?.id,
    "createdAt": "2024-01-02T18:52:23.000Z",
    "deletedAt": null,
    "inTrash": false,
    "updatedAt": "2024-01-02T18:52:23.000Z",
    "rccm": "Bamako.ML400"
}
const projetFake =   {
  "id": "clr14br8i000v4c5i62lvc47f",
  "name": "Lorem ipsum dolor sit amet consectetur",
  "type": "ISVALIDATE",
  "invoiceNumber": 63,
  "proformaDate": null,
  "invoiceDate": "2024-01-05T21:36:53.000Z",
  "discountItemTable": null,
  "table": "[{\"id\":\"f99006ec-1c53-437c-be0c-a4d340c4d902\",\"designation\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi fugit pariatur repudiandae natus tempora eligendi voluptas quod quidem molestiae\",\"quantity\":700000,\"rate\":20,\"amount\":14000000},{\"id\":\"f99006ec-1c53-437c-be0c-a4d340c4d902\",\"designation\":\"item\",\"quantity\":700000,\"rate\":20,\"amount\":14000000},{\"id\":\"04b6310d-979d-44df-a9e5-8dfc913f4004\",\"designation\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi fugit pariatur repudiandae natus tempora \",\"quantity\":80000,\"rate\":50,\"amount\":4000000},{\"id\":\"97977560-4656-49a7-ab28-62cf5bcf63a0\",\"designation\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi fugit pariatur repudiandae natus tempora \",\"quantity\":778,\"rate\":677,\"amount\":526706}]",
  "amountTotal": "17926440",
  "tva": "18",
  "inTrash": false,
  "createdAt": "2024-01-05T20:58:22.000Z",
  "updatedAt": "2024-01-05T20:58:22.000Z",
  "deletedAt": null,
  "customerId": "clqznsd4t0025rm7n794kw2k1",
  "userId": "clqwpi6m5000413l5nnyefwrx",
  "discount": "18",
  "invoiceType": 0,
  "modalite": "50",
  "remarque": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi fugit pariatur repudiandae natus tempora sit amet consectetur",
  "customer": {
      "id": "clqznsd4t0025rm7n794kw2k1",
      "externalContact": "713909093",
      "externalEmail": "sula@mailinator.com",
      "externalName": "",
      "activity": "Commerce de Détail",
      "address": "Minus ipsam quae ips",
      "country": "Émirats Arabes Unis",
      "email": "sula@mailinator.com",
      "image": "",
      "name": "Steven Case",
      "type": "PERSONAL",
      "inTrash": false,
      "createdAt": "2024-01-04T20:27:37.000Z",
      "updatedAt": "2024-01-04T20:27:37.000Z",
      "deletedAt": null,
      "userId": "clqwpi6m5000413l5nnyefwrx",
      "poste": ""
  }
}

 
  
  const [typeFactures, setTypeFactures] = useState([]);
  const [invoicesAll, setInvoicesAll] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);

  const shuffle = (array: string[]) => { 
    return array
     for (let i = array.length - 1; i > 0; i--) { 
       const j = Math.floor(Math.random() * (i + 1)); 
       [array[i], array[j]] = [array[j], array[i]]; 
     } 
     return array; 
   }; 

  const fetchTypeFactures = async () => {
    const data = await fetchAllCategoriesFree();
    const dataInvoice = await fetchAllInvoicesFree();
    setTypeFactures(data)
    
    setInvoicesAll(shuffle(dataInvoice))
    
    setInvoices(shuffle(dataInvoice).slice(0, sliceValue))
    setUser(userData)
/*     const dataUser = await fetchUser()
    */
  
  
    }
   
  
    useEffect(() => {
      (async () => {
        fetchTypeFactures()
  
      })();
    
  
   
      
    }, [])
  
  

  const handleScroll = event => {
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
   
     
    setScrollTop(event.currentTarget.scrollTop);
    if(bottom){
      setSliceValue(x => x = sliceValue + 20);
      setInvoices(x=> x = invoicesAll.slice(0, sliceValue))
    }
   // setSliceValue(x => x = sliceValue + 5)
  };

  const [invoicesFilter, setInvoicesFilter] = useState([]);
  const [sliceValue, setSliceValue] = useState(100);
  const [currentInvoice, setCurrentInvoice] = useState<any>({});
  const [currentInvoiceShow, setCurrentInvoiceShow] = useState<any>({});
  const [currentCategory, setCurrentCategory] = useState<any>(0);

 
  const primaryColorRef = useRef<any>(null)
  const secondaryColorRef = useRef<any>(null)
  const [saturationColor, setSaturationColor] = useState("100");
  const [saturationValue, setSaturationValue] = useState("");
  const [primaryColor, setPrimaryColor] = useState(``);
  const [secondaryColor, setSecondaryColor] = useState(``);
  const [primaryTextColor, setPrimaryTextColor] = useState(``);
  const [secondaryTextColor, setSecondaryTextColor] = useState(``);

  useEffect(() => {
    const calculateBrightness = (color) => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness;
    };

    const isDarkBackground = calculateBrightness(primaryColor) < 128;
    const newTextColor = isDarkBackground ? 'white' : 'black';
    setPrimaryTextColor(newTextColor);
}, [primaryColor]);

  useEffect(() => {
    const calculateBrightness = (color) => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness;
    };

    const isDarkBackground = calculateBrightness(secondaryColor) < 128;
    const newTextColor = isDarkBackground ? 'white' : 'black';
    setSecondaryTextColor(newTextColor);
}, [secondaryColor]);
  return (
   <div className="w-screen h-screen flex justify-center items-center p-20 bg-gradient-to-b from-[#ffaaaa00]">

{modalViewInvoice && InfoViewInvoice()}
     <div className="flex  select-none bg-gradient-to-b from-[#1c1c1c] to-[#1B1A1A] rounded-3xl ">
      <div className="flex flex-col w-full h-full ">
        <SearchElement />
        <div className="flex p-10 ml-5 max-w-[580px] space-x-3 overflow-x-scroll text-sm pb-7 pt-7 no-scrollbar xl:w-full ">


      
        <div

onClick={()=>{
  setInvoicesFilter([])
  setCurrentCategory(0)
}}
              key={0}
              className={`p-2 px-3 flex justify-center items-center min-h-[28px] ${currentCategory == 0 ?"bg-opacity-20" :"bg-opacity-10" } bg-white rounded-[10px] cursor-pointer group hover:text-white hover:bg-opacity-20 `}
            >
              <p className="opacity-60 group-hover:opacity-100">
              
              Tous
              </p>
            </div>

          {typeFactures.map((item) => (
            <div
            onClick={()=>{
              setInvoicesFilter(x => x = invoices.filter(x => x.categoryId == item.id))
              setCurrentCategory(x => x = item.id)
            }}
              key={item.id}
              className={`p-2 px-3 flex justify-center items-center min-h-[28px] bg-white rounded-[10px] cursor-pointer group hover:text-white hover:bg-opacity-20 bg-opacity-10 ${currentCategory == item.id ?"bg-opacity-20" :"bg-opacity-10" }`}
            >
              <p className="opacity-60 group-hover:opacity-100">
                {" "}
                {item.name}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap px-8 ml-6 overflow-scroll no-scrollbar md:items-start w-[700px] max-w-[700px]  h-[700px] max-h-[500px] ">
         
        {(invoicesFilter.length == 0 && currentCategory == 0 ) ? invoices.map((item) => (

<ItemFacture
handleClick={ async ()=>{
/* setPrimaryColor("") 
setSecondaryColor("") 
setPrimaryTextColor("") 
setSecondaryTextColor("")  */
setCurrentInvoice(x=> x = item)
setCurrentInvoiceShow(x=> x = item) 


let dd =  await  fetchPdf(item.invoiceFileName,enterpriseFakeTest,projetFake,1,false,primaryColor,secondaryColor,primaryTextColor,secondaryTextColor)

setCurrentBlob(x => x = dd)


//await  saveAs(dd, `page`); 




}}
key={item.id} item={item} />
))
:
invoicesFilter.map((item) => (

<ItemFacture
handleClick={async ()=>{
setPrimaryColor("") 
setSecondaryColor("") 
setPrimaryTextColor("") 
setSecondaryTextColor("") 
setCurrentInvoice(x=> x = item)
let dd =  await  fetchPdf(item.invoiceFileName,enterpriseFakeTest,projetFake,1,false,"","",primaryTextColor,secondaryTextColor)

setCurrentBlob(x => x = dd)


}}
key={item.id} item={item} />
))
}
      
      {/*     <ItemFacture />
          <ItemFacture />
          <ItemFacture />
          <ItemFacture />
          <ItemFacture />
          <ItemFacture />
          <ItemFacture />
          <ItemFacture /> */}
        </div>
      </div>

     {/*  <div className="h-auto rounded-tr-3xl rounded-br-3xl flex flex-col bg-[#262626] min-w-[340px]">
        <div className="h-[100px] border-b-[1px]  flex items-end mx-10 pb-6  border-white border-opacity-20">
          <p className="flex items-center justify-center opacity-50"> 
          <LiaFileAltSolid className="mr-2 w-[20px] h-[20px] opacity-50" />
          Aperçu Fichier</p>
        </div>

        <div className="flex justify-center w-full mt-10">
          <div className=" rpv-print__body-printing  print__zone  min-h-[324px] cursor-pointer min-w-[244px] w-[244px] flex 0   bg-gradient-to-b from-[#ffffff] to-[#ffffff] gradient-opacity-10 m-[6px]">
          
          </div>
        </div>

        <div className="flex flex-col leading-[1.2rem] px-12 py-4 text-[15px] font-normal space-y-1  text-white text-opacity-40">
          <p className="">
            <span className="mr-2 font-bold text-white">Modèle :</span>{" "}
            <span>Classique 1</span>{" "}
          </p>
          
        

          <div className="flex justify-center gap-3 px-0 pt-8 border-t border-white border-opacity-30">
            <ButtonComponent
               handleClick={onExit}
              label={"Annuler"}
             
              className="   bg-[#474646]   "
            />
            <ButtonComponent
            handleClick={ async ()  => {
 
              onConfirm()
             
   
        

         
            }}
              label={"Appliquer"}
              
              className="    bg-[#9a9768] "
            />
          </div>

           <div className="h-[30px]">

           </div>
        </div>
      </div> */}
       <div className="min-h-full flex flex-col   bg-[#262626] min-w-[340px]">
        <div className="h-[130px] border-b-[1px] flex items-end mx-10 pb-6  border-white border-opacity-20">
          <p className="flex items-center justify-center opacity-50"> 
          <LiaFileAltSolid className="mr-2 w-[20px] h-[20px] opacity-50" />
          Aperçu Fichier</p>
        </div>

 
      
        <div className="flex justify-center w-full mt-10 no-scrollbar ">

        {currentBlob != null && <img    className="overflow-hidden w-[244px] h-[343px] object-contain top-[110px] rounded-none no-scrollbar"    src={`${currentBlob}#toolbar=0`}  />}
         
        </div>
       {/*  <button className="" onClick={()=>{
        setSliceValue(x => x = sliceValue + 1);
          setInvoices(x=> x = invoicesAll.slice(0, sliceValue))
        }} >Add 5</button> */}
         
        <div className="flex flex-col leading-[1.2rem] px-12 py-4 text-[15px] font-normal space-y-1  text-white text-opacity-40">
          <p className="mb-2">
            <span className="mr-2 font-bold text-white">Modèle :</span>{" "}
            <span>{currentInvoice?.name?.toString().split(" ")[0]} {currentInvoice?.name?.split(" ")[1]?.toString().padStart(3, '0')}   </span>{" "}
          </p>
          <p className="pt-3 border-t border-white border-opacity-30">
            <span className="mr-2 font-bold text-white/50">Personnalisation</span>{" "}
            
          </p>
           
         {false && <div className="flex flex-col leading-[1.2rem] px-2 py-4 space-y-1  border-white border-opacity-30">
            <div className="flex items-center justify-between space-x-4">
              <span className="ml-[20px] opacity-70" >Primaire</span>
              <HuePicker
                color={primaryColor}
             

                
                onChangeComplete={()=>{
                  setTimeout(() => {
                    
                    updateInvoiceViewer();
                  }, 2000);
                }}
           
                onChange={(color) => {
                  setPrimaryColor(color.hex+saturationValue);
               
                }}
                className="flex-1 max-w-[135px] scale-75"
              />{" "}
            </div>
            <div>

 
            
            <div className="flex items-center justify-between space-x-4">
              <span className=" opacity-70">Secondaire</span>
              <HuePicker
                color={secondaryColor}
                onChange={(color) => {
                  setSecondaryColor(color.hex + saturationValue);
                }}
                className="flex-1 max-w-[155px] scale-75"
              />{" "}
            </div>
            
            </div>
            
          </div>}
          <div className="flex flex-col leading-[1.2rem] text-xs px-0 py-3 pt-1 space-y-1 border-t-0 border-white border-opacity-30">
      
     {currentInvoiceShow?.primaryColor == true && <div className="relative flex flex-col">
      <p className={`text-[$primaryColor] `}>Couleur primaire</p>
      
      
      <div
      onClick={()=>{
       // 
        setModalViewInvoice(true);
        setTimeout(() => {
          primaryColorRef.current?.click()
          
        }, 1000);
      }}
      className={` cursor-pointer p-4 rounded-lg bg-gradient-to-l from-white  to-${primaryColor} h-[50px] `}
      style={{backgroundColor: primaryColor}}
      ></div>
      <div className="absolute">
      <input  
       
       
       
       
       type="color" className={`${primaryColorRef ? "" : ""} cursor-pointer absolute bottom-0 opacity-0 max-h-4`} onChange={(e)=>{
            setPrimaryColor(e.target.value)
            console.log("demo");
         
            
            return;
            updateInvoiceViewer();
          /*   setTimeout(() => {
          
            }, 2000); */
          }} />   

         
      </div>

      </div>}
     
{currentInvoiceShow?.secondaryColor == true && <>
 <p>Couleur secondaire</p>

      
       

<div
onClick={()=>{
  setModalViewInvoice(true);
  setTimeout(() => {
    secondaryColorRef.current?.click()
    
  }, 1000);
}}
className={` cursor-pointer p-4 rounded-lg bg-gradient-to-l from-white  to-${secondaryColor} h-[50px] `}
style={{backgroundColor: secondaryColor}}
></div>
 <input  
 
 
 
 type="color" className={`${secondaryColor ? "" : ""} cursor-pointer absolute bottom-0 opacity-0 max-h-4`} onChange={(e)=>{
      setSecondaryColor(e.target.value)
      updateInvoiceViewer();
    /*   setTimeout(() => {
    
      }, 2000); */
    }} />   
 </>}

    
        
          { false && <div className="flex items-center justify-between space-x-[22px] pr-4 ">
              <span className=" opacity-70">Saturation  </span>
              <input id="small-range" type="range" onChange={(e) =>{
                 setSaturationColor(e.target.value)
                
              setSaturationValue(prev => convertAlphaToHex(e.target.value));
             
              
              }
                
               } value={saturationColor} className="w-full max-w-[100px]    h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-[#515151]"/>

             
            </div>}
            <div className="hidden">
              <span className="ml-[30px]  opacity-70" >Corps   </span>{" "}
            </div>
              {/* <span>1 {JSON.stringify(primaryColor.toString().substring(0,5) + saturationValue   )}</span> 
              <span>2 {JSON.stringify(secondaryColor.toString().substring(0,5) + saturationValue   )}</span>  */}
          </div>

         

        {currentInvoice?.invoiceFileName?.length   > 4 &&  <div className="flex justify-between px-0 pt-4 border-t-0 border-white border-opacity-30">
            
            <ButtonComponent
              label={"Aperçu"}
              handleClick={()=>{
                setModalViewInvoice(true);
              }}
              labelClassName="text-[15px]"
              className="  border-none !min-w-[112px]    text-[12px] text-center items-center justify-center bg-[#2b2b2b]   "
            />
            <ButtonComponent
            handleClick={async ()=>{

    /*        if(paramInfo.first =="true"){
            menuIndex.setMenuIndex(-1)
            router.push({
              pathname: "/",
              
            });
           }  */

  
                if(currentInvoice.id == undefined){
                  return
                }

           modal.onSubmit = (
            <ButtonComponent
            key={"submit"}
              handleClick={async () => {

              
 
                const invoiceInfo = {

                  name:currentInvoice.name,
                  invoiceFileName:currentInvoice.invoiceFileName,
                  primaryColor:primaryColor.toString().substring(0,7) + saturationValue,
                  secondaryColor:secondaryColor.toString().substring(0,7) + saturationValue,
                  primaryTextColor:primaryTextColor,
                  secondaryTextColor:secondaryTextColor,
                  
                }

                modal.onClose()
                onConfirm(invoiceInfo)
                      
                setModalViewContent("Le modèle de facture a été appliqué avec succès.")

                return
                
                      const data =     await updateInvoice(invoiceInfo);
                
                      console.log("data");
                      console.log(data);
                      
                      if(data.id != null){
                        modal.onClose();
                     

                       setUser(x => x = {...user,invoice:{...user.invoice,invoiceFileName:currentInvoice.invoiceFileName,primaryColor:primaryColor.toString().substring(0,7) + saturationValue,secondaryColor:secondaryColor.toString().substring(0,7) + saturationValue}})
                       setTimeout(() => {

                        setModalView(true);
                      
                        setModalViewContent("Le modèle de facture a été appliqué avec succès.")
                          
                         // router.back();
                         // router.back();
                          
  
                        },1000)
                       }
                
                // handleSubmit()
              }}
              label={"Appliquer"}
              className="max-h-[36px]  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none  "
            />
          );
          modal.onOpen();
          modal.setTitle("Êtes-vous sûr ?");
          modal.setMessage("Voulez vous vraiment appliquer ce modèle de facture ?");
          


            }}
              label={"Appliquer"}
              labelClassName="text-[15px]"
              className="  border-none !min-w-[112px]  text-[12px] text-center items-center justify-center  bg-[#9a9768] "
            />
          </div>}
        </div>
      </div>
    </div>
   </div>
  );


  function SearchElement() {
   
    return (
      <div className=" min-h-[100px] pl-[60px]   items-end mr-10 pt-14 mb-4    relative    justify-start pr-10   border-opacity-20">
     
        <h3 className="text-lg font-bold ">Choisissez un modèle de facture </h3>
        <p className="text-sm text-[#808080] mt-0">Sélectionnez un modèle qui reflète votre identité professionnelle</p>
      </div>
    );
  }


  function ItemFacture({item,handleClick}) { 
  
    return (
      <div
      onClick={handleClick}
      className={`relative max-h-[280px] w-[200px] h-[280px] cursor-pointer max-w-[200px] flex   rounded-md  bg-gradient-to-b from-[#ffffff13] to-[#ffffff25] gradient-opacity-10 mb-0 m-[6px]`}>
  
  {/* http://localhost:3001/images/invoices/facture1.jpg */}
  
 
   
  
  <img className="rounded-md" src={`${process.env.BASE_API_URL}/images/invoices/${item.invoiceFileName}.jpg`} alt="" />
        <div className="absolute z-20 flex flex-row self-end justify-between w-full h-full px-4 py-2 text-sm bg-gradient-to-t from-black/70 via-black/0 to-black/0 rounded-bl-xs rounded-br-xs">

        {user?.invoice?.invoiceFileName == item.invoiceFileName
            && <div className="absolute bottom-6 right-5">

             <div className="p-[5px] bg-teal-500 rounded-full">
             <BiCheck className="" />
             </div>
            </div>
            }

          <div className="absolute flex flex-col leading-4 text-white bottom-4">
            <h3 className="font-bold" >{item.name.toString().split(" ")[0]} {item.name.split(" ")[1]?.toString().padStart(3, '0')} </h3>
            <h4 className="text-[12px] opacity-50">{item.category?.name ?? "Non categorisé"}</h4>
       
          </div>
          {/*  <h3 className="opacity-100">1</h3> */}
        </div>
       
       
      {/*   <div className="absolute z-20 flex flex-row self-end justify-between w-full px-4 py-2 text-sm bg-black/80 rounded-bl-xs rounded-br-xs ">
          <h3>Classique</h3>
       
          <h3 className="opacity-100">1</h3>
        </div> */}
      </div>
    );
  }

  function InfoViewInvoice() {
    return (
      <div className="absolute inset-0 bottom-0 right-0 z-50 flex items-center justify-center w-full pb-0 bg-black/50 ">
      {/*  <div
         
          className="absolute z-[100] flex flex-col gap-10 p-4 text-xs text-white  rounded cursor-pointer left-80 ">
             <p
          onClick={()=>{
           
            updateInvoiceViewer(0)
          }}
          className="p-4 text-xs text-white rounded cursor-pointer bg-zinc-700 ">Proforma</p>  
             <p
          onClick={()=>{
           
            updateInvoiceViewer(1)
          }}
          className="p-4 text-xs text-white rounded cursor-pointer bg-zinc-700 ">Facture</p>  
             <p
          onClick={()=>{
           
            updateInvoiceViewer(2)
          }}
          className="p-4 text-xs text-white rounded cursor-pointer bg-zinc-700 ">Bordereau</p>  
            
            </div>    */}
       
        <div
          onClick={() => {
            setModalViewInvoice(false);
          
          }}
          className="absolute inset-0 z-50 flex items-center justify-center transition "
        ></div>
          {/*  {currentBlob != null && <iframe    className="overflow-hidden rounded-none no-scrollbar" type="application/pdf"  width={"100%"} height={"100%"} src={`${currentBlob}#toolbar=0`}  ></iframe>} */}
          {currentBlob != null && <img    className="overflow-hidden w-[590px]   object-contain top-[110px] rounded-none no-scrollbar"    src={`${currentBlob}#toolbar=0`}  />}
     
        <div className="z-50 flex w-[260px] flex-col  p-4 rounded-md gap-2 top-[80px] right-[250px] absolute  bg-black/70 ">
{currentInvoiceShow.primaryColor && <>
 <p className="">Couleur primaire</p>
 <div className="flex gap-3">

 <div
      onClick={()=>{
       // 
        
        primaryColorRef.current.click()
        
      }}
      className={` cursor-pointer p-4 rounded-lg bg-gradient-to-l w-[150px] ${primaryColor ? `from-${primaryColor}  to-${primaryColor}` :"from-red-300  to-red-800" }   h-[34px] `}
      style={{backgroundColor: primaryColor}}
      ></div>
 <input  
       
       
       ref={primaryColorRef}
       type="color" className={`cursor-pointer absolute top-14   border-none p-0 bottom-0 opacity-0 min-h-[34px]`} onChange={(e)=>{
            setPrimaryColor(e.target.value)
         
            
          }} />   
          {currentInvoice.primaryColor != primaryColor && <p
          onClick={()=>{
            if(currentInvoice.primaryColor == primaryColor){
            return
            }
            updateInvoiceViewer()
          }} 
          className="right-0 p-2 text-xs text-white z-[100] rounded cursor-pointer bg-zinc-700 ">Appliquer</p>}
 </div>
 </>}

{currentInvoiceShow.secondaryColor &&
 <>
 <p className="">Couleur Secondaire</p>
 <div className="flex gap-3">

 <div
      onClick={()=>{
       // 
        
        secondaryColorRef.current.click()
        
      }}
      className={` cursor-pointer p-4 rounded-lg bg-gradient-to-l w-[150px] ${secondaryColor ? `from-${secondaryColor}  to-${secondaryColor}` :"from-red-300  to-red-800" }   h-[34px] `}
      style={{backgroundColor: secondaryColor}}
      ></div>
 <input  
       
       
       ref={secondaryColorRef}
       type="color" className={`cursor-pointer absolute top-[129px]   border-none p-0 bottom-0 opacity-0 min-h-[34px]`} onChange={(e)=>{
            setSecondaryColor(e.target.value)
         
            
          }} />   

          
          {currentInvoice.secondaryColor != secondaryColor && <p
          onClick={()=>{
            if(currentInvoice.secondaryColor == secondaryColor){
            return
            }
            updateInvoiceViewer()
          }}
          className="right-0 p-2 text-xs text-white z-[100] rounded cursor-pointer bg-zinc-700 ">Appliquer</p>}
 </div>
 </>}
        </div>
      </div>
    );
  }
}

export default FacturesFirst;

 

