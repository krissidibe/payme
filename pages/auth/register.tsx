import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiOutlineFileAdd, AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosArrowBack, IoIosFolder, IoMdAdd, IoMdAddCircleOutline } from "react-icons/io";
import { IoMdMap, IoMdAttach } from "react-icons/io";
import { BiCrop, BiImageAlt, BiSolidDashboard } from "react-icons/bi";
import { MdOutlineAttachment } from "react-icons/md";
import InputComponent from "../../components/UI/InputComponent";
import ButtonComponent from "../../components/UI/ButtonComponent";
import { useRouter } from "next/router";
import InputDropdownComponent from "../../components/UI/InputDropdownComponent";
import { useCropImage } from "../../utils/use-crop-image-modal";
import { ModalProvider } from "../../components/Items/modal-provider";
import InputDropdownActivityComponent from "../../components/UI/InputDropdownActivityComponent";
import InputDropdownCountryComponent from "../../components/UI/InputDropdownCountryComponent";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from '@mui/material';
/* import { readFile } from "fs"; */
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";
import {
  getCroppedImg,
  getRotatedImage,
} from "../../components/Modals/canvasUtils";
import Cropper from "react-easy-crop";
import InputDropdownCountryComponent2 from "../../components/UI/InputDropdownCountryComponent2";
import { LiaFileAltSolid } from "react-icons/lia";
import useMenuStore from "../../utils/MenuStore";
import FacturesFirst from "../setting/facturesfirst";
function Register(props) {
  const [showIndicatifInput, setShowIndicatifInput] = useState(false);
  const [showIndicatifInput2, setShowIndicatifInput2] = useState(false);
  const [indexStep, setIndexStep] = useState(0);
  const [openDrop, setOpenDrop] = useState(false);
  const modalCropImage = useCropImage();
  const menuIndex = useMenuStore()
  const [openDropActivity, setOpenDropActivity] = useState(false);
  const [logoChoose, setLogoChoose] = useState(false);
  const [signatureChoose, setSignatureChoose] = useState(false);
  const [factureChoose, setFactureChoose] = useState(false);
  const [factureChooseOk, setFactureChooseOK] = useState(false);
  const [dropValueActivity, setDropValueActivity] = useState("");

  const [openDropCountry, setOpenDropCountry] = useState(false);
  const [dropValueCountry, setDropValueCountry] = useState("");
  const [openDropCountry2, setOpenDropCountry2] = useState(false);
  const [dropValueCountry2, setDropValueCountry2] = useState("");
  const routerData = useRouter().query;

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


 
  const [contactList, setContactList] = useState([
    {
      id: uuidv4(),
      indicatif: "",
      number: "",
    },
  ])
  const [identificationsList, setIdentificationsList] = useState([
    {
      id: uuidv4(),
      content: "",
    },
  ])

  const [dropValue, setDropValue] = useState(data.statut);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const imageRef = useRef(null);
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      
      if (!file) {
       return;
      }else{
        reader.readAsDataURL(file as Blob);
      }
    });
  }
  const imageRef2 = useRef(null);
 

  const [loadingSimulation, setLoadingSimulation] = useState(false);
  const [imageLogo, setImageLogo] = useState(null);
  const [imageSignature, setImageSignature] = useState(null);

  const handleSubmit = async () => {

 const  userAuth:User = {
  email: routerData.email.toString(),
  name: routerData.name.toString(),
  number:"",
  lockCode: true,
  
 }

    setLoadingSimulation(x => x = true)

 
    
 
   
 
    const url = routerData.password != undefined ? 'userfree' : 'userfreeAuth';

    const requestOne = await fetch(`${process.env.BASE_API_URL}/api/${url}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify( routerData.password != undefined  ? routerData : userAuth),
    });
   const resultUser = await requestOne.json();
 
 
  
 if(requestOne.status == 200){

   

  const request = await fetch(
    `${process.env.BASE_API_URL}/api/enterprise?id=${resultUser.data.id!}&email=${resultUser.data.email!}`,
    {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await request.json();
  console.log(result);

  fetch(imageLogo)
  .then((res) => res.blob())
  .then(async (blob) => {
    const file = new File([blob], "logo.png", {
      type: "image/png",
    });
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", "logo-"+result.id!);
    const res = await fetch(
      `${process.env.BASE_API_URL}/api/storagetest`,
      {
        body: formData,

        method: "POST",
      }
    );
    const data = await res.json();
  });

  fetch(imageSignature)
  .then((res) => res.blob())
  .then(async (blob) => {
    const file = new File([blob], "signature.png", {
      type: "image/png",
    });
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", "signature-"+result.id!);
    const res = await fetch(
      `${process.env.BASE_API_URL}/api/storagetest`,
      {
        body: formData,

        method: "POST",
      }
    );
    const data = await res.json();
  });







  if (request.status == 200) {
    

        
    const url = routerData.password != undefined ? 'login' : 'loginAuth';

    //  setLoadingSimulation(x => x= true)
      const request = await fetch(`${process.env.BASE_API_URL}/api/${url}`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(routerData),
      });

      const result = await request.json();

    if(request.status ==200){

    
 


setTimeout(() => {
  menuIndex.setMenuIndex(0)
            
             
  window.localStorage.setItem("accessToken",result.accessToken)
  window.localStorage.setItem("userId",result.id)

  menuIndex.setMenuIndex(0)
  router.replace("/user")
}, 2000);
        

    }


 


 //router.back()
}  
 }
  };

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
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        let imageDataUrl = await readFile(file);

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
const [apercuIncrement, setApercuIncrement] = useState(0)
  /*   if (!logoChoose || !signatureChoose) {
      return null;
    } */
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center pt-10 transition pr-7 bg-black/40 ">
      <div className="p-4 bg-[#323232]  z-50  w-[474px] h-[415px] px-8 flex flex-col items-start pt-[32px] text-white rounded-xl">
        <p className="text-[18px]">Télécharger votre image</p>
        <div className="flex justify-center w-full ">
            <input
              ref={imageRef}
              type="file"
              className="hidden"
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
                <AiOutlineFileAdd className="opacity-50 w-14 h-14" />
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
         {/*  <div className="flex items-center self-center justify-between w-[190px] mt-[20px]">
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.112 6.99366L9.53598 4.40366C9.34776 4.21614 9.11933 4.07394 8.86798 3.98784C8.61664 3.90173 8.34899 3.87399 8.08533 3.90671C7.82167 3.93943 7.56892 4.03175 7.34625 4.17667C7.12357 4.3216 6.93682 4.51532 6.80015 4.74316L3.40398 10.181H2.19531C1.73118 10.181 1.28606 9.99662 0.957876 9.66843C0.629687 9.34024 0.445313 8.89512 0.445313 8.43099L0.445312 2.59766C0.445313 2.13353 0.629687 1.68841 0.957876 1.36022C1.28606 1.03203 1.73118 0.847656 2.19531 0.847656L10.362 0.847656C10.8261 0.847656 11.2712 1.03203 11.5994 1.36022C11.9276 1.68841 12.112 2.13353 12.112 2.59766V6.99366ZM12.1056 8.58266C12.0676 9.01891 11.8675 9.42509 11.5447 9.72099C11.2219 10.0169 10.7999 10.181 10.362 10.181H4.90198L7.80056 5.34341C7.84607 5.26745 7.90828 5.20286 7.98246 5.15452C8.05665 5.10617 8.14086 5.07536 8.22872 5.06439C8.31659 5.05343 8.40579 5.06262 8.48958 5.09125C8.57337 5.11988 8.64954 5.16721 8.71231 5.22966L12.1056 8.58266ZM3.94531 6.09766C4.40944 6.09766 4.85456 5.91328 5.18275 5.58509C5.51094 5.2569 5.69531 4.81178 5.69531 4.34766C5.69531 3.88353 5.51094 3.43841 5.18275 3.11022C4.85456 2.78203 4.40944 2.59766 3.94531 2.59766C3.48118 2.59766 3.03606 2.78203 2.70788 3.11022C2.37969 3.43841 2.19531 3.88353 2.19531 4.34766C2.19531 4.81178 2.37969 5.2569 2.70788 5.58509C3.03606 5.91328 3.48118 6.09766 3.94531 6.09766Z" fill="#D9D9D9"/>
</svg>



           <div className="w-[140px]">

           <input id="small-range" type="range" value={zoom} min={1}  max={100} step={0.0001}  onChange={( e) => {
            setZoom(parseFloat(e.target.value))
            setApercuIncrement(x=> x =0)
          }}  className="w-full h-[1px] mb-4 bg-[#858585] rounded-lg appearance-none cursor-pointer range-sm
           [&::-webkit-slider-runnable-track]:rounded-full   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[12px] [&::-webkit-slider-thumb]:w-[12px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
           "/>

          
           </div>
            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.7783 18.6842L22.2583 13.1342C21.855 12.7323 21.3655 12.4276 20.8269 12.2431C20.2883 12.0586 19.7148 11.9992 19.1498 12.0693C18.5848 12.1394 18.0432 12.3372 17.566 12.6478C17.0889 12.9583 16.6887 13.3734 16.3958 13.8617L9.11832 25.5142H6.52832C5.53376 25.5142 4.57993 25.1191 3.87667 24.4158C3.17341 23.7125 2.77832 22.7587 2.77832 21.7642L2.77832 9.26416C2.77832 8.2696 3.17341 7.31577 3.87667 6.61251C4.57993 5.90925 5.53376 5.51416 6.52832 5.51416H24.0283C25.0229 5.51416 25.9767 5.90925 26.68 6.61251C27.3832 7.31577 27.7783 8.2696 27.7783 9.26416V18.6842ZM27.7646 22.0892C27.6832 23.024 27.2544 23.8944 26.5627 24.5285C25.871 25.1625 24.9667 25.5142 24.0283 25.5142H12.3283L18.5396 15.1479C18.6371 14.9852 18.7704 14.8467 18.9294 14.7431C19.0883 14.6396 19.2688 14.5735 19.4571 14.55C19.6453 14.5265 19.8365 14.5462 20.016 14.6076C20.1956 14.6689 20.3588 14.7704 20.4933 14.9042L27.7646 22.0892ZM10.2783 16.7642C11.2729 16.7642 12.2267 16.3691 12.93 15.6658C13.6332 14.9625 14.0283 14.0087 14.0283 13.0142C14.0283 12.0196 13.6332 11.0658 12.93 10.3625C12.2267 9.65925 11.2729 9.26416 10.2783 9.26416C9.28376 9.26416 8.32993 9.65925 7.62667 10.3625C6.92341 11.0658 6.52832 12.0196 6.52832 13.0142C6.52832 14.0087 6.92341 14.9625 7.62667 15.6658C8.32993 16.3691 9.28376 16.7642 10.2783 16.7642Z" fill="#D9D9D9"/>
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


                 
          if(logoChoose){
            setImageLogo(null);
          }else{
             setImageSignature(null);

           }
              }}
              className="font-bold "
            />
            </div>
            <div onClick={showCroppedImage}>

            </div>
             
        {/*     {apercuIncrement == 0  && <ButtonComponent
            key={143}
              label={"Appliquer"}
              handleClick={  () => {
                setApercuIncrement(x=> x =x+1)
                showCroppedImage()
          
              }}
              className="font-bold border-none bg-teal-500/50 "
            />} */}
            {true  && <ButtonComponent
            key={143}
              label={"Importer"}
              handleClick={  () => {
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
   
            setApercuIncrement(x=> x =0)
                // console.log("donee", croppedImage);

                //  modal.setImage(croppedImage);
              }}
              className={`${image ? " opacity-100 cursor-pointer " : "opacity-40 cursor-default hover:brightness-100   "}  bg-[#9a9768]  border-none   font-bold `}
            />}
          </div>
        </div>
      </div>
    );
  }

  function Step1() {
    return (
      <div className="flex-1  min-h-[340px]">
        <h2 className="pb-2 mt-4 text-2xl font-bold tracking-wider">
          Personnalisez votre profil d'entreprise
        </h2>
        <p className="text-sm opacity-50">
          Créez votre compte et définissez la structure de votre entreprise
        </p>

        <div className="w-full h-[1px] opacity-20 mt-10 bg-white"></div>
        <div className="grid w-full grid-cols-1 mt-8 gap-7 ">
          <InputComponent
            name="name"
            value={data.name}
            onChange={handleChange}
            label="Nom de l'entreprise *"
            placeholder="Entrez le nom de l'entreprise"
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] text-[14px] h-[40px]  border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
          />

          <InputDropdownActivityComponent
            label="Secteur d'activité * "
            placeholder="---"
          
            
            inputDrop={true}
            readOnly={true}
            handleClickClose={() => {
              setOpenDropActivity(false);
            }}
            openDrop={openDropActivity}
            onClick={() => {
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
           
            labelClassName="text-white opacity-100 "
            className={`rounded-[14px] text-[14px] h-[40px]  border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100`}
          />

          {/*  <InputComponent
           name="activity"
           value={data.activity}
           onChange={handleChange}
            label="Secteur d'activité *"
            placeholder="Choisissez votre secteur d'activité"
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] text-[14px] h-[40px]  border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
          /> */}
        </div>
      </div>
    );
  }

  function Step2() {
    return (
      <div className="flex-1 min-h-[290px]   ">
        
        <div className="grid w-full grid-cols-1 mt-4 gap-7 ">
          <InputComponent
            name="address"
            value={data.address}
            onChange={handleChange}
            label="Siège social *"
            placeholder="Entrez l'adresse de l'entreprise"
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] text-[14px] h-[40px]  border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
          />


          
          <InputComponent
            name="email"
            value={data.email}
            onChange={handleChange}
            label="Adresse email *"
            placeholder="Saisissez l'adresse email de l'entreprise"
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] text-[14px] h-[40px]  border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
          />
          
 
     <div className="flex gap-4 ">
      
     <motion.div
     onClick={()=>{
      setShowIndicatifInput(x=> x = true);
     }}

    
                      initial={{
                        width: "120px",
                      }}
                      transition={{ duration: 0.5 }}
                      animate={{
                        width: showIndicatifInput ? "230px" : "120px",
                      }}
                      style={{}}
                  >
  <div  onMouseLeave={()=>{
      setShowIndicatifInput(x=> x = false);
     }}
     
     className="w-full">
          <InputDropdownCountryComponent
            label="Indicatif *"
            placeholder={contactList[0]?.indicatif ?? "---"}
            
            inputDrop={true}
            readOnly={true}
            handleClickClose={() => {
              setOpenDropCountry(false);
            }}
            openDrop={openDropCountry}
            onClick={() => {
              setOpenDropCountry(true);
            }}
            handleClick={(item) => {
             
              const newItem = contactList.map(shape => {
                if (shape.id != contactList[0].id) {
                  // No change
                  return shape;
                } else {
                  // Return a new circle 50px below
                  return {
                    ...shape,
                    indicatif:  item.Phone + "",
                 //   indicatif:  item.Phone + "",
                  };
                }
              });
              // Re-render with the new array
              setContactList(newItem);
            
        
              setOpenDropCountry(false);
              setDropValueCountry(contactList[0].indicatif ?? "---");
             /*  setData({
                ...data,

                indicatif: item.Phone + "",
              }); */

          
            }}
            value={contactList[0]?.indicatif ?? "---"}
             
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 "
          />
         
        </div>

                  </motion.div>
   
        <div className="grid w-full grid-cols-2 gap-4 ">
          <InputComponent
            label="Contact primaire *"
            name="numberPrimary"
           // value={data.numberPrimary}
            value={contactList[0].number ?? "---"}
            onChange={(e)=>{
             
              const newItem = contactList.map(shape => {
                if (shape.id != contactList[0].id) {
                  // No change
                  return shape;
                } else {
                  // Return a new circle 50px below
                  return {
                    ...shape,
                    number:   e.target.value,
                  };
                }
              });
              // Re-render with the new array
              setContactList(newItem);
               
              return;
              
            }}
            type="number"
            onWheel={ event => event.currentTarget.blur() }
            placeholder="Numéro principale"
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20  focus:border-opacity-100 "
          />
       
        </div>
      </div>
    {contactList.length == 2 &&  <div className="flex gap-4 ">


    <motion.div
     onClick={()=>{
      setShowIndicatifInput2(x=> x = true);
     }}

    
                      initial={{
                        width: "120px",
                      }}
                      transition={{ duration: 0.5 }}
                      animate={{
                        width: showIndicatifInput2 ? "230px" : "120px",
                      }}
                      style={{}}
                  >
  <div  onMouseLeave={()=>{
      setShowIndicatifInput2(x=> x = false);
     }}
     
     className="w-full">


    
          <InputDropdownCountryComponent2
          key={30}
            label="Indicatif *"
            placeholder={contactList[1]?.indicatif ?? "---"}
           
            inputDrop={true}
            readOnly={true}
            handleClickClose={() => {
              setOpenDropCountry2(false);
            }}
            openDrop={openDropCountry2}
            onClick={() => {
              setOpenDropCountry2(true);
            }}
            handleClick={(item) => {
              const newItem = contactList.map(shape => {
                if (shape.id != contactList[1].id) {
                  // No change
                  return shape;
                } else {
                  // Return a new circle 50px below
                  return {
                    ...shape,
                    indicatif:  item.Phone + "",
                  };
                }
              });
              // Re-render with the new array
              setContactList(newItem);
            
        
              setOpenDropCountry2(false);
              setDropValueCountry2(contactList[1].indicatif ?? "---");
             /*  setData({
                ...data,

                indicatif: item.Phone + "",
              }); */
            }}
            value={contactList[1]?.indicatif ?? "---"}
            iconClassName="bottom-[17px]"
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] text-[14px] h-[40px]     border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
          />
          
        </div>

        </motion.div>
        <div className="grid w-full grid-cols-2 gap-4 mb-7">
          
     <div className="relative flex items-center justify-center gap-3 ">
     <InputComponent
         key={230}
            name="numberSecondary"
            value={contactList[1].number}
            onChange={(e)=>{
             
              const newItem = contactList.map(shape => {
                if (shape.id != contactList[1].id) {
                  // No change
                  return shape;
                } else {
                  // Return a new circle 50px below
                  return {
                    ...shape,
                    number:   e.target.value,
                  };
                }
              });
              // Re-render with the new array
              setContactList(newItem);
               
              return;
              
            }}
            type="number"
            onWheel={ event => event.currentTarget.blur() }
            label="Contact secondaire"
            placeholder="Numéro secondaire"
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] text-[14px] h-[40px]  border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
          />  
           <svg
           onClick={()=>{
            const newArray = contactList.slice(0,-1)
            setContactList(newArray)
           }}
           
           className="absolute mt-8 cursor-pointer -right-10" width="25" height="25" viewBox="0 0 25 25"  fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="12" fill="#505050"/>
