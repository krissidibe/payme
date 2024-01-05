import React, { useEffect, useRef, useState } from "react";
import { HiFolder, HiFolderAdd } from "react-icons/hi";
import { IoIosArrowBack, IoIosNotifications, IoIosPeople, IoMdBusiness, IoMdClose } from "react-icons/io";
import ReactPDF, { PDFViewer } from '@react-pdf/renderer';
import { useRouter } from "next/router";
import ButtonComponent from "../../../components/UI/ButtonComponent";
import { HuePicker,AlphaPicker } from "react-color";
import PdfBuilder from "../../../components/PdfDemo";
import {pdfjs, Document,Page} from 'react-pdf'
import { LiaFileAltSolid } from "react-icons/lia";
import useMenuStore from "../../../utils/MenuStore";
import InputComponent from "../../../components/UI/InputComponent";
import { fetchAllCategories, fetchAllInvoices, updateInvoice } from "../../../services/invoiceService";
import { useGlobalModal } from "../../../utils/use-global-modal";
import { saveAs } from "file-saver";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { fetchUser } from "../../../services/userService";
import { BiCheck } from "react-icons/bi";





function Factures(props) {
  const [user, setUser] = useState(null);
  const [modalViewInvoice, setModalViewInvoice] = useState(false);
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
    "id":user?.enterprise.id,
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
  "table": "[{\"id\":\"f99006ec-1c53-437c-be0c-a4d340c4d902\",\"designation\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi fugit pariatur repudiandae natus tempora eligendi voluptas quod quidem molestiae\",\"quantity\":700000,\"rate\":20,\"amount\":14000000},{\"id\":\"04b6310d-979d-44df-a9e5-8dfc913f4004\",\"designation\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi fugit pariatur repudiandae natus tempora \",\"quantity\":80000,\"rate\":50,\"amount\":4000000},{\"id\":\"97977560-4656-49a7-ab28-62cf5bcf63a0\",\"designation\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi fugit pariatur repudiandae natus tempora \",\"quantity\":778,\"rate\":677,\"amount\":526706}]",
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


  async function fetchPdf(invoiceFileName,enterprise,project,invoiceType,signed,primaryColor,secondaryColor) {
   
    
    
    const request = await fetch(`${process.env.BASE_API_URL}/api/facture`,{
      
      method:"POST",
      body:JSON.stringify({invoiceFileName:invoiceFileName,enterprise:enterprise,project:project,invoiceType:invoiceType,signed:signed,primaryColor,secondaryColor})
  
  });
    const dataBlob = await request.blob();
  
    const blob = new Blob([dataBlob], { type: "application/pdf" });
    
    return URL.createObjectURL(blob);
    return blob;
  }
  


  const updateInvoiceViewer = async () => {
    let dd =  await  fetchPdf(currentInvoice.invoiceFileName,enterpriseFake,projetFake,1,false,primaryColor,secondaryColor)
 
setCurrentBlob(x => x = dd)
  }


  const router = useRouter()
  const modal = useGlobalModal();
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

  
 
  
  const [typeFactures, setTypeFactures] = useState([]);
  const [invoicesAll, setInvoicesAll] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);

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
  const [sliceValue, setSliceValue] = useState(50);
  const [currentInvoice, setCurrentInvoice] = useState<any>({});
  const [currentCategory, setCurrentCategory] = useState<any>(0);
  
  const [currentBlob, setCurrentBlob] = useState<any>(null);

  const shuffle = (array: string[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 
  const fetchTypeFactures = async () => {
  const data = await fetchAllCategories();
  const dataInvoice = await fetchAllInvoices();
  const dataUser = await fetchUser()
  setTypeFactures(data)

  setInvoicesAll(shuffle(dataInvoice))
  
  setInvoices(shuffle(dataInvoice).slice(0, sliceValue))
  setUser(dataUser)
  }


  useEffect(() => {
    fetchTypeFactures()
  
    
  }, [])
  
  const [saturationColor, setSaturationColor] = useState("100");
  const [saturationValue, setSaturationValue] = useState("FF");

  const primaryColorRef = useRef<any>(null)

  const [primaryColor, setPrimaryColor] = useState(``);
  const [secondaryColor, setSecondaryColor] = useState(``);
  return (
    <div className="flex w-full h-full min-h-screen select-none ">
      {/* modalViewInvoice */}
       {modalViewInvoice && InfoViewInvoice()}
       {modalView && InfoView()}
      <div className="flex flex-col w-full h-full ">
        <SearchElement />
        <div className="flex p-10 ml-5 space-x-3 overflow-x-scroll text-sm pb-7 pt-7 no-scrollbar xl:w-full ">
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
              className={`p-2 px-3 flex justify-center items-center min-h-[28px] ${currentCategory == item.id ?"bg-opacity-20" :"bg-opacity-10" } bg-white rounded-[10px] cursor-pointer group hover:text-white hover:bg-opacity-20 `}
            >
              <p className="opacity-60 group-hover:opacity-100">
             
               
                {item.name}
              </p>
            </div>
          ))}
        </div>

        <div 
          onScroll={handleScroll}
        className="flex flex-wrap w-full px-8 ml-6 overflow-scroll gap-y-2 no-scrollbar md:items-start">
 

          {invoicesFilter.length == 0 ? invoices.map((item) => (

          <ItemFacture
          handleClick={ async ()=>{
 
setCurrentInvoice(x=> x = item)



let dd =  await  fetchPdf(item.invoiceFileName,enterpriseFake,projetFake,1,false,primaryColor,secondaryColor)
 
setCurrentBlob(x => x = dd)
 
 
//await  saveAs(dd, `page`); 

 


          }}
          key={item.id} item={item} />
          ))
        :
        invoicesFilter.map((item) => (

          <ItemFacture
          handleClick={async ()=>{
 
setCurrentInvoice(x=> x = item)
let dd =  await  fetchPdf(item.invoiceFileName,enterpriseFake,projetFake,1,false,primaryColor,secondaryColor)
 
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

 
      <div className="min-h-full flex flex-col bg-[#151515] min-w-[340px]">
        <div className="h-[130px] border-b-[1px] flex items-end mx-10 pb-6  border-white border-opacity-20">
          <p className="flex items-center justify-center opacity-50"> 
          <LiaFileAltSolid className="mr-2 w-[20px] h-[20px] opacity-50" />
          Aperçu Fichier</p>
        </div>

      
        <div className="flex justify-center w-full mt-10 no-scrollbar ">

        {currentBlob != null && <embed    className="overflow-hidden top-[110px] rounded-none no-scrollbar" type="application/pdf"  width={"244px"} height={"320px"} src={`${currentBlob}#toolbar=0`}  ></embed>}
         
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
      
      <div className="relative flex flex-col">
      <p className={`text-[$primaryColor] `}>Couleur primaire</p>
      
      
      <div
      onClick={()=>{
        primaryColorRef.current.click()
      }}
      className={` cursor-pointer p-4 rounded-lg bg-gradient-to-l from-white  to-${primaryColor} h-[50px] `}
      style={{backgroundColor: primaryColor}}
      ></div>
       <input ref={primaryColorRef}
       
       
       
       type="color" className={`${primaryColorRef ? "" : "hidden"} cursor-pointer absolute bottom-0 opacity-0 max-h-4`} onChange={(e)=>{
            setPrimaryColor(e.target.value)
            updateInvoiceViewer();
          /*   setTimeout(() => {
          
            }, 2000); */
          }} />   

      </div>
     
      <p>Couleur secondaire</p>
      <div className="p-4 rounded-lg bg-gradient-to-l from-white cursor-pointer to-yellow-500 h-[50px] "></div>
    
        
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

          <div className="flex justify-between px-0 pt-4 border-t-0 border-white border-opacity-30">
            
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
                  
                }
                
                      const data =     await updateInvoice(invoiceInfo);
                
                      console.log("data");
                      console.log(data);
                      
                      if(data.id != null){
                        modal.onClose();
                       // setCurrentInvoice(currentInvoice)
                    //   user.invoice.invoiceFileName == currentInvoice.invoiceFileName

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
          </div>
        </div>
      </div>
    </div>
  );


  function SearchElement() {
    const [searchValue, setSearchValue] = useState("");
    return (
      <div className=" min-h-[130px] px-14 flex items-end mr-10 pb-6    relative    justify-start pr-10 border-b-[1px]  border-white border-opacity-20">
       {paramInfo.first !="true" &&   <IoIosArrowBack
          onClick={() => {
            router.back();
          }}
          className="absolute w-8 h-8 font-bold cursor-pointer bottom-[25px] left-3"
        />}
        
        <h3 className="ml-2 text-4xl font-bold w-[500px]">Modèles de Facture   </h3>
        <div className="flex justify-end w-full">
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
        </div>
      </div>
    );
  }

  function InfoViewInvoice() {
    return (
      <div className="absolute inset-0 bottom-0 right-0 z-50 flex items-center justify-center w-full pb-0 bg-black/50 ">
       
       
        <div
          onClick={() => {
            setModalViewInvoice(false);
          
          }}
          className="absolute inset-0 z-50 flex items-center justify-center transition "
        ></div>
           {currentBlob != null && <embed    className="overflow-hidden rounded-none no-scrollbar" type="application/pdf"  width={"477px"} height={"673px"} src={`${currentBlob}#toolbar=0`}  ></embed>}
        
      </div>
    );
  }
  function InfoView() {
    return (
      <div className="absolute bottom-0 right-0 z-[100] flex items-center justify-center w-full pb-0 transition bg-black/0 ">
       
       
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
    {modalViewContent.includes("succès") ?
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1339_105)">
    <path d="M21.7986 12.1112C21.7986 17.4615 17.4614 21.7987 12.1111 21.7987C6.76081 21.7987 2.42358 17.4615 2.42358 12.1112C2.42358 6.76091 6.76081 2.42369 12.1111 2.42369C17.4614 2.42369 21.7986 6.76091 21.7986 12.1112ZM10.9905 17.2406L18.178 10.0531C18.4221 9.80908 18.4221 9.41334 18.178 9.16927L17.2942 8.28541C17.0501 8.0413 16.6544 8.0413 16.4103 8.28541L10.5486 14.147L7.8119 11.4104C7.56784 11.1663 7.1721 11.1663 6.928 11.4104L6.04413 12.2942C5.80007 12.5383 5.80007 12.934 6.04413 13.1781L10.1066 17.2406C10.3507 17.4847 10.7464 17.4847 10.9905 17.2406Z" fill="#55B938"/>
    </g>
    <defs>
    <clipPath id="clip0_1339_105">
    <rect width="20" height="20" fill="white" transform="translate(2.11108 2.11114)"/>
    </clipPath>
    </defs>
    </svg>
    
    :  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1201_45)">
<path d="M21.8887 12.2222C21.8887 17.7462 17.4111 22.2222 11.8887 22.2222C6.36621 22.2222 1.88867 17.7462 1.88867 12.2222C1.88867 6.70132 6.36621 2.22217 11.8887 2.22217C17.4111 2.22217 21.8887 6.70132 21.8887 12.2222ZM11.8887 14.2383C10.8643 14.2383 10.0338 15.0687 10.0338 16.0931C10.0338 17.1175 10.8643 17.948 11.8887 17.948C12.9131 17.948 13.7435 17.1175 13.7435 16.0931C13.7435 15.0687 12.9131 14.2383 11.8887 14.2383ZM10.1277 7.57112L10.4268 13.055C10.4408 13.3116 10.6529 13.5125 10.9099 13.5125H12.8674C13.1244 13.5125 13.3366 13.3116 13.3506 13.055L13.6497 7.57112C13.6648 7.29394 13.4441 7.06088 13.1665 7.06088H10.6108C10.3332 7.06088 10.1125 7.29394 10.1277 7.57112Z" fill="#FFA300"/>
</g>
<defs>
<clipPath id="clip0_1201_45">
<rect width="20" height="20" fill="white" transform="translate(1.88867 2.22217)"/>
</clipPath>
</defs>
</svg>}
      

      </div>
 
    <p className="max-w-[280px]" >{modalViewContent}</p>
</div>
 
  
         
        </div>
        
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

        {user.invoice.invoiceFileName == item.invoiceFileName
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
}

export default Factures;





