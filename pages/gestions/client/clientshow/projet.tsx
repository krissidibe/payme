import React, { useEffect, useRef, useState } from "react";
import { IoIosNotifications, IoIosPeople, IoIosRefresh, IoIosSearch, IoMdClose, IoMdDoneAll, IoMdTrash, IoMdWallet } from "react-icons/io";
import ButtonComponent from "../../../../components/UI/ButtonComponent";
import InputComponent from "../../../../components/UI/InputComponent";
import { PiListBulletsFill } from "react-icons/pi";
import FolderComponent from "../../../../components/UI/FolderComponent";
import { HiFolder } from "react-icons/hi";
import { MdInfo,MdEditNote, MdFolderDelete, MdOutlineFileCopy, MdEditDocument, MdCalendarMonth, MdMoreHoriz } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import useMenuStore from "../../../../utils/MenuStore";
import { daysFr } from "../../../../utils/helpers";
import { addNewProject, fetchAllCustomerProject, fetchOneCustomerProject, finishProject, intrashProject, saveInvoice,   updateInvoiceDate,   updateNameProject, updateProformaDate, validateProforma } from "../../../../services/projectService";
import { useGlobalModal } from "../../../../utils/use-global-modal";
import { Menu } from "@headlessui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { addNewTransation } from "../../../../services/transactionService";
import { RiFileEditLine } from "react-icons/ri";
import { FaCopy } from "react-icons/fa"; 
import { BsCheck2Circle } from "react-icons/bs";
import { motion } from "framer-motion";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { saveAs } from "file-saver";
import { fetchAllCustomer } from "../../../../services/customerModel";
import { CiCircleCheck } from "react-icons/ci";
import { LiaFileAltSolid } from "react-icons/lia";
import { fetchEnterprise } from "../../../../services/enterpriseService";
import { fetchUser } from "../../../../services/userService";
async function fetchPdf(invoiceFileName,enterprise,project,invoiceType,signed,primaryColor,secondaryColor) {
  console.log(primaryColor);
  console.log(secondaryColor);
  
  
  const request = await fetch(`${process.env.BASE_API_URL}/api/facture`,{
    
    method:"POST",
    body:JSON.stringify({invoiceFileName:invoiceFileName,enterprise:enterprise,project:project,invoiceType:invoiceType,signed:signed,primaryColor,secondaryColor})

});
  const dataBlob = await request.blob();

  const blob = new Blob([dataBlob], { type: "application/pdf" });
  console.log(blob);

  return blob;
}