<g clip-path="url(#clip0_596_4312)">
           
           <path d="M6.85742 12H17.1431" stroke="#ACACAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </g>
 
</svg>
     </div>
        </div>
      </div>}
         
        </div>
      </div>
    );
  }
  function Step3() {
    return (
      <div className="flex-1  min-h-[300px] ">
       <div >
       <h2 className="pb-2 mt-4 text-2xl font-bold tracking-wider">
          Enregistrez vos informations fiscales
        </h2>
        <p className="text-sm opacity-50">
          Évitez les retards en préparant vos documents administratifs à
          l'avance
        </p>

        <div className="w-full h-[1px] opacity-20 mt-10 bg-white"></div>
       </div>
        <div className="grid flex-1 w-full grid-cols-1 pb-2 pr-10 mt-8 gap-7 ">
          <InputComponent
            name="rccm"
            value={data.rccm}
            onChange={handleChange}
            label="N° Registre du commerce"
            placeholder="Saisissez le n° RCCM"
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] text-[14px] h-[40px]  border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
          />
          <InputComponent
            name="nif"
            value={identificationsList[0].content}
            onChange={(e)=>{
              const newItem = identificationsList.map(shape => {
                if (shape.id != identificationsList[0].id) {
                  // No change
                  return shape;
                } else {
                  // Return a new circle 50px below
                  return {
                    ...shape,
                    content:  e.target.value,
                  };
                }
              });
              // Re-render with the new array
              setIdentificationsList(newItem);
            
            }}
            label="Numéro d’identification"
            
            placeholder="Saisissez le numéro d’identification en fonction de votre pays"
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] text-[14px] h-[40px]  border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
          />
        {identificationsList.length ==2 && 
        
        <div className="relative">

          <InputComponent
              name="nif"
              value={identificationsList[1].content}
              onChange={(e)=>{
                const newItem = identificationsList.map(shape => {
                  if (shape.id != identificationsList[1].id) {
                    // No change
                    return shape;
                  } else {
                    // Return a new circle 50px below
                    return {
                      ...shape,
                      content:  e.target.value,
                    };
                  }
                });
                // Re-render with the new array
                setIdentificationsList(newItem);
              
              }}
              label="Autre numéro d’identification"
              placeholder="Saisissez le second numéro d’identification "
              labelClassName="text-white opacity-100 "
              className="rounded-[14px] text-[14px] h-[40px]  border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
            /> 

<svg
           onClick={()=>{
            const newArray = identificationsList.slice(0,-1)
            setIdentificationsList(newArray)
           }}
           
           className="absolute cursor-pointer top-[39px] -right-[40px]" width="25" height="25" viewBox="0 0 25 25"  fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="12" fill="#505050"/>
<g clip-path="url(#clip0_596_4312)">
           
           <path d="M6.85742 12H17.1431" stroke="#ACACAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </g>
 
</svg>
        </div>
        
          }
             
        </div>
         
      </div>
    );
  }

  function Step4() {
    return (
      <div className="flex-1 min-h-[340px]   ">
        <div className="grid w-full grid-cols-1 mt-4 gap-7 ">
          <InputDropdownComponent
            label="Statut juridique *"
            placeholder="---"
            inputDrop={true}
            readOnly={true}
            openDrop={openDrop}
            onClick={() => {
              setOpenDrop(true);
            }}
            handleClick={(item) => {
              setOpenDrop(false);
              setDropValue(item);
              setData({ ...data, statut: item });
            }}
            value={dropValue}
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] text-[14px] h-[40px]  border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
          />
          <InputComponent
            name="bankNumber"
            value={data.bankNumber}
            onChange={handleChange}
            label="N° Compte bancaire"
            placeholder="Indiquez vos coordonnées bancaires pour les paiements"
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] text-[14px] h-[40px]  border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
          />
          <InputComponent
            name="website"
            value={data.website}
            onChange={handleChange}
            label="Site internet"
            placeholder="Saissisez l'adresse de votre site internet"
            labelClassName="text-white opacity-100 "
            className="rounded-[14px] text-[14px] h-[40px]  border-opacity-50 focus:border-[#ffffff] focus:border-opacity-100 "
          />
        </div>
      </div>
    );
  }

  function Step5() {
    return (
      <div className="flex-1  min-h-[340px]">
        <h2 className="pb-2 mt-4 text-2xl font-bold tracking-wider">
          Ajoutez les fichiers joints nécessaires
        </h2>
        <p className="text-sm opacity-50">
          Assurez-vous que les fichiers sont dans un format compatible et de
          bonne gualité
        </p>
        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            if (!e.target.files[0].type.startsWith("image/")) return;
            setImageLogo(e.target.files[0]);
            setLogoChoose(true);
          }}
        />
        <input
          ref={imageRef2}
          type="file"
          className="hidden"
          onChange={(e) => {
            if (!e.target.files[0].type.startsWith("image/")) return;
            setImageSignature(e.target.files[0]);
            setSignatureChoose(true);
          }}
        />
        <div className="w-full h-[1px] opacity-20 mt-10 bg-white"></div>
        <div className="grid w-full grid-cols-1 mt-8 gap-7 ">
  {/*  <div
            onClick={async () => {
              fetch(imageSignature)
                .then((res) => res.blob())
                .then(async (blob) => {
                  const file = new File([blob], "logo.png", {
                    type: "image/png",
                  });
                  console.log(file);
                  const formData = new FormData();
                  formData.append("image", file);
                  formData.append("name", "file");
                  const res = await fetch(
                    `${process.env.BASE_API_URL}/api/storagetest`,
                    {
                      body: formData,

                      method: "POST",
                    }
                  );
                  const data = await res.json();
                });

              
 
            }}
          >
            Download blob image
          </div>   */}
          {modalCropImage.image && (
            <img
              src={modalCropImage.image + ""}
              alt="image"
              className="object-contain w-full h-full rounded-lg"
            />
          )}

 


 
          <div
            onClick={() => {
              setImageLogo(null);

              console.log(imageLogo);
              
              imageRef.current.click();
             setLogoChoose(x => x = true);
             setSignatureChoose(x => x = false);
            }}
            className="bg-[#06060600] flex justify-between cursor-pointer items-center border-[1px] placeholder:opacity-40  text-white border-white  px-6 outline-none w-full  rounded-[8px] text-[14px] h-[60px]  border-opacity-50   "
          >
