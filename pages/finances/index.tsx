import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
//import ReactApexChart from "react-apexcharts"; // or var ReactECharts = require('echarts-for-react');
import { fetchAllIsValideProject } from "../../services/projectService";
import { useRouter } from "next/router";
import { fetchAllTransaction } from "../../services/transactionService";
import dynamic from "next/dynamic";
import OtpInput from "react-otp-input";
import { MdSort } from "react-icons/md";
import { PiChartLine } from "react-icons/pi";
import { RiFileChartLine } from "react-icons/ri";
import { BiSolidLockAlt } from "react-icons/bi";
import ReactApexChart from "react-apexcharts";
import { fetchEnterprise } from "../../services/enterpriseService";
import { sendCodeOTP, sendCodeOTPFinance } from "../../services/emailService";
import { fetchUser, updateUserCodeOTP } from "../../services/userService";
import { IoMdClose } from "react-icons/io";

interface ApexChartProps {}
interface TravelDetailsViewProps {
  options?: any;
  series?: any;
}

function Finances(props) {

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
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFirst, setIsLoadingFirst] = useState(true);

  const [search, setSearch] = useState("");
  const [data, setData] = useState<Enterprise>({
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
 
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [projectsValide, setProjectsValide] = useState<Project[]>([]);
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [totalAmount, setTotalAmount] = useState<any>(0);
  const [totalTransactionAmount, setTotalTransactionAmount] = useState<any>(0);
 const [monthChart, setMonthChart] = useState({
  "JAN":0,
  "FEV":0,
  "MAR":0,
  "AVR":0,
  "MAI":0,
  "JUN":0,
  "JUL":0,
  "AOU":0,
  "SEP":0,
  "OCT":0,
  "NOV":0,
  "DEC":0,
 })

  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

 
  
useEffect(()=>{
  
(async()=>{
  const data = await fetchEnterprise();
  setData(data);

  const dataUser = await fetchUser();
   
   
    setOtpUser(dataUser.code);
    setCheckedFinance(dataUser.lockCode);
    




  if(dataUser.lockCode){
setShowOPTModal(x=> x =true)
}else{
    setShowOPTModal(x=> x =false)

  }
})()
  setIsLoadingFirst(x => x = false)
},[])
  useEffect(() => {
    
    (async () => {
      const dataTransaction = await fetchAllTransaction();
      setTransaction(dataTransaction);

      const dataProjectsValide = await fetchAllIsValideProject();
      setProjectsValide(dataProjectsValide);

      if (dataTransaction) {
        let sum = dataTransaction.reduce(function (prev, current) {
          return prev + parseInt(current.amountTotal);
        }, 0);
        setTotalTransactionAmount(sum);
      }

      if (dataProjectsValide) {
        let sum = dataProjectsValide.reduce(function (prev, current) {
          return prev + parseInt(current.amountTotal);
        }, 0);
        setTotalAmount(sum);
      }

     
      setIsLoading(false);
    })();
    
     

    return () => {};
  }, []);

  const [activeDate, setActiveDate] = useState("2023");
  
  useEffect(() => {
     
    let initialValue1 = 0
    let initialValue2 = 0
    let initialValue3 = 0
    let initialValue4 = 0
    let initialValue5 = 0
    let initialValue6 = 0
    let initialValue7= 0
    let initialValue8 = 0
    let initialValue9 = 0
    let initialValue10 = 0
    let initialValue11 = 0
    let initialValue12 = 0
    const M1 = transaction.filter((item)=> item.createdAt?.toString().includes(activeDate+"-01")).reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amountTotal), initialValue1)
    const M2 = transaction.filter((item)=> item.createdAt?.toString().includes(activeDate+"-02")).reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amountTotal), initialValue2)
    const M3 = transaction.filter((item)=> item.createdAt?.toString().includes(activeDate+"-03")).reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amountTotal), initialValue3)
    const M4 = transaction.filter((item)=> item.createdAt?.toString().includes(activeDate+"-04")).reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amountTotal), initialValue4)
    const M5 = transaction.filter((item)=> item.createdAt?.toString().includes(activeDate+"-05")).reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amountTotal), initialValue5)
    const M6 = transaction.filter((item)=> item.createdAt?.toString().includes(activeDate+"-06")).reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amountTotal), initialValue6)
    const M7 = transaction.filter((item)=> item.createdAt?.toString().includes(activeDate+"-07")).reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amountTotal), initialValue7)
    const M8 = transaction.filter((item)=> item.createdAt?.toString().includes(activeDate+"-08")).reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amountTotal), initialValue8)
    const M9 = transaction.filter((item)=> item.createdAt?.toString().includes(activeDate+"-09")).reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amountTotal), initialValue9)
    const M10 = transaction.filter((item)=> item.createdAt?.toString().includes(activeDate+"-10")).reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amountTotal), initialValue10)
    const M11= transaction.filter((item)=> item.createdAt?.toString().includes(activeDate+"-11")).reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amountTotal), initialValue11)
    const M12 = transaction.filter((item)=> item.createdAt?.toString().includes(activeDate+"-12")).reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amountTotal), initialValue12)
    setMonthChart((prevState) => ({
     ...prevState,
     JAN: M1,
     FEV: M2,
     MAR: M3,
     AVR: M4,
     MAI: M5,
     JUN: M6,
     JUL: M7,
     AOU: M8,
     SEP: M9,
     OCT: M10,
     NOV: M11,
     DEC: M12,
   }));
  
     
  }, [isLoading,activeDate])
  

  const intToString = (num) => {
    num = num.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: "K" },
      { v: 1e6, s: "M" },
      { v: 1e9, s: "B" },
      { v: 1e12, s: "T" },
      { v: 1e15, s: "P" },
      { v: 1e18, s: "E" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (
      (num / si[index].v)
        .toFixed(2)
        .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, " $1") + si[index].s
    );
  };

  const chartData: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      height: "100%",
      width: "100%",
      type: "line",
      foreColor: "#373d3f",
      redrawOnWindowResize: true,
      fontFamily: "Helvetica, Arial, sans-serif",
      zoom: {
        enabled: false,
      },

      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="bg-[#1f1f1f] px-4 py-2">' +
          "<span>" +
          series[seriesIndex][dataPointIndex].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") +
          " FCFA" +
          "</span>" +
          "</div>"
        );
      },
    },
    yaxis: {
      title: {
        // text: 'Temperature'
      },
      labels: {
        show: true,
        align: "left",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: ["#FFFFFF30"],
          fontSize: "14px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-yaxis-label",
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter: function (value) {
          return intToString(value);
        },
      },
    },
    xaxis: {
  labels:{
    show: true,
    style: {
      colors: ["#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52"],
      fontSize: '12px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 400,
      cssClass: 'apexcharts-xaxis-label',
  },
  },
      categories: [
        "JAN",
        "FEV",
        "MAR",
        "AVR",
        "MAI",
        "JUN",
        "JUL",
        "AOU",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      axisBorder:{
        show: true,
        color: '#000000', 
      },
      axisTicks: {
        show: true,
        borderType: 'solid',
        color: '#FFFFFF52',
        height: 6,
        offsetX: 0,
        offsetY: 0
    },
   
    },
    stroke: {
      //  curve: "smooth",
      width: 4,
    },

    colors: ["#9a9768", "#545454"],
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#E7E7E739",
      strokeDashArray: 3,

      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },

      yaxis: {
        lines: {
          show: true,
        },
      },

      row: {
        colors: ["#F3F3F303", "transparent"], // takes an array which will be repeated on columns
        opacity: 10.5,
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        // colorStops: []
      },
    },
    legend: {
      // position: '',
      width: 10,
      // position: 'top',
    },
    series: [
      {
        name: "Desktops",
        data: [
          monthChart.JAN,   monthChart.FEV,   monthChart.MAR,   monthChart.AVR,   monthChart.MAI,
          monthChart.JUN,   monthChart.JUL,   monthChart.AOU,   monthChart.SEP,   monthChart.OCT,
          monthChart.NOV,   monthChart.DEC,
        ],
      },
    ],
  };


  const chartDataFake: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      height: "100%",
      width: "100%",
      type: "line",
      foreColor: "#373d3f",
      redrawOnWindowResize: true,
      fontFamily: "Helvetica, Arial, sans-serif",
      zoom: {
        enabled: false,
      },

      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="bg-[#1f1f1f] px-4 py-2">' +
          "<span>" +
          series[seriesIndex][dataPointIndex].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") +
          " FCFA" +
          "</span>" +
          "</div>"
        );
      },
    },
    yaxis: {
      title: {
        // text: 'Temperature'
      },
      labels: {
        show: true,
        align: "left",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: ["#FFFFFF30"],
          fontSize: "14px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-yaxis-label",
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter: function (value) {
          return intToString(value);
        },
      },
    },
    xaxis: {
  labels:{
    show: true,
    style: {
      colors: ["#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52","#FFFFFF52"],
      fontSize: '12px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 400,
      cssClass: 'apexcharts-xaxis-label',
  },
  },
      categories: [
        "JAN",
        "FEV",
        "MAR",
        "AVR",
        "MAI",
        "JUN",
        "JUL",
        "AOU",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      axisBorder:{
        show: true,
        color: '#000000', 
      },
      axisTicks: {
        show: true,
        borderType: 'solid',
        color: '#FFFFFF52',
        height: 6,
        offsetX: 0,
        offsetY: 0
    },
   
    },
    stroke: {
      //  curve: "smooth",
      width: 4,
    },

    colors: ["#9a9768", "#545454"],
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#E7E7E739",
      strokeDashArray: 3,

      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },

      yaxis: {
        lines: {
          show: true,
        },
      },

      row: {
        colors: ["#F3F3F303", "transparent"], // takes an array which will be repeated on columns
        opacity: 10.5,
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        // colorStops: []
      },
    },
    legend: {
      // position: '',
      width: 10,
      // position: 'top',
    },
    series: [
      {
        name: "Desktops",
        data: [
         10000,   20000,   40000,   10000,   10000,
          10000,   10000,   10000,   10000,   10000,
          10000,   10000,
        ],
      },
    ],
  };




  const [showOPTModal, setShowOPTModal] = useState(true)
  const [otp, setOtp] = useState("");
  const [otpUser,setOtpUser] = useState("");
  const [checkedFinance, setCheckedFinance] = useState(false);

  useEffect(() => {
    
    
    if(otp == otpUser){
      console.log(otp);
      setShowOPTModal(false)
       
    }
  
    return () => {
      
    }
  }, [otp])
  


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

  return (
    <>
     {modalView && InfoView()}
   {/* {showOPTModal ? */}
   {showOPTModal ?
   
   (true && <>

{/* data.id == "" */}
{ data.id == "" &&  

<div    className="relative inset-0 z-20 flex flex-col items-center justify-center h-full ">

<FakeInfoSkeleton data={chartDataFake}  />
          
    
    </div>}

  {data.id != "" && 
  <div    className="relative inset-0 z-20 flex flex-col items-center justify-center h-full ">

<FakeInfo data={chartDataFake}  />
          
   <div className="z-20 flex flex-col items-center justify-center w-full h-full bg-black/50 ">
   <img className="h-[60px] mb-10   mt-10 " src="/images/logo-payme-complet.png" />
     <div className="relative flex flex-col items-center bg-gradient-to-b from-[#2e2e2ee3] to-[#191919]   justify-center  p-[80px] py-[60px] mb-[50px] rounded-[60px]">
      <p className="text-[26px] opacity-70 leading-8" >Entrez votre code à 4 chiffres pour</p>
      <p className="text-[26px] " > <span className="opacity-70">  accéder à</span> <span className="text-primary">vos finances</span> </p>
     <div className="m-[30px]  h-[100px] mt-[50px]  ">
      {(otp != otpUser && otp.length ==4) &&  <p className="absolute bottom-[105px] text-xs text-red-500/60 animate-pulse">
               
               Code d'accès erroné, réessayer
             </p>}
     
     <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      
      inputStyle={{
       
        marginBottom:"100px",
        backgroundColor:"transparent",
        border:"solid",
        borderColor:"#FFFFFF4F",
        borderWidth:"1px",
        borderRadius:"10px",
        marginRight:"20px",
        height:"90px",
        width:"90px",
        fontSize:"40px",
        outline:"none",
      }}
      renderSeparator={<span></span>}
      renderInput={(props) => <input {...props} type="number" className="   [&::-webkit-outer-spin-button]:appearance-none 
      [&::-webkit-inner-spin-button]:appearance-none " />}
    />
     </div>
     <p
     onClick={async()=>{
     
      const numbers = '0123456789';
    
      let numbersPart = '';
      
      for (let i = 0; i < 4; i++) {
        numbersPart += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }
      
      const data =   await updateUserCodeOTP(numbersPart,true) 
     
    
      if(data){
        setOtpUser(numbersPart);
        setOtp("")
        setModalView(true);
            
        setModalViewContent("Votre code est envoyer avec succès !")
        router.push("/finances")
       
        

        
       

        
      } 
     // const dataNew:any  = await sendCodeOTPFinance(data.email.trim().toLocaleLowerCase())
     }}
     className="text-[17px] cursor-pointer flex items-center font-light underline mr-4 opacity-20 " >
      <BiSolidLockAlt className="mr-1"/>
      Code d'accès perdu ?  </p>
     </div>
   </div>
    </div> }


    
   </>) 
    
    :  
    <div className="flex flex-col flex-1 h-full gap-10 p-10 pt-14 ">
     

 
  
    
 

     <div className="flex self-end ">
       
       <div className="max-h-[140px]   relative flex-col flex rounded-xl  items-center justify-center min-w-[300px] px-10 pl-[70px]  bg-gradient-to-b  from-[#1f1f1f]   to-[#141414]">
         <p className="absolute text-2xl top-4 right-8 text-white/30 ">
           FCFA
         </p>
         <div className="flex flex-col mt-1 mr-[70px] ">
           <p className="text-[54px] tracking-wide leading-[59px]  font-bold ">
             {totalTransactionAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") ?? 0} 
           </p>
           <div className="flex items-center self-end justify-center gap-2">
            <MdSort className="text-teal-500/70 w-[23px] h-[23px]" />
           <p className="self-end text-[17px] font-normal text-teal-500/70">
             Votre balance
           </p>
           </div>
         </div>
       </div>
       <div className="min-h-[140px]    relative flex-col flex rounded-xl items-center justify-center min-w-[300px] ml-8 mr-[40px] ">
         <div className="flex flex-col mt-4">
           <p className="self-end text-[18px] text-white/40">FCFA</p>
           <p className="text-[40px] leading-[45px]   font-normal text-primary ">
             + {totalAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") ?? 0}{" "}
           </p>
           <p className="self-end text-xl text-white/40">En attente</p>
         </div>
       </div>
     </div>

     <div className="flex-1 flex flex-col pb-0  h-full px-8 pt-8  bg-gradient-to-b    no-scrollbar from-[#1f1f1f]   to-[#060606] rounded-xl">
       <div className="flex items-center justify-between w-full pb-4 mb-4 border-b border-white/10">
         <div className="flex items-center justify-center gap-4">
           <p className="mr-8 text-xl text-white/40 ">
             {"Activités".toUpperCase()}{" "}
           </p>
          <div className="flex gap-2">
          <div onClick={()=>{
            setActiveDate(x => x= "2023")
          }}  className={`cursor-pointer text-[12px] flex justify-center items-center h-[22px] w-[52px] rounded-full ${activeDate == "2023" ? "bg-[#606060]" : "bg-[#444444]"} text-white/60 `}>
             2023
           </div>
          <div onClick={()=>{
            setActiveDate(x => x= "2024")
          }}  className={`cursor-pointer text-[12px] flex justify-center items-center h-[22px] w-[52px] rounded-full ${activeDate == "2024" ? "bg-[#606060]" : "bg-[#444444]"} text-white/60 `}>
             2024
           </div>
           
          </div>
         </div>
         <div
           onClick={() => {
             router.push(`finances/historylist`);
           }}
           className="px-5 py-[5px] bg-gradient-to-b from-[#827f58] to-[#4d4b33] relative flex justify-center gap-2 items-center text-[13px]  cursor-pointer rounded-full   mr-[45px]"
         >
          <RiFileChartLine className="w-[18px] h-[18px]"/>
          <p className="mt-[2px]"> VOIR L'HISTORIQUE</p>
         </div>
       </div>

        <div className="flex-1 pb-10 ">
         {!isLoading && (
           <ReactApexChart
             height="100%"
             className="w-full h-[200px]"
             options={chartData}
             series={chartData.series}
           />
         )}
       </div>  
     </div>
   </div>
   
   }
    </>
  );

  function SearchElement() {
    return (
      <div className="w-full min-h-[100px] px-14 flex items-center   justify-start pr-10 border-b-[1px]  border-white border-opacity-20">
        <h3 className="text-4xl font-bold">Finances</h3>
      </div>
    );
  }


  function FakeInfoSkeleton(data) {
    

const [isLoadingFake, setisLoadingFake] = useState(true)
useEffect(() => {
  console.log("render");
  
  setisLoadingFake(x => x = false)

   
}, [])

    return <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full ">
   <div className="flex flex-col flex-1 w-full h-full gap-10 p-10 pt-14 ">
       
   
   
  
       <div className="flex self-end ">
         
         <div className="max-h-[140px]   relative flex-col flex rounded-xl  items-center justify-center min-w-[300px] px-10 pl-[70px]  bg-gradient-to-b  from-[#1f1f1f]   to-[#141414]">
          
           <div className="flex flex-col mt-1 mr-[20px]  animate-pulse">
             <p className="h-[34px] bg-[#282828] w-[300px] rounded-full  xl:w-[400px] tracking-wide leading-[59px]  font-bold ">
                
             </p>
             <div className="flex items-center self-end justify-center gap-2">
              
             <p className="self-end h-[14px] bg-[#282828] w-[200px] mt-2 rounded-full text-[17px] font-normal text-teal-500/70">
               
             </p>
             </div>
           </div>
         </div>
         <div className="min-h-[140px]    relative flex-col flex rounded-xl items-center justify-center min-w-[300px] ml-8 mr-[14px] ">
           <div className="flex flex-col mt-4 animate-pulse">
           
             <p className="self-end h-[30px] bg-[#282828] w-[200px] mt-2 rounded-full text-[17px] font-normal text-teal-500/70">
               
               </p>
            
             <p className="self-end h-[14px] bg-[#282828] w-[100px] mt-2 rounded-full text-[17px] font-normal text-teal-500/70">
               
               </p>
           </div>
         </div>
       </div>
  
       <div className="flex-1 flex flex-col pb-0  h-full px-8 pt-8  bg-gradient-to-b    no-scrollbar from-[#1f1f1f]   to-[#060606] rounded-xl">
         <div className="flex items-center justify-between w-full pb-4 mb-4 border-b border-white/10">
           <div className="flex items-center justify-center gap-4">
           <p className="self-end h-[22px] bg-[#282828] animate-pulse  w-[180px] mt-2 rounded-full text-[17px] font-normal text-teal-500/70">
               
               </p>
            <div className="flex gap-2 ml-10">
            <p className="self-end h-[22px] bg-[#282828] animate-pulse  w-[70px] mt-2 rounded-full text-[17px] font-normal text-teal-500/70">
               
               </p>
            <p className="self-end h-[22px] bg-[#282828] animate-pulse  w-[70px] mt-2 rounded-full text-[17px] font-normal text-teal-500/70">
               
               </p>
       
            </div>
           </div>
           <p className="self-end h-[22px] bg-[#282828] animate-pulse  w-[170px] mr-10 mt-2 rounded-full text-[17px] font-normal text-teal-500/70">
               
               </p>
         </div>
  
         <div className="flex flex-col flex-1 pb-10 justify-evenly ">
     <p className="self-end h-[100px]  bg-gradient-to-b    no-scrollbar from-[#282828cf]   to-[#28282838] animate-pulse  w-full mt-2 rounded-md text-[17px] font-normal text-teal-500/70">
               
               </p>
     <p className="self-end h-[100px]  bg-gradient-to-b    no-scrollbar from-[#28282896]   to-[#28282820] animate-pulse  w-full mt-2 rounded-md text-[17px] font-normal text-teal-500/70">
               
               </p>
                
               
               
        {/*   {!isLoadingFake && (
             <ReactApexChart
               height="100%"
               className="w-full h-[200px]"
               options={data.data}
               series={data.data.series}
             />
           )}    */}  
         </div>  
       </div>
     </div>
    </div>;
  }
  function FakeInfo(data) {
    

const [isLoadingFake, setisLoadingFake] = useState(true)
useEffect(() => {
  console.log("render");
  
  setisLoadingFake(x => x = false)

   
}, [])

    return <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full blur-md ">
   <div className="flex flex-col flex-1 w-full h-full gap-10 p-10 pt-14 ">
       
   
   
  
       <div className="flex self-end ">
         
         <div className="max-h-[140px]   relative flex-col flex rounded-xl  items-center justify-center min-w-[300px] px-10 pl-[70px]  bg-gradient-to-b  from-[#1f1f1f]   to-[#141414]">
           <p className="absolute text-2xl top-4 right-8 text-white/30 ">
             FCFA
           </p>
           <div className="flex flex-col mt-1 mr-[70px] ">
             <p className="text-[54px] tracking-wide leading-[59px]  font-bold ">
               {"24012000".toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") ?? 0} 
             </p>
             <div className="flex items-center self-end justify-center gap-2">
              <MdSort className="text-teal-500/70 w-[23px] h-[23px]" />
             <p className="self-end text-[17px] font-normal text-teal-500/70">
               Votre balance
             </p>
             </div>
           </div>
         </div>
         <div className="min-h-[140px]    relative flex-col flex rounded-xl items-center justify-center min-w-[300px] ml-8 mr-[40px] ">
           <div className="flex flex-col mt-4">
             <p className="self-end text-[18px] text-white/40">FCFA</p>
             <p className="text-[40px] leading-[45px]   font-normal text-primary ">
               + {"10000000".toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") ?? 0}{" "}
             </p>
             <p className="self-end text-xl text-white/40">En attente</p>
           </div>
         </div>
       </div>
  
       <div className="flex-1 flex flex-col pb-0  h-full px-8 pt-8  bg-gradient-to-b    no-scrollbar from-[#1f1f1f]   to-[#1f1f1f] rounded-xl">
         <div className="flex items-center justify-between w-full pb-4 mb-4 border-b border-white/10">
           <div className="flex items-center justify-center gap-4">
             <p className="mr-8 text-xl text-white/40 ">
               {"Activités".toUpperCase()}{" "}
             </p>
            <div className="flex gap-2">
            <div onClick={()=>{
            
            }}  className={`cursor-pointer text-[12px] flex justify-center items-center h-[22px] w-[52px] rounded-full  bg-[#606060]`}>
               2023
             </div>
       
            </div>
           </div>
           <div
             onClick={() => {
              
             }}
             className="px-5 py-[5px] bg-gradient-to-b from-[#827f58] to-[#4d4b33] relative flex justify-center gap-2 items-center text-[13px]  cursor-pointer rounded-full   mr-[45px]"
           >
            <RiFileChartLine className="w-[18px] h-[18px]"/>
            <p className="mt-[2px]"> VOIR L'HISTORIQUE</p>
           </div>
         </div>
  
         <div className="flex-1 pb-10 ">
         {!isLoadingFake && (
             <ReactApexChart
               height="100%"
               className="w-full h-[200px]"
               options={data.data}
               series={data.data.series}
             />
           )}   
         </div>  
       </div>
     </div>
    </div>;
  }
}

export default Finances;


