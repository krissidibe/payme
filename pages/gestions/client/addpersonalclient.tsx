import React, { useEffect, useState } from "react";
import { IoIosNotifications, IoIosPeople, IoIosRefresh, IoMdTrash } from "react-icons/io";
import ButtonComponent from "../../../components/UI/ButtonComponent";
import InputComponent from "../../../components/UI/InputComponent";
import { PiListBulletsFill } from "react-icons/pi";
import FolderComponent from "../../../components/UI/FolderComponent";
import { HiFolder } from "react-icons/hi";
import { BiSolidDashboard } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import InputDropdownCountryComponent from "../../../components/UI/InputDropdownCountryComponent";
import { useGlobalModal } from "../../../utils/use-global-modal";
import InputDropdownActivityComponent from "../../../components/UI/InputDropdownActivityComponent";

function AddPersonalClient(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [indexView, setIndexView] = useState(0);
  const modal = useGlobalModal()
  const router = useRouter();
  const customerInfo: any = router.query;
  console.log(customerInfo);
  const [data, setData] = useState<Customer>({
    externalContact: customerInfo.externalContact ?? "",
    externalEmail: customerInfo.externalEmail ?? "",
    externalName: customerInfo.externalName ?? "",
    poste: customerInfo.poste ?? "",
    activity: customerInfo.activity ?? "",
    address: customerInfo.address ?? "",
    country: customerInfo.country ?? "",
    email: customerInfo.email ?? "",
    image: customerInfo.image ?? "",
    name: customerInfo.name ?? "",
    type: "PERSONAL",
  });

  const [openDropCountry, setOpenDropCountry] = useState(false);
  const [dropValueCountry, setDropValueCountry] = useState("");
  const [openDropActivity, setOpenDropActivity] = useState(false);
  const [dropValueActivity, setDropValueActivity] = useState("");



  useEffect(() => {
    setDropValueActivity(customerInfo.activity ?? "");
    setDropValueCountry(customerInfo.country ?? "");
    
      return () => {
        
      }
    }, [])
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const updateCustomer = async () => {
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/customer?userId=${window.localStorage.getItem(
        "userId"
      )}&customerId=${customerInfo.id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );

    const datas = await request.json();

    if (request.ok) {
      router.replace({ pathname: "/gestions/client/clientshow", query: datas });
    }

    return datas;
  };

  const trashCustomer = async () => {
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/customer?userId=${window.localStorage.getItem(
        "userId"
      )}&customerId=${customerInfo.id}&intrash=intrash`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );

    const datas = await request.json();

    if (request.ok) {
      router.replace({ pathname: "/gestions/client",  });
    }

    return datas;
  };


  const postCustomer = async () => {
    
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/customer?userId=${window.localStorage.getItem("userId")}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const datas = await request.json();

    if (request.ok) {
      router.back();
    }

    return datas;
  };

  return (
    <div className="flex w-full h-full overflow-x-hidden select-none">
      <div className="flex flex-col w-full h-full ">
        <SearchElement />

        <div
          className={` ${
            indexView == 0
              ? "flex  ml-20 flex-row  px-[60px]  mr-36  overflow-scroll md:items-start "
              : "flex-col  px-8  mr-40 ml-16  overflow-x-scroll"
          } flex-wrap flex-1   w-auto no-scrollbar `}
        >
          <div className="flex w-full mt-[48px]">
            <div className="w-full">
              <div className="grid w-full grid-cols-2 gap-16    text-[14.5px] font-bold">
                <p>Information sur la personne </p>
                 
              </div>
              <div className="grid w-full grid-cols-2 gap-[23px] mt-[25px] gap-x-4">
                <InputComponent
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  label="Nom & prénom *"
                  labelClassName="text-white/40 text-[14px]"
                  className="rounded-[14px]  h-[40px]  text-[14px] border-opacity-30 focus:border-[#ffffff] focus:border-opacity-100  "
                />
              
              <InputComponent
                  name="externalEmail"
                  value={data.externalEmail}
                  onChange={(e)=>{
                    setData((prevState) => ({
                      ...prevState,
                      externalEmail: e.target.value,
                      email: e.target.value,
                    }));
                  }}
                  labelClassName="text-white/40 text-[14px] ml-[62px]"
                  label="Email * "
                  className="rounded-[14px]  h-[40px]  text-[14px] border-opacity-30 ml-[62px] focus:border-[#ffffff]"
                />


                <InputDropdownCountryComponent
                  label="Pays *"
                  placeholder={data.country ?? "---"}
                  placeholderOn={true}
                  inputDrop={true}
                  readOnly={true}
                  handleClickClose={()=>{
                    setOpenDropCountry(false);
                  }}
                  openDrop={openDropCountry}
                  onClick={() => {
                    setOpenDropCountry(true);
                  }}
                  handleClick={(item) => {
                    setOpenDropCountry(false);
                    setDropValueCountry(item.Name);
                    setData({
                      ...data,
                      country: item.Name + "",
                    });

                    console.log(data);
                  }}
                  value={dropValueCountry}
                  labelClassName="text-white/40 text-[14px]"
                  className=" rounded-[14px]  h-[40px]  mb-0  text-[14px] font-light border-opacity-30 focus:border-[#ffffff] focus:border-opacity-100  "
                />



<InputComponent
                    name="externalContact"
                    type="number"
                    value={data.externalContact}
                    onChange={handleChange}
                    label="Contact * "
                    labelClassName="text-white/40 text-[14px] ml-[62px]"
                    className="rounded-[14px]  h-[40px]  border-opacity-30 text-[14px] ml-[62px] focus:border-[#ffffff]"
                  />
                


<div className="flex flex-col gap-[23px]">
  
<InputDropdownActivityComponent
                 label="Secteur d'activité * "
                 placeholderOn={true}
                 placeholder={dropValueActivity ?? "---"} 
                  inputDrop={true}
                  readOnly={true}
                  handleClickClose={()=>{
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

                    console.log(data);
                  }}
                  value={dropValueActivity}
                  labelClassName="text-white/40 text-[14px]"
                  className="rounded-[14px]  h-[40px]  text-[14px] border-opacity-30 focus:border-[#ffffff]" />
  <InputComponent
                  label="Adresse de la personne * "
                  name="address"
                  value={data.address}
                  onChange={handleChange}
                  labelClassName="text-white/40 text-[14px]  "
                  className="rounded-[14px]  h-[40px]  text-[14px] border-opacity-30 focus:border-[#ffffff]"
                />
</div>


                <div className="grid w-full  grid-cols-1  ml-[62px]   leading-[13px]  gap-6">
                <div className="flex flex-col pt-3 space-y-2 opacity-30">
                    <div className="text-[11px]  ">
                   <p className="pb-2 ">Un particulier  :</p> 
                   <p>Ce type de client désigne une personne individuelle, non affiliée à une entreprise, agissant à titre personnel sans implication directe dans des activités commerciales ou professionnelles.</p>
                    </div>
                    
                  </div>
                </div>
              
                
              </div>
            </div>

            <div className="w-[340px]   gap-4    xl:mt-[400px] mt-[420px]  flex justify-center items-end">
            
            
              <ButtonComponent
                key={1}
                label={"Annuler"}
                handleClick={() => {
                  router.back();
                }}
                className="bg-[#212121] "
              />
            
              <ButtonComponent
                key={2}
                handleClick={async () => {
                  if(
                    data.name.trim().length <3 ||
                    data.country.trim() == "---" ||
                    data.activity.trim() == "---" ||
                    data.address.trim().length <3 ||
                    data.externalEmail.trim().length <3 ||
                    data.externalContact.trim().length <3  
                  ){
                    modal.onSubmit = (
                      <ButtonComponent
                        handleClick={async () => {
                       
                       modal.onClose();
                        }}
                        label={"Ok"}
                        className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none   "
                      />
                    );
                    modal.onOpen();
                modal.setTitle("Attention !");
                modal.setMessage("Vous devez remplir tous les champs obligatoires (*) avant de poursuivre.");
                    return;
                  } 
                 
                 
                  if (customerInfo.id) {
                    await updateCustomer();
                    return;
                  }
                  await postCustomer();
                }}
                label={customerInfo.id ? "Modifier" : "Enregistré"}
                className="bg-[#9a9768] "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function SearchElement() {
    return (
      <div className=" relative min-h-[130px] px-10 mr-36 ml-[100px]   pr-12 flex items-end pb-[17px]  justify-between   border-b-[1px]  border-white border-opacity-10">
        <IoIosArrowBack
          onClick={() => {
            customerInfo.id
              ? router.replace({
                  pathname: "/gestions/client/clientshow",
                  query: customerInfo,
                })
              : router.back();
          }}
          className="absolute w-8 h-8 font-bold cursor-pointer bottom-[22px] -left-2"
        />
        <div className="flex items-center space-x-2">
          <h3 className="ml-0 text-[32px] font-bold">
            {" "}
            {customerInfo.id
              ? "Modifier le particulier"
              : "Ajouter le particulier"}{" "}
          </h3>
        </div>
    
        <div className="flex">
              { customerInfo!.id && 
              <div className="relative">
                 <svg className="absolute top-[10px] left-[17px]" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_297_7539)">
<path d="M8.5229 4.67811C9.99 4.67811 11.4571 4.67811 12.9242 4.67811C13.3643 4.67811 13.4964 4.82237 13.4621 5.25639C13.2604 7.84664 13.0595 10.4365 12.8594 13.0259C12.7983 13.8065 12.7567 14.5884 12.7035 15.369C12.6903 15.6777 12.5565 15.969 12.3309 16.1801C12.1052 16.3912 11.8058 16.5054 11.4968 16.4981C9.51869 16.5009 7.54035 16.5009 5.56179 16.4981C4.85881 16.4981 4.36977 16.0592 4.31292 15.3501C4.23468 14.3689 4.18394 13.3854 4.10997 12.4036C3.93596 10.077 3.75828 7.75067 3.57692 5.4245C3.57081 5.35175 3.56592 5.27901 3.56042 5.20626C3.53413 4.8291 3.67595 4.67444 4.0629 4.67383C5.20398 4.67383 6.34323 4.67383 7.48064 4.67383H8.51984L8.5229 4.67811ZM8.75886 10.5673C8.75886 9.50977 8.75886 8.45223 8.75886 7.39408C8.75886 7.23392 8.71607 7.12022 8.54307 7.11167C8.37008 7.10311 8.28021 7.21192 8.27043 7.38247C8.26616 7.46438 8.27043 7.54629 8.27043 7.62699C8.27043 8.91233 8.27043 10.1979 8.27043 11.4836C8.27043 12.2404 8.26493 12.9972 8.27777 13.754C8.29212 13.864 8.34867 13.9642 8.43548 14.0333C8.47766 14.0676 8.63293 14.0333 8.67205 13.9844C8.72916 13.895 8.75792 13.7904 8.75458 13.6843C8.76008 12.6463 8.75825 11.6071 8.75886 10.5673ZM11.1661 7.51084C11.1832 7.33173 11.1955 7.13917 10.954 7.11533C10.7553 7.09638 10.6973 7.24187 10.6838 7.4167C10.5208 9.5061 10.3578 11.5955 10.1948 13.6849C10.1801 13.8646 10.1948 14.037 10.41 14.0547C10.6251 14.0725 10.6679 13.9037 10.6814 13.7246C10.8411 11.6548 11.0027 9.58414 11.1661 7.51267V7.51084ZM5.86561 7.56769C5.98216 9.07555 6.09932 10.5834 6.2171 12.0913C6.25989 12.6365 6.30941 13.1812 6.34914 13.7265C6.36198 13.9099 6.39865 14.0682 6.62117 14.0505C6.84368 14.0327 6.85468 13.8597 6.83573 13.6837C6.83573 13.6568 6.83573 13.6293 6.83084 13.6018C6.7045 11.9941 6.57817 10.3862 6.45184 8.77805C6.4176 8.3422 6.38215 7.90574 6.34792 7.46988C6.33386 7.2865 6.31002 7.09761 6.07039 7.11533C5.84788 7.13123 5.84177 7.31095 5.85888 7.48211C5.86316 7.51512 5.86377 7.54202 5.86561 7.56952V7.56769Z" fill="white"/>
<path d="M10.6857 2.37821H13.302C13.736 2.37821 13.7739 2.41611 13.7733 2.84157C13.7733 3.19734 13.7684 3.5525 13.7733 3.90766C13.777 4.12528 13.6786 4.22981 13.464 4.23165C13.4029 4.23165 13.3369 4.23165 13.2733 4.23165H3.70716C3.29332 4.23165 3.25542 4.19314 3.25358 3.77746C3.25358 3.4498 3.24992 3.12215 3.25358 2.7945C3.25358 2.43139 3.30982 2.37821 3.66254 2.37821C4.45722 2.37821 5.2464 2.37026 6.03802 2.3831C6.2697 2.38738 6.37301 2.33603 6.34856 2.08356C6.32872 1.89305 6.33717 1.70065 6.37362 1.51261C6.43232 1.2288 6.58693 0.973849 6.81147 0.79061C7.03601 0.607372 7.31678 0.507021 7.6066 0.506427C8.20811 0.49848 8.80963 0.497257 9.41053 0.506427C10.1392 0.516819 10.6765 1.06759 10.6863 1.79992C10.6881 1.98087 10.6857 2.1612 10.6857 2.37821ZM7.17686 2.35742H9.8635C9.8635 2.17403 9.86778 2.00226 9.8635 1.83171C9.85372 1.49672 9.69356 1.33717 9.35368 1.3329C8.92577 1.32678 8.49787 1.34329 8.06996 1.32556C7.18053 1.28766 7.11145 1.4845 7.17686 2.35742Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_297_7539">
<rect width="16" height="16" fill="white" transform="translate(0.5 0.5)"/>
</clipPath>
</defs>
</svg>
                <ButtonComponent
             
          key={3}
          handleClick={async () => {

            modal.onSubmit = (
              <ButtonComponent
                handleClick={async () => {
               await   trashCustomer();
               modal.onClose();
                }}
                label={"Supprimer"}
                className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none   "
              />
            );
            modal.onOpen();
        modal.setTitle("Êtes-vous sûr ?");
        modal.setMessage("Voulez vous vraiment supprimer ce client ?");
            //  await postCustomer();
          }}
          label={"Supprimer"}
          className="bg-[#9a9768]  pr-2 pl-6 border-none   "
        />
              </div>
        }
          {/*  <ButtonComponent
          label={"Ajouter"}
          className="bg-[#9a9768] border-none max-h-[35px] w-[130px] ml-10"
        /> */}
        </div>
      </div>
    );
  }
}
/*
 */
export default AddPersonalClient;