<div className="flex items-center justify-center gap-3 ">
{imageLogo && 

<LiaFileAltSolid className="w-10 h-10 opacity-50 " />
}

 

            <div className="flex flex-col text-[12px] leading-4">
              <p className="text-sm">
               { !imageLogo ? "Téléchargez le logo de l'entreprise" : "Logo.png"}
              </p>
              <p className="opacity-40">Taille de fichier Max. de 2 Mo</p>
            </div>
</div>
            
            {!imageLogo 
            ?
            <MdOutlineAttachment className="w-6 h-6" />
          :
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2037 10.796L18.9997 9.00001C19.5447 8.45501 19.8177 8.18201 19.9637 7.88801C20.1005 7.61198 20.1717 7.30808 20.1717 7.00001C20.1717 6.69195 20.1005 6.38804 19.9637 6.11201C19.8177 5.81801 19.5447 5.54501 18.9997 5.00001C18.4547 4.45501 18.1817 4.18201 17.8877 4.03601C17.6117 3.89923 17.3078 3.82806 16.9997 3.82806C16.6917 3.82806 16.3878 3.89923 16.1117 4.03601C15.8177 4.18201 15.5447 4.45501 14.9997 5.00001L13.1807 6.81901C14.1484 8.47562 15.5361 9.84749 17.2037 10.796ZM11.7267 8.27301L4.85675 15.143C4.43075 15.569 4.21875 15.781 4.07875 16.043C3.93875 16.303 3.87975 16.598 3.76275 17.188L3.14675 20.265C3.08075 20.597 3.04675 20.763 3.14175 20.858C3.23675 20.953 3.40175 20.919 3.73475 20.853L6.81175 20.237C7.40175 20.12 7.69675 20.061 7.95775 19.921C8.21775 19.781 8.43075 19.569 8.85575 19.144L15.7457 12.254C14.1278 11.2411 12.7548 9.88174 11.7257 8.27401L11.7267 8.27301Z" fill="#D9D9D9"/>
          </svg>
          
          }
          </div>

          <div
            onClick={() => {
              setImageSignature(null);

              console.log(imageSignature);
              
              imageRef2.current.click();
              setSignatureChoose(x => x = true);
              setLogoChoose(x => x = false);
            }}
            className="bg-[#06060600] flex justify-between cursor-pointer items-center border-[1px] placeholder:opacity-40  text-white border-white  px-6 outline-none w-full  rounded-[8px] text-[14px] h-[60px]  border-opacity-50   "
          >
           <div className="flex items-center justify-center gap-3 ">
{imageSignature && 

<LiaFileAltSolid className="w-10 h-10 opacity-50 " />
}

            <div className="flex flex-col text-[12px] leading-4">
              <p className="text-sm">
              { !imageSignature ? "Téléchargez la signature de l'entreprise " : "Signature.png"}
               
              </p>
              <p className="opacity-40">Taille de fichier Max. de 2 Mo</p>
            </div>
            </div>
             
            
            {!imageSignature 
            ?
            <MdOutlineAttachment className="w-6 h-6" />
          :
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2037 10.796L18.9997 9.00001C19.5447 8.45501 19.8177 8.18201 19.9637 7.88801C20.1005 7.61198 20.1717 7.30808 20.1717 7.00001C20.1717 6.69195 20.1005 6.38804 19.9637 6.11201C19.8177 5.81801 19.5447 5.54501 18.9997 5.00001C18.4547 4.45501 18.1817 4.18201 17.8877 4.03601C17.6117 3.89923 17.3078 3.82806 16.9997 3.82806C16.6917 3.82806 16.3878 3.89923 16.1117 4.03601C15.8177 4.18201 15.5447 4.45501 14.9997 5.00001L13.1807 6.81901C14.1484 8.47562 15.5361 9.84749 17.2037 10.796ZM11.7267 8.27301L4.85675 15.143C4.43075 15.569 4.21875 15.781 4.07875 16.043C3.93875 16.303 3.87975 16.598 3.76275 17.188L3.14675 20.265C3.08075 20.597 3.04675 20.763 3.14175 20.858C3.23675 20.953 3.40175 20.919 3.73475 20.853L6.81175 20.237C7.40175 20.12 7.69675 20.061 7.95775 19.921C8.21775 19.781 8.43075 19.569 8.85575 19.144L15.7457 12.254C14.1278 11.2411 12.7548 9.88174 11.7257 8.27401L11.7267 8.27301Z" fill="#D9D9D9"/>
          </svg>
          
          }
          </div>
        </div>
      </div>
    );
  }
  function Step6() {
    return (
      <div className="flex-1  min-h-[340px]">
        <h2 className="pb-2 mt-4 text-2xl font-bold tracking-wider">
        Personnalisez votre style de facturation 
        </h2>
        <p className="text-sm opacity-50">
        Sélectionnez un modèle qui reflète votre identité professionnelle
        </p>
        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            if (!e.target.files[0].type.startsWith("image/")) return;
            setImageLogo(e.target.files[0]);
            setLogoChoose(true);
          }}
        />
        <input
          ref={imageRef2}
          type="file"
          className="hidden"
          onChange={(e) => {
            if (!e.target.files[0].type.startsWith("image/")) return;
            setImageSignature(e.target.files[0]);
            setSignatureChoose(true);
          }}
        />
        <div className="w-full h-[1px] opacity-20 mt-10 bg-white"></div>
        <div className="grid w-full grid-cols-1 mt-8 gap-7 ">
 
          


  

          <div
            onClick={() => {
              setFactureChoose(x=> x = true)
            }}
            className="bg-[#232323] flex justify-between    border-spacing-[70px] border-dashed cursor-pointer items-center border-[1px] placeholder:opacity-40  text-white border-white  px-6 outline-none w-full  rounded-[8px] text-[14px]  py-[22px]  border-opacity-30   "
          >

            <div className="flex gap-7">
            <svg width="79" height="79" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="79" height="79" rx="10" fill="#1B1A1A"/>
