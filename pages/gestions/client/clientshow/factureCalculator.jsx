import React, { useEffect, useState } from "react";
import {
  IoIosArrowBack,
  IoMdInformationCircleOutline,
  IoMdArrowDropdown,
  IoMdTrash,
} from "react-icons/io";
import ButtonComponent from "../../../../components/UI/ButtonComponent";
import InputComponent from "../../../../components/UI/InputComponent";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import useMenuStore from "../../../../utils/MenuStore";
import { saveInvoice } from "../../../../services/projectService";
import { Menu } from "@headlessui/react";
import { ToWords } from "to-words";
import { useGlobalModal } from "../../../../utils/use-global-modal";
function FactureCalculator() {
  const router = useRouter();
  const modal = useGlobalModal();
  const projectInfo = router.query;
  const toWords = new ToWords({
    localeCode: "fr-FR",
    converterOptions: {
      currency: false,
    },
  });

  const [optionShow, setOptionShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const factureType = ["0", "1"];
  const modalityValues = [
    "0",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
  ];

  const device = "FCFA";
  const [modality, setModality] = useState(
    projectInfo?.modalite == undefined ? "0" : projectInfo.modalite
  );
  const [tvaValue, setTvaValue] = useState(
    projectInfo?.tva == undefined ? "" : projectInfo?.tva
  );
  const [remiseValue, setRemiseValue] = useState(
    projectInfo?.discount == undefined ? "" : projectInfo?.discount
  );
  const [factureTypeValue, setFactureTypeValue] = useState(
    projectInfo?.invoiceType == undefined ? "0" : projectInfo.invoiceType
  );
  const [remarque, setRemarque] = useState(
    projectInfo?.remarque == undefined ? "" : projectInfo.remarque
  );
  const menuIndex = useMenuStore();

  console.log(projectInfo);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setDatas(
      projectInfo?.table != ""
        ? JSON.parse(projectInfo.table)
        : [
            {
              id: uuidv4(),
              designation: "",
              quantity: "",
              rate: "",
              amount: "",
            },
          ]
    );
  
    return () => {
      
    }
  }, [])
  

  function totalTTC() {
    const value = isNaN(totalsHT() - totalsRemise() + totalsTVA())
      ? 0
      : totalsHT() - totalsRemise() + totalsTVA();

    return parseInt(value);
  }

  function modaliteWithPourcent() {
    //  const value = (totalsHT() * parseInt(modalityValues == "" ? 0 : modalityValues))/100
    const value = (totalTTC() * parseInt(modality == "" ? 0 : modality)) / 100;

    return parseInt(value);
  }
  function totalsHT() {
    const value = datas.reduce(function (previousVal, currentVal) {
      return previousVal + currentVal.amount;
    }, 0);

    return parseInt(value);
  }
  function totalsRemise() {
    const value =
      (totalsHT() * parseInt(remiseValue == "" ? 0 : remiseValue)) / 100;

    return parseInt(value);
  }
  function totalsTVA() {
    const value =
      ((totalsHT() - totalsRemise()) *
        parseInt(tvaValue == "" ? 0 : tvaValue)) /
      100;

    return parseInt(value);
  }

  const saveData = async () => {

    if(isLoading){
      return
    }
    setIsLoading(true)
const totalAmount = totalTTC()
    
    const data = await saveInvoice(projectInfo.id, {
      table: JSON.stringify(datas),
      tva: tvaValue.trim(),
      discount: remiseValue.trim(),
      modalite: modality.trim(),
      invoiceType: parseInt(factureTypeValue.trim()),
      remarque: remarque.trim(),
      amountTotal: totalAmount,
    });


    
    if (data) {
      modal.onClose();
      router.back();
      setIsLoading(false)
    }
  };

  return (
    <>
      <div className="flex flex-row h-full min-h-full ">
        <div className="flex-1">
          <div className="flex flex-col w-full h-full ">
            {SearchElement()}
            {/*             <SearchElement handleToggle={()=>{setOptionShow(x => x = !x)}} /> */}

            <div className="flex flex-col flex-1 px-10 pt-2 overflow-hidden ">
              <div className="flex py-2 mt-4  font-bold bg-[#b6b6b618]    border-2 border-[#ffffff00] ">
                <p className="select-none flex-1 min-w-[200px]  max-h-5 text-center border-r  border-[#ffffff] ">
                  Désignation
                </p>
                <p className="select-none w-[170px] border-r  max-h-5 border-[#ffffff] text-center ">
                  Quantité
                </p>
                <p className="select-none w-[170px] border-r  max-h-5 border-[#ffffff] text-center ">
                  Prix unitaire
                </p>
                <p className="select-none w-[170px]   text-center ">Montant</p>
              </div>

              <div className="flex flex-col  flex-1  overflow-scroll  no-scrollbar border-0 border-[#ffffff20]  ">
                {datas.map((item) => (
                  <ItemInvoice
                
                    handleDelete={() => {
                      const datasNew = datas.filter((x) => x.id != item.id);
                    
                      setDatas(datasNew);
                      modal.onClose();
                    }}
                    item={item}
                    key={item.id}
                    updateTable={(
                      designationValue,
                      quantityValue,
                      rateValue,
                      amount
                    ) => {
                      const dataFind = datas.find((x) => x.id == item.id);
                      dataFind.designation = designationValue;
                      dataFind.quantity = quantityValue;
                      dataFind.rate = rateValue;
                      dataFind.amount = isNaN(amount) ? 0 : amount;

                      setDatas([...datas]);
                    }}
                  />
                ))}
                {/*                 {JSON.stringify(datas)} */}
              </div>
              {ItemFooter()}
            </div>
          </div>
        </div>

        {optionShow && (
          <div className="min-w-[440px] max-w-[440px]   p-10 px-8 bg-gradient-to-b pt-[60px] from-[#736f40] to-[#615e38] min-h-screen">
            <IoIosArrowBack
              onClick={() => {
                setOptionShow(false);
              }}
              className="w-8 h-8 cursor-pointer"
            />
            <div className="text-[#fff134] mt-4 mb-4 flex justify-start font-bold text-xl">
              <p className="mr-10"> Montant {tvaValue == 0 ? "HT" : "TTC"} :</p>
              <p className="">
                {" "}
                {totalTTC().toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} {device}
              </p>
            </div>
            <div className="pb-4 mb-4 border-b border-white/10 ">
              <p className="text-sm">
                Arrêtée la présente facture à la somme de :
              </p>
              <p className="text-sm ">
                {toWords
                  .convert(totalTTC())
                  .replaceAll("Et", "")
                  .replaceAll("-", " ")}{" "}
                {device}
              </p>
            </div>

            <div className="w-48 bg-white shadow-md"></div>

            <div className="flex flex-col gap-4 pt-2 mb-4">
              <div className="flex items-center justify-between">
                <p className="text-[17px] font-bold">Modalité du paiement</p>
                <div className="flex relative  min-w-[50px]   cursor-pointer text-[#fff134]  border-b  border-[#fff134]   items-center">
                  <Menu>
                    <Menu.Button className="relative flex items-center gap-0 pb-1 pr-6 text-sm font-medium ">
                      <p className="self-start text-sm font-bold">{modality}</p>
                      <p className="self-end ml-1 text-sm font-bold ">%</p>
                      <IoMdArrowDropdown className="absolute right-0 w-6 h-6"  />
                    </Menu.Button>
                    <Menu.Items className="absolute min-w-[70px] rounded-md z-20 right-0  flex flex-col justify-center w-full   bg-[#313131] top-8">
                      {modalityValues.map((item) => (
                        <Menu.Item>
                          {({ active }) => (
                            <p
                            key={item}
                              onClick={() => {
                                setModality((x) => (x = item));
                              }}
                              className={`block px-4 py-2 ${
                                active ? " bg-[#494949]" : "bg-black/10"
                              }`}
                            >
                              {item}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Type de facture : </p>
                <div className="flex relative  min-w-[160px]    cursor-pointer text-[#fff134]  border-b  border-[#fff134]   items-center">
                  <Menu>
                    <Menu.Button  className="flex items-center justify-between gap-2 pb-0 text-sm font-medium ">
                      <p className="self-start mr-1 text-sm ">
                        {factureTypeValue == "0"
                          ? "Facture d'acompte"
                          : "Facture de reliquat"}
                      </p>{" "}
                      <IoMdArrowDropdown className="w-6 h-6" />
                    </Menu.Button>
                    <Menu.Items className="absolute  min-w-[100px] rounded-md z-20 right-0  flex flex-col justify-center w-full   bg-[#313131] top-8">
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            onClick={() => {
                              setFactureTypeValue((x) => (x = "0"));
                            }}
                            className={`block px-4 py-2 text-sm rounded-md ${
                              active ? " bg-[#494949]" : "bg-black/10"
                            }`}
                          >
                            Facture d'acompte
                          </p>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            onClick={() => {
                              setFactureTypeValue((x) => (x = "1"));
                            }}
                            className={`block px-4 py-2 text-sm rounded-md ${
                              active ? " bg-[#494949]" : "bg-black/10"
                            }`}
                          >
                            Facture de reliquat
                          </p>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-6 pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <p className="text-sm ">
                  {factureTypeValue == "0"
                    ? "Acompte à payer"
                    : "Acompte déjà payé"}{" "}
                </p>
                <p className="text-sm ">
                  {modaliteWithPourcent().toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm ">
                  {factureTypeValue == "0"
                    ? "Reliquat a la livraison"
                    : "Reliquat à payer"}{" "}
                </p>
                <p className="text-sm ">
                  {(totalTTC() - modaliteWithPourcent()).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                </p>
              </div>
            </div>

            <p className="pt-3 text-sm">Remarque :</p>

            <textarea
              value={remarque}
              onChange={(e) => {
                setRemarque(e.target.value);
              }}
              className="w-full p-2 mt-2 outline-none bg-transparent border rounded-md text-sm min-h-[140px]  border-white/10 border-opacity-10"
            ></textarea>
          </div>
        )}
      </div>
    </>
  );

  function SearchElement() {
    return (
      <div className="w-full min-h-[110px] flex items-end  bg-[#b6b6b618] pb-4    justify-between pr-[60px] pl-8  ">
        <div className="flex space-x-4">
          <IoIosArrowBack
            onClick={() => {
              menuIndex.setMenuIndex(2);
              router.back();
            }}
            className="w-8 h-8 cursor-pointer"
          />
          <h3 className="text-2xl font-bold">Faire un devis</h3>
        </div>
        <div className="flex space-x-4">
          <ButtonComponent
          labelClassName="text-[16px]"
            key={"option"}
            label={"Option"}
            handleClick={() => {
              setOptionShow((x) => (x = !x));
            }}
            className="bg-[#838383] border-none w-[100px] font-bold py-2"
          />
          <ButtonComponent
          labelClassName="text-[16px]"
            key={"Enregistrer"}
            handleClick={() => {
              saveData();
              return;

              modal.onSubmit = (
                <ButtonComponent
                key={"submit"}
                  handleClick={async () => {
                  

                    // handleSubmit()
                  }}
                  label={"Oui"}
                  className="max-h-[36px] min-w-[120px] mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none  rounded-md"
                />
              );
              modal.onOpen();
              modal.setTitle("Êtes-vous sûr ?");
              modal.setMessage("Voulez vousxxx");
            }
          }
            label={"Enregistrer"}
            className={`bg-[#9a9768] border-none w-[130px] font-bold py-2 ${isLoading ? "opacity-30 cursor-default hover:brightness-100" : "opacity-100 cursor-pointer "}`}
          />
        </div>
      </div>
    );
  }
  function ItemFooter() {
    return (
      <div className="flex  flex-col  my-4 gap-1  select-none   border-[#ffffff20] ">
        <div className="flex w-full ">
          <p
            onClick={() => {
              setDatas([
                ...datas,
                {
                  id: uuidv4(),
                  designation: "",
                  quantity: "",
                  rate: "",
                  amount: "",
                },
              ]);
            }}
            className="flex-1 min-w-[20px]  font-bold cursor-pointer py-2 text-center text-primary bg-[#b6b6b618]   border-[#00000020] border-r-4 mr-1 "
          >
            + Nouveau élément
          </p>
          <div className="py-2 w-[340px]   bg-[#ffffff13]  text-center ">
            <p className="border-[#ffffff] max-h-5  font-bold border-r ">
              MONTANT TOTAL HT
            </p>
          </div>

          <p className="w-[170px] border-[#ffffff20] py-2  bg-[#ffffff13]  text-center ">
            {isNaN(totalsHT()) ? 0 : totalsHT().toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
          </p>
        </div>
        <div className="flex w-full">
          <p className="flex-1 min-w-[20px] text-center text-primary bg-[#b6b6b600]   border-[#00000020] border-r "></p>

          <div className="py-1 w-[340px]   bg-[#ffffff09]   text-center ">
            <div className="border-[#ffffff] flex text-teal-500/80  self-end justify-end w-full pr-4 i border-r ">
              <div className="flex items-center self-end gap-2">
                <span className="text-[14px] font-bold  ">Remise</span>
                <InputComponent
                  placeholder="0"
                  maxLength={2}
                  value={remiseValue}
                  onChange={(e) => {
                    if (!/[0-9]/.test(e.target.value) && e.target.value != "") {
                      return;
                    }

                    setRemiseValue(e.target.value);
                  }}
                  className="max-w-[40px]  px-[1px]  text-center self-end max-h-[30px]"
                />
                <span className="text-sm text-white ">%</span>
              </div>
            </div>
          </div>

          <p className="w-[170px]  text-teal-500 bg-[#ffffff09] border-[#ffffff20] flex justify-center items-center   text-center ">
            {remiseValue == "" ? "" : "-"}{" "}
            {isNaN(totalsRemise()) ? 0 : totalsRemise().toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
          </p>
        </div>
        <div className="flex w-full">
          <p className="flex-1 min-w-[20px] text-center text-primary bg-[#b6b6b600]   border-[#00000020] border-r "></p>

          <div className="py-1 w-[340px]   bg-[#ffffff09]   text-center ">
            <div className="border-[#ffffff] flex text-primary  self-end justify-end w-full pr-4 i border-r ">
              <div className="flex items-center self-end gap-2">
                <span className="text-[15px] font-bold">TVA</span>
                <InputComponent
                  type="text"
                  value={tvaValue}
                  maxLength={2}
                  onChange={(e) => {
                    if (!/[0-9]/.test(e.target.value) && e.target.value != "") {
                      return;
                    }
                    setTvaValue(e.target.value);
                  }}
                  placeholder="0"
                  className="max-w-[40px]  px-[1px] text-center self-end max-h-[30px]"
                />
                <span className="text-sm text-white">%</span>
              </div>
            </div>
          </div>

          <p className="w-[170px] text-primary bg-[#ffffff09] border-[#ffffff20] flex justify-center items-center   text-center ">
            {isNaN(totalsTVA()) ? 0 : totalsTVA().toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
          </p>
        </div>
        <div className="flex w-full">
          <p className="flex-1 min-w-[20px] py-2 text-center text-primary bg-[#b6b6b600]   border-[#00000020] border-r "></p>

          <div className="py-2 w-[340px]   bg-[#ffffff13]  text-center ">
            <p className="border-[#ffffff] font-bold max-h-5  border-r ">
              MONTANT TOTAL TTC
            </p>
          </div>

          <p className="w-[170px]  bg-[#ffffff13] border-[#ffffff20] flex justify-center items-center  text-center ">
            {totalTTC().toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
          </p>
        </div>
      </div>
    );
  }
}

export default FactureCalculator;

 


function ItemInvoice({
  item,
  designationDefult = "",

  handleDelete = () => {},
  updateTable = (designation, quantity, rate, amount) => {},
}) {
  const [designation, setDesignation] = useState(item.designation);
  const [quantity, setQuantity] = useState(parseInt(item.quantity));
  const [rate, setRate] = useState(parseInt(item.rate));
  const [amount, setAmount] = useState(quantity * rate);
  const modal = useGlobalModal();
  return (
    <div className="flex group  hover:bg-[#ffffff0a]  relative   pt-[0px]  border-b border-x-2  border-[#ffffff11] ">
      {/*  <IoMdInformationCircleOutline
     //   onClick={handleDelete}
        className="absolute hidden w-6 h-6 cursor-pointer group-hover:block hover:block right-1 top-5"
      /> */}

      <Menu>
        <Menu.Button className="absolute z-50 items-center justify-between hidden w-6 h-6 gap-2 py-2 text-sm font-medium cursor-pointer opacity-40 top-1 group-hover:block hover:block right-2 ">
          <p className="z-40 self-start mr-6 text-sm font-bold">
            <IoMdInformationCircleOutline
              //   onClick={handleDelete}
              className="absolute z-50 w-6 h-6 cursor-pointer group-hover:block hover:block "
            />
          </p>
        </Menu.Button>
        <Menu.Items className="absolute  max-w-[140px] rounded-[0px]    z-20 right-[10px]  flex flex-col justify-center w-full   bg-[#2b2b2b] top-5">
          <Menu.Item>
            {({ active }) => (
              <p
                onClick={() => {
                  modal.onSubmit = (
                    <ButtonComponent
                      handleClick={async () => {
                        handleDelete();
                      }}
                      label={"Supprimer"}
                      className="   mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none  "
                    />
                  );
                  modal.onOpen();
              modal.setTitle("Êtes-vous sûr ?");
              modal.setMessage("Êtes-vous sûr de vouloir supprimer cet élément ?");
                }}
                className={`  px-0   py-2 flex justify-center items-center gap-2 rounded-[0px] text-[17px] cursor-pointer ${
                  active ? " bg-[#212121]" : " "
                }`}
              >
{/* icontrash */}
<svg width="16" height="18" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.03423 6.26667C10.2349 6.26667 12.4355 6.26667 14.6362 6.26667C15.2964 6.26667 15.4944 6.48307 15.4431 7.1341C15.1405 11.0195 14.8391 14.9042 14.539 18.7884C14.4473 19.9593 14.3849 21.1321 14.3052 22.303C14.2854 22.7661 14.0847 23.203 13.7462 23.5197C13.4077 23.8364 12.9585 24.0076 12.4951 23.9966C9.52792 24.0009 6.5604 24.0009 3.59257 23.9966C2.53809 23.9966 1.80454 23.3383 1.71926 22.2746C1.60189 20.8029 1.52579 19.3276 1.41484 17.855C1.15381 14.3651 0.887291 10.8755 0.615265 7.38626C0.606096 7.27714 0.59876 7.16803 0.590508 7.05891C0.551079 6.49316 0.763809 6.26117 1.34423 6.26025C3.05585 6.26025 4.76472 6.26025 6.47084 6.26025H8.02964L8.03423 6.26667ZM8.38816 15.1005C8.38816 13.5142 8.38816 11.9279 8.38816 10.3406C8.38816 10.1004 8.32398 9.92985 8.06449 9.91701C7.80499 9.90417 7.6702 10.0674 7.65553 10.3232C7.64911 10.4461 7.65553 10.569 7.65553 10.69C7.65553 12.618 7.65553 14.5463 7.65553 16.475C7.65553 17.6101 7.64728 18.7453 7.66653 19.8805C7.68807 20.0456 7.77289 20.1958 7.9031 20.2995C7.96637 20.3509 8.19928 20.2995 8.25796 20.2262C8.34362 20.092 8.38676 19.9351 8.38175 19.7759C8.39 18.219 8.38725 16.6602 8.38816 15.1005ZM11.9991 10.5158C12.0247 10.2471 12.0431 9.95827 11.6809 9.92251C11.3829 9.89409 11.2958 10.1123 11.2756 10.3746C11.0311 13.5087 10.7866 16.6428 10.5421 19.7769C10.5201 20.0464 10.5421 20.305 10.8648 20.3316C11.1876 20.3582 11.2518 20.1051 11.2719 19.8365C11.5116 16.7317 11.7539 13.6257 11.9991 10.5185V10.5158ZM4.04829 10.601C4.22312 12.8628 4.39886 15.1246 4.57553 17.3864C4.63971 18.2043 4.71399 19.0213 4.77359 19.8392C4.79284 20.1143 4.84786 20.3518 5.18163 20.3252C5.51539 20.2986 5.5319 20.0391 5.50347 19.775C5.50347 19.7347 5.50347 19.6934 5.49614 19.6522C5.30663 17.2406 5.11713 14.8288 4.92763 12.4166C4.87628 11.7628 4.8231 11.1081 4.77175 10.4543C4.75066 10.1793 4.7149 9.89592 4.35546 9.92251C4.0217 9.94635 4.01253 10.2159 4.0382 10.4727C4.04462 10.5222 4.04554 10.5625 4.04829 10.6038V10.601Z" fill="#EBEBEB"/>
<path d="M11.2756 2.81731H15.2001C15.8511 2.81731 15.908 2.87416 15.9071 3.51235C15.9071 4.04601 15.8997 4.57875 15.9071 5.11149C15.9126 5.43792 15.7649 5.59472 15.4431 5.59747C15.3514 5.59747 15.2524 5.59747 15.157 5.59747H0.807814C0.187046 5.59747 0.130196 5.5397 0.127445 4.91618C0.127445 4.42471 0.121944 3.93322 0.127445 3.44175C0.127445 2.89708 0.211804 2.81731 0.740878 2.81731C1.9329 2.81731 3.11667 2.80539 4.30411 2.82465C4.65163 2.83106 4.80659 2.75404 4.76991 2.37534C4.74015 2.08958 4.75282 1.80098 4.80751 1.51892C4.89555 1.0932 5.12746 0.710773 5.46427 0.435915C5.80108 0.161057 6.22225 0.0105313 6.65697 0.00964012C7.55924 -0.0022801 8.46151 -0.00411398 9.36286 0.00964012C10.4559 0.0252281 11.2618 0.851391 11.2765 1.94989C11.2793 2.2213 11.2756 2.4918 11.2756 2.81731ZM6.01236 2.78613H10.0423C10.0423 2.51105 10.0487 2.25339 10.0423 1.99756C10.0276 1.49508 9.78741 1.25576 9.27759 1.24934C8.63573 1.24017 7.99387 1.26493 7.35201 1.23834C6.01787 1.18149 5.91425 1.47674 6.01236 2.78613Z" fill="#EBEBEB"/>
</svg>

              <p> Supprimer  </p>
              </p>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>

      <div className="flex-1 min-w-[20px] text-center border-[#ffffff20] border-r ">
        <InputComponent
          key={item.id}
          value={designation}
          placeholder="-"
          onChange={(e) => {
            setDesignation((x) => (x = e.target.value));
            updateTable(e.target.value, rate, quantity, amount);
          }}
          
          className="h-10 p-0 text-center text-white border-none"
        />
      </div>
      <div className="w-[170px] border-[#ffffff20]  border-r text-center ">
        <InputComponent
          key={item.id}
          type="number"
          value={item.quantity}
          placeholder="0"
          onChange={(e) => {
            setAmount((x) => (x = parseInt(e.target.value) * parseInt(rate)));
            setQuantity((x) => (x = e.target.value));
            updateTable(
              designation,
              e.target.value,
              rate,
              parseInt(e.target.value) * parseInt(rate)
            );
          }}
          className="h-10 p-0 text-center border-none "
        />
      </div>
      <div className="w-[170px] border-[#ffffff20] border-r text-center ">
        <InputComponent
          key={item.id}
          type="number"
          placeholder="0"
          onChange={(e) => {
            setAmount(
              (x) => (x = parseInt(quantity) * parseInt(e.target.value))
            );
            setRate((x) => (x = e.target.value));

            updateTable(
              designation,
              quantity,
              e.target.value,
              parseInt(e.target.value) * parseInt(quantity)
            );
          }}
          value={item.rate}
          className="h-10 p-0 text-center border-none"
        />
      </div>
      <div className="w-[170px] border-[#ffffff20]   text-center ">
        <InputComponent
          key={item.id}
          readOnly={true}
          value={isNaN(amount) ? 0 : parseInt(amount).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
          className="h-10 p-0 pr-6 text-center border-none"
        />
      </div>
    </div>
  );
}
