import React, { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import ButtonComponent from "../../../components/UI/ButtonComponent";
import { TiStarFullOutline } from "react-icons/ti";
import { BiArrowBack, BiArrowToRight, BiXCircle } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { fetchUser } from "../../../services/userService";
import { IoInformationCircle } from "react-icons/io5";
import { updateProformaDate } from "../../../services/projectService";
import {
  addNewPayment,
  updatePaymentEndDate,
  updatePaymentStartDate,
} from "../../../services/paymentService";
import IntouchApi from "./intouchApi";
import Script from "next/script";
import Head from "next/head";
import InputComponent from "../../../components/UI/InputComponent";

function Subscribe(props) {
  const [type, setType] = useState(0);
  const [fakeModal, setFakeModal] = useState(false);
  const [apiPaymentPanelView, setApiPaymentPanelView] = useState(false);
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const dataUser = await fetchUser();
      setData((x) => (x = dataUser));
    })();
    return () => {};
  }, []);

  const handleChange = async (e) => {
    await updatePaymentStartDate(data?.subscribe.id, e.target.value);
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeDate = async (e) => {
    await updatePaymentEndDate(data?.subscribe.id, e.target.value);
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center relative w-auto h-full px-24  pt-[65px]">
      <Head>
        <Script src="https://touchpay.gutouch.net/touchpayv2/script/touchpaynr/prod_touchpay-0.0.1.js" />
        <Script src="../../../test.js" />
      </Head>
      {apiPaymentPanelView && <ToupayModal />}
      <div
        onClick={() => {
          setApiPaymentPanelView((x) => (x = !x));
        }}
      >
        Call function
      </div>
      {fakeModal && (
        <div className="absolute flex items-center justify-center px-4 border rounded-md bottom-20 gap-7">
          <input
            type="date"
            name="invoiceDate"
            onChange={handleChange}
            className="rounded-[4px]    bg-transparent opacity-100     [color-scheme:dark] mb-0 h-[50px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
          />
          <input
            type="date"
            name="invoiceDate"
            onChange={handleChangeDate}
            className="rounded-[4px]    bg-transparent opacity-100     [color-scheme:dark] mb-0 h-[50px] text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100 "
          />
          <BiXCircle
            className="cursor-pointer"
            onClick={() => {
              setFakeModal((x) => (x = false));
            }}
          />
        </div>
      )}

      <div
        onClick={() => {
          /*  */

          router.push({
            pathname: "subscribe/paymentHistorylist",
            query: JSON.stringify(data?.payments) as any,
          });
        }}
        className="relative flex items-center self-end justify-center pr-6 mt-4 mb-4 border rounded-full opacity-50 cursor-pointer"
      >
        <ButtonComponent
          key={2}
          label={"Voir Historique"}
          className={`  bg-transparent text-black     border-none `}
        />
        <FaArrowRight className="absolute right-3" />
      </div>
      <div className="flex flex-col items-center justify-center gap-1 tracking-wider xl:scale-75 xl:items-center">
        <h1 className="text-[52px]  xl:text-[68px] mt-8 xl:mt-0  leading-[40px] xl:leading-[80px]  font-semibold ">
          Des prix simples & transparents
        </h1>
        <h2 className="text-[30px] xl:text-[38px] opacity-50">
          Il y a forcément un plan pour vous. Commencez maintenant !
        </h2>
      </div>

      <div className="flex flex-1 flex-col items-center w-full h-full mt-8 rounded-tl-[30px]  justify-start pt-8 rounded-tr-[30px] overflow-scroll no-scrollbar  bg-gradient-to-b from-[#2b2b2b] via-[#00000000] to-[#00000000] ">
        {/*  <div className="flex h-[52px] min-w-[318px] items-center justify-center  font-bold bg-[#525252] rounded-full">
          <div onClick={()=> setType(0)} className={`${type == 0 ? "bg-white text-black" :"text-black"} flex items-center h-full text-[19px] px-6   rounded-full cursor-pointer`}>Mensuelle</div>
          <div onClick={()=> setType(1)} className={`${type == 1 ? "bg-white text-black" :"text-black"} flex items-center h-full text-[19px] px-6   rounded-full cursor-pointer`}>Abonnements</div>
        </div> */}

        <IoInformationCircle
          onClick={() => {
            setFakeModal((x) => (x = true));
          }}
          className="absolute w-5 h-5 opacity-50 bottom-10"
        />
        {type == 0 ? (
          <div className="flex items-center max-[1350px]:scale-75  max-[980px]:flex-wrap  h-[382px] min-[1350px]:h-[382px] mt-14  max-[1350px]:mt-1 w-auto justify-center gap-6">
            {/*   <ItemSubscribeCard key={1} number={1} price={10000}  /> */}
            <ItemSubscribeCard
              active={data?.subscribe.payment.month == 3}
              style={"bg-transparent border-[2px] border-[#9a9768]"}
              key={1}
              svg={3}
              price={9890}
            />
            <ItemSubscribeCard
              active={data?.subscribe.payment.month == 6}
              style={"bg-gradient-to-b from-[#8F8F91] to-[#424244]  "}
              key={2}
              svg={6}
              price={18950}
            />

            <ItemSubscribeCard
              active={data?.subscribe.payment.month == 12}
              style={"bg-gradient-to-b from-[#B7B781] to-[#999967] "}
              key={3}
              svg={12}
              price={34950}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center xl:w-[800px] justify-center bg-gradient-to-b from-[#303030] to-[#00000000] mt-14 px-[80px] pt-10 pb-10 rounded-3xl">
            <CiCircleCheck className="w-[120px] h-[120px] xl:w-[200px] xl:h-[200px] mb-3" />

            <p className="text-[22px] xl:text-[28px] xl:leading-[30px] font-light">
              Félicitaion ! vous avez déjà un abonnement
            </p>
            <p className="text-[22px] xl:text-[28px] font-light">
              en cours valable jusqu'au 31/12/2023
            </p>
          </div>
        )}
        <div></div>
      </div>
    </div>
  );

  function ItemSubscribeCard({ svg, price, style, active }) {
    return (
      <div
        onClick={async () => {
          const dataPayment: Payment = {
            type: "Orange Money",
            month: svg,
            amount: price,
            currency: "FCFA",
          };

          const newData = await addNewPayment(dataPayment);
          if (newData.id) {
            router.back();
          }
        }}
        className={` ${
          active ? "scale-[110%]  mx-4  " : ""
        }        relative h-full min-w-[295px] max-w-[295px]  ${style}  cursor-pointer rounded-[16px]  justify-center       px-[60px]     flex flex-col     `}
      >
        {active && (
          <div className="absolute flex items-center justify-center px-2 py-1 text-xs border rounded-full opacity-60 top-6 right-7">
            <TiStarFullOutline className="w-4 h-4 mb-[2px] mr-[2px]" />
            <p>Souscrit</p>
          </div>
        )}

        <div className="flex flex-col items-start leading-none border-b-[1px]  border-white/30 pb-4 mt-1 ">
          <p
            className={`text-[158px] ${
              svg == 12 ? "text-transparent" : ""
            } font-bold leading-[104px] mb-3`}
          >
            {svg}
          </p>
          {svg == 12 && !active && (
            <p
              className={`text-[158px] absolute left-[35px]   font-bold leading-[104px] mb-3`}
            >
              {svg}
            </p>
          )}

          {svg == 12 && active && (
            <p
              className={`text-[150px] top-[39px] absolute left-[35px]  font-bold leading-[104px] mb-3`}
            >
              {svg}
            </p>
          )}
          <p className="text-[40px] font-light tracking-wider  mt-[10px] mb-[4px] ml-1">
            MOIS
          </p>
          <p
            className={`text-[15px] font-light ${
              svg == 3 ? "text-[#ffffff]/30" : "text-[#ffffff]/30"
            } ml-1`}
          >
            Offre spéciale
          </p>
        </div>
        <p className="text-[24px] mt-[2px] flex font-light ml-1 items-start">
          {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}{" "}
          <span className="pt-1 pl-2 text-[14px] ">FCFA</span>{" "}
        </p>

        <ButtonComponent
          key={1}
          label={"Souscrire"}
          handleClick={() => {}}
          labelClassName={`${svg == 12 ? "" : "text-black"}`}
          className={`max-h-[35px] ${
            svg == 12 ? "bg-[#2b2b2b]" : "bg-[#f7f7f7]"
          }  text-black   mt-4  border-none `}
        />
      </div>
    );
  }

  function ToupayModal(): React.ReactNode {
    return (
      <div className="absolute translate-y-[20%] border border-white/10  z-20 flex flex-row items-center justify-center w-[800px]  min-h-[500px] h-[500px]  bg-[#262626] rounded-lg ">
        <div className="p-6 bg-[#343434] gap-2 flex flex-col h-full  w-[250px] rounded-lg rounded-r-none">
          {/* Item */}
          <CountryItem
            imageSrc="https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg"
            label="Mali"
            active={true}
          />
          <CountryItem
            imageSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWCAMAAAAfSh8xAAAACVBMVEX3fwD///8AnmBWUWjSAAAAoUlEQVR4nO3PMQEAAAgDoGn/0IZwJzQg6Zme7SkGDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDR8OvdOD1wQ8tBkAAAAASUVORK5CYII="
            label="Côte d'Ivoire"
          />
          <CountryItem
            imageSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACFCAMAAAApQEceAAAAh1BMVEUAhT/jGyP970IAgj//9EJ5qkD+9kPrdy7iCiL/8kKexEEJij8AgD/47UIAfj8Aiz/e40JPo0CuyEHs6EJ0r0C7zUHk4kIbkj+20kFeq0Clx0EdjT/Y30Ly60Khv0Hn6EJssECPuUAjmj+DuEBjqEBYokCCskA1l0DP2kI/oUB6uEGLv0DD1kFSU4jTAAACVElEQVR4nO3ZXZOaMBQGYJakttEAAQT8QLcou7Bd///vW2CgFQg4HW9O2PeMFxoOMzyTk5BEy3o22A9uPxmrn79eno2nHYAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAmABRahkQEQRiEZBwuw2XABFlkpTzXWIGxI6kjJbQI+GWsQe1ZQYkTiwriRcAiViVM19bRkCcfQ357ZgP2dRJnvEQsXPrJHc3NwGbAOE+a5L8uSQTIIK1WYb3SFtZD2qLIkRwcR+rfdcj+1XvAhfEIYds3Ytjl3bst2cH4pD0wjb38S+v18ySlDhEhBljD29xrzH10qpilzyQMG+wYiEK4SqfvyNX3AiILU7ZcbJT2DE7DWdiqpD69fE2IZG+5oVCF2IL9b7RUNjmPdVkE4ZU5RUUcpSaHEZlRR1SRTka83mpzyQOEZHXz/SiifUWcYh9HtSWPE8kEocofzDcmT9xdkobIkpvmOpNHNTRhjjr0awlz/qtO21I2FUWaz7NN19/UEcbknbXiyAoutGSalNpQ9rKYn718GnbO3JtHsT5aJ7d/dMMC+fTrX+yD+0gIQ2J61MH5t3ai/zW7FJc7SEwZQi/ymqJuFd/51sR5tUyUn6attbiF2YV6/slonAORbVs1CVThry61ttt2HjLLffVLEhVWZkaVZFQmbyatR/hl0i38xCn6KJpJgxxJv+iijUTMGHI/wUggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAsg3gHwBVOOG05v6eK8AAAAASUVORK5CYII="
            label="Sénégal"
          />
          <CountryItem
            imageSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACgCAMAAAAFBRFXAAAAk1BMVEUAnknvKy380RZSjkXURTPzJizvIC791hTyXigAnUr/0hT81BX/1BAAmkzyZCgAm0vwQCvtAC/4px96rj30eyXwNCzxTSr7xxjzbif92xP3oCD8zBf+3xLxWin6vhr1hiP5sB32kiL1iyLUWDHdrSWNszjtzRxUp0LVxiUnnkmiujOWtTbiyiCvvDAzoka6vi7PNzS7UcqwAAACzklEQVR4nO3X23qaQBSGYUJbcDaASIyixpiNghuw9391nYq7RmI8mVl9lv97lnDAfM8sBvQe7oxHvQDXEMwdgrlDMHcI5g7B3CGYOwRzh2DuEMwdgrlDMHcI5g7B3CGYOwRzh2DuEMwdgrlDMHcI5g7B3CGYOwRzh2DuEMwdgh3pdoluTBQcPD4GNHcmCu73en2aO9MEB0+DwRPNFhMFD/N8eE/BD6M8H9HcmSa4P1ZqTPMQkwQH8cT3JzHJTJMEp6PQ98NRSnFvmmDTa4rvJjjoTP4G08w0RXDaa3a4R7HFJDvs793JDgdx2PSGFDNNEJz2VBOsKGaaYqQHh+ABwc3dBwfD8eEZHhN8T9sODi4cJ3o305fXLS/IdvBz3Pkknp6Cp5dXny0vyHbwyzgPPzn2muLP13L/xfKCbAennVl+Vnidymex7YPb+qEVdF9VeFtvqF671k8xB6e0OZZvKg7NoW3/1HbxWgr6sxuKw2nfxUvKzXs4fVPfPMhKvbn57PJ+OZHGU3mtV047qZuVeD8def9QXyZL9fH+29E6vB/OzBe6vVcv5u5W4bkjirK1WJeFcLgMh8Ry1VKsV0umvaY42lw8x3ITUS/Lppb3cUi9JouSddtIrxPqdVnTMtGsZ1rUrZ9bquZ6aEXr1k8Puea6xecTrU9PM9uZFsXiECz9qvKPfyyYfnhEq9OeZlGUnfZ7xXOLRdkUSlnWpjCqS7n/R8lyh0XRbKleVMkuUCRV83NCbljOdLRuTqsyS/Z5Isn2PydYntPLrYmTenv+1hX1Vptt11u6ZVmzm2ipM/HP9AqRmWKWM53MtXl8vYvZjTzzIOs5v+/pZaXVNmrZSBFtla6W7ldkl/nqMC/f9mvmlczv20NkZfHl2CZFmXEL9or6ymOa1LW7lTgirm7h9asAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAf+QN12HfyehjrygAAAABJRU5ErkJggg=="
            label="Burkina"
          />
          <CountryItem
            imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/langfr-225px-Flag_of_Cameroon.svg.png"
            label="Cameroun"
          />
          <CountryItem
            imageSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWCAMAAAAfSh8xAAAACVBMVEXOESb80RYAlGAUMqWHAAAAoUlEQVR4nO3PMQEAAAgDoGn/0IZwJzQg6Zme7SkGDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDR8OvdOD1wQ8tBkAAAAASUVORK5CYII="
            label="Guinée"
          />
          <CountryItem
            imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvXx5CAZhtr8WDzN92qBIP-_f77KyWdhubjxeO_i3ygOBBZe4KmmHvzLigTr1mLiY8Os4&usqp=CAU"
            label="Gabon"
          />
          <CountryItem
            imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Benin.svg/langfr-225px-Flag_of_Benin.svg.png"
            label="Benin"
          />
          <CountryItem
            imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Flag_of_Togo.svg/langfr-225px-Flag_of_Togo.svg.png"
            label="Togo"
          />
        </div>
     

      <div className="flex-col justify-start flex-1 h-full p-8 min-h-min ">
          <p>Modes de paiement pour la région</p>
          <div className="flex flex-row flex-wrap gap-4 mt-4">
            <div className="p-2 cursor-pointer font-light  bg-white/10 flex rounded-[10px] justify-center items-center">
              Orange Money
            </div>
            <div className="p-2 cursor-pointer font-light  bg-white/5 opacity-50 flex rounded-[10px] justify-center items-center">
              Moov Money
            </div>
            <div className="p-2 cursor-pointer font-light  bg-white/5 opacity-50 flex rounded-[10px] justify-center items-center">
             Wave
            </div>
           
          </div>
          <div className="mt-8">

 <div className="flex flex-row gap-2">
 <div className="w-[80px]">
          <InputComponent
                  
                   value={223}
                   // error={checkValidation && data.externalContact.length < 3 ? "Min. 3 caractères" : ""}
                    type="number"
                    editable={false}
                  //  onChange={handleChange}
                    label="Indicatif"
                    labelClassName="text-white/40 text-[14px]  "
                    className="rounded-[14px] h-[40px] text-[14px] border-opacity-30 focus:border-[#ffffff]"
                  />
          </div>
          <InputComponent
                    name="externalContact"
                  //  value={data.externalContact}
                   // error={checkValidation && data.externalContact.length < 3 ? "Min. 3 caractères" : ""}
                    type="number"
                  //  onChange={handleChange}
                    label="Numero de téléphone * "
                    labelClassName="text-white/40 text-[14px]  "
                    className="rounded-[14px] h-[40px] text-[14px] border-opacity-30 focus:border-[#ffffff]"
                  />
 </div>

                  <div className="flex justify-end gap-4 mt-10">
                  <ButtonComponent
                key={1}
                label={"Annuler"}
                handleClick={() => {
                  setApiPaymentPanelView(false)
                }}
                className="bg-[#3f3f3f]  border-none    "
              />
              
              <ButtonComponent
                key={2}
                handleClick={async () => {

               /*    if(isLoading){
                  
                    return;
                  }
 */

               
                }}
                label={"Payer"}
                className={`bg-[#9a9768]  border-none  ${false ? "opacity-30 cursor-default hover:brightness-100" : "opacity-100 cursor-pointer "}`}
              />
                  </div>


                  <p className="absolute pt-4 mr-4 text-xs border-t opacity-50 bottom-4 border-white/10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus vero corporis expedita, quo magni aut architecto illum saepe inventore at alias, unde esse nesciunt dolorem, sed nulla voluptatibus recusandae soluta.</p>

 
          </div>
        </div>
     
       
      </div>
    );


    /*   <div className="flex-col justify-start flex-1 h-full p-4 bg-black min-h-min ">
          <p>Modes de paiement pour la région</p>
          <div className="flex flex-row gap-4">
            <div className="p-2 bg-white/10 flex rounded-[10px] justify-center items-center">
              Orange Money
            </div>
           
          </div>
        </div> */
    function CountryItem({
      label,
      imageSrc,
      active,
    }: {
      label: string;
      imageSrc: string;
      active?: boolean;
    }) {
      return (
        <div
          className={`flex flex-row items-center justify-start gap-2 p-2 px-3 rounded-md cursor-pointer hover:bg-white/5 ${active ? "bg-white/5 " :""}  `}
          onClick={() => {}}
        >
          <img
            alt=""
            className="object-cover h-[20px] w-[30px] "
            src={imageSrc}
            srcSet=""
          />
          <p className="text-lg font-light ">{label}</p>
        </div>
      );
    }
  }
}

export default Subscribe;

function ItemSubscribeCard11({ svg, price, style }) {
  return (
    <div
      className={` relative h-full min-w-[215px]  ${style}  cursor-pointer rounded-[10px]  justify-center       px-8     flex flex-col    `}
    >
      <div className="flex flex-col items-start leading-none border-b-[1px]  border-white/10 pb-2 ">
        {svg}

        <p className="text-[33px] mt-[18px] mb-[4px]">MOIS</p>
        <p className="text-[15px] text-[#ffffff]/40">Offre spéciale</p>
      </div>
      <p className="text-[30px] flex items-start">
        {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}{" "}
        <span className="pt-2 pl-2 text-base ">FCFA</span>{" "}
      </p>
    </div>
  );
}
function ItemSubscribeCardOld({ number, price }) {
  return (
    <div
      className={` relative h-full min-w-[215px] min-[1500px]:min-w-[275px] cursor-pointer rounded-[10px]   bg-gradient-to-bl from-[#929292] leading-[100px] px-8 pb-11  to-[#626262] flex flex-col justify-end ${
        number == 12 ? "from-[#e0da91] to-[#aaa670]  " : ""
      } `}
    >
      <p className="text-[90px] min-[1500px]:text-[120px] min-[1500px]:mb-6 font-bold tracking-wider ">
        {number}
      </p>
      <p className="mb-8 text-2xl tracking-wider min-[1500px]:mb-10 ">MOIS</p>
      <p className="absolute text-[14px] opacity-50 bottom-[65px] min-[1500px]:bottom-[70px]">
        Offre spéciale
      </p>
      <p className="flex gap-1 pt-2 text-3xl border-t-[1px] ">
        {" "}
        <span className="text-[24px] min-[1500px]:text-[30px] ">
          {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
        </span>{" "}
        <span className="text-sm">FCFA</span>
      </p>
    </div>
  );
}

function ItemSubscribeCard2({ number, price }) {
  return (
    <div
      className={`relative h-full min-w-[215px] min-[1500px]:min-w-[275px] cursor-pointer rounded-[10px]   bg-gradient-to-bl from-[#929292] leading-[100px] px-8 pb-11  to-[#ffc7676f] flex flex-col justify-end ${
        number == 12 ? "from-[#e0da91] to-[#aaa670]  " : ""
      } `}
    >
      <p className="text-[90px] min-[1500px]:text-[120px] min-[1500px]:mb-6 font-bold tracking-wider ">
        {number}
      </p>
      <p className="mb-8 text-2xl tracking-wider min-[1500px]:mb-10 ">MOIS</p>
      <p className="absolute text-[14px] opacity-50 bottom-[65px] min-[1500px]:bottom-[70px]">
        Offre spéciale
      </p>
      <p className="flex gap-1 pt-2 text-3xl border-t-[1px] ">
        {" "}
        <span className="text-[24px] min-[1500px]:text-[30px] ">
          {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
        </span>{" "}
        <span className="text-sm">FCFA</span>
      </p>
    </div>
  );
}