<g clip-path="url(#clip0_1011_1914)">
<path d="M46 45.1405C46 44.5874 45.5547 44.1421 45.0016 44.1421L35.0031 44.1421C32.2422 44.1421 30.0016 41.9062 30.0016 39.1405C30.0016 36.3749 32.2422 34.139 35.0031 34.139L47.0031 34.139C48.6578 34.139 50.0031 35.4796 50.0031 37.139C50.0031 38.7983 48.6578 40.139 47.0031 40.139L37 40.139C36.4469 40.139 36.0016 39.689 36.0016 39.1405C36.0016 38.5921 36.4469 38.1421 37 38.1421L45.0016 38.1421C45.5547 38.1421 46 37.6921 46 37.1437C46 36.5905 45.5547 36.1452 45.0016 36.1452L37 36.1452C35.3406 36.1452 34 37.4858 34 39.1452C34 40.8046 35.3406 42.1452 37 42.1452L46.9984 42.1452C49.7594 42.1405 52 39.8999 52 37.139C52 34.378 49.7594 32.1421 46.9984 32.1421L34.9984 32.1421C31.1312 32.1421 28 35.278 28 39.1405C28 43.003 31.1359 46.139 34.9984 46.139L45.0016 46.139C45.5547 46.139 46 45.6937 46 45.1405Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1011_1914">
<rect width="24" height="24" fill="white" transform="translate(52 27) rotate(90)"/>
</clipPath>
</defs>
</svg>

           <div className="flex flex-col items-start justify-center ">
 

