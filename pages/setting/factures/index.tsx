import React, { useEffect, useState } from "react";
import { HiFolder, HiFolderAdd } from "react-icons/hi";
import { IoIosArrowBack, IoIosNotifications, IoIosPeople, IoMdBusiness } from "react-icons/io";
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
  const enterpriseFake ={
    "id": "clqwpi6ra000613l5nw8fv3pc",
    "email": "kris@gmail.com",
    "activity": "Commerce de Détail",
    "address": "Bamako",
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
    "userId": user.id,
    "createdAt": "2024-01-02T18:52:23.000Z",
    "deletedAt": null,
    "inTrash": false,
    "updatedAt": "2024-01-02T18:52:23.000Z",
    "rccm": "Bamako.ML400"
}
const projetFake =  {
  "id": "clqy5ra600017vb4w72lhpl0y",
  "name": "Facture Test",
  "type": "ISVALIDATE",
  "invoiceNumber": 32125,
  "proformaDate": null,
  "invoiceDate": "2024-01-03T19:18:39.000Z",
  "discountItemTable": null,
  "table": "[{\"id\":\"c5765f45-af90-4296-8dfa-2ec4af470367\",\"designation\":\"Adaptation , éxécution et mise en page , badge professionnel, en PVC, Recto, Verso, impréssion en couleur avec pochette plastique, cordon- forfait\",\"quantity\":70000,\"rate\":20,\"amount\":1400000},{\"id\":\"2203fac1-d731-4fb4-8192-cfe799854b72\",\"designation\":\"Item\",\"quantity\":\"10\",\"rate\":\"30000\",\"amount\":300000},{\"id\":\"a6be2d73-e7c0-49ef-8462-982676eb73f9\",\"designation\":\"Adaptation , éxécution et mise en page , badge professionnel, en PVC, Recto, Verso, impréssion en couleur avec pochette plastique, cordon- forfait\",\"quantity\":\"50\",\"rate\":\"300\",\"amount\":15000},{\"id\":\"fe7e5f2b-9cf5-4d34-a806-9f20d4045446\",\"designation\":\"Adaptation , éxécution et mise en page , badge professionnel, en PVC, Recto, Verso, impréssion en couleur avec pochette plastique, cordon- forfait\",\"quantity\":\"677\",\"rate\":\"778\",\"amount\":526706}]",
  "amountTotal": "2380692",
  "tva": "18",
  "inTrash": false,
  "createdAt": "2024-01-03T19:15:08.000Z",
  "updatedAt": "2024-01-03T19:15:08.000Z",
  "deletedAt": null,
  "customerId": "clqxcczzr0007vb4w90owh21s",
  "userId": "clqwpi6m5000413l5nnyefwrx",
  "discount": "10",
  "invoiceType": 0,
  "modalite": "40",
  "remarque": "",
  "customer": {
      "id": "clqxcczzr0007vb4w90owh21s",
      "externalContact": "37808080",
      "externalEmail": "zefi@mailinator.com",
      "externalName": "Zephr Duffy",
      "activity": "Commerce de Détail",
      "address": "Aut vel cum reprehen",
      "country": "Afghanistan",
      "email": "hegupe@mailinator.com",
      "image": "",
      "name": "Michael Randolph",
      "type": "ENTERPRISE",
      "inTrash": false,
      "createdAt": "2024-01-03T05:32:12.000Z",
      "updatedAt": "2024-01-03T05:32:12.000Z",
      "deletedAt": null,
      "userId": "clqwpi6m5000413l5nnyefwrx",
      "poste": "Eiusmod consequatur "
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
  const [invoices, setInvoices] = useState([]);

  const [invoicesFilter, setInvoicesFilter] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState<any>({});
  const [currentCategory, setCurrentCategory] = useState<any>(0);
  
  const [currentBlob, setCurrentBlob] = useState<any>(null);

  const fetchTypeFactures = async () => {
  const data = await fetchAllCategories();
  const dataInvoice = await fetchAllInvoices();
  const dataUser = await fetchUser()
  setTypeFactures(data)
  setInvoices(dataInvoice)
  setUser(dataUser)
  }


  useEffect(() => {
    fetchTypeFactures()
  
    
  }, [])
  
  const [saturationColor, setSaturationColor] = useState("100");
  const [saturationValue, setSaturationValue] = useState("FF");

  const [primaryColor, setPrimaryColor] = useState(``);
  const [secondaryColor, setSecondaryColor] = useState(``);
  return (
    <div className="flex w-full h-full min-h-screen select-none ">
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

        <div className="flex flex-wrap w-full px-8 ml-6 overflow-scroll no-scrollbar md:items-start">
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

 
        <div className="flex justify-center w-full mt-10">
          <div className=" rpv-print__body-printing  print__zone  min-h-[343px] rounded-md cursor-pointer min-w-[244px] w-[244px] flex 0   bg-gradient-to-b from-[#ffffff] to-[#ffffff] gradient-opacity-10 m-[6px]">
        
     {/*  <Document file={`${process.env.BASE_API_URL}/images/test.pdf`} >

      </Document> */}
   {/*  <p className="text-black">
    {JSON.stringify(base64_encode(currentBlob))}
    </p> */}
      
      {/*   <PdfBuilder color={primaryColor.toString().substring(0,7) + saturationValue} />  */}
     {/* <img className="rounded" src={`${process.env.BASE_API_URL}/images/invoices/${currentInvoice?.invoiceFileName}.jpg`} alt="" /> */}   
     {currentBlob != null && <iframe className="overflow-hidden rounded-md rpv-print__body-printing print__zone" src={`${currentBlob}#toolbar=0`} height="100%" width="100%"></iframe>}
          </div>
        </div>

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
      
      <p className="">Couleur primaire</p>
      <div className="p-4 rounded-lg bg-gradient-to-l from-white cursor-pointer to-red-500 h-[50px] "></div>
      <p>Couleur secondaire</p>
      <div className="p-4 rounded-lg bg-gradient-to-l from-white cursor-pointer to-yellow-500 h-[50px] "></div>
      {/*  <input type="color" className="h-4" onChange={(e)=>{
            setPrimaryColor(e.target.value)
          }} />  */} 

        
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
                          alert("Modèle de facture appliqué avec succès")
                         // router.back();
                         // router.back();
                          
  
                        },2000)
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





