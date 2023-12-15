import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiFolder, HiFolderAdd } from "react-icons/hi";
import {
  IoIosNotifications,
  IoMdPeople,
  IoMdBusiness,
  IoMdRefresh,
  IoMdAdd,
  IoMdClose,
} from "react-icons/io";
import { MdBookmarks, MdHandyman, MdOutlineAttachment } from "react-icons/md";
import { IoBookmarks, IoCalendar, IoCalendarNumber } from "react-icons/io5";
import {
  BsCheck2Circle,
  BsClipboard2CheckFill,
  BsClipboardCheckFill,
} from "react-icons/bs";
import { useRouter } from "next/router";
import { PiCalendarCheckFill } from "react-icons/pi";
import { RiAddCircleFill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import InputComponent from "../../../components/UI/InputComponent";
import { BiCircle, BiSolidCircle, BiSolidLockAlt } from "react-icons/bi";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import ButtonComponent from "../../../components/UI/ButtonComponent";
import { RxUpdate } from "react-icons/rx";
import InputDropdownComponent from "../../../components/UI/InputDropdownComponent";
import InputDropdownCountryComponent from "../../../components/UI/InputDropdownCountryComponent";
import { AiOutlineFileAdd, AiOutlineInfoCircle } from "react-icons/ai";
import InputDropdownActivityComponent from "../../../components/UI/InputDropdownActivityComponent";
import { v4 as uuidv4 } from "uuid";
import {
  fetchEnterprise,
  updateEnterprise,
  updateEnterpriseLockFinance,
  uploadImageLogo,
  uploadImageSignature,
} from "../../../services/enterpriseService";
import { fetchUser, updateUser, updateUserPassword } from "../../../services/userService";
import OtpInput from "react-otp-input";
import useMenuStore from "../../../utils/MenuStore";
import { useCropImage } from "../../../utils/use-crop-image-modal";
import { LiaFileAltSolid } from "react-icons/lia";
import Cropper from "react-easy-crop";
import {
  getCroppedImg,
  getRotatedImage,
} from "../../../components/Modals/canvasUtils";
import { country } from "../../../utils/country";
import { useGlobalModal } from "../../../utils/use-global-modal";
import { useGlobalPayment } from "../../../utils/use-global-payment";
import { ListItemIcon } from "@mui/material";
import { FaCircle, FaDotCircle } from "react-icons/fa";
function Profile(props) {
  const [indexView, setIndexView] = useState(0);
  const modalCropImage = useCropImage();
  const menuIndex = useMenuStore();
  const modal = useGlobalModal()
  const modalPayment = useGlobalPayment()
  const [imageSignature, setImageSignature] = useState(null);
  const [indexAccountView, setIndexAccountView] = useState(0);
  const [showPannel, setShowPannel] = useState(false);
  const [openDropCountry, setOpenDropCountry] = useState(false);
  const [openDropCountry1, setOpenDropCountry1] = useState(false);
  const [openDropCountry2, setOpenDropCountry2] = useState(false);
  const [deleteAskStep, setDeleteAskStep] = useState(0);
  const [deleteAsk, setDeleteAsk] = useState(null);
  const [deleteAskList, setDeleteAskList] = useState([
    {id:1,value:"J'ai cessé mon activité commerciale"},
    {id:2,value:"J'ai trouvé une autre solution de facturation qui répond mieux à mes besoins"},
    {id:3,value:"Les fonctionnalités de l'application ne correspondent pas à mes attentes"},
    {id:4,value:"J'ai rencontré des difficultés techniques/fréquentes erreurs avec l'application"},
    {id:5,value:"Les tarifs associés à l'application sont trop élevés"},
  ]);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [dropValueCountry, setDropValueCountry] = useState("");
  const [dropValueUserCountry, setDropValueUserCountry] = useState("");
  const [openDrop, setOpenDrop] = useState(false);
  const [canEditEnterprise, setCanEditEnterprise] = useState(false);
  const [canEditUser, setCanEditUser] = useState(false);
  const [canEditPassword, setCanEditPassword] = useState(false);
  const [checkedFinance, setCheckedFinance] = useState(false);
  const [canEditFileUpload, setCanEditFileUpload] = useState(false);
const router = useRouter();
  const [logoChoose, setLogoChoose] = useState(false);
  const [signatureChoose, setSignatureChoose] = useState(false);
  const [factureChoose, setFactureChoose] = useState(false);
  const [factureChooseOk, setFactureChooseOK] = useState(false);

  const [imageLogo, setImageLogo] = useState(null);

  const [otp, setOtp] = useState("");
  const [otpUser, setOtpUser] = useState("1234");

  const imageRef = useRef(null);
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);

      if (!file) {
        return;
      } else {
        reader.readAsDataURL(file as Blob);
      }
    });
  }
  const imageRef2 = useRef(null);

  useEffect(() => {
    if (otp == otpUser) {
      (async () => {
        setShowPannel((x) => (x = false));
        setCheckedFinance((x) => (x = !x));
        const dd = await updateEnterpriseLockFinance(!checkedFinance);
        console.log(dd);
      })();
    }

    return () => {};
  }, [otp]);
  const [modalAlertUpdate, setModalAlertUpdate] = useState(false);
  const [clientNumber,setClientNumber ] = useState(0);
  const [dataProfile, setDataProfile] = useState<User>({
    name: "",
    email: "",
    country: "",
    address: "",
    number: "",
    password: "",
    lockCode: false,
  });
  const [dataProfilePassword, setDataProfilePassword] = useState<any>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [modalView, setModalView] = useState(false);
  const [modalViewContent, setModalViewContent] = useState("");
  const [checkValidation, setCheckValidation] = useState(false);
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

  const [identNumber, setIdentNumber] = useState([
    {
      id: uuidv4(),
      content: "",
    },
  ]);
  const [contactList, setContactList] = useState([
    {
      id: uuidv4(),
      indicatif: "",
      number: "",
    },
  ])

  const fetch = async () => {
    const data = await fetchEnterprise();
    const dataUser = await fetchUser();
    setCheckedFinance(data.lockFinance ?? false);
    setDataProfile(dataUser);
    const numberClient = dataUser as any;
    setClientNumber(numberClient.customers?.length);
    setDropValueUserCountry(dataUser.country);

    // data.nif = JSON.parse(data.nif)
    if(data != null){

      setIdentNumber(JSON.parse(data?.nif));
      setContactList(JSON.parse(data?.numbers));
      setData(data);
      setDropValueCountry(data.currency);
      setDropValueActivity(data.activity);
      setDropValue(data.statut);
    }

    // setIsLoading(false);
  };
  useEffect(() => {
 if(modalView){
  setTimeout(() => {
    setModalView(x=> x = false)
  }, 4000);
 }

    return () => {};
  }, [modalView]);
  useEffect(() => {
    /*  (async () => {
  
    })(); */
    fetch();

    return () => {};
  }, []);

  const [openDropActivity, setOpenDropActivity] = useState(false);
  const [dropValueActivity, setDropValueActivity] = useState(
    data.activity ?? ""
  );

  const [dropValue, setDropValue] = useState(data.statut);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setDataProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeUserPassword = (e) => {
    const { name, value } = e.target;
    console.log(name)
    setDataProfilePassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const enterpriseHandleSubmit = async () => {
    data.nif = JSON.stringify(identNumber);
    data.numbers = JSON.stringify(contactList);
    data.currency = parseInt(contactList[0].indicatif).toString();
    const dataNew = await updateEnterprise(data);
    if (dataNew) {
      //fetch();
    }
  };

  const userHandleSubmit = async () => {
    const dataNew = await updateUser(dataProfile);
    if (dataNew) {
      //fetch();
    }
  };
  /*  */
  return (
    <>
      <div className="relative flex flex-col w-full h-screen overflow-hidden ">
         {modalView && InfoView()}
        {showPannel && CodePannel()}
        {logoChoose && <CropImageModal imageData={imageLogo} />}
        {signatureChoose && <CropImageModal imageData={imageSignature} />}
        {modalAlertUpdate && (
          <div className="absolute z-30 flex items-center justify-center w-screen h-full bg-black/50">
            <div className="p-4 bg-[#323232] z-50 w-[370px]  px-8 flex flex-col items-center justify-center text-white rounded-md">
              <div className="font-bold text-[16px] mt-2 flex justify-between items-center pb-2 border-b border-white/10 w-full self-start mb-6">
                <div>Remarque</div>
                <AiOutlineInfoCircle
                  onClick={() => {}}
                  className="w-[20px] h-[20px] opacity-60 mr-2 mt-1 cursor-pointer "
                />
              </div>

              <div className="text-[15px] px-0 pl-2 pr-4">
                Après confirmation il vous sera impossible de le modifier
                pendant 60 jours
              </div>

              <div className="flex items-center justify-center w-full gap-5 mt-0">
                <ButtonComponent
                  handleClick={() => {
                    setModalAlertUpdate(false);
                  }}
                  label={"Annuler"}
                  className=" mt-6 mb-4 shadow-xl shadow-black/20 bg-[#484848] border-none"
                />
                <ButtonComponent
                  handleClick={() => {
                    if (canEditEnterprise) {
                      enterpriseHandleSubmit();

                      setCanEditEnterprise(false);
                      setModalAlertUpdate(false);
                      return;
                    }
                    if (canEditUser) {
                      userHandleSubmit();
                      setCanEditUser(false);
                      setModalAlertUpdate(false);

                      return;
                    }
                  }}
                  label={"Confirmer"}
                  className=" mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none"
                />
              </div>
            </div>
          </div>
        )}
        {showDeleteAccount && (
          <div className="absolute z-10 flex items-center justify-center w-screen h-full bg-black/40 ">
            <div className="p-8 bg-[#323232] w-[600px] relative h-[485px] mr-[180px] rounded-md">
              <div className="flex justify-between pb-2 border-b border-white/10">
              {deleteAskStep == 0 &&  <p className="text-white/60">Votre compte va être supprimé</p>}
              {deleteAskStep == 1 &&  <p className="text-white/60">Confirmation de suppression du compte</p>}
              
                <AiOutlineInfoCircle
                  onClick={() => {}}
                  className="w-[20px] h-[20px] opacity-60  mt-1 cursor-pointer "
                />
              </div>
           {deleteAskStep == 0 &&
             <>
             <p className="text-[26px] leading-[30px] mt-6">
                 Pouvez-vous nous dire la raison
               </p>
               <p className="text-[26px] leading-[30px] mb-8">
                 de votre départ ?
               </p>
             </>
           }
           {deleteAskStep == 1 &&
             <>
             <p className="text-[26px] leading-[30px] mt-6">
             Êtes-vous sûr de vouloir supprimer
               </p>
               <p className="text-[26px] leading-[30px] mb-6">
               votre compte ?
               </p>
             </>
           }
          
            

             {deleteAskStep == 0 && <div className="flex flex-col pl-6 pr-[130px] flex-1 text-sm gap-2 ">

                {deleteAskList.map(item=>(
                  <div onClick={()=>{
                    setDeleteAsk(item.id)
                  }} key={item.id} className={`relative  ${item.id == parseInt(deleteAsk) ? "text-white" : "text-white/60"} flex items-start gap-2 cursor-pointer pl-7`}>
              
                {item.id == parseInt(deleteAsk) ?
                
                <FiCheckCircle className="min-w-[15px] min-h-[15px] absolute top-[3px] left-0 " />
                :  <FiCircle className="min-w-[15px] min-h-[15px] absolute top-[3px] left-0 " />}
                  
                  <p className=""> {item.value}</p>
                </div>
                  ))}
                
               
                
              
              </div>}
             {deleteAskStep == 1 && <div className="flex flex-col mb-[4px] text-white/60 pl-0 pr-[50px] h-[200px]   text-sm gap-1 ">
             <div className={`relative   flex items-center gap-2 cursor-pointer pl-7`}> <FaCircle className="w-[5px]" /> <p className="pl-2">Tous les documents et factures enregistrés</p></div>
             <div className={`relative   flex items-center gap-2 cursor-pointer pl-7`}> <FaCircle className="w-[5px]" /> <p className="pl-2">Les rapports financiers et les historiques de paiements</p></div>
             <div className={`relative   flex items-center gap-2 cursor-pointer pl-7`}> <FaCircle className="w-[5px]" /> <p className="pl-2">Les informations de profil et les préférences de l'application</p></div>
             <div className={`relative   flex items-start gap-2 cursor-pointer pl-7`}> 
              <p className="pl-0 mt-2">Pour confirmer, veuillez saisir le code de vérification <br /> envoyé à l'adresse e-mail associée au compte : </p></div>
             <div className="    pl-[30px]   mt-[20px] ">
            
            

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputStyle={{
                marginBottom: "100px",
                backgroundColor: "transparent",
                border: "solid",
                borderColor: "#FFFFFF4F",
                borderWidth: "1px",
                borderRadius: "10px",
                marginRight: "20px",
                height: "50px",
                width: "50px",
                fontSize: "30px",
                outline: "none",
              }}
              renderSeparator={<span></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  type="number"
                  className="   [&::-webkit-outer-spin-button]:appearance-none 
        [&::-webkit-inner-spin-button]:appearance-none "
                />
              )}
            />
             {false && (
              <p className="absolute bottom-[94px] text-xs text-red-500/60 animate-pulse">
                Code d'accès erroné, réessayer
              </p>
            )}
          </div>
             
              </div>}
            
              <div className="flex items-center justify-end w-full gap-5 mt-4">
                <ButtonComponent
                  handleClick={() => {
                    setShowDeleteAccount(false);
                    setDeleteAskStep(0)
                    setDeleteAsk(null)
                    setOtp("")
                  }}
                  label={"Annuler"}
                  className=" mt-6  shadow-xl shadow-black/20 bg-[#484848] border-none  "
                />
              {deleteAsk != null &&  <ButtonComponent
                  handleClick={() => {
                    setDeleteAskStep(x=> x = x + 1)
                  }}
                  label={"Supprimer"}
                  className=" mt-6  shadow-xl shadow-black/20 bg-[#9a9768] border-none  "
                />}
              </div>
            </div>
          </div>
        )}
        <div className="h-[200px] bg-gradient-to-r from-[#c0bc839a] via-[#3636368b] to-[#3636368b]  "></div>

        <div className="absolute flex w-full h-full gap-10 px-10 pt-[100px] pb-4 pr-16 ">
          {LeftSection()}

          <div className="h-full  rounded-md    w-full bg-gradient-to-b from-[#202020] to-[#0e0e0e]    ">
            <div className="flex px-8  w-auto min-h-[60px] ml-0   space-x-2 bg-[#2e2e2e78]  text-[18px]  overflow-x-scroll text-sm   rounded-tl-md rounded-tr-md border-opacity-10  no-scrollbar ">
              <div
                onClick={() => {
                  setIndexView(0);
                  
              setCanEditEnterprise((x) => (x = false));
              setCanEditUser((x) => (x = false));
               setCanEditFileUpload((x) => (x = false));
                }}
                className={`flex px-2 cursor-pointer items-center py-2 space-x-2  text-[17px] font-normal   ${
                  indexView == 0
                    ? "border-b-2 border-[#9a9768] border-opacity-100"
                    : "border-b-2 border-opacity-0 border-white  opacity-50"
                } `}
              >
                {" "}
                <span>Paramètre du compte</span>
              </div>
              <div
                onClick={() => {
                  setIndexView(1);
                  
              setCanEditEnterprise((x) => (x = false));
              setCanEditUser((x) => (x = false));
               setCanEditFileUpload((x) => (x = false));
               setImageSignature("value");
               setImageLogo("value");
                }}
                className={`flex px-4 cursor-pointer items-center py-2 space-x-2 text-[17px] font-normal   ${
                  indexView == 1
                    ? "border-b-2 border-[#9a9768] border-opacity-100"
                    : "border-b-2 border-opacity-0 border-white opacity-50 "
                } `}
              >
                {" "}
                <span>Autres paramètres</span>
              </div>
            </div>
            <div className="h-full ">
              {indexView == 0 ? (
                SettingView()
              ) : (
                <div className="pb-8 mx-10 mt-6 ">
                  <p className="text-[18px] mt-[20px] mb-1">Mode d'apparence</p>
                  <p className="text-[13px] opacity-40">
                    Personnalisez votre espace de travail, rendez le travail
                    plus agréable et confortable !
                  </p>
                  <div className="flex gap-6 border-b pb-7 mt-7 border-white/10">
                    {CardTheme()}
                    {CardTheme2()}
                  </div>
                  <p className="text-[18px] my-[30px] mt-[25px] mb-1">
                    Activité et sécurité
                  </p>

                  <div className="flex justify-between mt-[22px] max-w-[450px] border-b-0 pb-4  border-white/10">
                    <div>
                      <p className="text-[15px] opacity-50 leading-5 ">
                        Limitez l'accès à vos finances
                      </p>
                      <p className="text-[13px] opacity-30 font-light ">
                        Maîtrisez qui peut accéder à vos informations
                        financières
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkedFinance}
                        onChange={() => {
                          setShowPannel((x) => (x = true));
                          setOtp("");
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[#ffffff00] rounded-full peer dark:bg-[#ffffff45] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[9px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#9a9768]"></div>
                    </label>
                  </div>
                {/*   <div className="flex justify-between mt-[15px] max-w-[450px]">
                <div>
                  <p className="text-[15px] opacity-50 leading-5 ">
                    Réinitialisation du compteur des factures
                  </p>
                  <p className="text-[13px] opacity-30 font-light ">
                    Effacez l'historique des numéros de facture et redémarrez
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkedFinance}
                        onChange={() => {
                          setShowPannel((x) => (x = true));
                          setOtp("");
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[#ffffff00] rounded-full peer dark:bg-[#ffffff45] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[9px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#9a9768]"></div>
                    </label>
              </div>   */}
                  <div
                    onClick={() => {
                      setShowDeleteAccount(true);
                    }}
                    className="absolute text-[10px] cursor-pointer px-4 text-[#772824] bottom-14 right-[112px]  opacity-70 "
                  >
                    Supprimer le compte
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function LeftSection() {
    const router = useRouter();
    return (
      <div className="h-full  rounded-md flex flex-col items-center pt-12    min-w-[300px] max-w-[300px] bg-gradient-to-b from-[#202020] to-[#0e0e0e]    ">
        <div className="border mb-5 relative rounded-full h-[115px] p-[1px] w-[115px] bg-gray-200 border-black">
        <img
            className="object-contain w-full h-full rounded-full"
            /* http://localhost:3001/images/Rectangle%2014.png */

            src={`${process.env.BASE_API_URL}/files/logo-${data.id}.png?time=${new Date().getMilliseconds()}`}
            alt=""
          />
        </div>
    
        <p className="px-3 mb-1 font-bold text-center">
         
        {data.name}
         
          
        </p>
        <p className="mb-5 font-light text-[12px] opacity-40">
          {data.activity}
        </p>

 
        <div className="flex w-full p-[17px] justify-between border-t-[0.1px] items-center border-y-[1px] border-white/10">
          <p className="font-normal">Nombre de client</p>
          <p className="text-primary">{clientNumber}</p>
        </div>
        <div className="flex w-full p-[17px]   justify-between items-center border-t-0 border-b-0  items-start gap-1 border-y-[1px] border-white/20">
          <p className="font-normal">Votre devise</p>
           
   
     <p className="text-sm text-primary">{ country.filter((item) => item.Phone.toString().toLowerCase().includes(contactList[0].indicatif))[0].Currency}</p>
        {/*  <div className="w-[260px] mt-1">
         
         </div> */}
        </div>

        <div className="flex-1"></div>

        <div

onClick={() => {


  modal.onSubmit = (
    <ButtonComponent
      handleClick={async () => {
       

      

        modalPayment.onClose()
         
        
        //check
        //window.localStorage.removeItem("firstView")
        menuIndex.setMenuIndex(-1);
          window.localStorage.removeItem("accessToken");
          window.localStorage.removeItem("userId");
          router.replace({
            pathname: "/",
          });
         modal.onClose();
        
      }}
      label={"Confirmer"}
      className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none   "
    />
  );
  modal.onOpen();
modal.setTitle("Êtes-vous sûr ?");
modal.setMessage("Confirmez-vous vraiment votre déconnexion ?");
  }}

       
          className="flex w-full p-[17px] mb-10  cursor-pointer  items-center   "
        >
          <TbLogout className="w-6 h-6 mr-3 opacity-40" />
          <p className="text-sm font-normal opacity-40">Se déconnecter</p>
        </div>
      </div>
    );
  }

  /*   <InputComponent
              key={1}
              name="name"
              value={data.name}
              onChange={handleChange}
              label="Nom et prénom"
              labelClassName="text-white/40 text-[16px]"
              className="rounded-md mb-0 h-[50px] text-[14px] font-light border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
            />
 */
  function SettingView(): React.ReactNode {
    return (
      <div className="h-full">
        <div className="flex  mr-36  w-auto min-h-[34px] ml-12  mt-6 space-x-4  border-b border-[#ffffff07]     overflow-x-scroll text-sm   rounded-tl-md rounded-tr-md    no-scrollbar ">
          <div
            onClick={() => {
              setIndexAccountView(0);
              setCanEditEnterprise((x) => (x = false));
              setCanEditUser((x) => (x = false));
              setCanEditPassword((x) => (x = false));
               setCanEditFileUpload((x) => (x = false));
               
               setCheckValidation(x=>x =false);
            }}
            className={`flex cursor-pointer opacity-50 items-center py-2 space-x-2  text-[14px] font-light   ${
              indexAccountView == 0
                ? "border-b-2 px-0  border-[#ffffff] border-opacity-40"
                : "border-b-2 px-0  border-opacity-0 border-white  opacity-50"
            } `}
          >
            {" "}
            <span>Information sur l'entreprise</span>
          </div>
          <div
            onClick={() => {
              setIndexAccountView(1);
              setCanEditEnterprise((x) => (x = false));
              setCanEditUser((x) => (x = false));
              setCanEditPassword((x) => (x = false));
               setCanEditFileUpload((x) => (x = false));
               setCheckValidation(x=>x =false);
            }}
            className={`flex cursor-pointer items-center opacity-50 py-2 space-x-2 text-[14px] font-light   ${
              indexAccountView == 1
                ? "border-b-2 px-0  border-[#ffffff] border-opacity-40"
                : "border-b-2 px-0  border-opacity-0 border-white opacity-50 "
            } `}
          >
            {" "}
            <span>Information personnelle</span>
          </div>
          <div
            onClick={() => {
              setIndexAccountView(2);
              setCanEditEnterprise((x) => (x = false));
              setCanEditUser((x) => (x = false));
              setCanEditPassword((x) => (x = false));
              setCanEditFileUpload((x) => (x = false));
              setCheckValidation(x=>x =false);
              setImageSignature("value");
                    setImageLogo("value");

                     
            }}
            className={`flex cursor-pointer items-center opacity-50 py-2 space-x-2 text-[14px] font-light   ${
              indexAccountView == 2
                ? "border-b-2 px-0  border-[#ffffff] border-opacity-40"
                : "border-b-2 px-0  border-opacity-0 border-white opacity-50 "
            } `}
          >
            {" "}
            <span>Fichiers joints</span>
          </div>

         {dataProfile.password != "passwordByAuth" && dataProfile.password != ""  && <div
            onClick={() => {
              setIndexAccountView(3);
              setCanEditEnterprise((x) => (x = false));
              setCanEditUser((x) => (x = false));
              setCanEditFileUpload((x) => (x = false));
              setCheckValidation(x=>x =false);
              setImageSignature("value");
                    setImageLogo("value");

                     
            }}
            className={`flex cursor-pointer items-center opacity-50 py-2 space-x-2 text-[14px] font-light   ${
              indexAccountView == 3
                ? "border-b-2 px-0  border-[#ffffff] border-opacity-40"
                : "border-b-2 px-0  border-opacity-0 border-white opacity-50 "
            } `}
          >
            {" "}
            <span>Mot de passe</span>
          </div>}
        </div>
        {indexAccountView == 0 && (
          <div className="flex-1 h-full px-12 pt-6 overflow-scroll pb-[200px] no-scrollbar">
            <div className="grid w-full grid-cols-2 gap-x-8 gap-y-5">
              <InputComponent
                key={1}
                name="name"
                value={data.name}
                error={checkValidation && data.name.length < 3 ? "Min. 3 caractères" : ""}
                onChange={handleChange}
                label="Nom de l'entreprise *"
                labelClassName="text-white/40 text-[13px]"
                readOnly={canEditEnterprise ? false : true}
                className={`rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditEnterprise
                    ? "text-white focus:border-[#ffffff]"
                    : "text-white/40 focus:border-white/20"
                }`}
              />

              <InputDropdownActivityComponent
                label="Secteur d'activité * "
                placeholderOn={canEditEnterprise || canEditUser }
                error={checkValidation && dropValueActivity.length < 3 ? "Min. 3 caractères" : ""}
                placeholder={dropValueActivity ?? "---"} 
                inputDrop={true}
                readOnly={true}
                handleClickClose={() => {
                  setOpenDropActivity(false);
                }}
                openDrop={openDropActivity}
                onClick={() => {
                  if (!canEditEnterprise) {
                    return;
                  }
                  setOpenDropActivity(true);
                }}
                handleClick={(item) => {
                  setOpenDropActivity(false);
                  setDropValueActivity(item);
                  setData({
                    ...data,
                    activity: item + "",
                  });
                }}
                value={dropValueActivity}
                labelClassName="text-white/40 text-[13px]"
                className={`rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditEnterprise
                    ? "text-white focus:border-[#ffffff]"
                    : "text-white/40 focus:border-white/20"
                }`}
              />

              <InputComponent
                key={2}
                name="address"
                value={data.address}
                error={checkValidation && data.address.length < 3 ? "Min. 3 caractères" : ""}
                onChange={handleChange}
                label="Siège social *"
                labelClassName="text-white/40 text-[13px]"
                readOnly={canEditEnterprise ? false : true}
                className={`rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditEnterprise
                    ? "text-white focus:border-[#ffffff]"
                    : "text-white/40 focus:border-white/20"
                }`}
              />
              <InputComponent
                key={3}
                name="email"
                value={data.email}
                error={checkValidation && data.email.length < 3 ? "Min. 3 caractères" : ""}
                onChange={handleChange}
                label="Adresse email *"
                labelClassName="text-white/40 text-[13px]"
                readOnly={canEditEnterprise ? false : true}
                className={`rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditEnterprise
                    ? "text-white focus:border-[#ffffff]"
                    : "text-white/40 focus:border-white/20"
                }`}
              />
         
             {contactList.map((item, index) => (
              <div className="relative flex gap-4 ">
                <div className="w-[300px]">
                  <InputDropdownCountryComponent
                   
                    label={index == 0 ? "Indicatif *" : "Indicatif"}
                    placeholderOn={canEditEnterprise || canEditUser }
                    
                    placeholder={item.indicatif ?? "---"}
                    inputDrop={true}
                    readOnly={true}
                    handleClickClose={() => {
                      if(index == 0){
                        setOpenDropCountry(false);

                      }else{

                        setOpenDropCountry1(false);
                      }
                    }}
                    openDrop={index == 0 ? openDropCountry : openDropCountry1}
                    onClick={() => {
                      if (!canEditEnterprise) {
                        return;
                      }
                      if(index == 0){
                        setOpenDropCountry(true);

                      }else{

                        setOpenDropCountry1(true);
                      }
                    }}
                    handleClick={(itemNew) => {
                      if(index == 0){
                        setOpenDropCountry(false);

                      }else{

                        setOpenDropCountry1(false);
                      }
                      const newItem = contactList.map(shape => {
                        if (shape.id != item.id) {
                          // No change
                          return shape;
                        } else {
                          // Return a new circle 50px below
                          return {
                            ...shape,
                            indicatif:  itemNew.Phone + "",
                         //   indicatif:  item.Phone + "",
                          };
                        }
                      });
                      // Re-render with the new array
                      setContactList(newItem);
                    }}
                    value={item.indicatif}
                    labelClassName="text-white/40 text-[13px]"
                    className={`rounded-[14px]
                     
                    mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                      canEditEnterprise
                        ? "text-white    focus:border-[#ffffff]"
                        : "text-white/40 focus:border-white/20"
                    }`}
                  />
                </div>
                <div className="grid w-full gap-4 grid-cols ">
                  <InputComponent
                    label={index == 0 ? "Contact primaire *" : "Contact secondaire"}
                     
                    name="numberPrimary"
                    value={item.number}
                    error={checkValidation && item.number.length < 3 ? "Min. 3 caractères" : ""}
                    onChange={
                      (e)=>{
                        console.log(e.target.value);
                        
                        const newItem = contactList.map((shape) => {
                          if (shape.id != item.id) {
                            // No change
                            return shape;
                          } else {
                            // Return a new circle 50px below
                            return {
                              ...shape,
                              number: e.target.value,
                            };
                          }
                        });
                        // Re-render with the new array
                        setContactList(newItem);
                      }
                    }
                    type="number"
                    key={4}
                    labelClassName="text-white/40 text-[13px] line-clamp-1   "
                    readOnly={canEditEnterprise ? false : true}
                    className={`rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                      canEditEnterprise
                        ? "text-white  focus:border-[#ffffff]"
                        : "text-white/40 focus:border-white/20"
                    }`}
                  />
                </div>

                {contactList?.length == 1 &&
                    index == 0 &&
                    canEditEnterprise && (
                     <div>
                       <svg
                          onClick={() => {
                            setContactList([
                              ...contactList,
                              {
                                id: uuidv4(),
                                indicatif: "",
                                number: "",
                              },
                            ]);
                          }}
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="mt-[34px] cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="24" height="24" rx="12" fill="#505050" />
                          <path
                            d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z"
                            fill="#ACACAC"
                          />
                        </svg>
                     </div>
                    )}

<>
                    {contactList?.length == 2 &&
                      index == 1 &&
                      canEditEnterprise && (
                      <div>
                          <svg
                          onClick={() => {
                            const newArray = contactList.slice(0, -1);
                            setContactList(newArray);
                          }}
                          width="26"
                          height="24"
                          viewBox="0 0 22 24"
                          className="mt-[34px] cursor-pointer "
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1011_3097)">
                            <path
                              d="M12.0003 23.1429C18.1543 23.1429 23.1431 18.1541 23.1431 12C23.1431 5.846 18.1543 0.857178 12.0003 0.857178C5.84625 0.857178 0.857422 5.846 0.857422 12C0.857422 18.1541 5.84625 23.1429 12.0003 23.1429Z"
                              fill="#505050"
                            />
                            <path
                              d="M6.85742 12H17.1431"
                              stroke="#ACACAC"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1011_3097">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      )}
                  </>
              </div>))}
                  {/*  <InputDropdownCountryComponent
                    label=""
                    placeholder={data.currency ?? "---"}  
                    inputDrop={true}
                    readOnly={true}
                    handleClickClose={() => {
                      setOpenDropCountry2(false);
                    }}
                    openDrop={openDropCountry2}
                    onClick={() => {
                      if (!canEditEnterprise) {
                        return;
                      }
                      setOpenDropCountry2(true);
                    }}
                    handleClick={(item) => {
                      setOpenDropCountry2(false);
                     // setDropValueCountry(item.Phone);
                      setData({
                        ...data,

                        currency: item.Phone + "",
                      });
                    }}
                    value={dropValueCountry}
                    labelClassName="text-white/40 text-[13px]"
                    className={`rounded-[14px]  mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                      canEditEnterprise
                        ? "text-white focus:border-[#ffffff]"
                        : "text-white/40 focus:border-white/20"
                    }`}
                  /> */}
              <InputComponent
                key={6}
                name="rccm"
                value={data.rccm}
                onChange={handleChange}
                label="N° Registre du Commerce"
                labelClassName="text-white/40 text-[13px]"
                readOnly={canEditEnterprise ? false : true}
                className={`rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditEnterprise
                    ? "text-white focus:border-[#ffffff]"
                    : "text-white/40 focus:border-white/20"
                }`}
              />

              <InputDropdownComponent
                label="Statut juridique *"
                placeholder="---"
                inputDrop={true}
                readOnly={true}
                openDrop={openDrop}
                onClick={() => {
                  if (!canEditEnterprise) {
                    return;
                  }
                  setOpenDrop(true);
                }}
                handleClick={(item) => {
                  setOpenDrop(false);
                  setDropValue(item);
                  setData({ ...data, statut: item });
                }}
                value={dropValue}
                labelClassName="text-white/40 text-[13px]"
                className={`rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditEnterprise
                    ? "text-white focus:border-[#ffffff]"
                    : "text-white/40 focus:border-white/20"
                }`}
              />

              {identNumber.map((item, index) => (
                <div className="relative flex items-center justify-center gap-5 pr-1">
                  <InputComponent
                    key={7}
                    name="nif"
                    value={item.content}
                    onChange={(e) => {
                      const newItem = identNumber.map((shape) => {
                        if (shape.id != item.id) {
                          // No change
                          return shape;
                        } else {
                          // Return a new circle 50px below
                          return {
                            ...shape,
                            content: e.target.value,
                          };
                        }
                      });
                      // Re-render with the new array
                      setIdentNumber(newItem);
                    }}
                    label={index == 0 ? "Numéro d'Identification" : "Autre numéro d’identification"}
                    labelClassName="text-white/40 text-[13px]"
                    readOnly={canEditEnterprise ? false : true}
                    className={`rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                      canEditEnterprise
                        ? "text-white focus:border-[#ffffff]"
                        : "text-white/40 focus:border-white/20"
                    }`}
                  />
                  {identNumber?.length == 1 &&
                    index == 0 &&
                    canEditEnterprise && (
                      <>
                        <svg
                          onClick={() => {
                            setIdentNumber([
                              ...identNumber,
                              {
                                id: uuidv4(),
                                content: "",
                              },
                            ]);
                          }}
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="mt-6"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="24" height="24" rx="12" fill="#505050" />
                          <path
                            d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z"
                            fill="#ACACAC"
                          />
                        </svg>
                      </>
                    )}

                  <>
                    {identNumber?.length == 2 &&
                      index == 1 &&
                      canEditEnterprise && (
                        <svg
                          onClick={() => {
                            const newArray = identNumber.slice(0, -1);
                            setIdentNumber(newArray);
                          }}
                          width="26"
                          height="24"
                          viewBox="0 0 22 24"
                          className="mt-6 "
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1011_3097)">
                            <path
                              d="M12.0003 23.1429C18.1543 23.1429 23.1431 18.1541 23.1431 12C23.1431 5.846 18.1543 0.857178 12.0003 0.857178C5.84625 0.857178 0.857422 5.846 0.857422 12C0.857422 18.1541 5.84625 23.1429 12.0003 23.1429Z"
                              fill="#505050"
                            />
                            <path
                              d="M6.85742 12H17.1431"
                              stroke="#ACACAC"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1011_3097">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                  </>
                </div>
              ))}

              <InputComponent
                key={8}
                name="bankNumber"
                value={data.bankNumber}
                onChange={handleChange}
                label="Numéro de compte bancaire"
                labelClassName="text-white/40 text-[13px]"
                readOnly={canEditEnterprise ? false : true}
                className={`rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditEnterprise
                    ? "text-white focus:border-[#ffffff]"
                    : "text-white/40 focus:border-white/20"
                }`}
              />
              <InputComponent
                key={9}
                name="website"
                value={data.website}
                onChange={handleChange}
                label="Site internet"
                labelClassName="text-white/40 text-[13px]"
                readOnly={canEditEnterprise ? false : true}
                className={`rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditEnterprise
                    ? "text-white focus:border-[#ffffff]"
                    : "text-white/40 focus:border-white/20"
                }`}
              />

              <div></div>
            </div>
            <div className="flex items-end justify-start gap-6 pt-8 ">
              {canEditEnterprise && (
                <ButtonComponent
                  key={100}
                  label={"Annuler"}
                  handleClick={async() => {
                    setCanEditEnterprise(false);

                    await fetch()


                  setCheckValidation(x=> x = false)
                  }}
                  className="bg-[#212121]  border-none"
                />
              )}
              <ButtonComponent
                key={200}
                handleClick={async () => {
                  if (
                    data.name.trim().length < 3 ||
                   
                    data.activity.trim() == "---" ||
                    data.address.trim().length < 3 ||
                    data.email.trim().length < 3 ||
                    contactList[0].number.trim().length < 3 
                  
                  ) {
                    setCheckValidation(x=> x = true)
                    return;
                  }
                  setCanEditEnterprise(x=> x = !x);
                  enterpriseHandleSubmit();

                  setCheckValidation(x=> x = false)

                   
                 
                }}
                label={!canEditEnterprise ? "Modifier" : "Enregistrer"}
                className="bg-[#9a9768]  border-none"
              />
            </div>
          </div>
        )}

        {indexAccountView == 1 && (
          <div className="h-full px-12 pt-6 overflow-scroll no-scrollbar">
            <div className="grid w-full grid-cols-2 gap-x-8 gap-y-5">
              <InputComponent
                key={31}
                name="name"
                value={dataProfile.name}
                error={checkValidation && dataProfile.name.length < 3 ? "Min. 3 caractères" : ""}
                onChange={handleChangeUser}
                label="Nom & prénom *"
                labelClassName="text-white/40 text-[13px]"
                readOnly={canEditUser ? false : true}
                className={`rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditUser
                    ? "text-white focus:border-[#ffffff]"
                    : "text-white/40 focus:border-white/20"
                }`}
              />
              <InputComponent
                key={32}
                name="email"
                value={dataProfile.email}
                onChange={handleChangeUser}
                label="Adresse email *"
                labelClassName="text-white/40 text-[13px]"
                readOnly={true}
                className={`rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditUser
                    ? "text-white/40 focus:border-white/20"
                    : "text-white/40 focus:border-white/20"
                }`}
              />

             

         
            </div>
            <div></div>

            <div className="flex items-end justify-start gap-6 mt-12 ">
              {canEditUser && (
                <ButtonComponent
                  key={100}
                  label={"Annuler"}
                  handleClick={() => {
                    setCanEditUser(false);
                    setCheckValidation(x=>x =false);
                  }}
                  className="bg-[#ffffff09]  border-none  "
                />
              )}
              <ButtonComponent
                key={200}
                handleClick={async () => {
                  if(dataProfile.name.length < 3){

                    setCheckValidation(x=>x =true);
return;
                  }
              setCanEditUser(x=> x = !x);
              setCheckValidation(x=>x =false);
              userHandleSubmit(); 
                }}
                label={!canEditUser ? "Modifier" : "Enregistrer"}
                className="bg-[#9a9768]  border-none  "
              />
            </div>
          </div>
        )}
        {indexAccountView == 2 && (
          <div className="h-full px-12 overflow-scroll no-scrollbar">
            <div className="grid w-full  max-w-[400px] gap-x-8 gap-y-5">
              <div
                className={`flex-1  ${
                  canEditFileUpload ? "opacity-100" : "opacity-30"
                } `}
              >
                 <p className="text-[18px] mt-[20px] mb-1">Optimisez votre gestion des fichiers joints</p>
                  <p className="text-[13px] opacity-40">
                  Remplacez ou modifiez facilement vos fichiers joints
                  </p>
              
                <input
                  ref={imageRef}
                  type="file"
                  className="hidden"
                    accept="image/*"
                  onChange={(e) => { 
                     if (!e.target.files[0].type.startsWith("image/")) return;
      if (e.target.files[0].size > 2000000) {
        setModalView(true);
                      
        setModalViewContent("Fichier trop volumineux (2 Mo max)")
        return;
      };
                    setImageLogo(e.target.files[0]);
                    setLogoChoose(true);
                  }}
                />
                <input
                  ref={imageRef2}
                  type="file"
                  className="hidden"
                    accept="image/*"
                  onChange={(e) => { 
                     if (!e.target.files[0].type.startsWith("image/")) return;
      if (e.target.files[0].size > 2000000) {
        setModalView(true);
                      
        setModalViewContent("Fichier trop volumineux (2 Mo max)")
        return;
      };
                    setImageSignature(e.target.files[0]);
                    setSignatureChoose(true);
                  }}
                />

                <div className="grid w-full grid-cols-1 mt-6 gap-7 ">
                  {modalCropImage.image && (
                    <img
                      src={modalCropImage.image + ""}
                      alt="image"
                      className="object-contain w-full h-full rounded-lg"
                    />
                  )}

                  <div
                    onClick={() => {
                      
                      if(!canEditFileUpload){
                        return;

                      }
                      setImageLogo(null);

                      console.log(imageLogo);

                      imageRef.current.click();
                      setLogoChoose((x) => (x = true));
                      setSignatureChoose((x) => (x = false));
                    }}
                    className="bg-[#06060600] flex justify-between cursor-pointer items-center border-[1px] placeholder:opacity-40  text-white border-white  px-6 outline-none w-full  rounded-[8px] text-[14px] h-[60px]  border-opacity-50   "
                  >
                    <div className="flex items-center justify-center gap-3 ">
                      {imageLogo && (
                        <LiaFileAltSolid className="w-10 h-10 opacity-50 " />
                      )}

                      <div className="flex flex-col text-[12px] leading-4">
                        <p className="text-sm">
                          {!imageLogo
                            ? "Téléchargez le logo de l'entreprise"
                            : "Logo.png"}
                        </p>
                        <p className="opacity-40">
                          Taille de fichier Max. de 2 Mo
                        </p>
                      </div>
                    </div>

                    {!imageLogo ? (
                      <MdOutlineAttachment className="w-6 h-6" />
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2037 10.796L18.9997 9.00001C19.5447 8.45501 19.8177 8.18201 19.9637 7.88801C20.1005 7.61198 20.1717 7.30808 20.1717 7.00001C20.1717 6.69195 20.1005 6.38804 19.9637 6.11201C19.8177 5.81801 19.5447 5.54501 18.9997 5.00001C18.4547 4.45501 18.1817 4.18201 17.8877 4.03601C17.6117 3.89923 17.3078 3.82806 16.9997 3.82806C16.6917 3.82806 16.3878 3.89923 16.1117 4.03601C15.8177 4.18201 15.5447 4.45501 14.9997 5.00001L13.1807 6.81901C14.1484 8.47562 15.5361 9.84749 17.2037 10.796ZM11.7267 8.27301L4.85675 15.143C4.43075 15.569 4.21875 15.781 4.07875 16.043C3.93875 16.303 3.87975 16.598 3.76275 17.188L3.14675 20.265C3.08075 20.597 3.04675 20.763 3.14175 20.858C3.23675 20.953 3.40175 20.919 3.73475 20.853L6.81175 20.237C7.40175 20.12 7.69675 20.061 7.95775 19.921C8.21775 19.781 8.43075 19.569 8.85575 19.144L15.7457 12.254C14.1278 11.2411 12.7548 9.88174 11.7257 8.27401L11.7267 8.27301Z"
                          fill="#D9D9D9"
                        />
                      </svg>
                    )}
                  </div>

                  <div
                    onClick={() => {
                      if(!canEditFileUpload){
                        return;

                      }
                      setImageSignature(null);

                      console.log(imageSignature);

                      imageRef2.current.click();
                      setSignatureChoose((x) => (x = true));
                      setLogoChoose((x) => (x = false));
                    }}
                    className="bg-[#06060600] flex justify-between cursor-pointer items-center border-[1px] placeholder:opacity-40  text-white border-white  px-6 outline-none w-full  rounded-[8px] text-[14px] h-[60px]  border-opacity-50   "
                  >
                    <div className="flex items-center justify-center gap-3 ">
                      {imageSignature && (
                        <LiaFileAltSolid className="w-10 h-10 opacity-50 " />
                      )}

                      <div className="flex flex-col text-[12px] leading-4">
                        <p className="text-sm">
                          {!imageSignature
                            ? "Téléchargez la signature de l'entreprise "
                            : "Signature.png"}
                        </p>
                        <p className="opacity-40">
                          Taille de fichier Max. de 2 Mo
                        </p>
                      </div>
                    </div>

                    {!imageSignature ? (
                      <MdOutlineAttachment className="w-6 h-6" />
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.2037 10.796L18.9997 9.00001C19.5447 8.45501 19.8177 8.18201 19.9637 7.88801C20.1005 7.61198 20.1717 7.30808 20.1717 7.00001C20.1717 6.69195 20.1005 6.38804 19.9637 6.11201C19.8177 5.81801 19.5447 5.54501 18.9997 5.00001C18.4547 4.45501 18.1817 4.18201 17.8877 4.03601C17.6117 3.89923 17.3078 3.82806 16.9997 3.82806C16.6917 3.82806 16.3878 3.89923 16.1117 4.03601C15.8177 4.18201 15.5447 4.45501 14.9997 5.00001L13.1807 6.81901C14.1484 8.47562 15.5361 9.84749 17.2037 10.796ZM11.7267 8.27301L4.85675 15.143C4.43075 15.569 4.21875 15.781 4.07875 16.043C3.93875 16.303 3.87975 16.598 3.76275 17.188L3.14675 20.265C3.08075 20.597 3.04675 20.763 3.14175 20.858C3.23675 20.953 3.40175 20.919 3.73475 20.853L6.81175 20.237C7.40175 20.12 7.69675 20.061 7.95775 19.921C8.21775 19.781 8.43075 19.569 8.85575 19.144L15.7457 12.254C14.1278 11.2411 12.7548 9.88174 11.7257 8.27401L11.7267 8.27301Z"
                          fill="#D9D9D9"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div></div>

            <div className="flex items-start justify-start gap-6 mt-12 ">
              {canEditFileUpload && (
                <ButtonComponent
                  key={100}
                  label={"Annuler"}
                  handleClick={() => {
                    setCanEditFileUpload(false);
                  }}
                  className="bg-[#ffffff09]  border-none  "
                />
              )}
              <ButtonComponent
                key={200}
                handleClick={async () => {
                
        
                  setCanEditFileUpload((x) => (x = !x));

                  if(canEditFileUpload){
             if(imageLogo != "value" && imageLogo != null)    {    
                    await uploadImageLogo(imageLogo,data!.id)
      
                   }
             if(imageSignature != "value" && imageSignature != null)    {    
                    await uploadImageSignature(imageSignature,data!.id)
      
                   }

                   await fetch();
                  }

                  
                  
                }}
                label={!canEditFileUpload ? "Modifier" : "Enregistrer"}
                className="bg-[#9a9768]  border-none  "
              />
            </div>
          </div>
        )}

{indexAccountView == 3 && (
          <div className="h-full px-12 pt-6 overflow-scroll no-scrollbar">
            <div className="grid w-full grid-cols-2 gap-x-8 gap-y-5">
              <InputComponent
                key={131}
                name="oldPassword"
              type="password"
           //   value={!canEditPassword ? "password" : ""}
             value={!canEditPassword ? "password" : dataProfilePassword.oldPassword}
             error={checkValidation && dataProfilePassword.oldPassword.length < 6 ? "Champs obligatoires (min. 6 caractères)" : ""}
               onChange={handleChangeUserPassword}
                label="Ancien mot de passe *"
                placeholder="Ancien mot de passe *"
                
                labelClassName="text-white/40 text-[13px]"
                readOnly={canEditPassword ? false : true}
                className={`rounded-[14px] mb-0 h-[40px] text-[14px]  ${canEditPassword ? "" : "bg-[#39383834]"}  font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditPassword
                    ? "text-white focus:border-[#ffffff]"
                    : "text-white/40 focus:border-white/20"
                }`}
              />
               <InputComponent
                key={132}
                name="newPassword"
              type="password"
             //    value={!canEditPassword ? "password" : ""}
            value={!canEditPassword ? "password" : dataProfilePassword.newPassword}
            error={checkValidation && dataProfilePassword.newPassword.length < 6 ? "Champs obligatoires (min. 6 caractères)" : ""}
               onChange={handleChangeUserPassword}
                label="Nouveau mot de passe *"
                placeholder="Nouveau mot de passe *"
                labelClassName="text-white/40 text-[13px]"
                readOnly={canEditPassword ? false : true}
                className={`rounded-[14px] mb-0 h-[40px] text-[14px] ${canEditPassword ? "" : "bg-[#39383834]"}  font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditPassword
                    ? "text-white focus:border-[#ffffff]"
                    : "text-white/40 focus:border-white/20"
                }`}
              />

<InputComponent
                key={133}
                name="confirmPassword"
              type="password"
               value={!canEditPassword ? "password" : dataProfilePassword.confirmPassword}
               error={checkValidation && dataProfilePassword.confirmPassword.length < 6 ? "Champs obligatoires (min. 6 caractères)" : ""}
               onChange={handleChangeUserPassword}
            //   value={!canEditPassword ? "password" : ""}
               
                label="Confirmation de mot de passe *"
                placeholder="Confirmation de mot de passe *"
                labelClassName="text-white/40 text-[13px]"
                readOnly={canEditPassword ? false : true}
                className={`rounded-[14px] mb-0 h-[40px] text-[14px] ${canEditPassword ? "" : "bg-[#39383834]"}  font-light border-opacity-20  focus:border-opacity-100 ${
                  canEditPassword
                    ? "text-white focus:border-[#ffffff]"
                    : "text-white/40 focus:border-white/20"
                }`}
              />
              

             

        
            </div>
            
            <div></div>

            <div className="flex items-end justify-start gap-6 mt-12 ">
              {canEditPassword && (
                <ButtonComponent
                  key={100}
                  label={"Annuler"}
                  handleClick={() => {
                    setCheckValidation(x=> x =false)

                    setCanEditPassword(false);
                  }}
                  className="bg-[#ffffff09]  border-none  "
                />
              )}
             { <ButtonComponent
                key={200}
                handleClick={async () => {

                  if(canEditPassword && (
                    dataProfilePassword.oldPassword.length < 6 ||
                    dataProfilePassword.newPassword.length < 6 ||
                    dataProfilePassword.confirmPassword.length < 6
                    
                    )){
                      setCheckValidation(x=> x =true)

           
                    return
                  }
                  if(canEditPassword && (
                  
                    dataProfile.password != dataProfilePassword.oldPassword
                    )){
                       

                      setModalView(true);
                      
                      setModalViewContent("L'ancien mot de passe saisi est incorrect. Veuillez réessayer")
                     
                      
                    return
                  }

                  if(canEditPassword && (
                    
                    dataProfilePassword.newPassword != dataProfilePassword.confirmPassword
                     
                    )){
                       
                      setModalView(true);
    setModalViewContent("La confirmation du mot de passe ne correspond pas. Veuillez réessayer")
                     
                    return
                  }


                  if(canEditPassword && ( 
                    dataProfilePassword.newPassword == dataProfilePassword.confirmPassword
                     
                    )){
                      const data =   await updateUserPassword(dataProfilePassword.newPassword) 
                  if(data){
                    await fetch()
                    setDataProfilePassword(x=> x = { oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""}) 
                    setCheckValidation(x=> x =false)

                    setModalView(true);
                      
                    setModalViewContent("Mot de passe réinitialisé avec succès !")
                  }
                  }
                  setCanEditPassword(x=> x = !x);
             
                 
                }}
                label={!canEditPassword ? "Modifier" : "Enregistrer"}
                className="bg-[#9a9768]  border-none  "
              />}
            </div>
          </div>
        )}
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


 
  function CodePannel() {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowPannel((x) => (x = false));
          setOtp("")
        }}
        className="absolute z-10 flex flex-col items-center justify-center w-full h-full bg-black/30"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="relative z-20 flex flex-col items-center bg-gradient-to-b from-[#2e2e2e] to-[#191919]   justify-center  p-[80px] py-[60px] mb-[50px] rounded-[60px]"
        >
          <p className="text-[26px] opacity-70 leading-8">
            Entrez votre code à 4 chiffres pour
          </p>
          <p className="text-[26px] ">
            {" "}
            <span className="opacity-70"> accéder à</span>{" "}
            <span className="text-primary">vos finances</span>{" "}
          </p>
          <div className="m-[30px]  h-[100px] mt-[50px] relative">
            {otp != otpUser && otp?.length == 4 && (
              <p className="absolute -top-8 text-red-500/60 animate-pulse ">
                Code d'accès erroné, réessayer
              </p>
            )}

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputStyle={{
                marginBottom: "100px",
                backgroundColor: "transparent",
                border: "solid",
                borderColor: "#FFFFFF4F",
                borderWidth: "1px",
                borderRadius: "10px",
                marginRight: "20px",
                height: "90px",
                width: "90px",
                fontSize: "40px",
                outline: "none",
              }}
              renderSeparator={<span></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  type="number"
                  className="   [&::-webkit-outer-spin-button]:appearance-none 
        [&::-webkit-inner-spin-button]:appearance-none "
                />
              )}
            />
          </div>
          <p className="text-[17px] flex items-center font-light underline mr-4 opacity-20 ">
            <BiSolidLockAlt className="mr-1" />
            Code d'accès perdu ?{" "}
          </p>
        </div>
      </div>
    );
  }

  function CropImageModal({ handleDone = () => {}, imageData = "" }) {
    useEffect(() => {
      (async () => {
        let imageDataUrl = await readFile(imageData);

        setImage(imageDataUrl);
      })();
      return () => {};
    }, []);

    const imageRef = useRef(null);
    const imageRef2 = useRef(null);
    const [image, setImage] = useState(null);
    const [index, setIndex] = useState(0);
    const router = useRouter();

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedImage, setCroppedImage] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onFileChange = async (e) => {
      if (!e.target.files[0].type.startsWith("image/")) return;
      if (e.target.files[0].size > 2000000) {
        setModalView(true);
                      
        setModalViewContent("Fichier trop volumineux (2 Mo max)")
        return;
      };
    
   //  
      if (e.target.files && e.target.files?.length > 0) {

      
        const file = e.target.files[0];
        let imageDataUrl = await readFile(file);

        console.log("imageDataUrl");
        console.log(file);
        console.log(file.size);
        console.log("imageDataUrl");
        
        try {
          // apply rotation if needed

          if (rotation) {
            imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
          }
        } catch (e) {
          console.warn("failed to detect the orientation");
        }

        setImage(imageDataUrl);
      }
    };

    const showCroppedImage = useCallback(async () => {
      try {
        const croppedImage = await getCroppedImg(
          image,
          croppedAreaPixels,
          rotation
        );
        console.log("donee", croppedImage);
        setCroppedImage(croppedImage);
      } catch (e) {
        console.error(e);
      }
    }, [image, croppedAreaPixels, rotation]);
    const [apercuIncrement, setApercuIncrement] = useState(0);
    /*   if (!logoChoose || !signatureChoose) {
      return null;
    } */
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center pt-10 transition pr-7 bg-black/40 ">
        <div className="p-4 bg-[#323232]  z-50  w-[474px] h-[415px] px-8 flex flex-col items-start pt-[32px] text-white rounded-xl">
          <p className="text-[18px]">Télécharger votre image</p>
        {/*   <p className="text-[14px] text-[#808080] mb-[35px]">
            Pour un meilleur résultat utilisé un PNG, JPG ou JPEG
          </p> */}
          <div className="flex justify-center w-full ">
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onFileChange}
            />
            {/* 
             */}
            <div className={` ${!image ? "bg-[#ffffff07]" : "bg-[#ffffff]"} p-1  border-dashed       border-white/50 border relative h-[230px] w-[430px] mt-6 mb-6 object-cover rounded-[20px]`}>
              {image ? (
               <img
                 src={image + ""}
                 alt="image"
                 className="object-contain w-full h-full rounded-lg"
               />  
           /*  <Cropper
                  style={{
                    containerStyle: {
                      borderRadius: 20,
                    },
                  }}
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  
                 
                  objectFit="horizontal-cover"
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />   */
              ) : <div
              onClick={() => {
                imageRef.current.click();
              }}
              className="flex flex-col items-center justify-center w-full h-full cursor-pointer" >
                
                <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M39.5713 5.45752H16.3734C14.9257 5.45752 13.5374 6.03259 12.5137 7.05623C11.4901 8.07986 10.915 9.46821 10.915 10.9159V54.5825C10.915 56.0302 11.4901 57.4185 12.5137 58.4421C13.5374 59.4658 14.9257 60.0408 16.3734 60.0408H49.1234C50.571 60.0408 51.9594 59.4658 52.983 58.4421C54.0066 57.4185 54.5817 56.0302 54.5817 54.5825V20.4679L39.5713 5.45752Z" stroke="#BDBDBD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M38.208 5.45752V21.8325H54.583" stroke="#BDBDBD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="32" y="33" width="28" height="32" fill="#393939"/>
<g clip-path="url(#clip0_1325_415)">
<path d="M48 41L48 61" stroke="#C2C3C5" stroke-width="3"/>
<path d="M38 51L58 51" stroke="#C2C3C5" stroke-width="3"/>
</g>
<defs>
<clipPath id="clip0_1325_415">
<rect x="33" y="39" width="24" height="24" rx="12" fill="white"/>
</clipPath>
</defs>
</svg>

                <p className="mt-6 text-[19px]" >Choisissez le fichier à télécharger</p>
                <p className="text-[13px] opacity-50" >Pour un meilleur résultat, utilisé un PNG</p>
                </div>}
            </div>

            {/* <div className="flex flex-col items-center gap-4">
              <div className="bg-white h-[150px] w-[150px] rounded-xl">
                <img src={croppedImage} />
              </div>
              <div
                onClick={()=> {
                  setApercuIncrement(x=> x =x+1)
                  showCroppedImage()
                
             
                
                }}
                className="flex  bg-gradient-to-r items-center gap-2 justify-center from-[#757575]  to-[#4c4c4c] w-[120px] p-1 text-center text-white text-sm cursor-pointer rounded-md shadow-md  "
              >
                <BiImageAlt className="w-6 h-6" />
                <span>Aperçu</span>
              </div>
              
            </div> */}
          </div>
       {/*    <div className="flex hidden items-center self-center justify-between w-[190px] mt-[20px]">
            <svg
              width="13"
              height="11"
              viewBox="0 0 13 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.112 6.99366L9.53598 4.40366C9.34776 4.21614 9.11933 4.07394 8.86798 3.98784C8.61664 3.90173 8.34899 3.87399 8.08533 3.90671C7.82167 3.93943 7.56892 4.03175 7.34625 4.17667C7.12357 4.3216 6.93682 4.51532 6.80015 4.74316L3.40398 10.181H2.19531C1.73118 10.181 1.28606 9.99662 0.957876 9.66843C0.629687 9.34024 0.445313 8.89512 0.445313 8.43099L0.445312 2.59766C0.445313 2.13353 0.629687 1.68841 0.957876 1.36022C1.28606 1.03203 1.73118 0.847656 2.19531 0.847656L10.362 0.847656C10.8261 0.847656 11.2712 1.03203 11.5994 1.36022C11.9276 1.68841 12.112 2.13353 12.112 2.59766V6.99366ZM12.1056 8.58266C12.0676 9.01891 11.8675 9.42509 11.5447 9.72099C11.2219 10.0169 10.7999 10.181 10.362 10.181H4.90198L7.80056 5.34341C7.84607 5.26745 7.90828 5.20286 7.98246 5.15452C8.05665 5.10617 8.14086 5.07536 8.22872 5.06439C8.31659 5.05343 8.40579 5.06262 8.48958 5.09125C8.57337 5.11988 8.64954 5.16721 8.71231 5.22966L12.1056 8.58266ZM3.94531 6.09766C4.40944 6.09766 4.85456 5.91328 5.18275 5.58509C5.51094 5.2569 5.69531 4.81178 5.69531 4.34766C5.69531 3.88353 5.51094 3.43841 5.18275 3.11022C4.85456 2.78203 4.40944 2.59766 3.94531 2.59766C3.48118 2.59766 3.03606 2.78203 2.70788 3.11022C2.37969 3.43841 2.19531 3.88353 2.19531 4.34766C2.19531 4.81178 2.37969 5.2569 2.70788 5.58509C3.03606 5.91328 3.48118 6.09766 3.94531 6.09766Z"
                fill="#D9D9D9"
              />
            </svg>

            <div className="w-[140px]">
              <input
                id="small-range"
                type="range"
                value={zoom}
                min={1}
                max={100}
                step={0.0001}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-[1px] mb-4 bg-[#858585] rounded-lg appearance-none cursor-pointer range-sm
           [&::-webkit-slider-runnable-track]:rounded-full   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[12px] [&::-webkit-slider-thumb]:w-[12px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
           "
              />
            </div>
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.7783 18.6842L22.2583 13.1342C21.855 12.7323 21.3655 12.4276 20.8269 12.2431C20.2883 12.0586 19.7148 11.9992 19.1498 12.0693C18.5848 12.1394 18.0432 12.3372 17.566 12.6478C17.0889 12.9583 16.6887 13.3734 16.3958 13.8617L9.11832 25.5142H6.52832C5.53376 25.5142 4.57993 25.1191 3.87667 24.4158C3.17341 23.7125 2.77832 22.7587 2.77832 21.7642L2.77832 9.26416C2.77832 8.2696 3.17341 7.31577 3.87667 6.61251C4.57993 5.90925 5.53376 5.51416 6.52832 5.51416H24.0283C25.0229 5.51416 25.9767 5.90925 26.68 6.61251C27.3832 7.31577 27.7783 8.2696 27.7783 9.26416V18.6842ZM27.7646 22.0892C27.6832 23.024 27.2544 23.8944 26.5627 24.5285C25.871 25.1625 24.9667 25.5142 24.0283 25.5142H12.3283L18.5396 15.1479C18.6371 14.9852 18.7704 14.8467 18.9294 14.7431C19.0883 14.6396 19.2688 14.5735 19.4571 14.55C19.6453 14.5265 19.8365 14.5462 20.016 14.6076C20.1956 14.6689 20.3588 14.7704 20.4933 14.9042L27.7646 22.0892ZM10.2783 16.7642C11.2729 16.7642 12.2267 16.3691 12.93 15.6658C13.6332 14.9625 14.0283 14.0087 14.0283 13.0142C14.0283 12.0196 13.6332 11.0658 12.93 10.3625C12.2267 9.65925 11.2729 9.26416 10.2783 9.26416C9.28376 9.26416 8.32993 9.65925 7.62667 10.3625C6.92341 11.0658 6.52832 12.0196 6.52832 13.0142C6.52832 14.0087 6.92341 14.9625 7.62667 15.6658C8.32993 16.3691 9.28376 16.7642 10.2783 16.7642Z"
                fill="#D9D9D9"
              />
            </svg>
          </div> */}

          <div className="flex justify-center w-full gap-3 ">
            <div className="rounded-full bg-[#636363] hover:brightness-110  ">
              <ButtonComponent
                key={121}
                label={"Annuler"}
                handleClick={() => {
                  setLogoChoose((x) => (x = false));
                  setSignatureChoose((x) => (x = false));

                  if (logoChoose) {
                    setImageLogo(null);
                  } else {
                    setImageSignature(null);
                  }
                }}
                className="font-bold "
              />
            </div>
            <div onClick={showCroppedImage}></div>

            {/* {apercuIncrement == 0 && (
              <ButtonComponent
                key={143}
                label={"Appliquer"}
                handleClick={() => {
                  setApercuIncrement((x) => (x = x + 1));
                  showCroppedImage();
               
                  
                }}
                className="font-bold border-none bg-teal-500/50 "
              />
            )} */}
           
            {true && (
              <ButtonComponent
                key={143}
                label={"Importer"}
                handleClick={() => {
                  if(!image){
                    return;
                  }
                  if (logoChoose) {
                    setImageLogo(image);
                   // setImageLogo(croppedImage);
                  } else {
                    setImageSignature(image);
                   // setImageSignature(croppedImage);
                  }
                  setLogoChoose((x) => (x = false));
                  setSignatureChoose((x) => (x = false));

                  setApercuIncrement((x) => (x = 0));
                  // console.log("donee", croppedImage);

                  //  modal.setImage(croppedImage);
                }}
                className={`${image ? " opacity-100 cursor-pointer " : "opacity-40 cursor-default hover:brightness-100   "}  bg-[#9a9768]  border-none   font-bold `}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

function CardTheme() {
  return (
    <div className="w-[200px] cursor-pointer relative h-[150px] border-[1px] bg-[#404040] flex justify-center  border-white/50 rounded-md">
      <img className="w-[110px] h-[70px]   mt-5 " src="/images/l2.png" />
      <div className="absolute bottom-0 h-[40px] gap-2 flex items-center px-6 rounded-md rounded-tl-none rounded-tr-none bg-[#242424]  w-full">
        <BsCheck2Circle />

        <p className="ml-1 text-sm">Sombre</p>
      </div>
    </div>
  );
}
function CardTheme2() {
  return (
    <div className="w-[200px] cursor-pointer relative h-[150px]   opacity-20 bg-[#404040] flex justify-center  border-white/50 rounded-md">
      <img className="w-[110px] h-[70px]   mt-5 " src="/images/l1.png" />
      <div className="absolute  bottom-0 h-[40px] gap-2 flex items-center px-6 rounded-md rounded-tl-none rounded-tr-none bg-[#242424]  w-full">
        <FiCircle className="w-[15px] h-[15px]" />
        <p className="flex items-center justify-center gap-2">Clair</p>
      </div>
      <span className=" absolute bottom-[12px] right-9 text-[10px]">
        (Prochainement)
      </span>
    </div>
  );
}