<p className="text-[16px] leading-1">Choisissez un modèle de facture</p>
<p className="text-[14px] leading-[20px] text-[#7C7C7C]">Explorez notre gamme diversifiée de modèles de factures 
professionnels pour trouver celui qui correspond à vos besoins.</p>
            </div>
            </div>
             
            
            
          </div>
        </div>
      </div>
    );
  }
  const router = useRouter();
  return (
    <div className="flex flex-col px-[10px] xl:py-[140px] lg:py-[130px] h-screen    items-center justify-center  bg-gradient-to-b from-[#212121]">

{factureChoose &&   <div className="absolute z-50">
<FacturesFirst
  onConfirm={()=>{
    setFactureChooseOK(x=> x = true)
    setFactureChoose(x=> x = false)
  }}
  onExit={()=>{
    setFactureChoose(x=> x = false)
  }}
/>
  </div>}


      <ModalProvider />
      
      { loadingSimulation && <div
    /*   onClick={()=>{
        setLoadingSimulation(x=> x= false)
      }} */
      className="absolute z-50 flex items-center justify-center w-screen h-screen bg-black/60 ">
<svg aria-hidden="true" className="w-[60px] h-[60px]  opacity-100  animate-spin dark:text-gray-600 fill-[#9a9768]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
   
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill=""/>
    </svg>
</div>  }
      <div className=" mr-60">
        <h1 className="flex self-start gap-2 pl-0 mb-4 text-3xl font-bold">
           
          {/* <IoIosArrowBack
            onClick={() => {
              router.back();
            }}
            className="w-8 h-8 cursor-pointer"
          />  */}
          Payme, votre allié pour une gestion financière simplifiée
        </h1>
      </div>

      <div className="flex flex-1 w-full   border-t-[1px]  max-w-[1040px] border-opacity-20 border-white">
        <LefSection indexStep={indexStep} />
       
        

<div className="flex-1 pt-10 pl-12">
<p className="mb-2 text-sm opacity-50">Etapes {indexStep + 1}/6</p>
<div className="h-full overflow-scroll no-scrollbar">
 
          
          {indexStep == 0 && Step1()}
          {indexStep == 1 && Step2()}
          {indexStep == 2 && Step3()}
          {indexStep == 3 && Step4()}
          {indexStep == 4 && Step5()}
          {indexStep == 5 && Step6()}

          {indexStep == 4  && <>
            {logoChoose &&    <CropImageModal imageData={imageLogo} />}
            {signatureChoose &&    <CropImageModal imageData={imageSignature} />}
       
            
            </>
        
            
          }

{(contactList.length == 1 && indexStep == 1   ) &&
<div
          onClick={()=>{
       
            setContactList([...contactList,{
              id: uuidv4(),
              indicatif: "",
              number: "",
            }
          ])
       
          }}
          
          className="flex gap-3 mb-10  cursor-pointer w-[300px] pl-2 py-0 mt-0">
            {contactList.length == 1 &&
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="12" fill="#505050"/>

<path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.998H13V10.998H19V12.998Z" fill="#ACACAC"/>
</svg>
            
         
          }

            <p className="text-base ">Ajouter un contact</p></div> }

            {(indexStep == 2  ) &&<div
          onClick={()=>{
     
            setIdentificationsList([...identificationsList,{
              id: uuidv4(),
             
              content: "",
            }
          ])
         
          }}
          
          className="flex gap-3  cursor-pointer w-[full] pl-2 py-2 mt-3">
{(identificationsList.length == 1 && indexStep == 2 ) &&
         <div>
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="12" fill="#505050"/>

<path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.998H13V10.998H19V12.998Z" fill="#ACACAC"/>
</svg>
         </div>
        
          
          }
{(identificationsList.length == 1 && indexStep == 2 ) &&
        <p className="mb-6 text-base"> Ajouter un numéro d’identification</p>
          
          }
           </div> }


          <div className="flex self-end justify-start gap-4 mt-3 ">
           
          <ButtonComponent
              label={indexStep > 0 ? "Retour" :"Annuler"}
              handleClick={() => {
                if (indexStep > 0) {
                  setIndexStep((prev) => prev - 1);
                }else{

                  menuIndex.setMenuIndex(-1)
                  
                  router.replace("/")
                  
                }
              }}
              className="bg-[#212121]  border-none  "
            />
            
            
            {((indexStep == 0 &&
              data.name.trim().length >= 2 &&
              data.activity.trim().length >= 2) ||
              (indexStep == 1 &&
                data.address.trim().length >= 2 &&
                data.email.trim().length >= 2 &&
               // data.indicatif.trim().length >= 0 &&
             //  data.numberPrimary.trim().length >= 6) ||
                contactList[0].indicatif.trim() != "" &&
                contactList[0].indicatif  != "undefined" &&
                contactList[0].number.trim().length >= 6  ) ||
              (indexStep == 2 &&
                data.rccm.trim().length >= 0 &&
                data.nif.trim().length >= 0) ||
              (indexStep == 3 && data.statut.trim() != "---") ||
              (indexStep == 4 && true) && (imageLogo && imageSignature ) ||
              (indexStep == 5 && factureChooseOk)
              
              
              ) 
              
              ?(
                <ButtonComponent 
                label={indexStep == 5 ? "Terminer" :"Suivant"}
                  handleClick={() => {
                    if (indexStep > 4) {
                      data.currency =contactList[0].indicatif;
                      data.numbers =JSON.stringify(contactList);
                      data.nif =JSON.stringify(identificationsList);
                      //console.log(data);
                      
                      handleSubmit();
                      //router.back();
                      return;
                    }
                    setIndexStep((prev) => prev + 1);
                  }}
                  className=" bg-[#9a9768]  border-none  "
                />
              ): 
              (
                <ButtonComponent
                label={indexStep == 5 ? "Terminer" :"Suivant"}

                  labelClassName="opacity-20"
                 
                  className=" bg-[#212121]/30 cursor-default  border-none  "
                />
              )
              }
          </div>
        
       </div>

</div>
      
      </div>
    </div>
  );

  function newFunction(props) {
    return <div className="w-[100px]">{JSON.stringify(data)}</div>;
  }
}

