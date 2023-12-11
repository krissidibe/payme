import React, { useEffect, useState } from "react";
import {
  IoIosNotifications,
  IoIosPeople,
  IoIosRefresh,
  IoMdClose,
  IoMdTrash,
} from "react-icons/io";
import ButtonComponent from "../../../../components/UI/ButtonComponent";
import InputComponent from "../../../../components/UI/InputComponent";
import { PiListBulletsFill } from "react-icons/pi";
import FolderComponent from "../../../../components/UI/FolderComponent";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdEditDocument, MdInfo, MdMail } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import { useNewProjectModal } from "../../../../utils/use-new-project-modal";
import { fetchAllCustomerProject } from "../../../../services/projectService";
import { daysFr } from "../../../../utils/helpers";
import StarRatings from "react-star-ratings";
import {
  addNewFolderUser,
  deleteFolderUser,
  editFolderUser,
  fetchAllFolderUser,
} from "../../../../services/folderUserService";
import { Menu } from "@headlessui/react";
import Select from "react-select";
import InputDropdownComponent from "../../../../components/UI/InputDropdownComponent";
import InputDropdownSexeComponent from "../../../../components/UI/InputDropdownSexeComponent";
import InputDropdownCountryComponent from "../../../../components/UI/InputDropdownCountryComponent";
import { useGlobalModal } from "../../../../utils/use-global-modal";
import { deleteFolder, updateFolder } from "../../../../services/folderService";
import DropdownComponent from "../../../../components/menu/DropdownComponent";
import { RiFileEditLine } from "react-icons/ri";
import DropdownProfileComponent from "../../../../components/menu/DropdownProfileComponent";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { FaFileContract } from "react-icons/fa";
import InputDropdownContractComponent from "../../../../components/UI/InputDropdownContractComponent";
function FolderShow(props) {
  const [openDrop, setOpenDrop] = useState(false);
  const [dropValue, setDropValue] = useState("");
  const [openDrop2, setOpenDrop2] = useState(false);
  const [dropValue2, setDropValue2] = useState("");
  const [openDropCountry, setOpenDropCountry] = useState(false);
  const [dropValueCountry, setDropValueCountry] = useState("");
  const [currentDocName, setCurrentDocName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRaging] = useState(0);
  const [datas, setDatas] = useState<FolderUser[]>([]);
  const modal = useNewProjectModal();
  const [modalView, setModalView] = useState(false);
  const [modalProfilView, setProfilModalView] = useState(false);
  const router = useRouter();
  const customerInfo = router.query;
  const modalGlobal = useGlobalModal();
  const [modalViewName, setModalViewName] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [currentDataShow, setCurrentDataShow] = useState<FolderUser>({
    contact: "",
    country: "",
    name: "",
    email: "",
    function: "",
    indicatif: "",
    rate: "",
    sexe: "",
    poste: "",
    contrat: "",
    birthDate:  null,
  });
  const [customersFiltered, setCustomersFiltered] = useState<FolderUser[]>([])
  const [data, setData] = useState<FolderUser>({
    contact: "",
    country: "",
    name: "",
    email: "",
    function: "",
    indicatif: "",
    rate: "",
    sexe: "",
    poste: "",
    contrat: "",
    birthDate:  null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetch = async () => {
    const datas: FolderUser[] = await fetchAllFolderUser(
      customerInfo.id.toString()
    );
    if (datas) {
     // setIsLoading(false);
      setIsLoading(false);
      setDatas(datas);
      setCustomersFiltered(datas);

      setInputValue(customerInfo?.name.toString());
    }
  };

  useEffect(() => {
    fetch();
  }, [modal.isOpen]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const datasFilter = datas.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCustomersFiltered(datasFilter);
  }, [searchValue]);



  return (
    <div className="flex w-full h-full overflow-x-hidden select-none no-scrollbar">
      {modalView && NewUserModal()}
      {modalViewName && AddNewFolder()}
      {modalProfilView && (
        <div
          onClick={() => {
            setProfilModalView((x) => (x = false));
          }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/50"
        >
          <ItemGestionShow
            //  key={item!.id}
            handleClick={() => {}}
            indexType={1}
            item={currentDataShow}
          />
        </div>
      )}

      <div className="flex flex-col w-full h-full ">
        {SearchElement()}
        
        <div
          className={`  "flex-row  flex   pl-16   justify-start w-auto   pr-[120px] ml-2 pt-16  gap-[20px]     overflow-y-scroll flex-wrap      no-scrollbar `}
        >

         


          {isLoading ? 
  <>
  {" "}

  {[1,2,3,4,5,6,7,8,9,10,].map(i=>(  <ShimmerFolderUser key={i}/>))}
 
  
</> :


          customersFiltered.map((item) => (
            <ItemGestion
              key={item!.id}
              handleClick={() => {}}
              indexType={1}
              item={item}
            />
          ))}
 
        {(customersFiltered.length == 0 && searchValue.length >0  ) && <div className="flex items-center justify-center flex-1 h-screen mt-0   pb-[200px] opacity-30"> <p className="font-bold mb-[100px]">Aucun résultat</p> </div> }  
          {(isLoading == false && searchValue.length < 1 ) && (
            <div
              onClick={() => {
                setModalView(true);
              }}
              className="relative cursor-pointer hover:bg-[#ffffff08] text-[11px] text-white/30 justify-center w-[145px] h-[220px] flex  items-center  flex-col rounded-[10px]    border   border-dashed border-white/20          text-[#ffffff]   "
            >
              <div className="text-4xl">+</div>
              <div>Ajouter un profil  </div>
            </div>
          )}
        </div>
      </div>

      <div className="min-w-[370px] max-w-[370px]  h-full  border-l-[1px]   via-[#6462462c]  bg-gradient-to-b from-black to-[#64624691]  border-l-[#9a9768]  text-[#ffffff66] text-sm border-opacity-40">
        <div className="w-full relative min-h-[130px] px-12    pr-24 flex items-end pb-6  justify-between   border-b-[1px]  border-white border-opacity-10">
          <div className="flex items-center justify-center space-x-2 ">
            <div className="flex items-center justify-center p-2 text-[25px] font-bold text-white bg-teal-600 rounded-xl w-11 h-11">
              i
            </div>
            <h1 className="text-3xl font-bold text-white">Infos</h1>
          </div>
        </div>
       {isLoading &&  <div className="w-full flex-col relative min-h-[130px] px-12   pr-4 flex items-start pt-10   pb-10     border-b-[1px]  border-white border-opacity-10">
          <h2 className="font-bold text-[21px] text-[#9a9768] h-[15px] max-w-[100px] line-clamp-2 mb-4 rounded-md  animate-pulse duration-100     bg-[#ffffff1f]  min-w-[100px]">
            
          </h2>
          <div className="flex items-center justify-between w-full pr-8">
            <p className="rounded-md  animate-pulse duration-100    bg-[#ffffff1f] h-[10px] w-[180px] "> </p>{" "}
           
          </div>
          <div className="flex items-center justify-between w-full pr-8 mt-3" >
          <p className="rounded-md  animate-pulse duration-100    bg-[#ffffff1f] h-[10px] w-[140px] "> </p>{" "}
           
          </div>
        </div>}
       {!isLoading &&  <div className="w-full flex-col relative min-h-[130px] px-12   pr-4 flex items-start pt-10   pb-10     border-b-[1px]  border-white border-opacity-10">
          <h2 className="font-bold text-[21px] text-[#9a9768] h-6 line-clamp-2 mb-4">
            {currentDocName == "" ? customerInfo.name : currentDocName}
          </h2>
          <div className="flex justify-between w-full pr-8">
            <p>Date de création :</p>{" "}
            <p className="text-primary">{daysFr(customerInfo.createdAt)}</p>
          </div>
          <div className="flex justify-between w-full pr-8 mt-0">
            <p>Quantité :</p> <p className="text-primary">{datas.length}</p>
          </div>
        </div>}
        <div className="w-full flex-col relative min-h-[10px] px-12    pr-4 flex items-start pt-4         border-white border-opacity-10"></div>
      
        {datas.length == 0 && (
          <div className="flex items-center justify-center w-full pb-0 mt-10">
            <div className="flex flex-col items-center justify-center leading-[8px]">
              <p className="mb-4 font-bold opacity-50 text-md">Aucun contenu</p>
              <p className="text-[12px] opacity-50 font-light leading-[15px]">
                Ce fichier client ne contient aucun profil,
              </p>
              <p className="text-[12px] opacity-50 font-light leading-[15px]">
                Veuillez cliquez sur le bouton "Ajouter"
              </p>
              <p className="text-[12px] opacity-50 font-light leading-[15px]">
                afin d'en créer un.
              </p>
            </div>
          </div>
        )}

        {isLoading && 
        
        <div className="flex items-center justify-center w-auto mt-[80px] px-14">
       
        
        <ButtonComponent
            label={""}
            onClick={()=>{
              
            }}
            className={` border-none font-bold   h-[60px] text-[14px] w-full    animate-pulse duration-100    bg-[#ffffff1f]  cursor-default `} 
            labelClassName={` text-[16px]   `}
          />
           </div>
          }
        {!isLoading && 
        
        <div className="flex items-center justify-center w-auto mt-[80px] px-14">
       
        
       <ButtonComponent
            handleClick={() => {
              setModalViewName(true);
            }}
            labelClassName="text-[16px]"
            label={"Modifier"}
            className="border-none h-[58px] font-bold hover:brightness-110  w-full bg-[#53534A]"
          />
           </div>
          }
      
        
      </div>
    </div>
  );

  function ShimmerFolderUser() {
    return <div
      onClick={() => {
        setModalView(true);
      } }
      className="relative cursor-default text-[11px] text-white/30 justify-center w-[145px] h-[220px] flex  items-center  flex-col rounded-[10px]      animate-pulse duration-100    bg-[#ffffff1f]         text-[#ffffff]   "
    >


    </div>;
  }

  function NewUserModal() {
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center pb-0 transition bg-black/50 ">
        <div
          onClick={() => {
            setData({
              id: "",
              contact: "",
              country: "",
              name: "",
              email: "",
              function: "",
              indicatif: "",
              rate: "",
              sexe: "",
            });
            setModalView(false);
          }}
          className="absolute inset-0 z-30 flex items-center justify-center transition "
        ></div>
        <div className="p-4 py-0 bg-[#323232] z-50 w-[810px] ml-8 px-12 mr-8 pt-10 flex flex-col items-center justify-center text-white rounded-[20px]">
          <div className="flex items-center justify-between w-full">
           
            <h2 className="font-bold text-[21px] mt-2 ">
            
             {data.id ? " Modifier un nouveau profil " : " Ajouter un nouveau profil "}
            </h2>
            <IoMdClose
              onClick={() => {
                setData({
                  id: "",
                  contact: "",
                  country: "",
                  name: "",
                  email: "",
                  function: "",
                  indicatif: "",
                  rate: "",
                  sexe: "",
                });
                setModalView(false);
              }}
              className="w-[24px] h-[24px] opacity-60 mr-0  cursor-pointer "
            />
          </div>

          <div className="grid w-full grid-cols-2 px-0 mt-7 gap-y-3 gap-x-10">
        
            <InputComponent
              key={1}
              name="name"
              value={data.name}
              onChange={handleChange}
              label="Nom et prénom *"
              labelClassName="text-[#7D7D7D] text-[14px]"
              className="rounded-[14px] mb-0 h-[40px] text-[14px] font-light  border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
            />

            {/* 
             
            */}
            <InputDropdownSexeComponent
              label="Sexe *"
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
                setData({ ...data, sexe: item });
              }}
              value={dropValue}
              labelClassName="text-[#7D7D7D] text-[14px]"
              className="rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100  "
            />
            
    
            {customerInfo.type == "PERSONAL" ? (
              <InputComponent
                key={3}
                name="birthDate" 
                value={data.birthDate == null ? null : new Date(data.birthDate).toISOString().substr(0, 10)}
                
                type="date"
               onChange={handleChange}
                label="Date de naissance *"
                labelClassName="text-[#7D7D7D] text-[14px]"
                size={51}
                className="rounded-[14px] dark:[color-scheme:dark] [color-scheme:dark] mb-0 h-[40px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
              />
            ) : (
              <InputComponent
                key={3}
                name="function"
                value={data.function}
                onChange={handleChange}
                label="Fonction / spécialité *"
                labelClassName="text-[#7D7D7D] text-[14px]"
                className="rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
              />
            )}
            
            <InputComponent
              key={4}
              name="email"
              value={data.email}
              onChange={handleChange}
              label="Email *"
              labelClassName="text-[#7D7D7D] text-[14px]"
              className="rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
            />

            <InputDropdownCountryComponent
              label="Pays *"
              placeholder="---"
              inputDrop={true}
              readOnly={true}
              openDrop={openDropCountry}
              onClick={() => {
                setOpenDropCountry(true);
              }}

              handleClickClose={()=>{
                setOpenDropCountry(false);
                
              }}
              handleClick={(item) => {
                setOpenDropCountry(false);
                setDropValueCountry(item.Name);
                setData({
                  ...data,
                  country: item.Name + "",
                  indicatif: item.Phone + "",
                });

                console.log(data);
              }}
              value={dropValueCountry}
              labelClassName="text-[#7D7D7D] text-[14px]"
              className="rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100  "
            />

            {/*   <InputComponent
            key={5}
            name="country"
            value={data.country}
            onChange={handleChange}
              label="Pays"
              labelClassName="text-[#7D7D7D] text-[14px]"
              
              className="rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
            /> */}
            <div className="flex space-x-4">
              <div>
                <InputComponent
                  key={6}
                  name="indicatif"
                  value={data.indicatif}
                  readOnly={true}
                  onChange={handleChange}
                  label="Indicatif *"
                  labelClassName="text-[#7D7D7D] text-[14px]"
                  className="rounded-[14px] mb-0 h-[40px] max-w-[100px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
                />
              </div>
              <InputComponent
                key={7}
                name="contact"
                type="number"
                value={data.contact}
                onChange={handleChange}
                label="Contact *"
                labelClassName="text-[#7D7D7D] text-[14px]"
                className="rounded-[14px] mb-0 h-[40px] flex-1 text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
              />
            </div>
            {customerInfo.type == "PERSONAL" && (
              <>
                <InputComponent
                  key={12}
                  name="poste"
                  value={data.poste}
                  onChange={handleChange}
                  label="Poste *"
                  labelClassName="text-[#7D7D7D] text-[14px]"
                  className="rounded-[14px] mb-0 h-[40px] text-[14px] font-light  border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
                />
                 <InputDropdownContractComponent
              label="Contrat *"
              placeholder="---"
              inputDrop={true}
              readOnly={true}
              openDrop={openDrop2}
              onClick={() => {
                setOpenDrop2(true);
              }}
              handleClick={(item) => {
                setOpenDrop2(false);
                setDropValue2(item);
                setData({ ...data, contrat: item });
              }}
              value={dropValue2}
              labelClassName="text-[#7D7D7D] text-[14px]"
              className="rounded-[14px] mb-0 h-[40px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100  "
            />
            
             {/*    <InputComponent
                  key={1}
                  name="contrat"
                  value={data.contrat}
                  onChange={handleChange}
                  label="Type de contrat *"
                  labelClassName="text-[#7D7D7D] text-[14px]"
                  className="rounded-[14px] mb-0 h-[40px] text-[14px] font-light  border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
                /> */}
              </>
            )}
          </div>

          <div className="flex flex-col items-start justify-between w-full mt-[40px] mb-12">
            <StarRatings
            
              starDimension="32px"
              className="w-4 h-4"
              starSpacing="3px"
              rating={rating}
              starEmptyColor="#8F8F8F"
              starHoverColor="#F8DA2F"
              starRatedColor="#F8DA2F"
              changeRating={(rating) => {
                setRaging(rating);

                setData((prevState) => ({
                  ...prevState,
                  rate: rating + "",
                }));
              }}
              numberOfStars={5}
              name="rating"
            />

            <div className="flex items-end self-end justify-center gap-4 mt-[25px] ">
              <ButtonComponent
                label={"Annuler"}
                handleClick={() => {
                  setDropValue("---");
                  setDropValue2("---");
                  setDropValueCountry("---");
                  setData({
                    id: "",
                    contact: "",
                    contrat: "",
                    country: "",
                    name: "",
                    email: "",
                    function: "",
                    indicatif: "",
                    rate: "",
                    sexe: "",
                  });
                  setModalView(false);
                  setRaging(0);
                }}
                className="bg-[#ffffff2a]  border-none   font-bold "
              />
              <ButtonComponent
                handleClick={async () => {

 
                
if(customerInfo.type == "PERSONAL"){
  if (
    data.name.trim().length < 3 ||
    data.country.trim() == "" || 
    data.sexe.trim() == "" ||
    data.poste.trim().length < 3  ||
    data.birthDate == null  ||
    data.email.trim().length < 2  ||
    data.contact.trim().length < 3  ||
    data.contrat.trim() == ""  
    
  ) {
    modalGlobal.onSubmit = (
      <ButtonComponent
        handleClick={async () => {
          modalGlobal.onClose();
        }}
        label={"Ok"}
        className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none   "
      />
    );
    modalGlobal.onOpen();
    modalGlobal.setTitle("Attention !");
    modalGlobal.setMessage(
      "Vous devez remplir tous les champs obligatoires (*) avant de poursuivre."
    );
    return;
  }

}else{
  if (
    data.name.trim().length < 3 ||
    data.country.trim() == "" || 
    data.sexe.trim() == "" ||
    data.email.trim().length < 2  || 
    data.function.trim().length < 3  ||
    data.contact.trim().length < 3    
    
  ) {
    modalGlobal.onSubmit = (
      <ButtonComponent
        handleClick={async () => {
          modalGlobal.onClose();
        }}
        label={"OK"}
        className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none   "
      />
    );
    modalGlobal.onOpen();
    modalGlobal.setTitle("Attention !");
    modalGlobal.setMessage(
      "Vous devez remplir tous les champs obligatoires (*) avant de poursuivre."
    );
    return;
  }

}

 
             


                  setModalView(false);
                  setIsLoading(true);
                  setDropValue("---");
                  setDropValue2("---");
                  setDropValueCountry("---");
                  setData({
                    contact: "",
                    country: "",
                    name: "",
                    email: "",
                    function: "",
                    indicatif: "",
                    rate: "",
                    sexe: "",
                    poste: "",
                    contrat: "",
                    birthDate: null,
                  });
                  setRaging(0);
                  const dataCome = data.id
                    ? await editFolderUser(data!.id.toString(), data)
                    : await addNewFolderUser(customerInfo!.id.toString(), data);
                  if (dataCome) {
                    fetch();
                  }
                  //     await  postCustomer()
                }}
                label={data.id ? "Modifier" : "Enregistré"}
                className="bg-[#9a9768]  border-none    "
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function SearchElement() {
    return (
      <div className="w-full relative min-h-[130px] px-14   pr-24 flex items-end pb-[17px]  justify-between   border-b-[1px]  border-white border-opacity-10">
        <IoIosArrowBack
          onClick={() => {
            router.back();
          }}
          className="absolute w-8 h-8 font-bold cursor-pointer bottom-[25px] left-5"
        />
        <div className="flex items-center space-x-2">
          <h3 className="mb-1 ml-4 text-4xl font-bold">
            {currentDocName == "" ? customerInfo.name : currentDocName}
          </h3>
        </div>
        {isLoading &&   <div className="absolute right-0 flex gap-4 right-10">
     <div className="min-w-[200px] h-8 rounded-full  animate-pulse duration-100    bg-[#ffffff1f] ">  </div>
    
     </div>}
       {!isLoading && <div className="flex">
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
        key={4}
        placeholder="Rechercher"
            value={searchValue}
            onChange={(e) => {
              setSearchValue((x) => (x = e.target.value));
            }}
         
          className="rounded-full w-full pl-[42px] z-20 h-[40px]   font-light pr-8   border-[#5A5A5A]  "
        /> 
     </div>
        
          
          <ButtonComponent
            handleClick={() => {
              setModalView(true);
            }}
            label={"Ajouter"}
            labelClassName="text-[17px]  "
            className="bg-[#ffffff56] text-normal border-none    ml-4"
          />
          <DropdownComponent className="absolute items-center justify-between w-6 h-6 gap-2 py-2 mb-1 text-sm font-medium cursor-pointer right-10 top-[68px] bottom-1 group-hover:block hover:block">
            <Menu.Item>
              {({ active }) => (
                <p
                  onClick={() => {
                    setModalViewName(true);
                  }}
                  className={`  px-2  py-3 flex  justify-start pl-6  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                    active
                      ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                      : " "
                  }`}
                >
                  <RiFileEditLine className="w-6 h-6 " />
                  Modifier le dossier
                </p>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <p
                  onClick={() => {
                    modalGlobal.onSubmit = (
                      <ButtonComponent
                        handleClick={async () => {
                          setIsLoading(true);
                          const data = await deleteFolder(
                            customerInfo!.id.toString()
                          );

                          if (data) {
                            modalGlobal.onClose();
                            router.back();
                          }
                        }}
                        label={"Supprimer"}
                        className=" mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none   "
                      />
                    );
                    modalGlobal.onOpen();
                    modalGlobal.setTitle("Êtes-vous sûr ?");
                    modalGlobal.setMessage(
                      "Êtes-vous sûr de vouloir supprimer ce dossier ?"
                    );
                  }}
                  className={`  px-2  py-3 flex  justify-start pl-6  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                    active
                      ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                      : " "
                  }`}
                >
                {/* icontrash */}
                <svg className="ml-1" width="16" height="24" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.03423 6.26667C10.2349 6.26667 12.4355 6.26667 14.6362 6.26667C15.2964 6.26667 15.4944 6.48307 15.4431 7.1341C15.1405 11.0195 14.8391 14.9042 14.539 18.7884C14.4473 19.9593 14.3849 21.1321 14.3052 22.303C14.2854 22.7661 14.0847 23.203 13.7462 23.5197C13.4077 23.8364 12.9585 24.0076 12.4951 23.9966C9.52792 24.0009 6.5604 24.0009 3.59257 23.9966C2.53809 23.9966 1.80454 23.3383 1.71926 22.2746C1.60189 20.8029 1.52579 19.3276 1.41484 17.855C1.15381 14.3651 0.887291 10.8755 0.615265 7.38626C0.606096 7.27714 0.59876 7.16803 0.590508 7.05891C0.551079 6.49316 0.763809 6.26117 1.34423 6.26025C3.05585 6.26025 4.76472 6.26025 6.47084 6.26025H8.02964L8.03423 6.26667ZM8.38816 15.1005C8.38816 13.5142 8.38816 11.9279 8.38816 10.3406C8.38816 10.1004 8.32398 9.92985 8.06449 9.91701C7.80499 9.90417 7.6702 10.0674 7.65553 10.3232C7.64911 10.4461 7.65553 10.569 7.65553 10.69C7.65553 12.618 7.65553 14.5463 7.65553 16.475C7.65553 17.6101 7.64728 18.7453 7.66653 19.8805C7.68807 20.0456 7.77289 20.1958 7.9031 20.2995C7.96637 20.3509 8.19928 20.2995 8.25796 20.2262C8.34362 20.092 8.38676 19.9351 8.38175 19.7759C8.39 18.219 8.38725 16.6602 8.38816 15.1005ZM11.9991 10.5158C12.0247 10.2471 12.0431 9.95827 11.6809 9.92251C11.3829 9.89409 11.2958 10.1123 11.2756 10.3746C11.0311 13.5087 10.7866 16.6428 10.5421 19.7769C10.5201 20.0464 10.5421 20.305 10.8648 20.3316C11.1876 20.3582 11.2518 20.1051 11.2719 19.8365C11.5116 16.7317 11.7539 13.6257 11.9991 10.5185V10.5158ZM4.04829 10.601C4.22312 12.8628 4.39886 15.1246 4.57553 17.3864C4.63971 18.2043 4.71399 19.0213 4.77359 19.8392C4.79284 20.1143 4.84786 20.3518 5.18163 20.3252C5.51539 20.2986 5.5319 20.0391 5.50347 19.775C5.50347 19.7347 5.50347 19.6934 5.49614 19.6522C5.30663 17.2406 5.11713 14.8288 4.92763 12.4166C4.87628 11.7628 4.8231 11.1081 4.77175 10.4543C4.75066 10.1793 4.7149 9.89592 4.35546 9.92251C4.0217 9.94635 4.01253 10.2159 4.0382 10.4727C4.04462 10.5222 4.04554 10.5625 4.04829 10.6038V10.601Z" fill="#EBEBEB"/>
<path d="M11.2756 2.81731H15.2001C15.8511 2.81731 15.908 2.87416 15.9071 3.51235C15.9071 4.04601 15.8997 4.57875 15.9071 5.11149C15.9126 5.43792 15.7649 5.59472 15.4431 5.59747C15.3514 5.59747 15.2524 5.59747 15.157 5.59747H0.807814C0.187046 5.59747 0.130196 5.5397 0.127445 4.91618C0.127445 4.42471 0.121944 3.93322 0.127445 3.44175C0.127445 2.89708 0.211804 2.81731 0.740878 2.81731C1.9329 2.81731 3.11667 2.80539 4.30411 2.82465C4.65163 2.83106 4.80659 2.75404 4.76991 2.37534C4.74015 2.08958 4.75282 1.80098 4.80751 1.51892C4.89555 1.0932 5.12746 0.710773 5.46427 0.435915C5.80108 0.161057 6.22225 0.0105313 6.65697 0.00964012C7.55924 -0.0022801 8.46151 -0.00411398 9.36286 0.00964012C10.4559 0.0252281 11.2618 0.851391 11.2765 1.94989C11.2793 2.2213 11.2756 2.4918 11.2756 2.81731ZM6.01236 2.78613H10.0423C10.0423 2.51105 10.0487 2.25339 10.0423 1.99756C10.0276 1.49508 9.78741 1.25576 9.27759 1.24934C8.63573 1.24017 7.99387 1.26493 7.35201 1.23834C6.01787 1.18149 5.91425 1.47674 6.01236 2.78613Z" fill="#EBEBEB"/>
</svg>
           <p className="ml-1"> Supprimer le dossier </p>   
              </p>
              )}
            </Menu.Item>
          </DropdownComponent>
          {/* 
          <Menu>
            <Menu.Button className="absolute items-center justify-between w-6 h-6 gap-2 py-2 mb-1 text-sm font-medium cursor-pointer right-10 top-14 bottom-1 group-hover:block hover:block">
              <MdInfo className="w-8 h-8 " />
            </Menu.Button>
            <Menu.Items className=" absolute  top-20   max-w-[220px] rounded-md z-20 right-10  flex flex-col justify-center w-full   bg-[#2b2b2b] ">
              <Menu.Item>
                {({ active }) => (
                  <p
                    onClick={() => {}}
                    className={`  px-2  py-3 flex  justify-start pl-5 items-center gap-2 rounded-md text-sm cursor-pointer ${
                      active ? " bg-[#212121]" : " "
                    }`}
                  >
                    <MdEditDocument className="w-6 h-6 " />
                    Modifier le dossier
                  </p>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <p
                    onClick={() => {
                      modalGlobal.onSubmit = (
                        <ButtonComponent
                          handleClick={async () => {
                            setIsLoading(true);
                            const data = await deleteFolder(
                              customerInfo!.id.toString()
                            );

                            if (data) {
                              modalGlobal.onClose();
                              router.back();
                            }
                          }}
                          label={"Supprimer"}
                          className=" mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none  rounded-md"
                        />
                      );
                      modalGlobal.onOpen();
                      modalGlobal.setTitle("Êtes-vous sûr ?");
                      modalGlobal.setMessage(
                        "Êtes-vous sûr de vouloir supprimer ce dossier ?"
                      );
                    }}
                    className={`  px-2  py-3 flex  justify-start pl-5 items-center gap-2 rounded-md text-sm cursor-pointer ${
                      active ? " bg-[#212121]" : " "
                    }`}
                  >
                    <IoMdTrash className="w-6 h-6 " />
                    Supprimer le dossier
                  </p>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu> */}
        </div>}
      </div>
    );
  }
  function ItemGestion({ item, indexType, handleClick = () => {} }) {
    /*   INPROGRESS,
    ISVALIDATE,
    ISFINISH */
    let type = {
      border: "",
      color: "",
      label: "",
    };
    switch (item.type) {
      case "INPROGRESS":
        type = {
          border: "border-amber-500 ",
          color: "text-amber-500 ",
          label: "En cours de validation de la proforma",
        };
        break;
      case "ISVALIDATE":
        type = {
          border: "border-green-500 ",
          color: "text-green-500 ",
          label: "Proforma validée",
        };
        break;
      case "ISFINISH":
        type = {
          border: "border-teal-500 ",
          color: "text-teal-500 ",
          label: "Projet terminé",
        };
        break;

      default:
        break;
    }

    return (
      <div
        onClick={handleClick}
        className="relative cursor-pointer w-[145px]   max-h-[220px] min-h-[220px]    flex justify-start pt-4 items-center  flex-col rounded-[10px]  bg-gradient-to-b from-[#626262] to-[#2f2f2f]    text-[14px]        text-[#ffffff]   "
      >
        <DropdownProfileComponent className="absolute items-center justify-between w-6 h-6 gap-2 py-2 mb-1 text-sm font-medium cursor-pointer top-1 bottom-5 group-hover:block hover:block right-1">
          <Menu.Item>
            {({ active }) => (
              <div
                onClick={() => {
                  setData(item);
                  setModalView(true);
                  setDropValue(item.sexe);
                  setDropValue2(item.contrat);
                  setDropValueCountry(item.country);
                  setRaging(parseInt(item.rate == "" ? 0 : item.rate));
                }}
                className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                  active
                    ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                    : " "
                }`}
              >
                <RiFileEditLine className="min-w-10 min-h-10 " />
                Modifier
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                onClick={() => {
                  modalGlobal.onSubmit = (
                    <ButtonComponent
                      handleClick={async () => {
                        setIsLoading(true);
                        const data = await deleteFolderUser(item!.id);

                        if (data) {
                          await fetch();
                          modalGlobal.onClose();
                        }
                      }}
                      label={"Supprimer"}
                      className=" mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none   "
                    />
                  );
                  modalGlobal.onOpen();
                  modalGlobal.setTitle("Êtes-vous sûr ?");
                  modalGlobal.setMessage(
                    "Êtes-vous sûr de vouloir supprimer ce profil ?"
                  );
                }}
                className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                  active
                    ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                    : " "
                }`}
              >
                       {/* icontrash */}
<svg width="16" height="18" viewBox="0 0 12 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.03423 6.26667C10.2349 6.26667 12.4355 6.26667 14.6362 6.26667C15.2964 6.26667 15.4944 6.48307 15.4431 7.1341C15.1405 11.0195 14.8391 14.9042 14.539 18.7884C14.4473 19.9593 14.3849 21.1321 14.3052 22.303C14.2854 22.7661 14.0847 23.203 13.7462 23.5197C13.4077 23.8364 12.9585 24.0076 12.4951 23.9966C9.52792 24.0009 6.5604 24.0009 3.59257 23.9966C2.53809 23.9966 1.80454 23.3383 1.71926 22.2746C1.60189 20.8029 1.52579 19.3276 1.41484 17.855C1.15381 14.3651 0.887291 10.8755 0.615265 7.38626C0.606096 7.27714 0.59876 7.16803 0.590508 7.05891C0.551079 6.49316 0.763809 6.26117 1.34423 6.26025C3.05585 6.26025 4.76472 6.26025 6.47084 6.26025H8.02964L8.03423 6.26667ZM8.38816 15.1005C8.38816 13.5142 8.38816 11.9279 8.38816 10.3406C8.38816 10.1004 8.32398 9.92985 8.06449 9.91701C7.80499 9.90417 7.6702 10.0674 7.65553 10.3232C7.64911 10.4461 7.65553 10.569 7.65553 10.69C7.65553 12.618 7.65553 14.5463 7.65553 16.475C7.65553 17.6101 7.64728 18.7453 7.66653 19.8805C7.68807 20.0456 7.77289 20.1958 7.9031 20.2995C7.96637 20.3509 8.19928 20.2995 8.25796 20.2262C8.34362 20.092 8.38676 19.9351 8.38175 19.7759C8.39 18.219 8.38725 16.6602 8.38816 15.1005ZM11.9991 10.5158C12.0247 10.2471 12.0431 9.95827 11.6809 9.92251C11.3829 9.89409 11.2958 10.1123 11.2756 10.3746C11.0311 13.5087 10.7866 16.6428 10.5421 19.7769C10.5201 20.0464 10.5421 20.305 10.8648 20.3316C11.1876 20.3582 11.2518 20.1051 11.2719 19.8365C11.5116 16.7317 11.7539 13.6257 11.9991 10.5185V10.5158ZM4.04829 10.601C4.22312 12.8628 4.39886 15.1246 4.57553 17.3864C4.63971 18.2043 4.71399 19.0213 4.77359 19.8392C4.79284 20.1143 4.84786 20.3518 5.18163 20.3252C5.51539 20.2986 5.5319 20.0391 5.50347 19.775C5.50347 19.7347 5.50347 19.6934 5.49614 19.6522C5.30663 17.2406 5.11713 14.8288 4.92763 12.4166C4.87628 11.7628 4.8231 11.1081 4.77175 10.4543C4.75066 10.1793 4.7149 9.89592 4.35546 9.92251C4.0217 9.94635 4.01253 10.2159 4.0382 10.4727C4.04462 10.5222 4.04554 10.5625 4.04829 10.6038V10.601Z" fill="#EBEBEB"/>
<path d="M11.2756 2.81731H15.2001C15.8511 2.81731 15.908 2.87416 15.9071 3.51235C15.9071 4.04601 15.8997 4.57875 15.9071 5.11149C15.9126 5.43792 15.7649 5.59472 15.4431 5.59747C15.3514 5.59747 15.2524 5.59747 15.157 5.59747H0.807814C0.187046 5.59747 0.130196 5.5397 0.127445 4.91618C0.127445 4.42471 0.121944 3.93322 0.127445 3.44175C0.127445 2.89708 0.211804 2.81731 0.740878 2.81731C1.9329 2.81731 3.11667 2.80539 4.30411 2.82465C4.65163 2.83106 4.80659 2.75404 4.76991 2.37534C4.74015 2.08958 4.75282 1.80098 4.80751 1.51892C4.89555 1.0932 5.12746 0.710773 5.46427 0.435915C5.80108 0.161057 6.22225 0.0105313 6.65697 0.00964012C7.55924 -0.0022801 8.46151 -0.00411398 9.36286 0.00964012C10.4559 0.0252281 11.2618 0.851391 11.2765 1.94989C11.2793 2.2213 11.2756 2.4918 11.2756 2.81731ZM6.01236 2.78613H10.0423C10.0423 2.51105 10.0487 2.25339 10.0423 1.99756C10.0276 1.49508 9.78741 1.25576 9.27759 1.24934C8.63573 1.24017 7.99387 1.26493 7.35201 1.23834C6.01787 1.18149 5.91425 1.47674 6.01236 2.78613Z" fill="#EBEBEB"/>
</svg>
                Supprimer
              </div>
            )}
          </Menu.Item>
        </DropdownProfileComponent>

        <div className="bg-[#929292] h-[59px]  mt-5 w-[59px] flex justify-center items-center rounded-full">
          <img
            className="h-10 "
            src={`${
              item.sexe == "Homme"
                ? "/images/HommePM.png"
                : "/images/FemmePM.png"
            } `}
          />
        </div>
        <p className="px-2 mt-2 text-sm text-center line-clamp-1 max-w-[145px] overflow-hidden">
          {item.name}
        </p>
        <p className="px-2 text-[11px] text-center opacity-50 line-clamp-1 max-w-[145px] overflow-hidden">
          {customerInfo.type == "PERSONAL" ? item.poste : item.country}
        </p>
        <div
          onClick={() => {
            setProfilModalView(true);
            setCurrentDataShow(item);
          }}
          className="px-4 py-[3px] tracking-tight shadow-md text-white/60 my-2 mb-[3px] rounded-[3px] text-[12px] font-normal bg-[#707070]"
        >
          Voir profil
        </div>
        <StarRatings
          starDimension="14px"
          starSpacing="1px"
          className="w-4 h-4"
          rating={item.rate == "" ? 0 : parseInt(item.rate)}
          starHoverColor="#F8DA2F"
          starRatedColor="#F8DA2F"
          numberOfStars={5}
          name="rating"
        />
      </div>
    );
  }
  function ItemGestionShow({ item, indexType, handleClick = () => {} }) {
    /*   INPROGRESS,
    ISVALIDATE,
    ISFINISH */
    let type = {
      border: "",
      color: "",
      label: "",
    };
    switch (item.type) {
      case "INPROGRESS":
        type = {
          border: "border-amber-500 ",
          color: "text-amber-500 ",
          label: "En cours de validation de la proforma",
        };
        break;
      case "ISVALIDATE":
        type = {
          border: "border-green-500 ",
          color: "text-green-500 ",
          label: "Proforma valider",
        };
        break;
      case "ISFINISH":
        type = {
          border: "border-teal-500 ",
          color: "text-teal-500 ",
          label: "Projet terminer",
        };
        break;

      default:
        break;
    }

    return (
      <div
        onClick={handleClick}
        className="relative cursor-pointer w-[275px] px-1 h-[350px] flex justify-start pt-8 items-center  flex-col rounded-[10px]  bg-gradient-to-b from-[#8a8a8a] to-[#464646]    text-[14px]        text-[#ffffff]   "
      >

 
        <div className="bg-[#a7a7a7] h-[82px]  mt-5 w-[82px] flex justify-center items-center rounded-full">
          <img
            className="h-12 "
            src={`${
              item.sexe == "Homme"
                ? "/images/HommePM.png"
                : "/images/FemmePM.png"
            } `}
          />
        </div>
        <p className="px-2 mt-2 leading-[22px] text-center text-[18px] line-clamp-1">
          {item.name}
        </p>
        <p className="px-2 text-[13px] text-center opacity-50 line-clamp-1">
          {customerInfo.type == "PERSONAL" ? item.poste : item.function}
        </p>

        <StarRatings
          starDimension="19px"
          starSpacing="1px"
          className="w-4 h-4"
          rating={item.rate == "" ? 0 : parseInt(item.rate)}
          starHoverColor="#F8DA2F"
          starRatedColor="#F8DA2F"
          starEmptyColor="#8F8F8F"
          numberOfStars={5}
          name="rating"
        />

        <div className="px-2 gap-2 text-[13px] mt-6 opacity-50 line-clamp-1 w-full  mt-4 flex items-center justify-center">
          <BsFillTelephoneFill className="w-[16px] h-[16px]" /> 
          <p className="text-center line-clamp-1">
            {"+(" + item.indicatif + ")" + item.contact}
          </p>{" "}
        </div>
        <div className="px-2 gap-2 text-[13px] mt-1 opacity-50 line-clamp-2 w-full      flex items-center justify-center">
          <MdMail className="w-[20px] h-[20px] mb-1 " />{" "}
          <p className="mb-1 overflow-y-hidden text-center ">{item.email}</p>{" "}
        </div>
        <div className="px-2 gap-2 text-[13px]  line-clamp-2 w-full     mt-0 flex items-center justify-center">
        {customerInfo.type == "PERSONAL" ?<FaFileContract className="w-[18px] mb-1 h-[18px] opacity-50  " /> :  <BiWorld className="w-[20px] h-[20px] opacity-50  " />}
         
      
          <p className={`mb-0 overflow-y-hidden text-center    `}>
            <span className="opacity-50 ">{customerInfo.type == "PERSONAL" ? "Type de contrat" : "Add"} :</span>{" "}
            <span className={` ${customerInfo.type == "PERSONAL" ? "text-primary" : "opacity-50"}  `}>{customerInfo.type == "PERSONAL" ? item.contrat: item.country}</span>
          </p>
        </div>
      </div>
    );
  }

  function AddNewFolder() {
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center pb-0 transition bg-black/40 ">
        <div
          onClick={() => {
            setModalViewName(false);
           
          }}
          className="absolute inset-0 z-30 flex items-center justify-center transition "
        ></div>
        <div className="p-4 py-0 bg-[#323232] z-50 w-[434px] px-7 flex flex-col items-center justify-center text-white rounded-xl">
          <IoMdClose
            onClick={() => {
              setModalViewName(false);
            }}
            className="w-[24px] h-[24px] opacity-60 mr-0 mt-5 cursor-pointer self-end"
          />

          <h2 className="font-bold text-[18px] mb-6 ">
            Modifier le nom du dossier
          </h2>

          <div className="w-full px-2">
            <InputComponent
              key={1}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              label="Nom du dossier"
              labelClassName="text-[#7D7D7D] text-[14px]"
              placeholder="Veuillez entrer le nom du dossier"
              className="rounded-xl mb-0 h-[35px] text-[12px] font-light border-opacity-50"
            />
          </div>

          <div className="flex items-center justify-center w-full gap-4 mb-4">
            <ButtonComponent
              key={2}
              handleClick={async () => {
                setModalViewName(false);
              }}
              label={"Annuler"}
              className=" mt-6 mb-4 shadow-xl shadow-black/20 bg-[#484848] border-none  "
            />
            {inputValue.trim().length >= 2 && (
              <ButtonComponent
                key={30}
                handleClick={async () => {
                  //  const data = await updateNameProject(project!.id,inputValue)

                  const data = await updateFolder(
                    customerInfo!.id.toString(),
                    inputValue
                  );
                  if (data) {
                    setModalViewName(false);
                    setCurrentDocName(inputValue);
                  }
                }}
                label={"Modifier"}
                className=" mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none  "
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
export default FolderShow;