function Projet(props) {
  const [loadingTime, setLoadingTime] = useState(false);
  const [showSuccesCopy, setShowSuccesCopy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingConfirmBtn, setIsLoadingConfirmBtn] = useState(false);
  const [copyProject, setCopyProject] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [typeTransaction, setTypeTransaction] = useState("");
  const [project, setProject] = useState<Project>(null);
  const [factureType, setFactureType] = useState(0);

  const [modalView, setModalView] = useState(false);
  const [signed, setSigned] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const proformaDateRef = useRef<HTMLInputElement>(null);
  const invoiceDateRef = useRef<HTMLInputElement>(null);

  const [customers, setCustomers] = useState<Customer[]>([])
  const [enterprise, setEnterprise] = useState<Enterprise>({
    id: "",
    email: "",
    activity: "",
    address: "",
    numbers: "",
    
    currency: "",
    name: "",
    rccm: "",
    nif: "",
    statut: "---",
    bankNumber: "",
    website: "",
  });
  const [customersFiltered, setCustomersFiltered] = useState<Customer[]>([])
  const [searchValue, setSearchValue] = useState("");
  useEffect(()  =>  {
    
 
  (async() =>  {
    const datas =  await fetchAllCustomer();
    setCustomers(datas);
    setCustomersFiltered(datas);

    const datasFilter = customers.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    setCustomersFiltered(datasFilter)

console.log(datasFilter);
console.log("datasFilter Yes");
})()

 
console.log("datasFilter");
    
      }, [searchValue,copyProject])
 const facGenerate =async ()=>{
 
 

 }
  const [data, setData] = useState<any>({
  
    proformaDate:null,
    invoiceDate:null,
   
  });
  const handleChange = async (e) => {
     
    await updateProformaDate(project.id,e.target.value)
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    project.proformaDate  = value;
  };
  const handleChangeDate = async (e) => {
    
    await updateInvoiceDate(project.id,e.target.value)
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    project.invoiceDate  = value;
  };
  let rightInfo ={
    label:""
  }

  switch (factureType) {
    case 0:
      rightInfo={
        label:"Proforma"
      }
      
      break;
      case 1:
        rightInfo={
          label:"Facture"
        }
        
        break;
      case 2:
        rightInfo={
          label:"Bordereau"
        }
        
        break;
  
    default:
      break;
  }

  const menuIndex = useMenuStore()
  const router =useRouter()
  const projectInfo:any = router.query  
 




const fetch =async () =>{
  const dataEnterprise = await fetchEnterprise();
  const data:Project = await fetchOneCustomerProject(router.query.id?.toString())
  if(data && dataEnterprise){
  // setIsLoading(false)
   setIsLoading(false)
    setProject(data)
    setEnterprise(dataEnterprise)
    setInputValue(data?.name)
    
 }
}

useEffect(() => {
   fetch()

  return () => {
    
  }
}, [ ])



  let type ={
    border:"",
    color:"",
    label:""
  };
  switch (project?.type) {
    case "INPROGRESS":
      type ={
        border:"border-amber-500 ",
        color:"text-amber-500 ",
        label :"En cours de validation"
      };
      break;
    case "ISVALIDATE":
     
      type ={
        border:"border-green-500 ",
        color:"text-green-500 ",
        label :"Proforma validée"
      };
      break;
    case "ISFINISH":
      
      type ={
        border:"border-teal-500 ",
        color:"text-teal-500 ",
        label :"Projet terminer"
      };
      break;
  
    default:
      break;
  }

const modal = useGlobalModal()


  
  return (
    <div className="flex w-full h-full overflow-x-hidden select-none no-scrollbar">
        {modalView && AddNewFolder()}
   {transactionModal && modalTransaction()}
   {copyProject && modalCopyProject()}
   {showSuccesCopy && succesCopy()}
      <div className="flex flex-col w-full h-full ">
        <SearchElement />
         


        {!isLoading && project?.table ==null && <div className="flex items-center justify-center w-full h-full pt-[140px]" >
          <div
                onClick={()=>{    
                  menuIndex.setMenuIndex(2) ;
          router.push(
           {pathname:"/gestions/client/clientshow/factureCalculator",
         query :project as any
         }
          )
         
         }}
          
          
          className="w-[140px] h-[140px] cursor-pointer  mb-32  text-white/20 flex items-center pb-2 justify-center rounded-[40px]  text-[70px]   bg-gradient-to-b from-[#0e0e0e] to-[#202020] ">
            +
          </div>
        </div> }

{isLoading &&
  <div
          className={`  "flex-row flex   px-9  mr-40 ml-2 pt-12 flex-row    w-full  overflow-x-scroll   flex-1    no-scrollbar `}
        >
          <ItemFactureShimmer key={1}  />
          <ItemFactureShimmer key={2}  />
          <ItemFactureShimmer key={3}  />

</div>
}

       {!isLoading && project?.table !==null  && <div
          className={`  "flex-row flex   px-9  mr-40 ml-2 pt-12 flex-row    w-full  overflow-x-scroll   flex-1    no-scrollbar `}
        >
        
          <ItemFacture key={1}  handleClick={()=>{setFactureType(0)}}  index={0} factureType={factureType} indexType={1} label="Proforma" />
      
      { project?.type !="INPROGRESS" &&     <ItemFacture key={2}  handleClick={()=>{setFactureType(1)}}  index={1} factureType={factureType} indexType={1} label="Facture" /> }
      { project?.type !="INPROGRESS" &&     <ItemFacture key={3}  handleClick={()=>{setFactureType(2)}}  index={2} factureType={factureType} indexType={1} label="Bordereau de livraison" />
       }
      
        </div>}




        {isLoading &&
          <div
          className={`  "flex-row flex pl-[68px]     px-16 space-y-[2px] mr-40 ml-2 pt-10 text-[#ffffff50]  text-sm no-scrollbar   w-full  overflow-x-scroll   pb-[100px]   no-scrollbar `}
        >
          <div className="flex  flex-col border-r border-white border-opacity-10 min-w-[304px]">
            <h2 className="text-[#9a9768] text-[18px] font-bold  rounded-md h-[15px] max-w-[100px]  animate-pulse duration-100    bg-[#ffffff1f] "></h2>
            <p className="text-[12px] leading-4 mt-2 rounded-md h-[10px] max-w-[200px]  animate-pulse duration-100    bg-[#ffffff1f] " ></p>
           
            <p className="text-[12px] leading-4 mt-2 rounded-md h-[10px] max-w-[180px]  animate-pulse duration-100    bg-[#ffffff1f] " ></p>
           
            <p className="text-[12px] leading-4 mt-2 rounded-md h-[10px] max-w-[240px]  animate-pulse duration-100    bg-[#ffffff1f] " ></p>
          </div>
          <div className="flex flex-1 justify-end flex-col  pl-8 border-white border-opacity-10 min-w-[100px]">
          <h2 className="text-[#9a9768] text-[18px] font-bold  rounded-md h-[15px] max-w-[100px]  animate-pulse duration-100    bg-[#ffffff1f] "></h2>
            
          <p className="text-[12px] leading-4 mt-2 rounded-md h-[10px] max-w-[240px]  animate-pulse duration-100    bg-[#ffffff1f] " ></p>
          <p className="text-[12px] leading-4 mt-2 rounded-md h-[10px] max-w-[240px]  animate-pulse duration-100    bg-[#ffffff1f] " ></p>
           
          </div>
        </div>
}



        
{!isLoading &&
          <div
          className={`  "flex-row flex pl-[68px]     px-16 space-y-[2px] mr-40 ml-2 pt-10 text-[#ffffff50]  text-sm no-scrollbar   w-full  overflow-x-scroll   pb-[100px]   no-scrollbar `}
        >
          <div className="flex  flex-col border-r border-white border-opacity-10 min-w-[304px]">
            <h2 className="text-[#9a9768] text-[18px] font-bold">{project?.customer.name}</h2>
            <p className="text-[12px] leading-4 mt-2" >{project?.customer.address}</p>
            <p className="text-[12px] leading-4" >Email : {project?.customer.externalEmail}</p>
            <p className="text-[12px] leading-5" >Tél : {project?.customer.externalContact}</p>
          </div>
          <div className="flex flex-1 justify-end flex-col  pl-8 border-white border-opacity-10 min-w-[100px]">
            <h2 className="text-[#ffffff91] text-[15px] mb-[1px] font-normal">Projet</h2>
            <p className=" line-clamp-1 text-[12px]">{project?.name}</p>
           
          </div>
        </div>
}

        <div>
            
        </div>
      </div>

      <div className="min-w-[370px] max-w-[370px] h-full  border-l-[1px]  via-[#6462462c]   bg-gradient-to-b from-black to-[#64624691]   border-l-[#9a9768]  text-[#ffffff66] text-sm border-opacity-40">

     { !isLoading && project?.table ==null && 
      <div className="w-full absolute   min-h-[130px] px-12   pr-24 flex items-end pb-6  justify-between   border-b-[1px]  border-white border-opacity-10">
      <div className="flex items-center justify-center space-x-2">
        <div className="flex items-center justify-center p-2 text-[25px] font-bold text-white bg-teal-600 rounded-xl w-11 h-11">
          i
        </div>
        <h1 className="text-3xl font-bold text-white">Infos</h1>
      </div>
    </div>
     }
 
{      !isLoading && project?.table ==null && 



<div className="flex flex-col items-center justify-center h-full">
<p className="mb-4 font-bold opacity-80 text-md" >Aucun contenu</p>
<p className="text-sm opacity-70 font-light leading-[17px]">Ce projet ne comporte aucune facture,</p>
   <p className="text-sm opacity-70 font-light leading-[17px]">veuillez cliquer sur le bouton "Ajouter"</p>
   <p className="text-sm opacity-70 font-light leading-[17px]">pour en créer une.</p>
</div>


}












{      isLoading &&   <>
  <div className="w-full relative min-h-[130px] px-12   pr-24 flex items-end pb-6  justify-between   border-b-[1px]  border-white border-opacity-10">
          <div className="flex items-center justify-center space-x-2 ">
           
            
           
           <div className="flex items-center justify-center p-2 text-[25px] font-bold text-white bg-teal-600 rounded-xl w-11 h-11">
           P
            </div>
            <h1 className="text-3xl font-bold text-white">Proforma</h1>
          </div>
        </div>
        <div className="w-full flex-col relative min-h-[125px] px-12      flex items-start pt-8      border-b-[1px]  border-white border-opacity-10">
        <h2 className="font-bold text-[21px] text-[#9a9768] h-[15px] mb-4 max-w-[100px] line-clamp-2 rounded-md  animate-pulse duration-100     bg-[#ffffff1f]  min-w-[100px]">
            
         </h2>
          <div className="flex items-center justify-between w-full">
          
            <span className="rounded-md  animate-pulse duration-100    bg-[#ffffff1f] h-[10px] w-[180px] " ></span>
          </div>
          <div className="flex items-center justify-between w-full mt-2">
           
            <span className="rounded-md  animate-pulse duration-100    bg-[#ffffff1f] h-[10px] w-[140px] " ></span>
          </div>
        </div>
        <div className="w-full flex-col relative min-h-[78px] px-12     flex items-start pt-4     border-b-[1px]  border-white border-opacity-10">
        <h2 className="font-bold text-[21px] text-[#9a9768] h-[15px] mb-3 max-w-[100px] line-clamp-2 rounded-md  animate-pulse duration-100     bg-[#ffffff1f]  min-w-[100px]">
            
            </h2>
 
 
          <div className="flex items-center justify-between w-full">
          <span className="rounded-md  animate-pulse duration-100    bg-[#ffffff1f] h-[10px] w-[140px] " ></span>
           </div>
        </div>
        <div className="relative flex flex-row items-center justify-between w-full px-12 pt-6 ">
        <h2 className="font-bold text-[21px] mt-2 text-[#9a9768] h-[15px] mb-4 min-w-[220px] line-clamp-2 rounded-md  animate-pulse duration-100     bg-[#ffffff1f]   ">
            
            </h2>
        
         
         
        </div>
        {/* 
        
     
        
        
        */}
        
        <div className="flex flex-col space-y-3 items-center justify-center w-auto mt-[78px] px-[55px]">
         
        <ButtonComponent
        key={900}
            label={""}
            onClick={()=>{
             
            }}
            className={` border-none font-bold   h-[60px] text-[15px] w-full    animate-pulse duration-100    bg-[#ffffff1f]  cursor-default `} 
            labelClassName={` text-[16px]   `}
          />
             
        <ButtonComponent
        key={800}
            label={""}
            onClick={()=>{
             
            }}
            className={` border-none font-bold   h-[60px] text-[15px] w-full    animate-pulse duration-100    bg-[#ffffff1f]  cursor-default `} 
            labelClassName={` text-[16px]   `}
          />
             
        <ButtonComponent
        key={700}
            label={""}
            onClick={()=>{
             
            }}
            className={` border-none font-bold   h-[60px] text-[15px] w-full    animate-pulse duration-100    bg-[#ffffff1f]  cursor-default `} 
            labelClassName={` text-[16px]   `}
          />
             
        </div>
       </>}




{      !isLoading && project?.table !==null && <>
  <div className="w-full relative min-h-[130px] px-12   pr-24 flex items-end pb-6  justify-between   border-b-[1px]  border-white border-opacity-10">
          <div className="flex items-center justify-center space-x-2 ">
           
           {/* 
           
              <div className="flex items-center justify-center p-2 text-[25px] font-bold text-white bg-teal-600 rounded-xl w-11 h-11">
              i
            </div>
            <h1 className="text-3xl font-bold text-white">Infos</h1>*/}
           
           <div className="flex items-center justify-center p-2 text-[25px] font-bold text-white bg-teal-600 rounded-xl w-11 h-11">
            {rightInfo.label[0]}
            </div>
            <h1 className="text-3xl font-bold text-white">{rightInfo.label}</h1>
          </div>
        </div>
        <div className="w-full flex-col relative min-h-[125px] px-12      flex items-start pt-8      border-b-[1px]  border-white border-opacity-10">
          <h2 className="font-bold text-[20px] text-[#9d9969] mb-4">INFOS</h2>
          <div className="flex justify-between w-full">
            <span>N° Facture : </span>
            <span>{project?.invoiceNumber}</span>
          </div>
          <div className="flex justify-between w-full">
            <span>Statut : </span>
            <span className={`${type.color}`}>{type.label}</span>
          </div>
        </div>
        <div className="w-full flex-col relative min-h-[78px] px-12     flex items-start pt-4     border-b-[1px]  border-white border-opacity-10">
          <h2 className="font-bold text-[20px] text-[#9a9768] mb-2">DATE</h2>
{/* 
proformaDate
invoiceDate
*/}
 
          <div className="flex justify-between w-full">
            <span>{rightInfo.label == "Proforma" ? "Date Proforma" : rightInfo.label == "Facture" ? "Date Facture" : "Date Bordereau"} :</span>
            <span className=""> {rightInfo.label == "Proforma" ? project?.proformaDate ? daysFr(data?.proformaDate ?? project?.proformaDate) : daysFr(data?.proformaDate ?? project?.createdAt) : project?.invoiceDate ? daysFr(data.invoiceDate ?? project?.invoiceDate) : daysFr(data?.proformaDate ?? project?.createdAt)}   </span>
          </div>
        </div>
        <div className="relative flex flex-row items-start justify-between w-full px-12 pt-6 ">
          <h2 className="font-bold text-[21px] text-[#ffffff] mb-2  ">MONTANT</h2>
          <h2 className="font-normal text-[21px] text-[#ffffff] mb-2 pl-4 flex flex-1 justify-end items-end ">{parseInt(project?.amountTotal).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") ?? 0}</h2>

         
        </div>
        {/* 
        
     
        
        
        */}
        
        <div className="flex flex-col space-y-3 items-center justify-center w-auto mt-[78px] px-[55px]">
         
         
         {project?.type =="INPROGRESS" && <ButtonComponent
          handleClick={()=>{

            modal.onSubmit = (
              <ButtonComponent
                handleClick={async () => {
                  setIsLoading(true)
                  const data = await validateProforma(project?.id)

                  if (data) {
                   await fetch()
                   modal.onClose();
                  }
                }}
                label={"Oui"}
                className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none  "
              />
            );
            modal.onOpen();
        modal.setTitle("Êtes-vous sûr ?");
        modal.setMessage("Voulez-vous vraiment valider la proforma ?");

          }}
            label={"Valider la proforma"}
            className="border-none font-bold h-[60px]   text-[15px] w-full  bg-teal-500/80 text-white"
            labelClassName="text-white text-[16px]"
          />}
          <ButtonComponent
            label={"Signer"}
            onClick={()=>{
              setSigned(x => x=!x)
            }}
            className={` border-none font-bold   h-[60px] text-[15px] w-full  ${!signed ? "bg-[#ffffff]" :"bg-teal-500/80 text-white" }  `} 
            labelClassName={` text-[16px]  ${!signed ? "text-black" :"text-white" }  `}
          />
          {project?.type != "ISFINISH" && <ButtonComponent
            label={"Modifier"}
            handleClick={()=>{             menuIndex.setMenuIndex(2) ;
               router.push(
                {pathname:"/gestions/client/clientshow/factureCalculator",
              query :project as any
              }
               )
              
              }}
              labelClassName="text-white text-[16px]"
              className="border-none font-bold ripple-bg-gray-700 h-[60px] text-[15px] w-full bg-[#53534A]"
          />}
           
          <ButtonComponent
          
          handleClick={async () => {
 
const dataUser = await fetchUser()
 
        
              if(project?.amountTotal == "0" ){

                return;
              }
              console.log("=====");
              console.log(signed);
              console.log(factureType);
              console.log(project);
              


              
            let dd =  await  fetchPdf(dataUser.invoice.invoiceFileName,enterprise,project,factureType,signed,dataUser.invoice.primaryColor,dataUser.invoice.secondaryColor)
          
    

            if(dd){

            await  saveAs(dd, `${project!.customer.name} - ${project!.name}`); 
            }
            
 
          }}
            label={"Télécharger"}
            labelClassName="text-white text-[16px]"
            className={`${project?.amountTotal == "0" ? "opacity-30 cursor-default" : " opacity-100" } border-none font-bold h-[60px] text-[15px] w-full 
            @apply bg-[#9a9768]`}
          />
        </div>
       </>}
      </div>
    </div>
  );
  function succesCopy() {

    return  (
      <div
      onClick={() => {
       //setShowSuccesCopy(x=> x= false)
       //setLoadingTime(x=> x= false)
      }}
      className="absolute inset-0 z-10 flex items-center justify-center w-screen py-[70px] bg-black/50">
      <div 
      onClick={(e) => {
       e.stopPropagation()
      }}
      className="p-4 pt-4 pr-2 bg-[#323232] z-50  w-[350px] relative   px-4 flex flex-col items-center justify-start text-white rounded-md">
      
      <IoMdClose
            onClick={() => {
              //setShowSuccesCopy(x=> x= false)
              //setLoadingTime(x=> x= false)
             }}
            className="w-[20px] mb-4 h-[20px] opacity-60 top-3 right-4  absolute cursor-pointer self-end"
          />


     <div className="flex items-center justify-center w-full">
     <LiaFileAltSolid className={`min-w-[45px] h-[45px] text-white/30 mr-2 `} />
  <div className="flex flex-col w-full pr-4">
    <p className="mb-1 text-[13px] line-clamp-1">{project.name}</p>
  <div className="w-full relative  bg-white/10 h-[8px]  rounded">
 
  <motion.div
                      initial={{
                        width: "0px",
                      }}
                      transition={{ duration: 2 }}
                      animate={{
                        width: loadingTime ? "257px" : "20px",
                      }}
                      style={{
                        height:"8px",
                        backgroundColor:"rgb(255 255 255 / 0.5)",
                        borderRadius:'0.25rem'
                      }}
                    >
                    </motion.div>
    
                      
     </div>
  </div>
     </div>
      
    
       
            
      </div>
    </div>
    )
  }
  function modalCopyProject() {

    return  (
      <div
      onClick={() => {
        setCopyProject(x => x= false);
        setSearchValue(x => x="")
      }}
      className="absolute inset-0 z-10 flex items-center justify-center min-w-screen py-[70px] bg-black/50">
      <div 
      onClick={(e) => {
       e.stopPropagation()
      }}
      className="p-4 pt-0 bg-[#323232] z-50 md:w-[650px] xl:w-[750px] h-2/3  px-8 flex flex-col items-center justify-start text-white rounded-md">
      <IoMdClose
            onClick={() => {
              setCopyProject(x => x= false);
              setSearchValue(x => x="")
            }}
            className="w-[24px] mb-4 h-[24px] opacity-60 mr-0 mt-5 cursor-pointer self-end"
          />
       <div className="w-full relative rounded-full mb-0 min-h-[55px] border border-white text-[15px]  font-light border-opacity-20">
       <IoIosSearch className="min-w-[23px]  opacity-30 z-20 top-4 left-[12px] h-[23px] absolute" />
      
       <InputComponent
              key={1}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
             // label="Nom du dossier"
              labelClassName="text-white/40 text-[15px]"
              placeholder="Saisissez le nom du client où vous voulez dupliquer le projet"
              className="ml-7 border-none min-h-[55px] text-[15px]   font-light"
            />
      
       </div>
            <div className="flex-1 w-full mt-6 overflow-scroll no-scrollbar ">
 
 {customersFiltered.map(item =>(
  <div onClick={async ()=>{
    setLoadingTime(x=> x= true)
    setShowSuccesCopy(x=> x= true)

    setTimeout(() => {
      setLoadingTime(x=> x= false)
      setShowSuccesCopy(x=> x= false)
      setCopyProject(x=> x= false)
    }, 2100);
    
    //console.log(project);
    //console.log(item);
    
   
    const dataProjectCopy = await addNewProject(item.id,project.name) 
    const dataUpdate = await saveInvoice(dataProjectCopy.id, {
      table: project.table,
      tva: project.tva,
      discount: project.discount,
      modalite: project.modalite,
      invoiceType: project.invoiceType,
      remarque: project.remarque,
      amountTotal: project.amountTotal,
    });
    if(dataUpdate){
     
    }

  }} key={item.id}  className="flex relative w-full opacity-60 hover:opacity-100  hover:bg-[#ffffff05] cursor-pointer flex-1 ml-4 min-h-[40px] items-center  text-[15px] mt-2    py-2 text-[#ffffff6f]  border-b border-white border-opacity-10 x-40">
  <IoIosArrowForward className="absolute w-6 h-6 right-5 bottom-5" />
<div className="lg:w-[352px] w-[150px]  flex-1 ">
 
 <div className="flex items-center space-x-2">  <HiFolder className={`min-w-[45px] h-[45px] text-white `} />
<div className="flex flex-col leading-[1rem]">
 <p className="text-white text-[13.5px]  line-clamp-1">  {item.name.toUpperCase()}</p>
 <span className="text-[11px] line-clamp-1"> {item.email}</span>
  </div>
 </div>
 
 </div>
{/* <div className="flex flex-1 w-auto mb-1 "> <div className={`w-auto p-3 text-white rounded-full items-center text-center   flex justify-center text-opacity-100 py-[2px] text-[12px]`}>{item.activity}</div> </div>
 */}
<div className=" w-[350px] line-clamp-1 mb-1  flex-1">{item.address}</div>
</div>
 ))}
            </div>
      </div>
    </div>
    )
  }
  function modalTransaction() {
    return  (
      <div
    
      className="absolute inset-0 z-30 flex items-center justify-center min-w-screen bg-black/50">
<div 
  onClick={(e)=>{
  //  e.stopPropagation()
    setTransactionModal(false)
    setTypeTransaction("")
  }}

className="absolute inset-0 z-10 flex items-center justify-center min-w-screen">
  
</div>
        
      <div className="p-4 bg-[#323232] z-20 w-[370px]  px-8 flex flex-col items-center justify-center text-white rounded-md">
        <div className="font-bold text-[16px] flex justify-center items-center pb-2  pt-5  border-white/10 w-full self-start mb-2">
          <div className="text-[19px] ">{"Choisir le type de versement"}</div>
          
        </div>

        <div className="text-[16px] px-0 w-full gap-[10px] flex flex-col">
          {/* typeTransaction */}
       <TransactionItemBtn index={"0"} label="Virement bancaire"   handleClick={()=> {setTypeTransaction(x => x="0")}} />
       <TransactionItemBtn index={"1"} label="Paiement en espèce"   handleClick={()=> {setTypeTransaction(x => x="1")}} />
       <TransactionItemBtn index={"2"} label="Paiement par chèque"   handleClick={()=> {setTypeTransaction(x => x="2")}} />
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
          
          {(typeTransaction.length !=0  )  && <ButtonComponent
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
                await fetch()
                setTransactionModal(false)
                setIsLoadingConfirmBtn(x=> x = false);
                setTypeTransaction("")
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

  function TransactionItemBtn({label,index,handleClick}:{label:string,index:string,handleClick?: () => void}) {
    return <div onClick={handleClick} className={`w-full relative px-6 py-3 ${index == typeTransaction ? "text-white/100  primary " :"text-white/30  bg-[#4B4B4B] "} hover:brightness-110 rounded-[10px] cursor-pointer  text-md`}>
    {label} 
     {index == typeTransaction && <BsCheck2Circle className="absolute right-5 top-4 h-[20px] w-[20px]" />}
    </div>;
  }

  function SearchElement() {
  const router = useRouter();
  return (
    <div className="w-full relative min-h-[130px] px-14   pr-8 flex items-end pb-[17px]  justify-between   border-b-[1px]  border-white border-opacity-10">
      


      
 <IoIosArrowBack
        onClick={() => {
          router.back();
        }}
        className="absolute w-8 h-8 font-bold cursor-pointer bottom-[25px] left-5"
      />
      <div className="flex items-center space-x-2"> 
        <h3 className="ml-4 text-[40px] mb-1  leading-[44px] font-bold">Factures</h3>
      </div>
      
      <input          ref={proformaDateRef}
                type="date" 
                name="proformaDate" 
                onChange={handleChange}
                className="rounded-[4px]  absolute   right-[120px] bg-transparent opacity-0     [color-scheme:dark] mb-0 h-[50px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
                />
      <input          ref={invoiceDateRef}
                type="date" 
                name="invoiceDate" 
                onChange={handleChangeDate}
                className="rounded-[4px]  absolute   right-[120px] bg-transparent opacity-0     [color-scheme:dark] mb-0 h-[50px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
                />

{!isLoading && project?.table !=null &&     <div onClick={()=>{
      //invoiceDateRef.current!.focus();
   
   if(factureType==0){

     proformaDateRef.current!.showPicker()
   }else{

     invoiceDateRef.current!.showPicker()
   }
       
      
    }} className="absolute flex items-center justify-center gap-2 mr-4 text-sm cursor-pointer right-20 bottom-7 "><MdCalendarMonth  className="w-[30px] h-[30px]" />  <p className="mt-1 text-[15px] ">Changer la date</p> </div>
     
  }
   {isLoading &&   <div className="flex gap-4">
     <div className="min-w-[200px] h-8 rounded-full  animate-pulse duration-100    bg-[#ffffff1f] ">  </div>
    
     </div>}

    {!isLoading &&   <div className="flex ">
        <Menu>
        <Menu.Button className="relative items-center justify-between w-6 h-6 gap-2 py-2 mb-1 text-sm font-medium cursor-pointer bottom-5 group-hover:block hover:block right-1">
  
        <div className='bg-[#ffffff10] rounded-full h-8 w-8 flex justify-center items-center '> 
     <MdMoreHoriz className="w-6 h-6 opacity-60 hover:opacity-100" />
     </div>
         
          
        </Menu.Button>
        <Menu.Items className=" absolute  top-16  py-2  max-w-[255px] rounded-[12px] z-20 right-4  text-white/80 flex flex-col justify-center w-full   bg-[#323232] ">
          {project?.type != "ISFINISH" && <Menu.Item>
            {({ active }) => (
              <p
                onClick={() => {
                  setModalView(true)
                }}
                className={`  px-2  py-3 flex  justify-start pl-6  items-center gap-2  border-b    border-[#ffffff0c] text-[17px] cursor-pointer mx-2 ${
                  active ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]" : " "
                }`}
              >
                <RiFileEditLine className="w-6 h-6 " /> 
               Modifier le projet 
              </p>
            )}
          </Menu.Item>}
         {project?.table !=null &&  <Menu.Item>
            {({ active }) => (
              <p
                onClick={() => {
                  setCopyProject(x => x = true)
                }}
                className={`  px-2  py-3 flex justify-start pl-6  items-center gap-2  border-b  border-[#ffffff0c] text-[17px] cursor-pointer mx-2 ${
                  active ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]" : " "
                }`}
              >
                <FaCopy className="w-6 h-6 " /> 
              <div> Copier le projet  </div>
              </p>
            )}
          </Menu.Item>}

          {project?.type =="ISVALIDATE" && <Menu.Item>
            {({ active }) => (
              <p
                onClick={() => {
                  setTransactionModal(true)
              /*     modal.onSubmit = (
                    <ButtonComponent
                      handleClick={async () => {
                        setIsLoading(true)
                        modal.onClose()
                        const data = await finishProject(project!.id)
                        if(data){
                          await fetch()
                        }
                      }}
                      label={"Oui"}
                      className="max-h-[36px] min-w-[120px] mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none  rounded-md"
                    />
                  );
                  modal.onOpen();
              modal.setTitle("Êtes-vous sûr ?");
              modal.setMessage("Voulez vous vraiment terminer le projet ?");
                 */}}
                className={`  px-2  py-3 flex  justify-start pl-6  items-center gap-2  border-b  border-[#ffffff0c] text-[17px] cursor-pointer mx-2 ${
                  active ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]" : " "
                }`}
              >
                <IoMdWallet className="w-6 h-6 " /> 
                Versement effectué 
              </p>
            )}
          </Menu.Item>}
          <Menu.Item>
            {({ active }) => (
              <p
                onClick={() => {
                  modal.onSubmit = (
                    <ButtonComponent
                      handleClick={async () => {
                        setIsLoading(true)
                        modal.onClose()
                        const data = await intrashProject(project!.id)
                        if(data){
                         router.back()
                        }
                      }}
                      label={"Supprimer"}
                      className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none   "
                    />
                  );
                  modal.onOpen();
              modal.setTitle("Êtes-vous sûr ?");
              modal.setMessage("Voulez-vous vraiment supprimer ce projet ?");
                }}
                className={`  px-2  py-3 flex  justify-start pl-6  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                  active ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]" : " "
                }`}
              >
               {/* icontrash */}
<svg className="ml-1" width="16" height="24" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.03423 6.26667C10.2349 6.26667 12.4355 6.26667 14.6362 6.26667C15.2964 6.26667 15.4944 6.48307 15.4431 7.1341C15.1405 11.0195 14.8391 14.9042 14.539 18.7884C14.4473 19.9593 14.3849 21.1321 14.3052 22.303C14.2854 22.7661 14.0847 23.203 13.7462 23.5197C13.4077 23.8364 12.9585 24.0076 12.4951 23.9966C9.52792 24.0009 6.5604 24.0009 3.59257 23.9966C2.53809 23.9966 1.80454 23.3383 1.71926 22.2746C1.60189 20.8029 1.52579 19.3276 1.41484 17.855C1.15381 14.3651 0.887291 10.8755 0.615265 7.38626C0.606096 7.27714 0.59876 7.16803 0.590508 7.05891C0.551079 6.49316 0.763809 6.26117 1.34423 6.26025C3.05585 6.26025 4.76472 6.26025 6.47084 6.26025H8.02964L8.03423 6.26667ZM8.38816 15.1005C8.38816 13.5142 8.38816 11.9279 8.38816 10.3406C8.38816 10.1004 8.32398 9.92985 8.06449 9.91701C7.80499 9.90417 7.6702 10.0674 7.65553 10.3232C7.64911 10.4461 7.65553 10.569 7.65553 10.69C7.65553 12.618 7.65553 14.5463 7.65553 16.475C7.65553 17.6101 7.64728 18.7453 7.66653 19.8805C7.68807 20.0456 7.77289 20.1958 7.9031 20.2995C7.96637 20.3509 8.19928 20.2995 8.25796 20.2262C8.34362 20.092 8.38676 19.9351 8.38175 19.7759C8.39 18.219 8.38725 16.6602 8.38816 15.1005ZM11.9991 10.5158C12.0247 10.2471 12.0431 9.95827 11.6809 9.92251C11.3829 9.89409 11.2958 10.1123 11.2756 10.3746C11.0311 13.5087 10.7866 16.6428 10.5421 19.7769C10.5201 20.0464 10.5421 20.305 10.8648 20.3316C11.1876 20.3582 11.2518 20.1051 11.2719 19.8365C11.5116 16.7317 11.7539 13.6257 11.9991 10.5185V10.5158ZM4.04829 10.601C4.22312 12.8628 4.39886 15.1246 4.57553 17.3864C4.63971 18.2043 4.71399 19.0213 4.77359 19.8392C4.79284 20.1143 4.84786 20.3518 5.18163 20.3252C5.51539 20.2986 5.5319 20.0391 5.50347 19.775C5.50347 19.7347 5.50347 19.6934 5.49614 19.6522C5.30663 17.2406 5.11713 14.8288 4.92763 12.4166C4.87628 11.7628 4.8231 11.1081 4.77175 10.4543C4.75066 10.1793 4.7149 9.89592 4.35546 9.92251C4.0217 9.94635 4.01253 10.2159 4.0382 10.4727C4.04462 10.5222 4.04554 10.5625 4.04829 10.6038V10.601Z" fill="#EBEBEB"/>
<path d="M11.2756 2.81731H15.2001C15.8511 2.81731 15.908 2.87416 15.9071 3.51235C15.9071 4.04601 15.8997 4.57875 15.9071 5.11149C15.9126 5.43792 15.7649 5.59472 15.4431 5.59747C15.3514 5.59747 15.2524 5.59747 15.157 5.59747H0.807814C0.187046 5.59747 0.130196 5.5397 0.127445 4.91618C0.127445 4.42471 0.121944 3.93322 0.127445 3.44175C0.127445 2.89708 0.211804 2.81731 0.740878 2.81731C1.9329 2.81731 3.11667 2.80539 4.30411 2.82465C4.65163 2.83106 4.80659 2.75404 4.76991 2.37534C4.74015 2.08958 4.75282 1.80098 4.80751 1.51892C4.89555 1.0932 5.12746 0.710773 5.46427 0.435915C5.80108 0.161057 6.22225 0.0105313 6.65697 0.00964012C7.55924 -0.0022801 8.46151 -0.00411398 9.36286 0.00964012C10.4559 0.0252281 11.2618 0.851391 11.2765 1.94989C11.2793 2.2213 11.2756 2.4918 11.2756 2.81731ZM6.01236 2.78613H10.0423C10.0423 2.51105 10.0487 2.25339 10.0423 1.99756C10.0276 1.49508 9.78741 1.25576 9.27759 1.24934C8.63573 1.24017 7.99387 1.26493 7.35201 1.23834C6.01787 1.18149 5.91425 1.47674 6.01236 2.78613Z" fill="#EBEBEB"/>
</svg>
           <p className="ml-1"> Supprimer le projet </p>   
              </p>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
      </div>}
    </div>
  );
}

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
          Modifier le nom du projet
        </h2>

        <div className="w-full px-2">
          <InputComponent
            key={1}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            label="Nom du projet"
            labelClassName="text-white/40 text-[16px]"
            placeholder="Veuillez entrer le nom du dossier"
            className="rounded-xl mb-0 h-[35px] text-[12px] font-light border-opacity-50"
          />
        </div>

        <div className="flex items-center justify-center w-full gap-4 mb-4">
          <ButtonComponent
            key={2}
            handleClick={() => {
             // setInputValue("");
              setModalView(false);
            }}
            label={"Annuler"}
            className="min-w-[100px] mt-6 mb-4 shadow-xl shadow-black/20 bg-[#484848] border-none  "
          />
          {inputValue.trim().length >= 2 && (
            <ButtonComponent
              key={30}
              handleClick={async () => {
                
                const data = await updateNameProject(project!.id,inputValue)
               
            if(data){
              setInputValue("");
              setModalView(false);
              setIsLoading(true);
              fetch(); 
            }
              }}
              label={"Modifier"}
              className="  min-w-[100px] mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none  "
            />
          )}
        </div>
      </div>
    </div>
  );
}

}
/*
 */
export default Projet;

function ItemFacture({ label, indexType ,factureType,index,handleClick= ()=>{} }) {
  return indexType == 0 ? (
    <div className={`min-w-[160px] h-[200px] flex  m-1 mx-4`}>
     Lorem ipsum dolor, sit amet consectetur adipisicing  
    </div>
  ) : (
    <div onClick={handleClick} className={`flex cursor-pointer flex-col min-w-[100px] h-[240px] justify-center mx-4 px-4 text-white   bg-grey-400  items-center  text-[18px] mt-2     text-[#ffffff6f]  border-b-[1px] border-[#9a9768] ${factureType == index ? " border-opacity-75" : " border-opacity-0"}  `}>
      <div className="w-[125px]  flex h-[175px] rounded-md mb-2 ">
       {/*  <img
        className=""
        src="/images/facture.png"
        /> */}
        <svg width="128" height="181" viewBox="0 0 128 181" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M77.3431 5.00049H4.5C2.29086 5.00049 0.5 6.79135 0.5 9.00049V176.5C0.5 178.71 2.29086 180.5 4.5 180.5H120.5C122.709 180.5 124.5 178.71 124.5 176.5V52.1573C124.5 51.0965 124.079 50.0791 123.328 49.3289L80.1716 6.17206C79.4214 5.42192 78.404 5.00049 77.3431 5.00049Z" fill="#E9E9EA"/>
<rect x="11" y="169" width="97" height="5" fill="#7C7C7C"/>
<path d="M40.9975 167V148.819H47.4783C48.8929 148.819 50.0647 149.076 50.994 149.591C51.9232 150.106 52.6186 150.81 53.0803 151.704C53.5419 152.592 53.7727 153.592 53.7727 154.705C53.7727 155.823 53.5389 156.829 53.0714 157.723C52.6097 158.611 51.9113 159.315 50.9762 159.836C50.047 160.351 48.8781 160.608 47.4695 160.608H43.0128V158.282H47.2209C48.1146 158.282 48.8396 158.129 49.396 157.821C49.9523 157.507 50.3607 157.081 50.6211 156.542C50.8815 156.004 51.0117 155.391 51.0117 154.705C51.0117 154.018 50.8815 153.409 50.6211 152.876C50.3607 152.343 49.9493 151.926 49.3871 151.624C48.8307 151.322 48.0968 151.171 47.1854 151.171H43.7408V167H40.9975ZM62.8747 167H56.9887V148.819H63.0612C64.8427 148.819 66.3726 149.183 67.651 149.911C68.9294 150.633 69.9089 151.671 70.5896 153.027C71.2761 154.376 71.6194 155.995 71.6194 157.883C71.6194 159.777 71.2732 161.404 70.5807 162.766C69.8941 164.127 68.8998 165.175 67.5977 165.909C66.2957 166.636 64.7213 167 62.8747 167ZM59.732 164.603H62.7238C64.1088 164.603 65.2599 164.343 66.1773 163.822C67.0947 163.295 67.7812 162.535 68.2369 161.541C68.6927 160.54 68.9205 159.321 68.9205 157.883C68.9205 156.457 68.6927 155.246 68.2369 154.252C67.7871 153.258 67.1154 152.503 66.2217 151.988C65.328 151.473 64.2182 151.216 62.8925 151.216H59.732V164.603ZM75.0307 167V148.819H86.3056V151.18H77.774V156.72H85.4977V159.073H77.774V167H75.0307Z" fill="#7C7C7C"/>
<rect x="11" y="64.0005" width="103" height="3" fill="#7C7C7C"/>
<rect x="11.4" y="70.4005" width="102.2" height="2.2" stroke="#7C7C7C" stroke-width="0.8"/>
<rect x="11.4" y="73.4005" width="102.2" height="6.2" stroke="#7C7C7C" stroke-width="0.8"/>
<rect x="11.4" y="80.4005" width="102.2" height="15.2" stroke="#7C7C7C" stroke-width="0.8"/>
<rect x="11.4" y="67.4005" width="102.2" height="2.2" stroke="#7C7C7C" stroke-width="0.8"/>
<rect x="11.4" y="96.4005" width="102.2" height="2.2" stroke="#7C7C7C" stroke-width="0.8"/>
<rect x="11.25" y="99.2505" width="102.5" height="2.5" stroke="#7C7C7C" stroke-width="0.5"/>
<rect x="11.4" y="102.4" width="102.2" height="2.2" stroke="#7C7C7C" stroke-width="0.8"/>
<rect x="11.4" y="64.4005" width="5.38" height="40.2" stroke="#7C7C7C" stroke-width="0.8"/>
<rect x="11" y="51.0005" width="25.75" height="7" fill="#7C7C7C"/>
<rect x="32.6299" y="75.0005" width="12.36" height="2" fill="#7C7C7C"/>
<rect x="20.27" y="82.0005" width="37.08" height="5" fill="#7C7C7C"/>
<rect x="64.5596" y="75.0005" width="12.36" height="2" fill="#7C7C7C"/>
<rect x="64.5601" y="82.0005" width="12.36" height="5" fill="#7C7C7C"/>
<rect x="84.1299" y="82.0005" width="9.27" height="5" fill="#7C7C7C"/>
<rect x="98.55" y="82.0005" width="11.33" height="5" fill="#7C7C7C"/>
<rect x="98.5498" y="75.0005" width="12.36" height="2" fill="#7C7C7C"/>
<line x1="60.8399" y1="64.0005" x2="60.8399" y2="105" stroke="#7C7C7C" stroke-width="0.8"/>
<line x1="80.41" y1="64.0005" x2="80.41" y2="96.0005" stroke="#7C7C7C" stroke-width="0.8"/>
<line x1="95.86" y1="64.0005" x2="95.86" y2="105" stroke="#7C7C7C" stroke-width="0.8"/>
<g filter="url(#filter0_d_1011_7798)">
<path d="M79.5024 51.5003C78.9501 51.5003 78.5023 51.0526 78.5023 50.5003L78.5028 6.95174C78.5028 6.0555 79.591 5.6118 80.2177 6.25252L122.811 49.7986C123.43 50.4316 122.981 51.4977 122.096 51.4978L79.5024 51.5003Z" fill="#D9D9D9"/>
</g>
<defs>
<filter id="filter0_d_1011_7798" x="66.4022" y="1.84971" width="60.7955" height="61.7508" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="4"/>
<feGaussianBlur stdDeviation="4.05"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1011_7798"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1011_7798" result="shape"/>
</filter>
</defs>
</svg>

      </div>
      <p className="max-w-[120px] text-center  mt-1 text-[18px] tracking-wider   h-[54px] leading-[20px] ">
        {label}
      </p>
    </div>
  );
}

function ItemFactureShimmer() {
  return (
    <div  className={`flex    flex-col min-w-[100px] h-[240px] justify-center mx-4 px-4 text-white   bg-grey-400  items-center  text-[18px] mt-2     text-[#ffffff6f]  border-b-[1px] border-[#9a976800]  ${true ? " border-opacity-75" : " border-opacity-0"}  `}>
      <div className="w-[125px]  flex h-[175px] rounded-md mb-2 ">
        <img
        className="duration-100 animate-pulse "
        src="/images/factureShimmer.png"
        />
      </div>
      <div className="max-w-[120px]    text-center  mt-1 text-[18px] tracking-wider    h-[54px]  mr-[6px]  ">
        <p className="rounded-md  animate-pulse duration-100    bg-[#ffffff1f] mr-10  py-2 min-w-[112px] mx-auto"></p>
      </div>
    </div>
  )
}

 