export default Register;

function LefSection({ indexStep }) {
  return (
    <div className="border-r-[1px] h-[570px]  pt-12 relative border-opacity-20 border-white w-[275px]">
      <ItemLeftSection
        index={0}
        indexStep={indexStep}
        Icon={BiSolidDashboard}
        label="Structure"
        subLabel="Modèle d'organisation"
      />
      <ItemLeftSection
        index={1}
        indexStep={indexStep}
        Icon={IoMdMap}
        label="Adresses"
        subLabel="Correspondance"
      />
      <ItemLeftSection2
        index={2}
        indexStep={indexStep}

        
        Icon={<svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 8.16667V1.75L16.9167 8.16667M2.33333 0C1.03833 0 0 1.03833 0 2.33333V21C0 21.6188 0.245833 22.2123 0.683417 22.6499C1.121 23.0875 1.71449 23.3333 2.33333 23.3333H16.3333C16.9522 23.3333 17.5457 23.0875 17.9832 22.6499C18.4208 22.2123 18.6667 21.6188 18.6667 21V7L11.6667 0H2.33333Z" fill="#FFFFFF"/>
        </svg>
        }
        label="Documents"
        subLabel="Docs. administrative"
      />
      <ItemLeftSection
        index={3}
        indexStep={indexStep}
        Icon={IoIosFolder}
        label="Coordonnées"
        subLabel="Données enregistrées"
      />
      <ItemLeftSection
        index={4}
        indexStep={indexStep}
        Icon={IoMdAttach}
        label="Fichier joint"
        subLabel="Ajout de fichier"
      />
            <ItemLeftSection3

        index={5}
        indexStep={indexStep}
        Icon={<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M29.25 9.75C28.6533 9.75 28.081 9.98705 27.659 10.409C27.2371 10.831 27 11.4033 27 12V13.5H31.5V12C31.5 11.4033 31.2629 10.831 30.841 10.409C30.419 9.98705 29.8467 9.75 29.25 9.75ZM31.5 15H27V27.375L29.25 30.75L31.5 27.375V15ZM4.5 6.75V29.25C4.5 29.8467 4.73705 30.419 5.15901 30.841C5.58097 31.2629 6.15326 31.5 6.75 31.5H23.25C23.8467 31.5 24.419 31.2629 24.841 30.841C25.2629 30.419 25.5 29.8467 25.5 29.25V6.75C25.5 6.15326 25.2629 5.58097 24.841 5.15901C24.419 4.73705 23.8467 4.5 23.25 4.5H6.75C6.15326 4.5 5.58097 4.73705 5.15901 5.15901C4.73705 5.58097 4.5 6.15326 4.5 6.75ZM15 11.25C15 11.0511 15.079 10.8603 15.2197 10.7197C15.3603 10.579 15.5511 10.5 15.75 10.5H21.75C21.9489 10.5 22.1397 10.579 22.2803 10.7197C22.421 10.8603 22.5 11.0511 22.5 11.25C22.5 11.4489 22.421 11.6397 22.2803 11.7803C22.1397 11.921 21.9489 12 21.75 12H15.75C15.5511 12 15.3603 11.921 15.2197 11.7803C15.079 11.6397 15 11.4489 15 11.25ZM15.75 13.5C15.5511 13.5 15.3603 13.579 15.2197 13.7197C15.079 13.8603 15 14.0511 15 14.25C15 14.4489 15.079 14.6397 15.2197 14.7803C15.3603 14.921 15.5511 15 15.75 15H21.75C21.9489 15 22.1397 14.921 22.2803 14.7803C22.421 14.6397 22.5 14.4489 22.5 14.25C22.5 14.0511 22.421 13.8603 22.2803 13.7197C22.1397 13.579 21.9489 13.5 21.75 13.5H15.75ZM15 21C15 20.8011 15.079 20.6103 15.2197 20.4697C15.3603 20.329 15.5511 20.25 15.75 20.25H21.75C21.9489 20.25 22.1397 20.329 22.2803 20.4697C22.421 20.6103 22.5 20.8011 22.5 21C22.5 21.1989 22.421 21.3897 22.2803 21.5303C22.1397 21.671 21.9489 21.75 21.75 21.75H15.75C15.5511 21.75 15.3603 21.671 15.2197 21.5303C15.079 21.3897 15 21.1989 15 21ZM15.75 23.25C15.5511 23.25 15.3603 23.329 15.2197 23.4697C15.079 23.6103 15 23.8011 15 24C15 24.1989 15.079 24.3897 15.2197 24.5303C15.3603 24.671 15.5511 24.75 15.75 24.75H21.75C21.9489 24.75 22.1397 24.671 22.2803 24.5303C22.421 24.3897 22.5 24.1989 22.5 24C22.5 23.8011 22.421 23.6103 22.2803 23.4697C22.1397 23.329 21.9489 23.25 21.75 23.25H15.75ZM9 21V23.25H11.25V21H9ZM8.25 19.5H12C12.1989 19.5 12.3897 19.579 12.5303 19.7197C12.671 19.8603 12.75 20.0511 12.75 20.25V24C12.75 24.1989 12.671 24.3897 12.5303 24.5303C12.3897 24.671 12.1989 24.75 12 24.75H8.25C8.05109 24.75 7.86032 24.671 7.71967 24.5303C7.57902 24.3897 7.5 24.1989 7.5 24V20.25C7.5 20.0511 7.57902 19.8603 7.71967 19.7197C7.86032 19.579 8.05109 19.5 8.25 19.5ZM13.2803 11.7802C13.4169 11.6388 13.4925 11.4493 13.4908 11.2527C13.489 11.0561 13.4102 10.8679 13.2711 10.7289C13.1321 10.5898 12.9439 10.511 12.7473 10.5092C12.5507 10.5075 12.3612 10.5831 12.2197 10.7198L9.75 13.1895L8.78025 12.2197C8.6388 12.0831 8.44935 12.0075 8.2527 12.0092C8.05605 12.011 7.86794 12.0898 7.72889 12.2289C7.58983 12.3679 7.51095 12.5561 7.50924 12.7527C7.50754 12.9493 7.58313 13.1388 7.71975 13.2803L9.75 15.3105L13.2803 11.7802Z" fill="white"/>
        </svg>
        }
        label="Facture"
        subLabel="Choisissez un model"
      />
    </div>
  );

  function ItemLeftSection3({ label, subLabel, Icon, indexStep, index }) {
    return (
      <div className="relative h-[105px]   flex items-start gap-8">
        <div className="flex flex-col leading-[18px]  min-w-[145px] items-end justify-end">
          <p className="font-bold text-[18px] mt-2">{label}</p>
          <p className="text-sm opacity-50">{subLabel}</p>
        </div>
        <div
          className={`p-2 rounded-full z-20  ${
            indexStep >= index ? "bg-[#b9b9b9]" : "bg-[#4f4f4f]"
          } transition-all`}
        >
        <div  className={`w-8 h-8 ${
              indexStep >= index ? "opacity-100" : "opacity-50"
            } transition-all flex justify-center items-center`}>

          {Icon}
        </div>
        </div>

        <div
          className={`absolute w-3 h-3 rounded-full top-5  z-10 -right-[7px] ${
            indexStep >= index
              ? "border-2 bg-white border-[#757575]"
              : "bg-[#2b2b2b]  border-[#474747] border-2"
          }`}
        ></div>
        {label != "Fichier joint" && (
          <div
            className={`absolute w-[1px] z-10 h-full rounded-full -top-20 bg-zinc-400 right-[73px] ${
              indexStep > index ? "opacity-50" : "opacity-20 transition-all"
            }`}
          ></div>
        )}
      
      </div>
    );
  }
  function ItemLeftSection2({ label, subLabel, Icon, indexStep, index }) {
    return (
      <div className="relative h-[90px]   flex items-start gap-8">
        <div className="flex flex-col leading-[18px]  min-w-[145px] items-end justify-end">
          <p className="font-bold text-[18px] mt-2">{label}</p>
          <p className="text-sm opacity-50">{subLabel}</p>
        </div>
        <div
          className={`p-2 rounded-full z-20  ${
            indexStep >= index ? "bg-[#b9b9b9]" : "bg-[#4f4f4f]"
          } transition-all`}
        >
        <div  className={`w-8 h-8 ${
              indexStep >= index ? "opacity-100" : "opacity-50"
            } transition-all flex justify-center items-center`}>

          {Icon}
        </div>
        </div>

        <div
          className={`absolute w-3 h-3 rounded-full top-5  z-10 -right-[7px] ${
            indexStep >= index
              ? "border-2 bg-white border-[#757575]"
              : "bg-[#2b2b2b]  border-[#474747] border-2"
          }`}
        ></div>
        {label != "Fichier joint" && (
          <div
            className={`absolute w-[1px] z-10 h-full rounded-full top-5 bg-zinc-400 right-[73px] ${
              indexStep > index ? "opacity-50" : "opacity-20 transition-all"
            }`}
          ></div>
        )}
        {label != "Fichier joint" && (
          <div
            className={`absolute w-[1px] z-10 h-full rounded-full top-5 bg-zinc-400 -right-[1px] ${
              indexStep > index ? "opacity-100" : "opacity-20 transition-all"
            }`}
          ></div>
        )}
      </div>
    );
  }
  function ItemLeftSection({ label, subLabel, Icon, indexStep, index }) {
    return (
      <div className="relative h-[90px]   flex items-start gap-8">
        <div className="flex flex-col leading-[18px]  min-w-[145px] items-end justify-end">
          <p className="font-bold text-[18px] mt-2">{label}</p>
          <p className="text-sm opacity-50">{subLabel}</p>
        </div>
        <div
          className={`p-2 rounded-full z-20  ${
            indexStep >= index ? "bg-[#b9b9b9]" : "bg-[#4f4f4f]"
          } transition-all`}
        >
         { <Icon
            className={`w-8 h-8 ${
              indexStep >= index ? "opacity-100" : "opacity-50"
            } transition-all`}
          />}
        </div>

        <div
          className={`absolute w-3 h-3 rounded-full top-5  z-10 -right-[7px] ${
            indexStep >= index
              ? "border-2 bg-white border-[#757575]"
              : "bg-[#2b2b2b]  border-[#474747] border-2"
          }`}
        ></div>
        {label != "Fichier joint" && (
          <div
            className={`absolute w-[1px] z-10 h-full rounded-full top-5 bg-zinc-400 right-[73px] ${
              indexStep > index ? "opacity-50" : "opacity-20 transition-all"
            }`}
          ></div>
        )}
        {label != "Fichier joint" && (
          <div
            className={`absolute w-[1px] z-10 h-full rounded-full top-5 bg-zinc-400 -right-[1px] ${
              indexStep > index ? "opacity-100" : "opacity-20 transition-all"
            }`}
          ></div>
        )}
      </div>
    );
  }
}
